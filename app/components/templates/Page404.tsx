import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCurrentPage } from '@/utils/stores/CurrentPage';
import { siteLocale, siteName } from '@/globalVariables';
import Hero from '@/components/shared/Hero';
import SEOTags from '@/components/shared/SEOTags';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { HeroProps } from '@/utils/types/HeroProps';
import { Post } from '@/utils/types/Post';
import '@/styles/pages/404.scss';

const Page404: React.FC<Partial<TemplateProps>> = ( { layoutClasses } ) => {
    const slug = useCurrentPage( ( state ) => state.slug );
    // The home route ("/") only 404s when there is no home page yet, which
    // is a site still being set up. A "Go Back Home" link there would point
    // at itself, so explain how to add one instead.
    const isHome: boolean = useLocation().pathname === '/';

    // Settings
    const heroSettings: HeroProps = isHome ? {
        title: 'No Home Page Yet',
        copy: '<p>This site doesn\'t have a home page yet.</p><p>To add one, create a Landing Page in WordPress with the slug <code>home</code> and publish it.</p>',
    } : {
        title: 'Page Not Found',
        copy: '<p>Oops, looks like the page you are trying to reach is not available.</p><p>Please check the URL for proper spelling or return to our homepage.</p>',
        ctas: [ { text: 'Go Back Home', url: '/', button_style: 'solid-button' }],
    };

    const seoSettings: Partial<Post> = {
        // No canonical URL: there's no page here to be canonical
        seo_title: heroSettings.title,
        seo_site_name: siteName,
        seo_locale: siteLocale,
        seo_description: '',
        noindex: 'noindex',
    };

    // Set classes for <main>
    useEffect( () => {
        // Set classes for <main>
        if ( layoutClasses ) {
            layoutClasses( [ 'page-404' ] );
        }
    }, [ slug, layoutClasses ] );

    return (
        <>
            <SEOTags post={ seoSettings } />
            <Hero { ...heroSettings } />
        </>
    );
};
export default Page404;