import { WPAPIEndpoint } from 'src/globalVariables';
import { APIResult } from 'src/utils/types/APIResult';
import { Post } from 'src/utils/types/Post';

const doGetPosts: ( postType: string ) => Promise<APIResult> = async ( postType = '' ): Promise<APIResult> => {
    try {
        const postsEndpoint: string = `${WPAPIEndpoint}/${postType}/`;

        if ( doEnv !== 'prod' ) {
            console.log( 'doGetPosts ' + postsEndpoint );
        }

        const response: Response = await fetch( postsEndpoint );
        const json: Array<Post> = await response.json();
        const result: APIResult = {
            totalPages: response.headers.get( 'x-wp-totalpages' ),
            totalPosts: response.headers.get( 'x-wp-total' ),
            allHeaders: response.headers,
            json,
        }

        return result;
    
    } catch ( error ) {
        console.log( 'Error fetching posts: ' + error );
        throw error;
    }
}
export default doGetPosts;