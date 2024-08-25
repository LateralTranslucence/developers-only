import React from 'react';
const { useContext, useEffect } = wp.element;
import { PageSlugContext } from 'src/loaders/TemplateLoader';
import Hero from 'src/components/shared/Hero';
import SEOTags from 'src/components/shared/SEOTags';
import 'assets/styles/pages/404.scss';
import TemplateLoaderProps from 'src/utils/types/TemplateLoaderProps';

const Page404: React.FC<TemplateLoaderProps> = ( { layoutClassesFunction } ) => {
    const slug = useContext( PageSlugContext );

    // Settings
    const heroSettings = {
        title: 'Page Not Found',
        copy: '<p>Oops, looks like the page you are trying to reach is not available.</p><p>Please check the URL for proper spelling or return to our homepage.</p>',
        backgroundSettings: { color: 'white', avatar: true },
        cta: [ { text: 'Go Back Home', url: '/', buttonStyle: 'solid-button' }],
    };

    const seoSettings = {
        seo_title: 'Page Not Found',
        seo_site_name: '{DevelopersOnly}',
        seo_url: homeURL + '/' + slug + '/',
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
    }, [] );

    return (
        <>
            <SEOTags post={ seoSettings } />
            <Hero { ...heroSettings } />
        </>
    );
}
export default Page404;