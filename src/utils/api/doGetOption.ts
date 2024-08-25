import { WPAPIEndpoint } from 'src/globalVariables';
import { APIResult } from '../types/APIResult';

const doGetOption: ( optionName: string ) => Promise<APIResult> = async ( optionName = '' ): Promise<APIResult> => {
    try {
        const optionEndpoint: string = `${WPAPIEndpoint}/get-option?name=${optionName}`;
        
        if ( doEnv !== 'prod' ) {
            console.log( 'doGetOption ' + optionEndpoint );
        }
        
        const response: Response = await fetch( optionEndpoint );
        const json: Record<string, any> = await response.json();
        const result: APIResult = {
            totalPages: response.headers.get( 'x-wp-totalpages' ),
            totalPosts: response.headers.get( 'x-wp-total' ),
            allHeaders: response.headers,
            json,
        }

        return result;
    } catch ( error ) {
        console.log( 'Error fetching option: ' + error );
        throw error;
    }
}
export default doGetOption;