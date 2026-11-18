import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavigationType, useLocation, useNavigationType, useParams } from 'react-router-dom';
import TemplateLoader from '@/loaders/TemplateLoader';
import BackToTopButton from '@/components/shared/BackToTopButton';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import Footer from '@/components/layout/Footer';
import Loading from '@/components/shared/Loading';
import '@/styles/components/to-top.scss';

const MIN_LOAD_MS = 1000;

// Whether a page has finished loading since the app started. The first page
// is a normal browser page load, so focus is left where the browser puts it;
// every later one is a client-side navigation (see PageView).
let initialPageLoaded = false;

// The element a URL #fragment points at: by id, else a named anchor, as the
// browser itself looks them up
const fragmentTarget = ( hash: string ): HTMLElement | null => {
    let id: string = hash.replace( /^#/, '' );
    try {
        id = decodeURIComponent( id );
    } catch {
        // Not percent-encoded; use it as it is
    }
    if ( ! id ) {
        return null;
    }
    const element: Element | null = document.getElementById( id ) ?? document.querySelector( `a[name="${ CSS.escape( id ) }"]` );
    return element instanceof HTMLElement ? element : null;
};

// Scrolls to and focuses a #fragment's target, as the browser does when it
// follows a link to one. False when the page has no such target.
const focusFragment = ( hash: string ): boolean => {
    const fragment: HTMLElement | null = fragmentTarget( hash );
    if ( ! fragment ) {
        return false;
    }
    if ( fragment.tabIndex < 0 && ! fragment.hasAttribute( 'tabindex' ) ) {
        fragment.setAttribute( 'tabindex', '-1' );
    }
    fragment.focus( { preventScroll: true } );
    fragment.scrollIntoView();
    return true;
};

interface LayoutProps {
    // Render the page alone, without header and footer, for display inside a
    // modal's <iframe> (the /iframe/... routes)
    iframe?: boolean;
    // Render the 404 template without asking the API
    notFound?: boolean;
    postType?: string;
    slug?: string;
}

/*
 * One page view. Keyed by path in Layout, so everything here - loading state,
 * <main> classes, the error boundary - starts fresh on navigation by
 * remounting rather than being reset by effects.
 */
const PageView: React.FC<Required<Pick<LayoutProps, 'iframe' | 'notFound'>> & { postType: string; slug: string }> = ( { iframe, notFound, postType, slug } ) => {
    const [ mainElementClasses, setMainElementClasses ] = useState<Array<string>>( [] );
    const [ contentLoaded, setContentLoaded ] = useState<boolean>( false );
    const loadStartRef = useRef<number>( 0 );
    const loadTimerRef = useRef<ReturnType<typeof setTimeout> | null>( null );
    const mainRef = useRef<HTMLElement | null>( null );

    // A layout effect runs before any child's passive effect, so the start
    // time is set before TemplateLoader can report the content loaded
    useLayoutEffect( () => {
        loadStartRef.current = Date.now();
        return () => {
            if ( loadTimerRef.current ) {
                clearTimeout( loadTimerRef.current );
            }
        };
    }, [] );

    const layoutClasses = useCallback( ( classes: Array<string> ) => {
        setMainElementClasses( classes );
    }, [] );

    // Keep the loading indicator up for at least MIN_LOAD_MS, so a fast
    // response doesn't flash it
    const handleLoad = useCallback( () => {
        const remaining = Math.max( 0, MIN_LOAD_MS - ( Date.now() - loadStartRef.current ) );
        loadTimerRef.current = setTimeout( () => setContentLoaded( true ), remaining );
    }, [] );

    // A client-side navigation swaps <main> without a page load, so a screen
    // reader says nothing and keyboard focus stays on the link that was
    // followed (or drops to <body> once it's gone). Move focus to the new
    // page's <h1>, which is read out, or to <main> when there isn't one.
    //
    // When the URL has a #fragment, scroll to its target and focus that
    // instead, on the first page too: the page renders after the browser
    // has looked for the target and not found it, and ScrollToTop has put
    // the page back at the top. If the page has no such target, it's
    // treated as a plain navigation.
    //
    // A router link to this same page with a #fragment (/#contact on the
    // home page, /about/#team on /about/) changes only the hash, and this
    // view stays mounted, so the browser does nothing either. Scroll to and
    // focus the target then, without touching the heading. The location's
    // key is new on every click, so following the same link twice works.
    // Back and forward (POP) are left alone: the browser restores the scroll
    // position itself, and a plain <a href="#..."> (the skip link) is
    // followed natively and also arrives as a POP.
    const { hash, key: locationKey } = useLocation();
    const navigationType = useNavigationType();
    // The location this view last handled; null until its content loads
    const handledKeyRef = useRef<string | null>( null );
    useEffect( () => {
        if ( ! contentLoaded || iframe || handledKeyRef.current === locationKey ) {
            return;
        }
        const samePage: boolean = handledKeyRef.current !== null;
        handledKeyRef.current = locationKey;
        if ( samePage ) {
            if ( navigationType !== NavigationType.Pop && hash ) {
                focusFragment( hash );
            }
            return;
        }
        const firstPage: boolean = ! initialPageLoaded;
        initialPageLoaded = true;
        const main = mainRef.current;
        if ( ! main ) {
            return;
        }
        if ( hash && focusFragment( hash ) ) {
            return;
        }
        if ( firstPage ) {
            return;
        }
        const heading: HTMLElement | null = main.querySelector( 'h1' );
        const target: HTMLElement = heading ?? main;
        if ( ! target.hasAttribute( 'tabindex' ) ) {
            target.setAttribute( 'tabindex', '-1' );
        }
        target.focus( { preventScroll: true } );
    }, [ contentLoaded, iframe, hash, locationKey, navigationType ] );

    const content = (
        <ErrorBoundary onError={ iframe ? undefined : handleLoad }>
            <TemplateLoader
                iframe={ iframe }
                layoutClassesFunction={ layoutClasses }
                notFound={ notFound }
                onLoad={ iframe ? undefined : handleLoad }
                postType={ postType }
                slug={ slug } />
        </ErrorBoundary>
    );

    if ( iframe ) {
        return (
            <main id="content" className={ [ ...mainElementClasses, 'iframe' ].join( ' ' ) }>
                { content }
            </main>
        );
    }

    return (
        <>
            { ! contentLoaded && <Loading /> }
            <main id="content" ref={ mainRef } className={ [ ...mainElementClasses, contentLoaded ? 'content-loaded' : '' ].filter( Boolean ).join( ' ' ) }>
                { content }
            </main>
            <BackToTopButton />
            { contentLoaded && <Footer /> }
        </>
    );
};

// The page for the current route. The site header lives in SiteShell, so it
// isn't re-created on every navigation.
const Layout: React.FC<LayoutProps> = ( { iframe = false, notFound = false, postType: propPostType = '', slug: propSlug = '' } ) => {
    const { pathname } = useLocation();
    const { postType: paramPostType, slug: paramSlug } = useParams();

    // The admin bar is hidden inside a modal's iframe (header.scss)
    useEffect( () => {
        if ( ! iframe ) {
            return;
        }
        document.body.classList.add( 'iframe' );
        return () => document.body.classList.remove( 'iframe' );
    }, [ iframe ] );

    return (
        <PageView
            key={ pathname }
            iframe={ iframe }
            notFound={ notFound }
            postType={ propPostType || paramPostType || '' }
            slug={ propSlug || paramSlug || '' } />
    );
};
export default Layout;
