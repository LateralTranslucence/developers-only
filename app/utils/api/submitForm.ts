import { APIEndpoint } from '@/globalVariables';
import { APIResult } from '../types/APIResult';

 const submitForm: ( queryString: string ) => Promise<APIResult> = async ( queryString = '' ): Promise<APIResult> => {
    try {
        const formSubmitEndpoint: string = `${APIEndpoint}/form-submit?${queryString}`;
        if ( window.devoEnv !== 'prod' ) {
            console.log( 'submitForm ' + formSubmitEndpoint );
        }

        const response = await fetch( formSubmitEndpoint );
        const json: Record<string, any> = await response.json();
        const result: APIResult = {
            totalPages: response.headers.get( 'x-wp-totalpages' ),
            totalPosts: response.headers.get( 'x-wp-total' ),
            allHeaders: response.headers,
            json,
        };

        return result;

    } catch ( error ) {
        console.log( 'Error fetching form submit: ' + error );
        throw error;
    }
 };
export default submitForm;