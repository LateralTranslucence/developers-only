/*
 * Client-side filtering for markup that arrives from the REST API.
 *
 * Defence in depth only: the server is responsible for what it stores and
 * returns. These remove the things that would run script if a bad value got
 * through anyway - script elements, inline event handlers, srcdoc, and
 * javascript:/data: URLs.
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
// SVG animation elements, which can rewrite an href to javascript: after load
const SVG_ANIMATION_ELEMENTS: ReadonlySet<string> = new Set( [ 'animate', 'set', 'animatemotion', 'animatetransform' ] );

/*
 * Sanitizes an SVG document for injection with dangerouslySetInnerHTML.
 * Returns '' if the string isn't a well-formed SVG.
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
    const elements: Array<Element> = [ root, ...Array.from( root.getElementsByTagName( '*' ) ) ];
    for ( const element of elements ) {
        const name: string = element.nodeName.toLowerCase();
        if ( SVG_BLOCKED_ELEMENTS.has( name ) ) {
            element.remove();
            continue;
        }
        if ( SVG_ANIMATION_ELEMENTS.has( name ) && /href/i.test( element.getAttribute( 'attributeName' ) ?? '' ) ) {
            element.remove();
            continue;
        }
        for ( const attribute of Array.from( element.attributes ) ) {
            if ( isUnsafeAttribute( name, attribute.name, attribute.value ) ) {
                element.removeAttribute( attribute.name );
            }
        }
    }
    return new XMLSerializer().serializeToString( root );
};
