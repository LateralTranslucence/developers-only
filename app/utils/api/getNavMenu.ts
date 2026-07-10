import { useMenus } from '@/utils/stores/Menus';
import { Menus } from '@/utils/types/Menu';

const getNavMenu: () => Promise<Menus> = async (): Promise<Menus> => {
    const fetchMenus = useMenus((m) => m.fetchMenus);
    try {
        return await fetchMenus();
    } catch ( error ) {
        console.log( 'Error fetching nav menus: ' + error );
        throw error;
    }
};
export default getNavMenu;
