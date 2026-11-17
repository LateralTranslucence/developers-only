import { APIEndpoint } from '@/globalVariables';
import { APIResult } from '@/utils/types/APIResult';
import { Post } from '@/utils/types/Post';
import fetchJSON from '@/utils/api/fetchJSON';

const getPosts = ( postType: string = '', init: RequestInit = {} ): Promise<APIResult<Array<Post>>> => {
    return fetchJSON<Array<Post>>( 'getPosts', `${ APIEndpoint }/${ encodeURIComponent( postType ) }/`, init );
};
export default getPosts;
