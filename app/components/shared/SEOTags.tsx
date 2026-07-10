import React from 'react';
import { Helmet } from 'react-helmet';
import { stripTags } from '@/utils/helpers';
import { Post } from '@/utils/types/Post';

const SEOTags: React.FC<{ post: Post | Record<string, any> }> = ( { post } ) => {
    const title = stripTags( post.seo_title ? post.seo_title : post.post_title );

    return (
        <Helmet>
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
            <meta name="robots" content={ post.noindex ? post.noindex : 'index, follow' }></meta>
        </Helmet>
    );
};
export default SEOTags;
