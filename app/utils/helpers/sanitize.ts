/*
 * Client-side filtering for markup that arrives from the REST API.
 *
 * Defence in depth only: the server is responsible for what it stores and
 * returns. These remove the things that would run script if a bad value got
 * through anyway - script elements, inline event handlers, srcdoc,
 * javascript:/data: URLs, and SVG animations that rewrite an href - or that
 * would change the page's <head> (meta, link, base, title).
 */

// Elements dropped outright, with their content. React 19 hoists a rendered
// <meta> or <link> into <head>, wherever it appears, so <meta http-equiv=
// "refresh"> in post content would redirect the page; <base> would re-root
// every relative URL.
const BLOCKED_ELEMENTS: ReadonlySet<string> = new Set( [ 'script', 'object', 'embed', 'base', 'frame', 'frameset', 'meta', 'link' ] );
// Dropped only outside an <svg>. React 19 hoists any other <title> into
// <head>, where it replaces the document title; inside an <svg> it is the
// graphic's accessible name, and React leaves it in place.
const BLOCKED_OUTSIDE_SVG: ReadonlySet<string> = new Set( [ 'title' ] );

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
export const isBlockedElement = ( tagName: string, inSVG: boolean = false ): boolean => {
    const name: string = tagName.toLowerCase();
    return BLOCKED_ELEMENTS.has( name ) || ( ! inSVG && BLOCKED_OUTSIDE_SVG.has( name ) );
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

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
/*
 * The SVG elements an icon may contain (lower-cased local names); everything
 * else is dropped with its content. An allowlist, because the HTML parser
 * that handles the injected markup leaves the SVG for a long list of HTML tag
 * names (meta, p, img, table, ...) whatever namespace they had in the XML.
 * Not included: script, foreignObject, and style, whose rules would apply to
 * the whole page and whose @import would load.
 */
const SVG_ALLOWED_ELEMENTS: ReadonlySet<string> = new Set( [
    'a', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'g', 'image', 'line', 'lineargradient', 'marker', 'mask',
    'metadata', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'svg', 'switch', 'symbol',
    'text', 'textpath', 'title', 'tspan', 'use', 'view',
    'animate', 'animatemotion', 'animatetransform', 'mpath', 'set',
    'filter', 'feblend', 'fecolormatrix', 'fecomponenttransfer', 'fecomposite', 'feconvolvematrix',
    'fediffuselighting', 'fedisplacementmap', 'fedistantlight', 'fedropshadow', 'feflood', 'fefunca', 'fefuncb',
    'fefuncg', 'fefuncr', 'fegaussianblur', 'feimage', 'femerge', 'femergenode', 'femorphology', 'feoffset',
    'fepointlight', 'fespecularlighting', 'fespotlight', 'fetile', 'feturbulence',
] );
// SVG elements whose content the HTML parser reads as HTML, not SVG. Only
// text may go in them.
const SVG_TEXT_ONLY_ELEMENTS: ReadonlySet<string> = new Set( [ 'desc', 'title' ] );
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
 * Whether an element may stay in a sanitized SVG: an allowed SVG element, in
 * the SVG namespace and unprefixed (so the serialized tag is the one the HTML
 * parser sees), and not inside a <title> or <desc>.
 */
const isAllowedSVGElement = ( element: Element ): boolean => {
    if ( element.namespaceURI !== SVG_NAMESPACE || element.prefix || ! SVG_ALLOWED_ELEMENTS.has( element.localName.toLowerCase() ) ) {
        return false;
    }
    const parent: Element | null = element.parentElement;
    return ! parent || ! SVG_TEXT_ONLY_ELEMENTS.has( parent.localName.toLowerCase() );
};

/*
 * Sanitizes an SVG document for injection with dangerouslySetInnerHTML.
 * Returns '' if the string isn't a well-formed SVG (which includes an <svg>
 * root without xmlns="http://www.w3.org/2000/svg").
 *
 * The SVG is parsed as XML but injected as HTML, and the two parsers disagree:
 * - About anything that isn't an element or text. "<!--><img onerror=...>-->"
 *   is one comment to the XML parser, but the HTML parser ends it at "<!-->"
 *   and builds the <img>; a processing instruction ("<?x ><img ...>?>") breaks
 *   out the same way. So every node is visited, not just elements, and only
 *   elements and text are kept. CDATA becomes plain text, which the
 *   serializer escapes.
 * - About elements. <meta http-equiv="refresh"> is an SVG-namespace element
 *   to the XML parser, but a real HTML <meta> once injected, as are <p>,
 *   <img>, <table> and others. So only known SVG elements are kept (see
 *   SVG_ALLOWED_ELEMENTS); <style> is among those dropped.
 */
/*
 * `decorative` is for an SVG hidden from assistive technology (Icon renders
 * inside aria-hidden="true"). A link or tabindex in it would still take
 * keyboard focus, landing on something a screen reader can't describe. So
 * <a> elements are unwrapped (their graphics kept) and tabindex is removed.
 */
export interface SanitizeSVGOptions {
    decorative?: boolean;
}

export const sanitizeSVG = ( svg: string, { decorative = false }: SanitizeSVGOptions = {} ): string => {
    if ( ! svg || typeof DOMParser === 'undefined' ) {
        return '';
    }
    const doc: Document = new DOMParser().parseFromString( svg, 'image/svg+xml' );
    const root: Element = doc.documentElement;
    if ( ! root || root.localName !== 'svg' || ! isAllowedSVGElement( root ) || doc.getElementsByTagName( 'parsererror' ).length > 0 ) {
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
        const name: string = element.localName.toLowerCase();
        if ( ! isAllowedSVGElement( element ) || isUnsafeSVGAnimation( element ) ) {
            element.remove();
            continue;
        }
        if ( decorative && name === 'a' && element !== root ) {
            // Its children are already in `nodes`, so they're still checked
            element.replaceWith( ...Array.from( element.childNodes ) );
            continue;
        }
        if ( decorative ) {
            // Any case: the XML lookup is case-sensitive, but the HTML parser
            // lower-cases TABINDEX on injection
            for ( const attribute of Array.from( element.attributes ) ) {
                if ( attribute.localName.toLowerCase() === 'tabindex' ) {
                    element.removeAttribute( attribute.name );
                }
            }
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
