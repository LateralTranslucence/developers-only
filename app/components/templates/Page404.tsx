import React from 'react';
import { useContext, useEffect } from 'react';
import { PageSlugContext } from '@/loaders/TemplateLoader';
import Hero from '@/components/shared/Hero';
import SEOTags from '@/components/shared/SEOTags';
import { TemplateLoaderProps } from '@/utils/types/TemplateLoaderProps';
import { HeroProps } from '@/utils/types/HeroProps';
import '@/styles/pages/404.scss';

const Page404: React.FC<TemplateLoaderProps> = ( { layoutClassesFunction } ) => {
    const slug = useContext( PageSlugContext );

    // Settings
    const heroSettings: HeroProps = {
        title: 'Page Not Found',
        copy: '<p>Oops, looks like the page you are trying to reach is not available.</p><p>Please check the URL for proper spelling or return to our homepage.</p>',
        ctas: [ { text: 'Go Back Home', url: '/', button_style: 'solid-button' }],
    };

    const seoSettings: Record<string, any> = {
        seo_title: 'Page Not Found',
        seo_site_name: '{DevelopersOnly}',
        seo_url: window.homeURL + '/' + slug + '/',
        seo_locale: 'en_US',
        seo_description: '',
        noindex: true,
    };

    // Set classes for <main>
    useEffect( () => {
        // Set classes for <main>
        if ( layoutClassesFunction ) {
            layoutClassesFunction( [ 'page-404' ] );
        }
    }, [ slug ] );

    return (
        <>
            <SEOTags post={ seoSettings } />
            <Hero { ...heroSettings } />
        </>
    );
};
export default Page404;