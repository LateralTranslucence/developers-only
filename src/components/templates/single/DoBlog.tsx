import React from 'react';
const { useEffect } = wp.element;
import { HeroProps } from 'src/utils/types/HeroProps';
import { TemplateProps } from 'src/utils/types/TemplateProps';
import { doLength, doParse } from 'src/utils/helpers';
// import CustomCTA from 'src/components/shared/CustomCTA';
import Hero from 'src/components/shared/Hero';
import Image from 'src/components/shared/Image';
import PanelWrapper from 'src/components/layout/PanelWrapper';
import PostDetails from 'src/components/shared/PostDetails';
import RecentPosts from 'src/components/shared/RecentPosts';
import SEOTags from 'src/components/shared/SEOTags';
import StructuredData from 'src/components/shared/StructuredData';
import 'assets/styles/pages/single.scss';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/posts.scss';

const DoBlog: React.FC<TemplateProps> = ( {
    post, 
    iframe = false,
    layoutClasses = () => {}
} ): JSX.Element | null => {

    if ( doLength( post ) ) {
        const heroSettings: HeroProps = {
            pretitle: post.post_type_details.post_type_display_name,
            title: post.fields.blog_title,
            breadcrumbs: post,
            publishDate: post.post_date.formatted,
            customHTML: <PostDetails author={ post.fields.blog_author } description={ post.fields.blog_description } />,
            url: homeURL + '/' + post.post_type_details.post_type_slug + '/' + post.post_name,
            shareBar: true,
        }

        useEffect( () => {
            // Set classes for <main>
            layoutClasses( [ 'single-content-item', 'single-' + post.post_type_details.post_type ] );
        }, [] );

        return (
            <>
                <SEOTags post={ post } />
                <StructuredData post={ post } />
                <Hero { ...heroSettings } />
                <article id="content-wrapper" className="container one-column">
                    <section id="main-content">
                        { post.fields.blog_image ?
                            <>
                                <Image image={ post.fields.blog_image } size="cinema_1000" id="post-image" />
                                { post.fields.blog_image_credit &&
                                    <span className="post-image-credit">{ post.fields.blog_image_credit }</span>
                                }
                            </> 
                        : null }
                        <div id="post-content">
                            { doParse( post.fields.blog_content ) }
                        </div>
                    </section>
                </article>
                <PanelWrapper 
                    panelID="recent-posts-panel" 
                    panelType="archive"
                    classes={ [ 'panel', 'panel-type-archive' ] }
                    heading={ { tag: 'h2', title: 'Recent Blogs' } }>
                        <RecentPosts postType={ post.post_type_details.post_type } postID={ post.ID } />
                </PanelWrapper>
                { /*post.fields.blog_custom_cta_hide_panel === false ? 
                    <CustomCTA postID={ post.ID } ctaID={ post.fields.blog_custom_cta } hideCTAPanel={ post.fields.blog_custom_cta_hide_panel }/>
                : null*/ }
            </>
        )
    } else {
        return null;
    }
}
export default DoBlog;