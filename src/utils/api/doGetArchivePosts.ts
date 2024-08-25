import { WPAPIEndpoint } from 'src/globalVariables';
import { Post } from 'src/utils/types/Post';
import { APIResult } from 'src/utils/types/APIResult';

const doGetArchivePosts: ( args: Record<string, string> ) => Promise<APIResult> = async ( args ): Promise<APIResult> => {
    try {
        const queryString: string = new URLSearchParams( args ).toString();
        const archiveAllEndpoint: string = `${WPAPIEndpoint}/archive/?${queryString}`;
        
        if ( doEnv !== 'prod' ) {
            console.log( 'doGetArchivePosts ' + archiveAllEndpoint );
        }

        const response: Response = await fetch( archiveAllEndpoint );
        const json: Array<Post> = await response.json();
        const result: APIResult = {
            totalPages: response.headers.get('x-wp-totalpages'),
            totalPosts: response.headers.get('x-wp-total'),
            allHeaders: response.headers,
            json,
        }

        return result;

    } catch ( error ) {
        console.error( 'Error fetching archive posts: ', error );
        throw error;
    }
}
export default doGetArchivePosts;