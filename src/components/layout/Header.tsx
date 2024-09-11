/*
 * HEADER
 *
 */
import React from 'react';
import { CTASettings } from 'src/utils/types/CTASettings';
import CTA from 'src/components/shared/CTA';
import HeaderPromo from 'src/components/layout/HeaderPromo';
import Logo from 'src/components/shared/Logo';
import Menu from 'src/components/shared/Menu';
import SearchForm from 'src/components/layout/SearchForm';
import 'assets/styles/components/sites-menu.scss';
import 'assets/styles/components/header.scss';

const Header: React.FC = () => {
    // CTA settings
    const ctaSettings: CTASettings = {
        url: 'contact',
        text: 'Request a Demo',
        modal: true,
        classes: [ 'solid-button', 'header-cta' ],
    };

    return (
        <>
            <a href="#content" tabIndex={ 1 } className="screen-reader-text">Skip to main content</a>
            { /* Google Tag Manager (noscript) */ }
            
            <aside id="do-header-promo">
                <div className="container">
                    <HeaderPromo />
                    <Menu name="social-nav" />
                </div>
            </aside>
            <header id="do-header">
                <nav id="do-navbar-main" className="container">
                    <Logo id="do-navbar-logo" />
                    <div id="do-navbar-menu">
                        <Menu name="main-nav" />
                        <div id="do-navbar-utilities" /* className="search-toggle" */>
                            <div className="utilities-wrapper site-search">
                                { /* Site Search */ } 
                                <SearchForm />
                            </div>
                            <div className="utilities-wrapper cta">
                                { /* CTA */ } 
                                <CTA { ...ctaSettings } />
                            </div>
                        </div>
                    </div>
                    { /* Mobile Open */ }
                    <button id="do-navbar-toggle">
                        <span>Menu</span>
                    </button>
                </nav>
            </header>
        </>
    );
}
export default Header;