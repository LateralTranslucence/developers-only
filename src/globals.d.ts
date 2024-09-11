// Declare global variables

import * as React from 'react';
import React from 'react';

declare global {
    interface Window {
        wp: {
            element: typeof React;
        };
        hbspt: Record<string, any>;
    }
    const wp: {
        element: typeof React;
    }
    const doEnv: string;
    const homeURL: string;
    const relativeHomeURL: string;
    const templateDirectory: string;
    const siteLanguage: string;
    const hubspotForms: Array<string>;
    const hubspotFormsLoaded: Array<string>;
    const menus: Array<string>;
    const exports: object;
}


// Extend the React HTMLAttributes interface globally
declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        href?: string; 
        to?: string; 
        target?: string;
        'data-url-type'?: string;
        'uk-toggle'?: string;
        'uk-scroll'?: string;
        'data-iframe-name'?: string;
        'data-modal-class'?: string;
    }
}