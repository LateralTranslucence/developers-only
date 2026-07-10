/*
 * FOOTER
 */
import React from 'react';
import Menu from '@/components/shared/Menu';
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
                <p className="footer__year">© { footerYear } { '{DevelopersOnly}' }</p>
            </div>
            { /* TODO: Cookie Consent */ }
        </footer>
    );
};
export default Footer;