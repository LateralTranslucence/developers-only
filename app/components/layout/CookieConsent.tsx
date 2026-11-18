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

// Focus an element, making it focusable first if it isn't (<main>, say).
// Returns whether it took focus: a hidden one (a link in a closed menu) can't.
const focusElement = ( element: HTMLElement, preventScroll: boolean = false ): boolean => {
    if ( element.tabIndex < 0 && ! element.hasAttribute( 'tabindex' ) ) {
        element.setAttribute( 'tabindex', '-1' );
    }
    element.focus( { preventScroll } );
    return document.activeElement === element;
};

const CookieConsent: React.FC = (): JSX.Element | null => {
    const [ open, setOpen ] = useState<boolean>( () => ! getConsent() );
    const bannerRef = useRef<HTMLElement | null>( null );
    const acceptRef = useRef<HTMLButtonElement | null>( null );
    // Set when the visitor reopens the banner, so focus moves to it once it
    // has rendered
    const focusOnOpen = useRef<boolean>( false );
    // What reopened the banner, for focus to go back to after a choice
    const openerRef = useRef<HTMLElement | null>( null );
    // Set when a choice is made with focus in the banner (or nowhere), so
    // focus moves on once the banner has gone rather than dropping to <body>
    const focusOnClose = useRef<boolean>( false );

    useEffect( () => {
        const reopen = ( opener: Element | null ): void => {
            // The link or button that asked, else whatever had focus when the
            // event was dispatched; not something inside the banner itself
            const candidate: Element | null = opener ?? document.activeElement;
            if ( candidate instanceof HTMLElement && candidate !== document.body && ! bannerRef.current?.contains( candidate ) ) {
                openerRef.current = candidate;
            }
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
            const opener: Element | null = event.target instanceof Element ? event.target.closest( OPEN_SELECTOR ) : null;
            if ( opener ) {
                event.preventDefault();
                reopen( opener );
            }
        };
        const onOpenEvent = (): void => reopen( null );
        document.addEventListener( 'click', onClick, true );
        document.addEventListener( OPEN_EVENT, onOpenEvent );
        return () => {
            document.removeEventListener( 'click', onClick, true );
            document.removeEventListener( OPEN_EVENT, onOpenEvent );
        };
    }, [] );

    useEffect( () => {
        if ( open && focusOnOpen.current ) {
            focusOnOpen.current = false;
            acceptRef.current?.focus();
        }
        // Back to what reopened the banner, or, the first time (or when that
        // has gone), to the page's <main>
        if ( ! open && focusOnClose.current ) {
            focusOnClose.current = false;
            const opener: HTMLElement | null = openerRef.current;
            openerRef.current = null;
            if ( opener && opener.isConnected && focusElement( opener ) ) {
                return;
            }
            const main: HTMLElement | null = document.querySelector( 'main#content' ) ?? document.querySelector( 'main' );
            // Without scrolling: the visitor stays where they were reading
            if ( main ) {
                focusElement( main, true );
            }
        }
    }, [ open ] );

    if ( ! open ) {
        return null;
    }

    const choose = ( value: Consent ): void => {
        const active: Element | null = document.activeElement;
        focusOnClose.current = ! active || active === document.body || Boolean( bannerRef.current?.contains( active ) );
        setConsent( value );
        setOpen( false );
        document.dispatchEvent( new CustomEvent( CONSENT_EVENT, { detail: { consent: value } } ) );
    };

    return (
        <aside className="cookie-consent" role="region" aria-label="Cookie consent" ref={ bannerRef }>
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
