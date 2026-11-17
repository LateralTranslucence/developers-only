/*
 * HEADER
 *
 */
import React, { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '@/components/shared/Logo';
import Menu from '@/components/shared/Menu';
import { useMenus } from '@/utils/stores/Menus';
import '@/styles/components/header.scss';

const MENU_ID = 'mainNavMenu';

const Header: React.FC = () => {
    const mobileMenuOpen = useMenus( ( m ) => m.mobileMenuOpen );
    const setMobileMenuOpen = useMenus( ( m ) => m.setMobileMenuOpen );
    const { pathname } = useLocation();
    const navRef = useRef<HTMLElement>( null );
    const toggleRef = useRef<HTMLButtonElement>( null );

    const closeMenu = useCallback( ( returnFocus: boolean ): void => {
        setMobileMenuOpen( false );
        if ( returnFocus ) {
            toggleRef.current?.focus();
        }
    }, [ setMobileMenuOpen ] );

    // A followed link closes the panel
    useEffect( () => {
        setMobileMenuOpen( false );
    }, [ pathname, setMobileMenuOpen ] );

    useEffect( () => {
        if ( ! mobileMenuOpen ) {
            return;
        }
        // Move focus into the panel: it covers the toggle that opened it
        document.getElementById( 'navClose' )?.focus();

        const onKeyDown = ( event: KeyboardEvent ): void => {
            if ( event.key === 'Escape' ) {
                closeMenu( true );
            }
        };
        // A tap outside the panel closes it
        const onPointerDown = ( event: PointerEvent ): void => {
            if ( ! navRef.current?.contains( event.target as Node ) ) {
                closeMenu( false );
            }
        };
        // Widening the window past the breakpoint hides the toggle (the
        // breakpoint belongs to the stylesheet), so close the panel with it
        const onResize = (): void => {
            if ( toggleRef.current && getComputedStyle( toggleRef.current ).display === 'none' ) {
                closeMenu( false );
            }
        };
        document.addEventListener( 'keydown', onKeyDown );
        document.addEventListener( 'pointerdown', onPointerDown );
        window.addEventListener( 'resize', onResize );
        return () => {
            document.removeEventListener( 'keydown', onKeyDown );
            document.removeEventListener( 'pointerdown', onPointerDown );
            window.removeEventListener( 'resize', onResize );
        };
    }, [ closeMenu, mobileMenuOpen ] );

    // Tabbing out of the panel closes it, rather than leaving it open over
    // the content that now has focus
    const onBlur = ( event: React.FocusEvent<HTMLElement> ): void => {
        if ( mobileMenuOpen && event.relatedTarget && ! navRef.current?.contains( event.relatedTarget as Node ) ) {
            closeMenu( false );
        }
    };

    return (
        <>
            <a href="#content" className="screenReader">Skip to main content</a>
            <header id="header">
                <nav id="mainNav" className={ 'container' + ( mobileMenuOpen ? ' mobileOpen' : '' ) } aria-label="Main" ref={ navRef } onBlur={ onBlur }>
                    <Logo id="logo" />
                    <Menu name="main-nav" id={ MENU_ID } onClose={ () => closeMenu( true ) } />
                    { /* Mobile Open */ }
                    <button
                        aria-controls={ MENU_ID }
                        aria-expanded={ mobileMenuOpen }
                        id="navToggle"
                        onClick={ () => setMobileMenuOpen( ! mobileMenuOpen ) }
                        ref={ toggleRef }
                        type="button">
                        { /* The glyph is drawn by CSS, so this label is the
                             button's only accessible name - hide it visually
                             rather than with display:none, which would drop it
                             from the accessibility tree. */ }
                        <span className="screenReader">Menu</span>
                    </button>
                </nav>
            </header>
        </>
    );
};
export default Header;
