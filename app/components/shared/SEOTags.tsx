import React, { useEffect } from 'react';
import { stripTags } from '@/utils/helpers';
import { Post } from '@/utils/types/Post';

const SEOTags: React.FC<{ post: Partial<Post> }> = ( { post } ) => {
    const title = stripTags( ( post.seo_title ? post.seo_title : post.post_title ) ?? '' );

    // header.php server-renders these same tags (marked data-react-helmet) for
    // crawlers; remove them once React takes over so they don't duplicate the
    // React-19-hoisted tags below.
    useEffect( () => {
        document.head.querySelectorAll( '[data-react-helmet]' ).forEach( ( el ) => el.remove() );
    }, [] );

    return (
        <>
            <title>{ title }</title>
            <link rel="canonical" href={ post.seo_url ? post.seo_url : post.guid } />
            <meta property="og:locale" content={ post.seo_locale ? post.seo_locale : '' } />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={ post.seo_title ? post.seo_title : post.post_title } />
            <meta property="og:description" content={ post.seo_description } />
            <meta name="description" content={ post.seo_description } />
            <meta property="og:url" content={ post.seo_url ? post.seo_url : post.guid } />
            <meta property="og:site_name" content={ post.seo_site_name ? post.seo_site_name : '{DevelopersOnly}' } />
            <meta property="og:image" content={ post.seo_image ? post.seo_image : '' } />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="robots" content={ post.noindex ? post.noindex : 'index, follow' } />
        </>
    );
};
export default SEOTags;
