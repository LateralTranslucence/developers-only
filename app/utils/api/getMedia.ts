import { APIEndpoint } from '@/globalVariables';
import { APIResult } from '@/utils/types/APIResult';
import { Post } from '@/utils/types/Post';
import fetchJSON from '@/utils/api/fetchJSON';

const getMedia = ( id: string, init: RequestInit = {} ): Promise<APIResult<Post>> => {
    return fetchJSON<Post>( 'getMedia', `${ APIEndpoint }/media/${ encodeURIComponent( id ) }`, init );
};
export default getMedia;
