import { APIEndpoint } from '@/globalVariables';
import { APIResult } from '@/utils/types/APIResult';
import { Post } from '@/utils/types/Post';
import fetchJSON, { HTTPError } from '@/utils/api/fetchJSON';

/*
 * A single post by REST base and slug. `json` is undefined when there's no
 * such post (the collection comes back empty) or no such REST route (404).
 * Rejects on a network error, any other error status, or a non-JSON body.
 */
const getPost = async ( postType: string = '', slug: string = '', init: RequestInit = {} ): Promise<APIResult<Post | undefined>> => {
    const postEndpoint: string = `${ APIEndpoint }/${ encodeURIComponent( postType ) }?slug=${ encodeURIComponent( slug ) }`;
    try {
        const result = await fetchJSON<Array<Post> | Post>( 'getPost', postEndpoint, init );
        const post: Post | undefined = Array.isArray( result.json ) ? result.json[0] : result.json;
        return { ...result, json: post && typeof post === 'object' ? post : undefined };
    } catch ( error ) {
        if ( error instanceof HTTPError && error.status === 404 ) {
            return { totalPages: null, totalPosts: null, allHeaders: new Headers(), json: undefined };
        }
        throw error;
    }
};
export default getPost;
