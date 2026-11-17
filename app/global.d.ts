import type * as React from 'react';

declare global {
    interface Window {
        homeURL: string;
        devoCookieConsentText: string;
        devoEnv: string;
        relativeHomeURL: string;
        menus: Array<string>;
        // Optional site details; see globalVariables.ts for the fallbacks
        devoLocale?: string;
        devoPrivacyPolicyURL?: string;
        devoSiteName?: string;
    }

    // React 19 moved the JSX namespace off the global scope; several
    // components still reference the bare `JSX.Element` type.
    namespace JSX {
        type Element = React.JSX.Element;
    }
}

// Extend the React HTMLAttributes interface globally
declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        href?: string; 
        to?: string; 
        target?: string;
        'data-url-type'?: string;
        'data-modal-class'?: string;
    }
}

export {};