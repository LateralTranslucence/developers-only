import { create } from 'zustand';
import { APIEndpoint, devoMenus } from '@/globalVariables';
import { Menus } from '@/utils/types/Menu';

interface MenusStore {
    fetchMenus: () => Promise<Menus>;
    menus: Menus;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: ( open: boolean ) => void;
    pendingRequest: Promise<Menus> | null;
    setMenus: ( menus: Menus ) => void;
}

export const useMenus = create<MenusStore>( ( set, get ) => ( {
    menus: devoMenus,
    mobileMenuOpen: false,
    pendingRequest: null,
    setMenus: ( menus ) => {
        Object.assign( devoMenus, menus );
        set( { menus: devoMenus } );
    },
    setMobileMenuOpen: ( open ) => set( { mobileMenuOpen: open } ),
    fetchMenus: async () => {
        const { menus, pendingRequest, setMenus } = get();

        if ( Object.keys( menus ).length > 0 ) {
            return menus;
        }

        if ( pendingRequest ) {
            return pendingRequest;
        }

        const request = fetch( `${APIEndpoint}/menu/` )
            .then( async ( response ) => {
                if ( ! response.ok ) {
                    throw new Error( `HTTP error! Status: ${response.status}` );
                }

                const data = await response.json() as Menus;
                setMenus( data );
                return devoMenus;
            } )
            .finally( () => {
                set( { pendingRequest: null } );
            } );

        set( { pendingRequest: request } );
        return request;
    },
} ) );