/*
 * Cookie consent banner.
 * - Copy comes from Site Settings > Misc > Cookie Consent Text, with boilerplate fallback.
 * - The choice is stored in a cookie (not localStorage) so header.php can gate
 *   Google Tag Manager server-side on subsequent page loads.
 * - Accepting injects GTM immediately (prod only) without a reload.
 */
import React, { JSX, useState } from 'react';
import { parse } from '@/utils/helpers';
import '@/styles/components/cookie-consent.scss';

const CONSENT_COOKIE = 'devo_cookie_consent';
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

const BOILERPLATE = '<p>We use cookies to analyze site traffic and improve your experience. '
    + 'By clicking &ldquo;Accept&rdquo;, you consent to the use of analytics cookies. '
    + 'Learn more in our <a href="/legal/">Privacy Policy</a>.</p>';

const getConsent = (): string => {
    const match = document.cookie.match( new RegExp( '(?:^|; )' + CONSENT_COOKIE + '=([^;]*)' ) );
    return match ? match[1] : '';
};

const setConsent = ( value: 'accepted' | 'declined' ): void => {
    document.cookie = `${ CONSENT_COOKIE }=${ value }; max-age=${ CONSENT_MAX_AGE }; path=/; SameSite=Lax`;
};

// Same bootstrap as the (consent-gated) GTM snippet in header.php
const loadGTM = (): void => {
    if ( window.devoEnv !== 'prod' || ! window.devoGTM ) {
        return;
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push( { 'gtm.start': Date.now(), event: 'gtm.js' } );
    const script = document.createElement( 'script' );
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=' + window.devoGTM;
    document.head.appendChild( script );
};

const CookieConsent: React.FC = (): JSX.Element | null => {
    const [ consent, setConsentState ] = useState<string>( () => getConsent() );

    if ( consent ) {
        return null;
    }

    const choose = ( value: 'accepted' | 'declined' ): void => {
        setConsent( value );
        setConsentState( value );
        if ( value === 'accepted' ) {
            loadGTM();
        }
    };

    return (
        <aside className="cookie-consent" role="region" aria-label="Cookie consent">
            <div className="cookie-consent__copy">
                { parse( window.devoCookieConsentText || BOILERPLATE ) }
            </div>
            <p className="cookie-consent__actions">
                <button type="button" className="solid-button cookie-consent__accept" onClick={ () => choose( 'accepted' ) }>
                    <span>Accept</span>
                </button>
                <button type="button" className="text-button cookie-consent__decline" onClick={ () => choose( 'declined' ) }>
                    <span>Decline</span>
                </button>
            </p>
        </aside>
    );
};
export default CookieConsent;
