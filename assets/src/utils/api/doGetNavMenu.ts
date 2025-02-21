import { WPAPIEndpoint } from '@/globalVariables';
import { APIResult } from '@/utils/types/APIResult';

const doGetNavMenu: () => Promise<APIResult> = async (): Promise<APIResult> => {
    try {
        const menusAllEndpoint: string = `${WPAPIEndpoint}/menu/`;
        
        if ( doEnv !== 'prod' ) {
            console.log( 'doGetNavMenu ' + menusAllEndpoint );
        }

        const response: Response = await fetch( menusAllEndpoint );
        const json: Record<string, any> = response.json();
        const result: APIResult = {
            totalPages: response.headers.get( 'x-wp-totalpages' ),
            totalPosts: response.headers.get( 'x-wp-total' ),
            allHeaders: response.headers,
            json,
        }
        
        return result;
    } catch ( error ) {
        console.log( 'Error fetching nav menus: ' + error );
        throw error;
    }
}
export default doGetNavMenu;