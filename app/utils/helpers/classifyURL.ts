import { isSafeURL } from '@/utils/helpers/sanitize';

/*
 * How a link should be rendered:
 *
 *   none      no URL, or an unsafe one (javascript: etc.)
 *   hash      an anchor on the current page (#section)
 *   query     a query on the current page (?page=2)
 *   route     a page of this site, for the router (path relative to home)
 *   site      something else on this site's origin - a file, wp-admin, or a
 *             path outside the home directory - for a plain <a>
 *   external  another origin
 *   scheme    mailto:, tel:, sms: and other non-HTTP schemes
 */
export type URLKind = 'none' | 'hash' | 'query' | 'route' | 'site' | 'external' | 'scheme';

export interface ClassifiedURL {
    kind: URLKind;
    // For an <a>: absolute, or root-relative including the home directory
    href: string;
    // For a router <Link>, relative to the router's basename (route only)
    to: string;
}

const SCHEME = /^[a-z][a-z0-9+.-]*:/i;
// The last path segment has a file extension (/report.pdf)
const FILE_EXTENSION = /\.[a-z0-9]{1,8}$/i;
// Paths WordPress serves itself, never the React app
const NON_ROUTE_PATHS = /^\/(wp-admin|wp-content|wp-includes|wp-json|wp-login\.php|xmlrpc\.php|feed)(\/|$)/i;

// The install's home directory ('' at the domain root, else e.g. '/blog')
const homePath = (): string => ( window.relativeHomeURL || '' ).replace( /\/+$/, '' );

const homeOrigin = (): string => {
    try {
        return new URL( window.homeURL ).origin;
    } catch {
        return window.location.origin;
    }
};

// Removes the home directory from a path that starts with it as a whole
// segment: with home at /blog, /blog/about/ -> /about/, but /blogging/ stays.
const stripHomePath = ( path: string, home: string ): string | null => {
    if ( ! home ) {
        return path;
    }
    if ( path === home ) {
        return '/';
    }
    return path.startsWith( home + '/' ) ? path.slice( home.length ) : null;
};

const classifyURL = ( rawURL: string = '' ): ClassifiedURL => {
    const url: string = String( rawURL ).trim();
    const none: ClassifiedURL = { kind: 'none', href: '', to: '' };
    if ( ! url || ! isSafeURL( url ) ) {
        return none;
    }
    if ( url.startsWith( '#' ) ) {
        return { kind: 'hash', href: url, to: '' };
    }
    if ( url.startsWith( '?' ) ) {
        return { kind: 'query', href: url, to: '' };
    }
    if ( SCHEME.test( url ) && ! /^https?:/i.test( url ) ) {
        return { kind: 'scheme', href: url, to: '' };
    }

    const home: string = homePath();
    const origin: string = homeOrigin();
    // Absolute (http:, https:, //) URLs keep their own path. Relative ones are
    // relative to home, whether or not they already include its directory.
    const isAbsolute: boolean = /^https?:/i.test( url ) || url.startsWith( '//' );
    let parsed: URL;
    try {
        parsed = new URL( isAbsolute ? url : '/' + url.replace( /^\/+/, '' ), origin + '/' );
    } catch {
        return none;
    }
    if ( parsed.origin !== origin ) {
        return { kind: 'external', href: parsed.href, to: '' };
    }

    const rest: string = parsed.search + parsed.hash;
    const homeRelativePath: string | null = stripHomePath( parsed.pathname, home );
    if ( homeRelativePath === null ) {
        // Same origin, outside the home directory. Only possible for an
        // absolute URL; a relative one is taken to be under home.
        if ( isAbsolute ) {
            return { kind: 'site', href: parsed.href, to: '' };
        }
    }
    const path: string = homeRelativePath ?? parsed.pathname;
    const lastSegment: string = path.slice( path.lastIndexOf( '/' ) + 1 );
    if ( FILE_EXTENSION.test( lastSegment ) || NON_ROUTE_PATHS.test( path ) ) {
        return { kind: 'site', href: home + path + rest, to: '' };
    }
    // WordPress permalinks end in a slash
    const routePath: string = path.endsWith( '/' ) ? path : path + '/';
    return { kind: 'route', href: home + routePath + rest, to: routePath + rest };
};
export default classifyURL;
