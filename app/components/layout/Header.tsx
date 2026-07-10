/*
 * HEADER
 *
 */
import React from 'react';
import { CTASettings } from '@/utils/types/CTASettings';
import CTA from '@/components/shared/CTA';
import Logo from '@/components/shared/Logo';
import Menu from '@/components/shared/Menu';
import SearchForm from '@/components/layout/SearchForm';
import '@/styles/components/sites-menu.scss';
import '@/styles/components/header.scss';

const Header: React.FC = () => {

    return (
        <>
            <a href="#content" tabIndex={ 1 } className="screenReader">Skip to main content</a>            
            <header id="header">
                <Menu name="main-nav" />
                <nav id="mainNav" className="container">
                    <Logo id="logo" />
                    <Menu name="main-nav" />
                    { /* Mobile Open */ }
                    <button id="navToggle">
                        <span>Menu</span>
                    </button>
                </nav>
            </header>
        </>
    );
};
export default Header;