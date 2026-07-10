import { APIEndpoint } from '@/globalVariables';
import { APIResult } from '../types/APIResult';

const getOption: ( optionName: string ) => Promise<APIResult> = async ( optionName = '' ): Promise<APIResult> => {
    try {
        const optionEndpoint: string = `${APIEndpoint}/get-option?name=${optionName}`;
        
        if ( window.devoEnv !== 'prod' ) {
            console.log( 'getOption ' + optionEndpoint );
        }
        
        const response: Response = await fetch( optionEndpoint );
        const json: Record<string, any> = await response.json();
        const result: APIResult = {
            totalPages: response.headers.get( 'x-wp-totalpages' ),
            totalPosts: response.headers.get( 'x-wp-total' ),
            allHeaders: response.headers,
            json,
        };

        return result;
    } catch ( error ) {
        console.log( 'Error fetching option: ' + error );
        throw error;
    }
};
export default getOption;