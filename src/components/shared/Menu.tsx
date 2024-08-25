import React from 'react';
const { useEffect, useState } = wp.element;
import { getNavMenu } from 'src/utils/api';
import { doLength, doParse } from 'src/utils/helpers';
import { DoMobileMenu, DoSelectList } from 'src/utils/display';
import CTA from 'src/components/shared/CTA';
import 'assets/styles/components/social-menu.scss';
import 'assets/styles/components/select-list.scss';
import 'assets/styles/components/sites-menu.scss';

interface MenuProps {
    name: string;
}
const Menu: React.FC<MenuProps> = ( { name } ) => {
    const [ navMenus, setNavMenus ] = useState<Record<string, any>>( {} );
    useEffect( () => {
        async function fetchData() {
            await getNavMenu().then( ( data: any ) => {
                setNavMenus( data.json );
            } );
        }
        fetchData();
        if ( name === 'main-nav' ) {
            new DoMobileMenu();
        }
    }, [] );
    const navMenu: Array<Record<string, any>> = navMenus[ name ] ? navMenus[ name ] : {};
    
    if ( doLength( navMenu ) ) {
        const BasicMenu: React.FC<MenuProps> = ( { name } ) => {
            const itemDepths: any = {};
            let previousItem: boolean = false;
            const haveChildren: any = {};
            // First loop - gather information about depth and children
            navMenu.forEach( ( item: any, index: number ) => {
                //console.log(item);
                const itemParent: number = Number( item.menu_item_parent );
                let currentDepth: number = 0;
                // Figure out the depth
                // If this is a top-level item, the depth is 1
                if ( itemParent === 0 ) {
                    currentDepth = 1;
                }
                // Otherwise the depth is parent +1
                else {
                    currentDepth = itemDepths[ itemParent ] + 1;
                }
                // Add the depth to the array, for the next item to use
                itemDepths[ item.ID ] = currentDepth;
                // Add to the item object
                item.depth = currentDepth;
                item.children = {};
                item.previousItem = previousItem;
                // Put things in buckets
                if ( itemParent > 0 ) {
                    let children = haveChildren[ itemParent ] ||= [];
                    children.push( {
                        id: item.ID,
                        title: item.title,
                    } );
                }
                // Reset previousItem
                previousItem = item.ID;
            } );

            // Second loop - build output
            //const classes = [ 'menu-' + name + '-container' ];
            const id = 'menu-' + name;
            //let output = '<div className="' + classes.join( ' ' ) + '">';
            let output = '<menu id="' + id + '" className="menu">';
            navMenu.forEach( ( item: any, index: number ) => {
                let previousItem = item.previousItem;
                const currentDepth = itemDepths[ item.ID ];
                const previousDepth = ! previousItem ? 0 : itemDepths[ previousItem ];        
                // Item details
                const id = item.ID;
                const title = item.post_title;
                const url = item.url;
                const target = item.target;
                const hasChildren = haveChildren[ id ] !== undefined;
                const megaMenu = Boolean( item.fields._menu_mega_menu );
                const classes = item.classes.length ? item.classes : [];
                classes.push( 'menu-item' );
                if ( hasChildren ) {
                    classes.push( 'menu-item-has-children' );
                }
                if ( megaMenu ) {
                    classes.push( 'mega-menu' );
                }
                switch ( currentDepth ) {
                    case 1:
                    case 2:
                        // If we're at a lower depth than the previous item, close some things
                        if ( currentDepth < previousDepth ) {
                            output += '</li>';
                            output += '</menu>';
                        }
                        // If we're at a much lower depth than the previous item, close more things
                        if ( previousDepth - currentDepth == 2 ) {
                            output += '</li>';
                            output += '</menu>';
                            output += '</li>';
                        }
                        // If we're at the same depth, close the previous li
                        else if ( currentDepth === previousDepth ) {
                            output += '</li>';
                        }
                        if ( currentDepth === 2 && currentDepth <  previousDepth ) {
                            output += '</li>';
                        }
                        // The li
                        output += '<li id="menu-item-' + id + '" className="' + classes.join( ' ' ) + ( title === '#' && url === '#' ? ' aside' : '' ) + '">';
                        // No link
                        if ( url === '#' ) {
                            output += '<span>' + title + '</span>';
                        }
                        // Link
                        else {
                            output += '<CTA url="' + url + '" text="' + title + '" target="' + target + '" />';
                        }
                        // If there are children, add dropdown button, leave li open, and open menu
                        if ( hasChildren ) {
                            if ( currentDepth === 1 ) {
                                output += '<button className="do-navbar-dropdown"><span className="screen-reader-text">Open/Close</span></button>';
                            }
                            output += '<menu className="sub-menu">';
                        }
                        // If no children, close li
                        // else {
                        //     output += '</li>';
                        // }
                        break;
                    case 3:
                        // Maybe close the previous li
                        if ( currentDepth == previousDepth ) {
                            output += '</li>';
                        }
                        // The li
                        output += '<li id="menu-item-' + id + '" className="' + classes.join( ' ' ) + '">';
                        // No link
                        if ( url === '#' ) {
                            output += '<span>' + title + '</span>';
                        }
                        // Link
                        else {
                            output += '<CTA url="' + url + '" text="' + title + '" target="' + target + '" />';
                        }
                        break;
                }
                // Reset previousItem
                previousItem = item.ID;
            } );
            output += '</menu>';
            //output += '</div>';
            return <>{ doParse( output ) }</>;
        }

        const SocialMenu: React.FC<MenuProps> = ( { name } ) => {
            return (
                <menu id="menu-social-navigation" className="menu">
                    { navMenu.map( ( socialNavMenuItem: any, index: number ) => {
                        const item = socialNavMenuItem;
                        const id = item.ID;
                        const title = item.title;
                        const icon = item.fields._menu_icon.length ? item.fields._menu_icon : '';
                        const attributeTitle = item.attr_title.length ? item.attr_title : '';
                        const target = item.target.length ? item.target : '';
                        const attributeIcon = icon.length ? 'do-fa fa-' + icon + '' : '';
                        const href = item.url !== item.url.indexOf( '#' ) ? item.url : item.url;
                        
                        return (
                            <li key={ index } id={ `menu-item-${ id }` } className="menu-item menu-item-type-custom menu-item-object-custom">
                                <CTA
                                    url={ href }
                                    target={ target }
                                    classes={ [ attributeIcon ] }
                                    title={ attributeTitle } >
                                    <span>{ title }</span>
                                </CTA>
                            </li>
                        );
                        
                    } ) }
                </menu>
            );
        }

        const LocationsNav: React.FC<MenuProps> = ( { name } ) => {
            useEffect( () => {
                new DoSelectList();
            }, [] );
            return (
                <div className="site-list-wrapper">
                    <span className="select-list-toggle sites-label">Locations</span>
                    <menu id={ 'menu-' + name } className="select-list">
                        { navMenu.map( ( item: any, index: number ) => {
                            return (
                                <li key={ index }>
                                    <CTA url={ item.url }>
                                        { item.title }
                                    </CTA>
                                </li>
                            );
                        } ) }
                    </menu>
                </div>
            )
        }
        switch ( name ) {
            // Social menu?
            case 'social-nav':
                return <SocialMenu name={ name } />
            // Locations
            case 'locations-nav':
                return <LocationsNav name={ name } />
            // All other menus
            default:
                return <BasicMenu name={ name } />
        }
    } else {
        return null;
    }
}
export default Menu;