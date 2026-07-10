import React, { JSX } from 'react';
import { useContext, useEffect } from 'react';
import { PageSlugContext } from '@/loaders/TemplateLoader';
import { HeroProps } from '@/utils/types/HeroProps';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { getMediaField, getStringField, parse } from '@/utils/helpers';
import Hero from '@/components/shared/Hero';
import Image from '@/components/shared/Image';
import SEOTags from '@/components/shared/SEOTags';
import StructuredData from '@/components/shared/StructuredData';
import ShareBar from '@/components/shared/ShareBar';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import '@/styles/pages/single.scss';
import '@/styles/components/blocks.scss';
import '@/styles/components/posts.scss';

const Blog: React.FC<TemplateProps> = ( {
    post,
    iframe = false,
    layoutClasses = () => {}
} ): JSX.Element | null => {
    const slug: string = useContext( PageSlugContext );

    useEffect( () => {
        if ( post ) {
            layoutClasses( [ 'single-content-item', 'single-' + post.post_type_details.post_type ] );
        }
    }, [ slug ] );

    if ( !post ) return null;

    const fields = post.fields;
    const blogTitle = getStringField( fields, 'blog_title' );
    const blogImage = getMediaField( fields, 'blog_image' );
    const blogImageCredit = getStringField( fields, 'blog_image_credit' );
    const blogDescription = getStringField( fields, 'blog_description' );
    const blogContent = getStringField( fields, 'blog_content' );
    const blogFile = getMediaField( fields, 'blog_file' );

    const heroSettings: HeroProps = {
        breadcrumbs: post.post_type_details.breadcrumbs,
        title: blogTitle,
    };

    return (
        <>
            <SEOTags post={ post } />
            <StructuredData post={ post } />
            <Hero { ...heroSettings } />
            <article id="contentWrapper" className="container one-column">
                <section id="main-content">
                    { blogImage?.url ?
                        <>
                            <Image image={ blogImage } size="square_600" id="post-image" />
                            { blogImageCredit &&
                                <span className="post-image-credit">{ blogImageCredit }</span>
                            }
                        </>
                    : null }
                    <div className="post-details">
                        <p className="date">{ post.post_date.formatted }</p>
                        { parse( blogDescription ) }
                    </div>
                    <ShareBar title={ blogTitle } url={ window.homeURL + '/' + post.post_type_details.post_type_slug + '/' + post.post_name } />
                    { blogFile?.url ?
                        <aside id="download">
                            <Heading tag='h2' title="Read the Full Report" />
                            <CTA text="Download" url={ blogFile.url } modal={ true } classes={ [ 'cta', 'hollow-button', 'color-dark-blue' ] } />
                        </aside>
                    : null }
                    <div id="post-content">
                        { parse( blogContent ) }
                    </div>
                </section>
            </article>
        </>
    );
};
export default Blog;
