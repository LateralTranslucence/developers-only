import React from 'react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { ComponentLoaderMap } from '@/utils/types/ComponentLoaderMap';
import { getPost, isAbortError } from '@/utils/api';
import { useCurrentPage } from '@/utils/stores/CurrentPage';
import { TemplateLoaderProps } from '@/utils/types/TemplateLoaderProps';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { Post } from '@/utils/types/Post';
import { pascalToKebab } from '@/utils/helpers';
import ErrorFallback from '@/components/shared/ErrorFallback';
// Single Templates
const Form = lazy( () => import( '@/components/templates/single/Form' ) );
const SimplePage = lazy( () => import( '@/components/templates/single/SimplePage' ) );
const LandingPage = lazy( () => import( '@/components/templates/LandingPage' ) );
const Page404 = lazy( () => import( '@/components/templates/Page404' ) );

const templates: ComponentLoaderMap = {
    'form': Form,
    'landing-page': LandingPage,
    'simple-page': SimplePage,
};

// Auto-discover extension single-post templates
// (extensions/app/components/templates/single/*.tsx) - see extensions/README.md.
// A file's PascalCase name becomes its kebab-case post type key (e.g.
// CaseStudy.tsx -> 'case-study'), matched against the post type slug returned
// by the REST API. Core templates above always win on a name collision.
const extensionTemplates = import.meta.glob<{ default: React.ComponentType<TemplateProps> }>( '/extensions/app/components/templates/single/*.tsx' );
for ( const path in extensionTemplates ) {
    const name = path.replace( /^.*\//, '' ).replace( /\.tsx$/, '' );
    const key = pascalToKebab( name );
    if ( ! ( key in templates ) ) {
        templates[ key ] = lazy( extensionTemplates[ path ] );
    }
}

// URL post type segments whose REST base differs
const postTypeAliases: Record<string, string> = {
    'media': 'media-library',
    'page': 'simple-page',
};

const ContentReady: React.FC<{ onLoad?: () => void; children: React.ReactNode }> = ( { onLoad, children } ) => {
    useEffect( () => { onLoad?.(); }, [onLoad] );
    return <>{ children }</>;
};

type LoadState =
    | { key: string; status: 'found'; post: Post }
    | { key: string; status: 'missing' | 'error' };

const TemplateLoader: React.FC<TemplateLoaderProps> = ( {
    iframe = false,
    notFound = false,
    postType,
    slug,
    layoutClassesFunction,
    onLoad,
} ) => {
    const setSlug = useCurrentPage( ( state ) => state.setSlug );
    const finalPostType: string = postTypeAliases[ postType ] ?? postType;
    const Template: React.ComponentType<TemplateProps> | undefined = notFound ? undefined : templates[ finalPostType ];
    // Identifies the request; empty when there's nothing to fetch, i.e. no
    // template could render the result anyway
    const requestKey: string = Template && slug ? finalPostType + '/' + slug : '';
    const [ loadState, setLoadState ] = useState<LoadState | null>( null );

    // Make the current page slug available to templates via the CurrentPage store
    useEffect( () => {
        setSlug( slug );
    }, [ setSlug, slug ] );

    useEffect( () => {
        if ( ! requestKey ) {
            return;
        }
        // Aborting on cleanup also guarantees a slow response for a page the
        // visitor has already left can't overwrite the current one
        const controller = new AbortController();
        getPost( finalPostType, slug, { signal: controller.signal } )
            .then( ( data ) => {
                setLoadState( data.json ? { key: requestKey, status: 'found', post: data.json } : { key: requestKey, status: 'missing' } );
            } )
            .catch( ( error: unknown ) => {
                if ( ! isAbortError( error ) ) {
                    setLoadState( { key: requestKey, status: 'error' } );
                }
            } );
        return () => controller.abort();
    }, [ finalPostType, requestKey, slug ] );

    // Any state held for a different request belongs to a previous page
    const current: LoadState | null = requestKey && loadState?.key === requestKey ? loadState : null;
    // Still loading this page
    if ( requestKey && ! current ) {
        return null;
    }

    if ( current?.status === 'error' ) {
        return (
            <ContentReady onLoad={ onLoad }>
                <ErrorFallback />
            </ContentReady>
        );
    }

    return (
        <Suspense fallback={ null }>
            <ContentReady onLoad={ onLoad }>
                { Template && current?.status === 'found' ?
                    <Template post={ current.post } iframe={ iframe } layoutClasses={ layoutClassesFunction } />
                : <Page404 layoutClasses={ layoutClassesFunction } /> }
            </ContentReady>
        </Suspense>
    );
};
export default TemplateLoader;
