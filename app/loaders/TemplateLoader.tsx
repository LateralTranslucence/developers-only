import React from 'react';
import { ComponentLoaderMap } from '@/utils/types/ComponentLoaderMap';
// Single Templates
import { lazy, Suspense, useEffect, useState } from 'react';
import { getPost } from '@/utils/api';
import { useCurrentPage } from '@/utils/stores/CurrentPage';
import { TemplateLoaderProps } from '@/utils/types/TemplateLoaderProps';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { APIResult } from '@/utils/types/APIResult';
import { Post } from '@/utils/types/Post';
import { pascalToKebab } from '@/utils/helpers';
const Form = lazy( () => import( '@/components/templates/single/Form' ) );
const SimplePage = lazy( () => import( '@/components/templates/single/SimplePage' ) );
const LandingPage = lazy( () => import( '@/components/templates/LandingPage' ) );
const Page404 = lazy( () => import( '@/components/templates/Page404' ) );

const templates: ComponentLoaderMap = {
    'form': Form,
    'landing-page': LandingPage,
    'simple-page': SimplePage,
    '404': Page404,
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

const ContentReady: React.FC<{ onLoad?: () => void; children: React.ReactNode }> = ( { onLoad, children } ) => {
    useEffect( () => { onLoad?.(); }, [onLoad] );
    return <>{ children }</>;
};

const TemplateLoader: React.FC<TemplateLoaderProps> = ( {
    iframe = false,
    postType,
    queryString = '',
    slug,
    layoutClassesFunction,
    onLoad,
} ) => {
    const [ post, setPost ] = useState<Post | undefined>( undefined );
    const [ loading, setLoading ] = useState<boolean>( true );
    const setSlug = useCurrentPage( ( state ) => state.setSlug );

    // Make the current page slug available to templates via the CurrentPage store
    useEffect( () => {
        setSlug( slug );
    }, [ setSlug, slug ] );
    let finalPostType: string = postType;
    if ( finalPostType === 'media' ) {
        // rename
        finalPostType = 'media-library';
    }
    else if ( finalPostType === 'page' ) {
        // rename
        finalPostType = 'simple-page';
    }

    const TemplateName: React.ComponentType<TemplateProps> = templates[ finalPostType ] ?? templates['404'];

    useEffect( () => {
        let cancelled = false;

        async function fetchData() {
            setLoading( true );
            setPost( undefined );

            await getPost( finalPostType, slug, queryString ).then( ( data: APIResult ) => {
                    if ( cancelled ) {
                        return;
                    }

                    if ( data.json ) {
                        setPost( data.json as Post );
                    } 
                    else {
                        setPost( undefined );
                    }
                    setLoading( false );
                } );
        }
        fetchData();
        
        return () => {
            cancelled = true;
        };
    }, [ finalPostType, queryString, slug ] );

    if ( loading ) {
        return null;
    }

    if ( TemplateName && post ) {
            return (
                <Suspense fallback={ null }>
                    <ContentReady onLoad={ onLoad }>
                        <TemplateName post={ post } iframe={ iframe ? iframe : false } layoutClasses={ layoutClassesFunction } />
                    </ContentReady>
                </Suspense>
            );
    } else {
        return null;
    }
};
export default TemplateLoader;
