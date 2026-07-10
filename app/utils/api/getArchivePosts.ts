import { APIEndpoint } from '@/globalVariables';
import { Post } from '@/utils/types/Post';
import { APIResult } from '@/utils/types/APIResult';
import { SearchQueryArgs } from '../types/SearchQueryArgs';

const getArchivePosts: ( args: SearchQueryArgs ) => Promise<APIResult> = async ( args ): Promise<APIResult> => {
    try {
        const queryString: string = new URLSearchParams( args as Record<string, string> ).toString();
        const archiveAllEndpoint: string = `${APIEndpoint}/archive/?${queryString}`;

        if ( window.devoEnv !== 'prod' ) {
            console.log( 'getArchivePosts ' + archiveAllEndpoint );
        }

        const response: Response = await fetch( archiveAllEndpoint );
        const json: Array<Post> = await response.json();
        const result: APIResult = {
            totalPages: response.headers.get('x-wp-totalpages'),
            totalPosts: response.headers.get('x-wp-total'),
            allHeaders: response.headers,
            json,
        };

        return result;

    } catch ( error ) {
        console.error( 'Error fetching archive posts: ', error );
        throw error;
    }
};
export default getArchivePosts;
