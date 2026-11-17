import { APIResult } from '@/utils/types/APIResult';

// A non-2xx response. `status` lets callers treat e.g. a 404 differently.
export class HTTPError extends Error {
    status: number;

    constructor( status: number, url: string ) {
        super( `HTTP ${ status } from ${ url }` );
        this.name = 'HTTPError';
        this.status = status;
    }
}

// Whether an error is the rejection from an aborted request, which callers
// should ignore rather than report
export const isAbortError = ( error: unknown ): boolean => {
    return error instanceof DOMException && error.name === 'AbortError';
};

/*
 * fetch() + JSON for the API utils. Logs the endpoint outside production,
 * and rejects on a network error, a non-2xx status (HTTPError) or a body that
 * isn't JSON - e.g. a PHP fatal's HTML error page - so callers have a single
 * failure path to handle.
 */
const fetchJSON = async <TJson>( label: string, url: string, init: RequestInit = {} ): Promise<APIResult<TJson>> => {
    if ( window.devoEnv !== 'prod' ) {
        console.log( label + ' ' + url );
    }
    try {
        const response: Response = await fetch( url, init );
        if ( ! response.ok ) {
            throw new HTTPError( response.status, url );
        }
        const json = await response.json() as TJson;
        return {
            totalPages: response.headers.get( 'x-wp-totalpages' ),
            totalPosts: response.headers.get( 'x-wp-total' ),
            allHeaders: response.headers,
            json,
        };
    } catch ( error ) {
        if ( ! isAbortError( error ) ) {
            console.error( `Error in ${ label }:`, error );
        }
        throw error;
    }
};
export default fetchJSON;
