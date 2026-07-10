import { APIEndpoint } from '@/globalVariables';
import { APIResult } from '@/utils/types/APIResult';
import { SearchArgs } from '@/utils/types/SearchArgs';

const getSearch: ( args: SearchArgs ) => Promise<APIResult> = async ( args ): Promise<APIResult> => {
    try {
        const params: URLSearchParams = new URLSearchParams( {
            postID: String( args.postID ),
            metaPrefix: args.metaPrefix,
            metaSuffix: args.metaSuffix,
        } );
        for ( const [ key, value ] of Object.entries( args.query ) ) {
            if ( value !== undefined && value !== null && String( value ).length > 0 ) {
                params.set( key, String( value ) );
            }
        }
        const searchEndpoint: string = `${APIEndpoint}/devo-search?${params.toString()}`;

        if ( window.devoEnv !== 'prod' ) {
            console.log( 'getSearch ' + searchEndpoint );
        }

        const response: Response = await fetch( searchEndpoint );
        const json = await response.json();
        const result: APIResult = {
            totalPages: response.headers.get( 'x-wp-totalpages' ),
            totalPosts: response.headers.get( 'x-wp-total' ),
            allHeaders: response.headers,
            json,
        };

        return result;

    } catch ( error ) {
        console.log( 'Error fetching search: ' + error );
        throw error;
    }
};
export default getSearch;
