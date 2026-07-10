import React from 'react';
import { useEffect } from 'react';
import CTA from '@/components/shared/CTA';
import Icon from '@/components/shared/Icon';
import { useMenus } from '@/utils/stores/Menus';
import { MenuItem, MenuNode } from '@/utils/types/Menu';
import { sanitizeTitleWithDashes } from '@/utils/helpers';

interface MenuProps {
    name: string;
}

const buildMenuTree = ( items: Array<MenuItem> ): Array<MenuNode> => {
    const nodeMap = new Map<number, MenuNode>();
    const roots: Array<MenuNode> = [];

    items.forEach( ( item ) => {
        nodeMap.set( item.ID, {
            ...item,
            children: [],
        } );
    } );

    nodeMap.forEach( ( node ) => {
        const parentId = Number( node.menu_item_parent );
        if ( parentId > 0 ) {
            const parent = nodeMap.get( parentId );
            if ( parent ) {
                parent.children.push( node );
                return;
            }
        }
        roots.push( node );
    } );

    return roots;
};

const renderMenuItem = ( item: MenuNode, depth: number = 1 ): React.ReactElement => {
    const title = item.post_title || item.title;
    const hasChildren = item.children.length > 0;
    const classes = item.classes?.length ? [ ...item.classes ] : [];
    classes.push( sanitizeTitleWithDashes( title ) );

    if ( hasChildren ) {
        classes.push( 'hasChildren' );
    }

    return (
        <li key={ item.ID } className={ classes.join( ' ' ) }>
            { item.url === '#' ?
                <span>{ title }</span>
            : item.fields?._menu_icon ?
                <CTA url={ item.url } text={ title } target={ item.target }>
                    <Icon name={ item.fields._menu_icon } />
                    <span>{ title }</span>
                </CTA>
            : <CTA url={ item.url } text={ title } target={ item.target } /> }
            { hasChildren ?
                <>
                    { depth === 1 ? <button className="dropdownToggle"><span className="screenReader">Open/Close</span></button> : null }
                    <menu className="subMenu">
                        { item.children.map( ( child ) => renderMenuItem( child, depth + 1 ) ) }
                    </menu>
                </>
            : null }
        </li>
    );
};

const Menu: React.FC<MenuProps> = ( { name } ) => {
    const navMenus = useMenus((m) => m.menus);
    const fetchMenus = useMenus((m) => m.fetchMenus);
    const setMobileMenuOpen = useMenus((m) => m.setMobileMenuOpen);

    useEffect( () => {
        if ( Array.isArray( navMenus[ name ] ) && navMenus[ name ].length > 0 ) {
            return;
        }

        fetchMenus();
    }, [ name, navMenus ] );
    
    const navMenu: Array<MenuItem> = Array.isArray( navMenus[ name ] ) ? navMenus[ name ] : [];

    if ( navMenu.length === 0 ) {
        return null;
    }

    if ( name === 'social-nav' ) {
        return (
            <menu id="socialNavigation" className="menu">
                { navMenu.map( ( item: MenuItem, index: number ) => {
                    const icon = item.fields?._menu_icon?.length ? item.fields._menu_icon : '';
                    const target = item.target?.length ? item.target : '';
                    const attributeIcon = icon.length ? `fa fa-${ icon }` : '';

                    return (
                        <li key={ index }>
                            <CTA
                                url={ item.url }
                                target={ target }
                                classes={ [ attributeIcon ] }
                                text={ item.title }>
                                <span>{ item.title }</span>
                            </CTA>
                        </li>
                    );
                } ) }
            </menu>
        );
    }

    const tree = buildMenuTree( navMenu );

    return (
        <menu className="menu">
            <button 
                id="mainNavClose"
                onClick={() => setMobileMenuOpen(false)}
            >
                <span>Close Menu</span>
            </button>
            { tree.map( ( item ) => renderMenuItem( item ) ) }
        </menu>
    );
};

export default Menu;
