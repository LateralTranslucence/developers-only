import React from 'react';
const { useEffect } = wp.element;
import { doLength, doParse } from 'src/utils/helpers';
import CustomCTA from 'src/components/shared/CustomCTA';
import Hero from 'src/components/shared/Hero.js';
import Image from 'src/components/shared/Image.js';
import PanelWrapper from 'src/components/layout/PanelWrapper.js';
import PostDetails from 'src/components/shared/PostDetails';
import RecentPosts from 'src/components/shared/RecentPosts';
import SEOTags from 'src/components/shared/SEOTags';
import StructuredData from 'src/components/shared/StructuredData';
import 'assets/styles/pages/single.scss';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/posts.scss';
import TemplateProps from 'src/utils/types/TemplateProps';

const DoBlog: React.FC<TemplateProps> = ( props ) => {
    const post = props.post;

    if ( doLength( post ) ) {
        // Set post variables
        const postID = post.ID;
        const postTypeRaw = post.post_type_details.post_type;
        const postTypeDisplayName = post.post_type_details.post_type_display_name;
        const postTypeSlug = post.post_type_details.post_type_slug;
        // Set content variables
        const title = post.fields.blog_title;
        const author = post.fields.blog_author;
        const publishDate = post.post_date.formatted;
        const content = post.fields.blog_content;
        const description = post.fields.blog_description;
        const image = post.fields.blog_image;
        const imageCredit = post.fields.blog_image_credit ? post.fields.blog_image_credit : '';
        const hideCustomCTAPanel = Boolean( post.fields.blog_custom_cta_hide_panel );
        const customCTA = post.fields.blog_custom_cta ? post.fields.blog_custom_cta : '';
        const customHTML = <PostDetails author={ author } description={ description } />;
        const url = homeURL + '/' + postTypeSlug + '/' + post.post_name;

        // Hero
        const heroSettings = {
            pretitle: postTypeDisplayName,
            title: title,
            breadcrumbs: post,
            publishDate: publishDate,
            customHTML: customHTML,
            url: url,
            shareBar: true,
        };

        useEffect( () => {
            // Set classes for <main>
            props.layoutClasses( [ 'single-content-item', 'single-' + postTypeRaw ] );
        }, [] );

        return (
            <>
                <SEOTags post={ post } />
                <StructuredData post={ post } />
                <Hero { ...heroSettings } />
                <article id="content-wrapper" className="container one-column">
                    <section id="main-content">
                        { image ?
                            <>
                                <Image image={ image } size="cinema_1000" id="post-image" />
                                { imageCredit &&
                                    <span className="post-image-credit">{ imageCredit }</span>
                                }
                            </> 
                        : null }
                        <div id="post-content">
                            { doParse( content ) }
                        </div>
                    </section>
                </article>
                <PanelWrapper 
                    panelID="recent-posts-panel" 
                    panelType="archive"
                    classes={ [ 'panel', 'panel-type-archive' ] }
                    heading={ { tag: 'h2', title: 'Recent Blogs' } }>
                        <RecentPosts postType={ postTypeRaw } postID={ postID } heading={ postTypeDisplayName }/>
                </PanelWrapper>
                { hideCustomCTAPanel === false ? 
                    <CustomCTA postID={ postID } ctaID={ customCTA } hideCTAPanel={ hideCustomCTAPanel }/>
                : null }
            </>
        );
    } else {
        return null;
    }

}
export default DoBlog;