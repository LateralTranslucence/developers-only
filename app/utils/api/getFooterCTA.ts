import { APIEndpoint } from '@/globalVariables';
import { APIResult } from '@/utils/types/APIResult';

const getFooterCTA: () => Promise<APIResult> = async (): Promise<APIResult> => {
    try {
        const footerCTAEndpoint: string = `${APIEndpoint}/footer-cta/`;

        if ( window.devoEnv !== 'prod' ) {
            console.log( 'getFooterCTA ' + footerCTAEndpoint );
        }

        const response: Response = await fetch( footerCTAEndpoint );
        const json: Record<string, any> = await response.json();
        const result: APIResult = {
            totalPages: response.headers.get( 'x-wp-totalpages' ),
            totalPosts: response.headers.get( 'x-wp-total' ),
            allHeaders: response.headers,
            json,
        };

        return result;

    } catch ( error ) {
        console.error( 'Error fetching footer CTA: ', error );
        throw error;
    }
};
export default getFooterCTA;
