import { WPAPIEndpoint } from 'src/globalVariables';
import { APIResult } from 'src/utils/types/APIResult';

const doGetSearch: ( args: Record<string, any> ) => Promise<APIResult> = async ( args ): Promise<APIResult> => {
    try {
        const queryString: string = new URLSearchParams( args ).toString();
        const searchEndpoint: string = `${WPAPIEndpoint}/search?postID=${args.postID}&metaPrefix=${args.metaPrefix}&${queryString}`;

        if ( doEnv !== 'prod' ) {
            console.log( 'doGetSearch ' + searchEndpoint );
        }

        const response: Response = await fetch( searchEndpoint );
        const json = await response.json();
        const result: APIResult = {
            totalPages: response.headers.get( 'x-wp-totalpages' ),
            totalPosts: response.headers.get( 'x-wp-total' ),
            allHeaders: response.headers,
            json,
        }

        return result;

    } catch ( error ) {
        console.log( 'Error fetching search: ' + error );
        throw error;
    }
}
export default doGetSearch;