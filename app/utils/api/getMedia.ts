import { APIEndpoint } from '@/globalVariables';
import { APIResult } from '@/utils/types/APIResult';
import { Post } from '@/utils/types/Post';

const getMedia: ( id: string ) => Promise<APIResult> = async ( id ): Promise<APIResult> => {
    try {
        const mediaEndpoint: string = `${APIEndpoint}/media/${id}`;
        
        if ( window.devoEnv !== 'prod' ) {
            console.log( 'getMedia ' + mediaEndpoint );
        }

        const response: Response = await fetch( mediaEndpoint );
        const json: Post = await response.json();
        const result: APIResult = {
            totalPages: response.headers.get( 'x-wp-totalpages' ),
            totalPosts: response.headers.get( 'x-wp-total' ),
            allHeaders: response.headers,
            json,
        };

        return result;
            
    } catch ( error ) {
        console.log( 'Error fetching media: ' + error );
        throw error;
    }
};
export default getMedia;