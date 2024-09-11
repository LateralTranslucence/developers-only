import { WPAPIEndpoint } from 'src/globalVariables';
import { APIResult } from 'src/utils/types/APIResult';
import { Post } from 'src/utils/types/Post';

const doGetForm: ( formID: number ) => Promise<APIResult> = async ( formID ): Promise<APIResult> => {
    try {
        const formEndpoint: string = WPAPIEndpoint + '/do-form/?formID=' + formID;
            
        if ( doEnv !== 'prod' ) {
            console.log( 'doGetForm ' + formEndpoint );
        }

        const response: Response = await fetch( formEndpoint );
        const json: Record<string, any> = await response.json();
        const result: APIResult = {
            totalPages: response.headers.get( 'x-wp-totalpages' ),
            totalPosts: response.headers.get( 'x-wp-total' ),
            allHeaders: response.headers,
            json,
        }
        
        return result;

    } catch ( error ) {
        console.log( ' Error fetching form: ' + error );
        throw error;
    }
}
export default doGetForm;