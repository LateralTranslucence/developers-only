import React from 'react';
import { ComponentLoaderMap } from '@/utils/types/ComponentLoaderMap';
// Single Templates
import { createContext, lazy, Suspense, useEffect, useState } from 'react';
import { getPost } from '@/utils/api';
import { TemplateLoaderProps } from '@/utils/types/TemplateLoaderProps';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { APIResult } from '@/utils/types/APIResult';
import { Post } from '@/utils/types/Post';
const Blog = lazy( () => import( '@/components/templates/single/Blog' ) );
const Form = lazy( () => import( '@/components/templates/single/Form' ) );
const SimplePage = lazy( () => import( '@/components/templates/single/SimplePage' ) );
const LandingPage = lazy( () => import( '@/components/templates/LandingPage' ) );
const Page404 = lazy( () => import( '@/components/templates/Page404' ) );

const templates: ComponentLoaderMap = {
    'agents': LandingPage,
    'blog': Blog,
    'communities': LandingPage,
    'form': Form,
    'landing-page': LandingPage,
    'simple-page': SimplePage,
    '404': Page404,
};

export const PageSlugContext = createContext('');

const ContentReady: React.FC<{ onLoad?: () => void; children: React.ReactNode }> = ( { onLoad, children } ) => {
    useEffect( () => { onLoad?.(); }, [] );
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
                        <PageSlugContext.Provider value={ slug }>
                            <TemplateName post={ post } iframe={ iframe ? iframe : false } layoutClasses={ layoutClassesFunction } />
                        </PageSlugContext.Provider>
                    </ContentReady>
                </Suspense>
            );
    } else {
        return null;
    }
};
export default TemplateLoader;
