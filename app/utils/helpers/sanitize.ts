/*
 * Client-side filtering for markup that arrives from the REST API.
 *
 * Defence in depth only: the server is responsible for what it stores and
 * returns. These remove the things that would run script if a bad value got
 * through anyway - script elements, inline event handlers, srcdoc,
 * javascript:/data: URLs, and SVG animations that rewrite an href.
 */

// Elements dropped outright, with their content
const BLOCKED_ELEMENTS: ReadonlySet<string> = new Set( [ 'script', 'object', 'embed', 'base', 'frame', 'frameset' ] );

// Attributes that take a URL
const URL_ATTRIBUTES: ReadonlySet<string> = new Set( [
    'action', 'background', 'cite', 'data', 'formaction', 'href', 'poster', 'src', 'url', 'xlink:href',
] );

// Whitespace and control characters, which browsers ignore inside a scheme
// ("java\tscript:" still runs)
// eslint-disable-next-line no-control-regex
const IGNORED_URL_CHARACTERS = /[\u0000- \u007f-\u009f]/g;

/*
 * Whether a URL is safe to put in an href/src. Relative URLs and every scheme
 * except javascript:, vbscript: and data: pass. data: is allowed only for
 * images loaded through an <img>, where it can't run script.
 */
export const isSafeURL = ( url: string, allowDataImage: boolean = false ): boolean => {
    const normalized: string = String( url ).replace( IGNORED_URL_CHARACTERS, '' ).toLowerCase();
    if ( normalized.startsWith( 'javascript:' ) || normalized.startsWith( 'vbscript:' ) ) {
        return false;
    }
    if ( normalized.startsWith( 'data:' ) ) {
        return allowDataImage && normalized.startsWith( 'data:image/' );
    }
    return true;
};

// Whether an element should be dropped, content and all
export const isBlockedElement = ( tagName: string ): boolean => {
    return BLOCKED_ELEMENTS.has( tagName.toLowerCase() );
};

/*
 * Whether an attribute should be removed from an element: inline event
 * handlers, srcdoc, and URL attributes with an unsafe scheme.
 */
export const isUnsafeAttribute = ( tagName: string, name: string, value: string ): boolean => {
    const attribute: string = name.toLowerCase();
    if ( attribute.startsWith( 'on' ) || attribute === 'srcdoc' ) {
        return true;
    }
    if ( URL_ATTRIBUTES.has( attribute ) ) {
        return ! isSafeURL( value, tagName.toLowerCase() === 'img' && attribute === 'src' );
    }
    // srcset is a list of URLs; any unsafe entry drops the lot
    if ( attribute === 'srcset' ) {
        return value.split( ',' ).some( ( candidate ) => ! isSafeURL( candidate.trim(), true ) );
    }
    return false;
};

// Removes unsafe attributes from a plain attribute map, in place
export const sanitizeAttributes = ( tagName: string, attributes: Record<string, string> ): Record<string, string> => {
    for ( const name of Object.keys( attributes ) ) {
        if ( isUnsafeAttribute( tagName, name, attributes[ name ] ) ) {
            delete attributes[ name ];
        }
    }
    return attributes;
};

// SVG elements that can run script or pull in other documents
const SVG_BLOCKED_ELEMENTS: ReadonlySet<string> = new Set( [ 'script', 'foreignobject', 'iframe', 'object', 'embed' ] );
// SVG animation elements. Their to/from/values aren't URL attributes, so
// <set attributeName="href" to="javascript:..."> would rewrite a link after
// load without tripping isUnsafeAttribute().
const SVG_ANIMATION_ELEMENTS: ReadonlySet<string> = new Set( [ 'animate', 'set', 'animatemotion', 'animatetransform' ] );

// Whether an element is an SVG animation that targets an href (or xlink:href)
export const isUnsafeAnimation = ( tagName: string, attributeName: string | undefined ): boolean => {
    return SVG_ANIMATION_ELEMENTS.has( tagName.toLowerCase() ) && /href/i.test( attributeName ?? '' );
};

/*
 * Whether an SVG element is an animation that targets an href. Attribute
 * lookups in an XML document are case-sensitive, so getAttribute(
 * 'attributeName' ) misses attributename="href" or ATTRIBUTENAME="xlink:href",
 * which the HTML parser then normalises to attributeName when the markup is
 * injected. So every attribute is checked, whatever its case.
 */
const isUnsafeSVGAnimation = ( element: Element ): boolean => {
    return Array.from( element.attributes ).some( ( attribute ) => (
        attribute.localName.toLowerCase() === 'attributename' && isUnsafeAnimation( element.localName, attribute.value )
    ) );
};

/*
 * Sanitizes an SVG document for injection with dangerouslySetInnerHTML.
 * Returns '' if the string isn't a well-formed SVG.
 *
 * The SVG is parsed as XML but injected as HTML, and the two parsers disagree
 * about anything that isn't an element or text. "<!--><img onerror=...>-->" is
 * one comment to the XML parser, but the HTML parser ends it at "<!-->" and
 * builds the <img>; a processing instruction ("<?x ><img ...>?>") breaks out
 * the same way. So every node is visited, not just elements, and only
 * elements and text are kept. CDATA becomes plain text, which the serializer
 * escapes (Illustrator wraps <style> rules in it).
 */
export const sanitizeSVG = ( svg: string ): string => {
    if ( ! svg || typeof DOMParser === 'undefined' ) {
        return '';
    }
    const doc: Document = new DOMParser().parseFromString( svg, 'image/svg+xml' );
    const root: Element = doc.documentElement;
    if ( ! root || root.nodeName.toLowerCase() !== 'svg' || doc.getElementsByTagName( 'parsererror' ).length > 0 ) {
        return '';
    }
    // Collect first: removing nodes mid-walk would cut the walk short
    const walker: TreeWalker = doc.createTreeWalker( root, NodeFilter.SHOW_ALL );
    const nodes: Array<Node> = [];
    for ( let node: Node | null = walker.currentNode; node; node = walker.nextNode() ) {
        nodes.push( node );
    }
    for ( const node of nodes ) {
        if ( node.nodeType === Node.TEXT_NODE ) {
            continue;
        }
        if ( node.nodeType === Node.CDATA_SECTION_NODE ) {
            node.parentNode?.replaceChild( doc.createTextNode( node.nodeValue ?? '' ), node );
            continue;
        }
        if ( node.nodeType !== Node.ELEMENT_NODE ) {
            // Comments, processing instructions, and anything else
            node.parentNode?.removeChild( node );
            continue;
        }
        const element: Element = node as Element;
        const name: string = element.nodeName.toLowerCase();
        if ( SVG_BLOCKED_ELEMENTS.has( name ) || isUnsafeSVGAnimation( element ) ) {
            element.remove();
            continue;
        }
        for ( const attribute of Array.from( element.attributes ) ) {
            // localName as well as name, so a link under any prefix bound to
            // the XLink namespace (x:href) is checked like xlink:href
            if ( isUnsafeAttribute( name, attribute.name, attribute.value ) || isUnsafeAttribute( name, attribute.localName, attribute.value ) ) {
                element.removeAttribute( attribute.name );
            }
        }
    }
    return new XMLSerializer().serializeToString( root );
};
