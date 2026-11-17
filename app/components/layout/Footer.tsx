/*
 * FOOTER
 */
import React from 'react';
import CookieConsent from '@/components/layout/CookieConsent';
import Menu from '@/components/shared/Menu';
import { siteName } from '@/globalVariables';
import '@/styles/components/footer.scss';

// Year
const footerDate: Date = new Date();
const footerYear: number = footerDate.getFullYear();

const Footer: React.FC = () => {
    return(
        <footer id="footer">
            <div className="container">
                <Menu name="social-nav" />
                <Menu name="legal-nav" />
                <p className="footer__year">© { footerYear }{ siteName ? ' ' + siteName : '' }</p>
            </div>
            <CookieConsent />
        </footer>
    );
};
export default Footer;