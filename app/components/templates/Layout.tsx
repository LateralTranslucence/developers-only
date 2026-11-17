import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import TemplateLoader from '@/loaders/TemplateLoader';
import BackToTopButton from '@/components/shared/BackToTopButton';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import Footer from '@/components/layout/Footer';
import Loading from '@/components/shared/Loading';
import '@/styles/components/to-top.scss';

const MIN_LOAD_MS = 1000;

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
            <main id="content" className={ [ ...mainElementClasses, contentLoaded ? 'content-loaded' : '' ].filter( Boolean ).join( ' ' ) }>
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
