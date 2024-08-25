import { WPAPIEndpoint } from 'src/globalVariables';
import { APIResult } from 'src/utils/types/APIResult';

 const doGetFooterCTA: () => Promise<APIResult> = async (): Promise<APIResult> => {
    try {
        const footerCTAEndpoint: string = `${WPAPIEndpoint}/footer-cta/`;
        
        if ( doEnv !== 'prod' ) {
            console.log( 'doGetFooterCTA ' + footerCTAEndpoint );
        }
        
        const response: Response = await fetch( footerCTAEndpoint );
        const json: Record<string, any> = await response.json();
        const result: APIResult = {
            totalPages: response.headers.get( 'x-wp-totalpages' ),
            totalPosts: response.headers.get( 'x-wp-total' ),
            allHeaders: response.headers,
            json,
        }
        
        return result;

    } catch ( error ) {
        console.error( 'Error fetching footer CTA: ', error );
        throw error;
    }
}
export default doGetFooterCTA;