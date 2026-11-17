import React from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import CTA from '@/components/shared/CTA';
import Icon from '@/components/shared/Icon';
import { useMenus } from '@/utils/stores/Menus';
import { MenuItem, MenuNode } from '@/utils/types/Menu';
import { sanitizeTitleWithDashes } from '@/utils/helpers';

interface MenuProps {
    // Gives the <menu> an id, e.g. for a toggle's aria-controls
    id?: string;
    name: string;
    // Adds a close button as the menu's first item (the off-canvas panel)
    onClose?: () => void;
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

/*
 * One menu item. An item with children gets a disclosure button that opens
 * its submenu (aria-expanded), so submenus work by keyboard and touch as well
 * as on hover. Escape, or focus or a tap moving elsewhere, closes it.
 */
const MenuEntry: React.FC<{ item: MenuNode }> = ( { item } ) => {
    const [ open, setOpen ] = useState<boolean>( false );
    const itemRef = useRef<HTMLLIElement>( null );
    const buttonRef = useRef<HTMLButtonElement>( null );
    const subMenuId: string = useId();
    const title = item.post_title || item.title;
    const hasChildren = item.children.length > 0;
    const classes = item.classes?.length ? [ ...item.classes ] : [];
    classes.push( sanitizeTitleWithDashes( title ) );

    if ( hasChildren ) {
        classes.push( 'hasChildren' );
    }
    if ( open ) {
        classes.push( 'open' );
    }

    // A tap or click anywhere else closes the submenu
    useEffect( () => {
        if ( ! open ) {
            return;
        }
        const onPointerDown = ( event: PointerEvent ): void => {
            if ( ! itemRef.current?.contains( event.target as Node ) ) {
                setOpen( false );
            }
        };
        document.addEventListener( 'pointerdown', onPointerDown );
        return () => document.removeEventListener( 'pointerdown', onPointerDown );
    }, [ open ] );

    const onKeyDown = ( event: React.KeyboardEvent<HTMLLIElement> ): void => {
        if ( event.key === 'Escape' && open ) {
            // Handled here, so an enclosing panel doesn't close as well
            event.stopPropagation();
            setOpen( false );
            buttonRef.current?.focus();
        }
    };

    const onBlur = ( event: React.FocusEvent<HTMLLIElement> ): void => {
        if ( open && ! itemRef.current?.contains( event.relatedTarget as Node | null ) ) {
            setOpen( false );
        }
    };

    return (
        <li className={ classes.join( ' ' ) } ref={ itemRef } onKeyDown={ hasChildren ? onKeyDown : undefined } onBlur={ hasChildren ? onBlur : undefined }>
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
                    <button
                        aria-controls={ subMenuId }
                        aria-expanded={ open }
                        className="dropdownToggle"
                        onClick={ () => setOpen( ! open ) }
                        ref={ buttonRef }
                        type="button">
                        <span className="screenReader">{ title } submenu</span>
                    </button>
                    <menu className="subMenu" id={ subMenuId }>
                        { item.children.map( ( child ) => <MenuEntry key={ child.ID } item={ child } /> ) }
                    </menu>
                </>
            : null }
        </li>
    );
};

const Menu: React.FC<MenuProps> = ( { id, name, onClose } ) => {
    const navMenus = useMenus( ( m ) => m.menus );
    const fetchMenus = useMenus( ( m ) => m.fetchMenus );

    useEffect( () => {
        if ( Array.isArray( navMenus[ name ] ) && navMenus[ name ].length > 0 ) {
            return;
        }

        fetchMenus().catch( ( error: unknown ) => console.error( 'Error fetching menus:', error ) );
    }, [ name, navMenus, fetchMenus ] );

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
        <menu className="menu" id={ id }>
            { onClose ?
                // A <menu>'s children must be <li>; role="none" keeps the
                // button out of the item count
                <li className="menu__close" role="none">
                    <button id="navClose" onClick={ onClose } type="button">
                        <span className="screenReader">Close menu</span>
                    </button>
                </li>
            : null }
            { tree.map( ( item ) => <MenuEntry key={ item.ID } item={ item } /> ) }
        </menu>
    );
};

export default Menu;
