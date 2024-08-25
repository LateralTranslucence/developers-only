import { WPAPIEndpoint } from 'src/globalVariables';
import { APIResult } from 'src/utils/types/APIResult';
import { Post } from 'src/utils/types/Post';

const doGetMedia: ( id: string ) => Promise<APIResult> = async ( id ): Promise<APIResult> => {
    try {
        const mediaEndpoint: string = `${WPAPIEndpoint}/media/${id}`;
        
        if ( doEnv !== 'prod' ) {
            console.log( 'doGetMedia ' + mediaEndpoint );
        }

        const response: Response = await fetch( mediaEndpoint );
        const json: Post = await response.json();
        const result: APIResult = {
            totalPages: response.headers.get( 'x-wp-totalpages' ),
            totalPosts: response.headers.get( 'x-wp-total' ),
            allHeaders: response.headers,
            json,
        }

        return result;
            
    } catch ( error ) {
        console.log( 'Error fetching media: ' + error );
        throw error;
    }
}
export default doGetMedia;