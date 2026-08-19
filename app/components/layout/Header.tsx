/*
 * HEADER
 *
 */
import React from 'react';
import Logo from '@/components/shared/Logo';
import Menu from '@/components/shared/Menu';
import '@/styles/components/header.scss';

const Header: React.FC = () => {

    return (
        <>
            <a href="#content" tabIndex={ 1 } className="screenReader">Skip to main content</a>            
            <header id="header">
                <nav id="mainNav" className="container">
                    <Logo id="logo" />
                    <Menu name="main-nav" />
                    { /* Mobile Open */ }
                    <button id="navToggle">
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