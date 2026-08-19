/*
 * Cookie consent banner.
 *
 * The theme ships no analytics of its own, so this only records the visitor's
 * choice and announces it. Two ways to act on it from the extensions layer:
 *
 *   PHP     check $_COOKIE['devo_cookie_consent'] === 'accepted' on wp_head
 *   Client  document.addEventListener( 'devo:cookie-consent', e => {
 *               if ( e.detail.consent === 'accepted' ) { ... }
 *           } )
 *
 * The event fires the moment the visitor chooses, so a script can start without
 * waiting for the next page load. The choice is stored in a cookie rather than
 * localStorage precisely so PHP can read it on subsequent requests.
 *
 * Copy comes from the devo_cookie_consent_text filter, with a neutral fallback.
 */
import React, { JSX, useState } from 'react';
import { parse } from '@/utils/helpers';
import '@/styles/components/cookie-consent.scss';

const CONSENT_COOKIE = 'devo_cookie_consent';
const CONSENT_EVENT = 'devo:cookie-consent';
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

type Consent = 'accepted' | 'declined';

const BOILERPLATE = '<p>We use cookies to improve your experience. '
    + 'Learn more in our <a href="/legal/">Privacy Policy</a>.</p>';

const getConsent = (): string => {
    const match = document.cookie.match( new RegExp( '(?:^|; )' + CONSENT_COOKIE + '=([^;]*)' ) );
    return match ? match[1] : '';
};

const setConsent = ( value: Consent ): void => {
    document.cookie = `${ CONSENT_COOKIE }=${ value }; max-age=${ CONSENT_MAX_AGE }; path=/; SameSite=Lax`;
};

const CookieConsent: React.FC = (): JSX.Element | null => {
    const [ consent, setConsentState ] = useState<string>( () => getConsent() );

    if ( consent ) {
        return null;
    }

    const choose = ( value: Consent ): void => {
        setConsent( value );
        setConsentState( value );
        document.dispatchEvent( new CustomEvent( CONSENT_EVENT, { detail: { consent: value } } ) );
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
