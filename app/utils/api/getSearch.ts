import { APIEndpoint } from '@/globalVariables';
import { APIResult } from '@/utils/types/APIResult';
import { SearchArgs } from '@/utils/types/SearchArgs';
import fetchJSON from '@/utils/api/fetchJSON';

const getSearch = ( args: SearchArgs, init: RequestInit = {} ): Promise<APIResult<unknown>> => {
    const params: URLSearchParams = new URLSearchParams( {
        postID: String( args.postID ),
        metaPrefix: args.metaPrefix,
        metaSuffix: args.metaSuffix,
    } );
    for ( const [ key, value ] of Object.entries( args.query ) ) {
        if ( value !== undefined && value !== null && String( value ).length > 0 ) {
            params.set( key, String( value ) );
        }
    }
    return fetchJSON<unknown>( 'getSearch', `${ APIEndpoint }/devo-search?${ params.toString() }`, init );
};
export default getSearch;
