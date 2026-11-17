import { create } from 'zustand';
import { APIEndpoint } from '@/globalVariables';
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
    menus: {},
    mobileMenuOpen: false,
    pendingRequest: null,
    // A new object every time: Zustand only notifies subscribers when the
    // selected value's identity changes
    setMenus: ( menus ) => set( ( state ) => ( { menus: { ...state.menus, ...menus } } ) ),
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
                return get().menus;
            } )
            .finally( () => {
                set( { pendingRequest: null } );
            } );

        set( { pendingRequest: request } );
        return request;
    },
} ) );
