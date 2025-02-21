import { WPAPIEndpoint } from '@/globalVariables';
import { APIResult } from '@/utils/types/APIResult';

const doGetHeadline: () => Promise<APIResult> = async (): Promise<APIResult> => {
    try {
        const promoEndpoint: string = `${WPAPIEndpoint}/promo/`;

        if ( doEnv !== 'prod' ) {
            console.log( 'doGetHeadline ' + promoEndpoint );
        }

        const response: Response = await fetch( promoEndpoint );
        const json: Record<string, any> = await response.json();
        const result: APIResult = {
            totalPages: response.headers.get( 'x-wp-totalpages' ),
            totalPosts: response.headers.get( 'x-wp-total' ),
            allHeaders: response.headers,
            json,
        }

        return result;

    } catch ( error ) {
        console.log( 'Error fetching headline: ' + error );
        throw error;
    }        
}
export default doGetHeadline;