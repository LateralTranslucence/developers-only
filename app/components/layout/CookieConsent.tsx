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
 * Copy comes from the devo_cookie_consent_text filter, with a neutral fallback
 * that links the privacy policy page set under Settings > Privacy, if any.
 *
 * Visitors can change their choice later. The banner reopens on a click on any
 * link ending in #cookie-consent (a custom menu link, say) or any element with
 * a data-cookie-consent-open attribute, or when the devo:cookie-consent-open
 * event is dispatched on document. A new choice fires devo:cookie-consent
 * again; a script already started on "accepted" has to stop itself (or the
 * page be reloaded) when it sees "declined".
 */
import React, { JSX, useEffect, useRef, useState } from 'react';
import { parse } from '@/utils/helpers';
import { privacyPolicyURL } from '@/globalVariables';
import '@/styles/components/cookie-consent.scss';

const CONSENT_COOKIE = 'devo_cookie_consent';
const CONSENT_EVENT = 'devo:cookie-consent';
const OPEN_EVENT = 'devo:cookie-consent-open';
const OPEN_SELECTOR = '[data-cookie-consent-open], a[href$="#cookie-consent"]';
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

type Consent = 'accepted' | 'declined';

const Boilerplate: React.FC = () => (
    <p>
        We use cookies to improve your experience.
        { privacyPolicyURL ? <> Learn more in our <a href={ privacyPolicyURL }>Privacy Policy</a>.</> : null }
    </p>
);

const getConsent = (): string => {
    const match = document.cookie.match( new RegExp( '(?:^|; )' + CONSENT_COOKIE + '=([^;]*)' ) );
    return match ? match[1] : '';
};

const setConsent = ( value: Consent ): void => {
    // Secure on HTTPS, so the choice is never sent over plain HTTP. Not on
    // HTTP, where a Secure cookie can't be set at all (local development).
    const secure: string = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${ CONSENT_COOKIE }=${ value }; max-age=${ CONSENT_MAX_AGE }; path=/; SameSite=Lax${ secure }`;
};

const CookieConsent: React.FC = (): JSX.Element | null => {
    const [ open, setOpen ] = useState<boolean>( () => ! getConsent() );
    const acceptRef = useRef<HTMLButtonElement | null>( null );
    // Set when the visitor reopens the banner, so focus moves to it once it
    // has rendered
    const focusOnOpen = useRef<boolean>( false );

    useEffect( () => {
        const reopen = (): void => {
            if ( acceptRef.current ) {
                acceptRef.current.focus();
            } else {
                focusOnOpen.current = true;
                setOpen( true );
            }
        };
        // Capture phase, so the click is handled (and a router link's
        // navigation prevented) before anything else sees it
        const onClick = ( event: MouseEvent ): void => {
            if ( event.target instanceof Element && event.target.closest( OPEN_SELECTOR ) ) {
                event.preventDefault();
                reopen();
            }
        };
        document.addEventListener( 'click', onClick, true );
        document.addEventListener( OPEN_EVENT, reopen );
        return () => {
            document.removeEventListener( 'click', onClick, true );
            document.removeEventListener( OPEN_EVENT, reopen );
        };
    }, [] );

    useEffect( () => {
        if ( open && focusOnOpen.current ) {
            focusOnOpen.current = false;
            acceptRef.current?.focus();
        }
    }, [ open ] );

    if ( ! open ) {
        return null;
    }

    const choose = ( value: Consent ): void => {
        setConsent( value );
        setOpen( false );
        document.dispatchEvent( new CustomEvent( CONSENT_EVENT, { detail: { consent: value } } ) );
    };

    return (
        <aside className="cookie-consent" role="region" aria-label="Cookie consent">
            <div className="cookie-consent__copy">
                { window.devoCookieConsentText ? parse( window.devoCookieConsentText ) : <Boilerplate /> }
            </div>
            <p className="cookie-consent__actions">
                <button type="button" className="solid-button cookie-consent__accept" ref={ acceptRef } onClick={ () => choose( 'accepted' ) }>
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
