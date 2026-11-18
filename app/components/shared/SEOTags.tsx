import React, { useEffect } from 'react';
import { siteName } from '@/globalVariables';
import { getPostTitle, htmlToText } from '@/utils/helpers';
import { Post } from '@/utils/types/Post';

/*
 * The page's SEO tags. seo_* values arrive from the REST API as raw text
 * (React escapes them) and seo_url is absolute.
 *
 * React 19 hoists the <meta>/<link> tags below into <head>. The <title> is
 * not rendered as an element: WordPress already prints one (title-tag
 * support), so this updates that instead of adding a second.
 */
const SEOTags: React.FC<{ post: Partial<Post> }> = ( { post } ) => {
    const title: string = post.seo_title || htmlToText( getPostTitle( post ) );
    const description: string = post.seo_description ?? '';
    const ogSiteName: string = post.seo_site_name || siteName;

    // header.php server-renders these same tags (marked data-react-helmet) for
    // crawlers; remove them once React takes over so they don't duplicate the
    // React-19-hoisted tags below.
    useEffect( () => {
        document.head.querySelectorAll( '[data-react-helmet]' ).forEach( ( el ) => el.remove() );
    }, [] );

    useEffect( () => {
        if ( title ) {
            document.title = title;
        }
    }, [ title ] );

    return (
        <>
            { post.seo_url ? <link rel="canonical" href={ post.seo_url } /> : null }
            { post.seo_locale ? <meta property="og:locale" content={ post.seo_locale } /> : null }
            <meta property="og:type" content="website" />
            { title ? <meta property="og:title" content={ title } /> : null }
            { description ? <meta property="og:description" content={ description } /> : null }
            { description ? <meta name="description" content={ description } /> : null }
            { post.seo_url ? <meta property="og:url" content={ post.seo_url } /> : null }
            { ogSiteName ? <meta property="og:site_name" content={ ogSiteName } /> : null }
            { post.seo_image ? <meta property="og:image" content={ post.seo_image } /> : null }
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="robots" content={ post.noindex || 'index, follow' } />
        </>
    );
};
export default SEOTags;
