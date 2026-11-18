import { create } from 'zustand';
import { APIEndpoint } from '@/globalVariables';
import { Menus } from '@/utils/types/Menu';

interface MenusStore {
    fetchMenus: () => Promise<Menus>;
    menus: Menus;
    // The response has arrived, even if it held no menus
    menusLoaded: boolean;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: ( open: boolean ) => void;
    pendingRequest: Promise<Menus> | null;
    setMenus: ( menus: Menus ) => void;
}

export const useMenus = create<MenusStore>( ( set, get ) => ( {
    menus: {},
    menusLoaded: false,
    mobileMenuOpen: false,
    pendingRequest: null,
    // A new object every time: Zustand only notifies subscribers when the
    // selected value's identity changes
    setMenus: ( menus ) => set( ( state ) => ( { menus: { ...state.menus, ...menus } } ) ),
    setMobileMenuOpen: ( open ) => set( { mobileMenuOpen: open } ),
    fetchMenus: async () => {
        const { menus, menusLoaded, pendingRequest, setMenus } = get();

        // A site with no menus assigned gets an empty result; checking for
        // one or more menus instead re-requested /menu/ on every navigation
        if ( menusLoaded ) {
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
                set( { menusLoaded: true } );
                return get().menus;
            } )
            .finally( () => {
                set( { pendingRequest: null } );
            } );

        set( { pendingRequest: request } );
        return request;
    },
} ) );
