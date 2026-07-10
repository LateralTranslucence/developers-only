import { APIEndpoint } from '@/globalVariables';
import { APIResult } from '@/utils/types/APIResult';
import { Post } from '@/utils/types/Post';

const getForm: ( formID: number ) => Promise<APIResult> = async ( formID ): Promise<APIResult> => {
    try {
        const formEndpoint: string = APIEndpoint + '/devo-form/?formID=' + formID;
            
        if ( window.devoEnv !== 'prod' ) {
            console.log( 'getForm ' + formEndpoint );
        }

        const response: Response = await fetch( formEndpoint );
        const json: Record<string, any> = await response.json();
        const result: APIResult = {
            totalPages: response.headers.get( 'x-wp-totalpages' ),
            totalPosts: response.headers.get( 'x-wp-total' ),
            allHeaders: response.headers,
            json,
        };
        return result;

    } catch ( error ) {
        console.log( ' Error fetching form: ' + error );
        throw error;
    }
};
export default getForm;