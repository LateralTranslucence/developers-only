/*
 * FOOTER
 */
import React from 'react';
import FooterCTA from 'src/components/layout/FooterCTA';
import Logo from 'src/components/shared/Logo';
import Menu from 'src/components/shared/Menu';
import 'assets/styles/components/feedback.scss';
import 'assets/styles/components/footer.scss';

// Year
const footerDate: Date = new Date();
const footerYear: number = footerDate.getFullYear();

const Footer: React.FC = () => {
    return(
        <footer id="do-footer">
            <div className="container">
                <section id="do-footer-top">
                    <Menu name="footer-nav" />
                    <Logo id="do-footer-logo" />
                    <FooterCTA />
                </section>
                <section id="do-footer-bottom">
                    <Menu name="social-nav" />
                    <Menu name="legal-nav" />
                </section>
                <p className="footer-year">© { footerYear } { '{DevelopersOnly}' }</p>
            </div>
            { /* TODO: Cookie Consent */ }
        </footer>
    );
};
export default Footer;