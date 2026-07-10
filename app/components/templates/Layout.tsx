import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import TemplateLoader from '@/loaders/TemplateLoader';
import BackToTopButton from '@/components/shared/BackToTopButton';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Loading from '@/components/shared/Loading';
import ScrollToTop from '@/components/shared/ScrollToTop';
import '@/styles/components/to-top.scss';

const MIN_LOAD_MS = 1000;

interface LayoutProps {
    iframe?: boolean;
    postType?: string;
    slug?: string;
}
const Layout: React.FC<LayoutProps> = ( { iframe = false, postType: propPostType = '', slug: propSlug = '' } ) => {
    const location = useLocation();
    const { postType: paramPostType, slug: paramSlug } = useParams();
    const finalPostType: string = propPostType || paramPostType || '';
    const finalSlug: string = propSlug || paramSlug || '';
    const finalIframe: boolean = iframe || false;
    const [ mainElementClasses, setMainElementClasses ] = useState<string>( '' );
    const [ contentLoaded, setContentLoaded ] = useState<boolean>( false );
    const loadStartRef = useRef<number>( Date.now() );
    const loadTimerRef = useRef<ReturnType<typeof setTimeout> | null>( null );

    const layoutClasses = ( classes: Array<string> ) => {
        if ( finalIframe ) {
            classes.push( 'iframe' );
        }
        setMainElementClasses( classes.join( ' ' ) );
    };

    const handleLoad = useCallback( () => {
        const elapsed = Date.now() - loadStartRef.current;
        const remaining = Math.max( 0, MIN_LOAD_MS - elapsed );
        loadTimerRef.current = setTimeout( () => setContentLoaded( true ), remaining );
    }, [] );

    useEffect( () => {
        setMainElementClasses( '' );
        setContentLoaded( false );
        loadStartRef.current = Date.now();
        if ( loadTimerRef.current ) {
            clearTimeout( loadTimerRef.current );
            loadTimerRef.current = null;
        }
    }, [ location.pathname, location.search ] );

    useEffect( () => {
        return () => { if ( loadTimerRef.current ) clearTimeout( loadTimerRef.current ); };
    }, [] );

    return (
        <>
            <ScrollToTop />
            { iframe ?
                <main id="content" className={ mainElementClasses }>
                    <TemplateLoader 
                        layoutClassesFunction={ layoutClasses }
                        postType={ finalPostType } 
                        queryString={ window.location.search.replace( '?', '' ) }
                        slug={ finalSlug } />
                </main>
            : <>
                { !contentLoaded && <Loading /> }
                <Header />
                <main id="content" className={ [ mainElementClasses, contentLoaded ? 'content-loaded' : '' ].filter( Boolean ).join( ' ' ) }>
                    <TemplateLoader
                        layoutClassesFunction={ layoutClasses }
                        onLoad={ handleLoad }
                        postType={ finalPostType }
                        queryString={ window.location.search.replace( '?', '' ) }
                        slug={ finalSlug } />
                </main>
                <BackToTopButton />
                { contentLoaded && <Footer /> }
            </> }
        </>
    );
};
export default Layout;
