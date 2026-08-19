<?php
/*
 * Extension functions.
 *
 * Loaded by the core functions.php on every request, alongside the theme's own
 * api/functions.*.php includes. This is the place for site-specific PHP that is
 * not a post type class (those go in classes/post-types/) - analytics tags,
 * extra REST routes, filters, helpers.
 *
 * The theme deliberately ships no analytics, no tag manager and no
 * site-verification tags. Add your own here, on the standard WordPress hooks.
 *
 * Example - a tag gated on the consent banner's cookie:
 *
 *   add_action( 'wp_head', function () {
 *       if ( ! isset( $_COOKIE['devo_cookie_consent'] ) || $_COOKIE['devo_cookie_consent'] !== 'accepted' ) {
 *           return;
 *       }
 *       ?><!-- your tag here --><?php
 *   } );
 *
 * To have a tag start the moment consent is given, without waiting for the next
 * page load, listen for the event CookieConsent.tsx dispatches:
 *
 *   document.addEventListener( 'devo:cookie-consent', function ( e ) {
 *       if ( e.detail.consent === 'accepted' ) { ... }
 *   } );
 *
 * Copy for the banner:
 *
 *   add_filter( 'devo_cookie_consent_text', function () {
 *       return '<p>We use cookies. See our <a href="/legal/">Privacy Policy</a>.</p>';
 *   } );
 */
