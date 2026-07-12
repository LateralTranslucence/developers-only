import { APIEndpoint } from '@/globalVariables';
import { APIResult } from '../types/APIResult';
import { Form } from '@/utils/types/Form';

 const submitForm: ( queryString: string ) => Promise<APIResult> = async ( queryString = '' ): Promise<APIResult> => {
    try {
        const formSubmitEndpoint: string = `${APIEndpoint}/devo-form-submit/`;
        if ( window.devoEnv !== 'prod' ) {
            console.log( 'submitForm ' + formSubmitEndpoint );
        }

        const response = await fetch( formSubmitEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: queryString,
        } );
        const json: Form = await response.json();
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
