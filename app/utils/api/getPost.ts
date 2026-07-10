import { APIEndpoint } from '@/globalVariables';
import { APIResult } from '@/utils/types/APIResult';
import { Post } from '@/utils/types/Post';

const getPost: ( postType: string, slug: string, queryString?: string ) => Promise<APIResult> = async ( postType = '', slug = '', queryString ): Promise<APIResult> => {
    try {
        const postEndpoint: string = `${APIEndpoint}/${postType}?slug=${slug}${ queryString ? '&' + queryString : '' }`;

        if ( window.devoEnv !== 'prod' ) {
            console.log( 'getPost ' + postEndpoint );
        }

        const response: Response = await fetch( postEndpoint );
        const json: Post = await response.json();
        const result: APIResult = {
            totalPages: response.headers.get( 'x-wp-totalpages' ),
            totalPosts: response.headers.get( 'x-wp-total' ),
            allHeaders: response.headers,
            json: Array.isArray( json ) ? json[0] : json,
        };

        return result;
    
    } catch ( error ) {
        console.log( 'Error fetching post: ' + error );
        throw error;
    }
};
export default getPost;