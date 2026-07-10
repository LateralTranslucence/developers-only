import { APIEndpoint } from '@/globalVariables';
import { APIResult } from '@/utils/types/APIResult';
import { Post } from '@/utils/types/Post';

const getPosts: ( postType: string ) => Promise<APIResult> = async ( postType = '' ): Promise<APIResult> => {
    try {
        const postsEndpoint: string = `${APIEndpoint}/${postType}/`;

        if ( window.devoEnv !== 'prod' ) {
            console.log( 'getPosts ' + postsEndpoint );
        }

        const response: Response = await fetch( postsEndpoint );
        const json: Array<Post> = await response.json();
        const result: APIResult = {
            totalPages: response.headers.get( 'x-wp-totalpages' ),
            totalPosts: response.headers.get( 'x-wp-total' ),
            allHeaders: response.headers,
            json,
        };

        return result;
    
    } catch ( error ) {
        console.log( 'Error fetching posts: ' + error );
        throw error;
    }
};
export default getPosts;