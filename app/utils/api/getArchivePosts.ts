import { APIEndpoint } from '@/globalVariables';
import { Post } from '@/utils/types/Post';
import { APIResult } from '@/utils/types/APIResult';
import { SearchQueryArgs } from '@/utils/types/SearchQueryArgs';
import fetchJSON from '@/utils/api/fetchJSON';

const getArchivePosts = ( args: SearchQueryArgs, init: RequestInit = {} ): Promise<APIResult<Array<Post>>> => {
    const queryString: string = new URLSearchParams( args as Record<string, string> ).toString();
    return fetchJSON<Array<Post>>( 'getArchivePosts', `${ APIEndpoint }/archive/?${ queryString }`, init );
};
export default getArchivePosts;
