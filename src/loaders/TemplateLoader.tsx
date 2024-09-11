import React from 'react';
import { ComponentLoaderMap } from 'src/utils/types/ComponentLoaderMap';
// Single Templates
import { createContext, lazy, Suspense, useEffect, useState } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import { doLength } from 'src/utils/helpers';
import { doGetPost } from 'src/utils/api';
import Loading from 'src/components/shared/Loading';
import { TemplateLoaderProps } from 'src/utils/types/TemplateLoaderProps';
import { TemplateProps } from 'src/utils/types/TemplateProps';
import { APIResult } from 'src/utils/types/APIResult';
import { Post } from 'src/utils/types/Post';
// const DoAnnouncement = lazy( () => import( 'src/components/templates/single/DoAnnouncement' ) );
// const DoAnalystReport = lazy( () => import( 'src/components/templates/single/DoAnalystReport' ) );
const DoBlog = lazy( () => import( 'src/components/templates/single/DoBlog' ) );
// const DoCustomerStory = lazy( () => import( 'src/components/templates/single/DoCustomerStory' ) );
// const DoEvent = lazy( () => import( 'src/components/templates/single/DoEvent' ) );
// const DoForm = lazy( () => import( 'src/components/templates/single/DoForm' ) );
// const DoGlossary = lazy( () => import( 'src/components/templates/single/DoGlossary' ) );
// const DoLegal = lazy( () => import( 'src/components/templates/single/DoLegal' ) );
// const DoMediaCoverage = lazy( () => import( 'src/components/templates/single/DoMediaCoverage' ) );
// const DoPodcast = lazy( () => import( 'src/components/templates/single/DoPodcast' ) );
// const DoPressRelease = lazy( () => import( 'src/components/templates/single/DoPressRelease' ) );
// const DoSimplePage = lazy( () => import( 'src/components/templates/single/DoSimplePage' ) );
// const DoTopic = lazy( () => import( 'src/components/templates/single/DoTopic' ) );
// const DoVideo = lazy( () => import( 'src/components/templates/single/DoVideo' ) );
// const DoWhitePaper = lazy( () => import( 'src/components/templates/single/DoWhitePaper' ) );
// const Attachment = lazy( () => import( 'src/components/templates/single/Attachment' ) );
// const DefaultSingle = lazy( () => import( 'src/components/templates/single/DefaultSingle' ) );
// const LandingPage = lazy( () => import( 'src/components/templates/LandingPage' ) );
const Page404 = lazy( () => import( 'src/components/templates/Page404' ) );

const templates: ComponentLoaderMap = {
    // 'about': LandingPage,
    // 'ad': LandingPage,
    // 'analyst-report': DoAnalystReport,
    // 'announcement': DoAnnouncement,
    'blog': DoBlog,
    // 'customer-story': DoCustomerStory,
    // 'default': DefaultSingle,
    // 'event': DoEvent,
    // 'form': DoForm,
    // 'glossary': DoGlossary,
    // 'landing-page': LandingPage,
    // 'legal': DoLegal,
    // 'location': LandingPage,
    // 'media-library': Attachment,
    // 'media-coverage': DoMediaCoverage,
    // 'podcast': DoPodcast,
    // 'press-release': DoPressRelease,
    // 'simple-page': DoSimplePage,
    // 'topic': DoTopic,
    // 'video': DoVideo,
    // 'white-paper': DoWhitePaper,
    '404': Page404,
};

export const PageSlugContext = createContext('');

const TemplateLoader: React.FC<TemplateLoaderProps> = ( { 
    iframe = false, 
    postType, 
    queryString = '', 
    slug, 
    layoutClassesFunction 
} ) => {
    const [ post, setPost ] = useState<Post | undefined>( undefined );
    const [ TemplateName, setTemplateName ] = useState<React.FC<TemplateProps>>();
    let finalPostType: string = postType;
    if ( finalPostType === 'media' ) {
        // rename
        finalPostType = 'media-library';
    }
    else if ( finalPostType === 'page' ) {
        // rename
        finalPostType = 'simple-page';
    }
    useEffect( () => {
        async function fetchData() {
            await doGetPost( finalPostType, slug, queryString ).then( ( data: APIResult ) => {
                if ( data.json ) {
                    setPost( data.json as Post );
                    const template: React.FC<TemplateProps> = templates[ finalPostType ] ? templates[ finalPostType ] : templates.default;
                    setTemplateName( template );
                } 
                else {
                    setPost( undefined );
                    setTemplateName( templates['404'] );
                }
            } );
        }
        fetchData();
    }, [ slug ] );
    if ( TemplateName && post ) {
            return (
                <Suspense fallback={ <Loading /> }>
                    <PageSlugContext.Provider value={ slug }>
                        <TemplateName post={ post } iframe={ iframe ? iframe : false } layoutClasses={ layoutClassesFunction } />
                    </PageSlugContext.Provider>
                    <ScrollRestoration />
                </Suspense>
            );
    } else {
        return null;
    }
}
export default TemplateLoader;