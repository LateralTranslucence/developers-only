import React from 'react';
const { useEffect } = wp.element;
import { CustomAttributes } from 'src/utils/types/CustomAttributes';
import { HeroProps } from 'src/utils/types/HeroProps';
import { TemplateProps } from 'src/utils/types/TemplateProps';
import { doLength, doParse } from 'src/utils/helpers';
// import CustomCTA from 'src/components/shared/CustomCTA';
import Hero from 'src/components/shared/Hero';
import PanelWrapper from 'src/components/layout/PanelWrapper';
import RecentPosts from 'src/components/shared/RecentPosts';
import SEOTags from 'src/components/shared/SEOTags';
import StructuredData from 'src/components/shared/StructuredData';
import Video from 'src/components/shared/Video';
import 'assets/styles/pages/single.scss';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/posts.scss';

const DOVideo: React.FC<TemplateProps> = ( {
    post, 
    iframe = false,
    layoutClasses = () => {}
} ): JSX.Element | null => {

    if ( doLength( post ) ) {

        const videoDataAttr: CustomAttributes = { 
            'src': post.fields.video_embed_url, 
        }

        const heroSettings: HeroProps = {
            pretitle: post.post_type_details.post_type_display_name,
            title: post.fields.video_title,
            breadcrumbs: post,
            publishDate: post.post_date.formatted,
            customHTML: doParse( post.fields.video_description ),
            shareBar: true,
            url: homeURL + '/' + post.post_type_details.post_type_slug + '/' + post.post_name,
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
                        <Video url={ post.fields.video_embed_url } videoDataAttr={ videoDataAttr } id="post-image" />
                        <div id="post-content">
                            { doParse( post.fields.video_content ) }
                        </div>
                    </section>
                </article>
                <PanelWrapper 
                    panelID="recent-posts-panel" 
                    panelType="archive"
                    classes={ [ 'panel', 'panel-type-archive' ] }
                    heading={ { tag: 'h2', title: 'Recent Videos' } }>
                        <RecentPosts postType={ post.post_type_details.post_type } postID={ post.ID } />
                </PanelWrapper>
                { /*post.fields.video_custom_cta_hide_panel === false ? 
                    <CustomCTA postID={ post.ID } ctaID={ post.fields.video_custom_cta } hideCTAPanel={ post.fields.video_custom_cta_hide_panel }/>
                : null*/ }
            </>
        );
    } else {
        return null;
    }
}
export default DOVideo;