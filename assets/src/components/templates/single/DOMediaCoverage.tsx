import React from 'react';
import { useEffect } from 'react';
import { HeroProps } from '@/utils/types/HeroProps';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { doLength, doParse } from '@/utils/helpers';
// import CustomCTA from '@/components/shared/CustomCTA';
import CTA from '@/components/shared/CTA';
import Hero from '@/components/shared/Hero';
import Image from '@/components/shared/Image';
import PanelWrapper from '@/components/layout/PanelWrapper';
import RecentPosts from '@/components/shared/RecentPosts';
import SEOTags from '@/components/shared/SEOTags';
import StructuredData from '@/components/shared/StructuredData';
import '@/styles/pages/single.scss';
import '@/styles/components/blocks.scss';
import '@/styles/components/posts.scss';

const DOMediaCoverage: React.FC<TemplateProps> = ( {
    post, 
    iframe = false,
    layoutClasses = () => {}
} ): JSX.Element | null => {

    if ( doLength( post ) ) {

        const heroSettings: HeroProps = {
            pretitle: post.post_type_details.post_type_display_name,
            title: post.fields.media_title,
            breadcrumbs: post,
            publishDate: post.post_date.formatted,
            customHTML: doParse( post.fields.media_description ),
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
                        { post.fields.media_image ?
                            <>
                                <Image image={ post.fields.media_image } size="cinema_1000" id="post-image" />
                                { post.fields.media_image_credit &&
                                    <span className="post-image-credit">{ post.fields.media_image_credit }</span>
                                }
                            </> 
                        : null }
                        <div id="post-content">
                            { doParse( post.fields.media_content ) }
                            { doLength( post.fields.media_url ) ?
                                <CTA url={ post.fields.media_url } classes={ [ 'solid-button' ] } text="Read the Article" />
                            : null }
                        </div>
                    </section>
                </article>
                <PanelWrapper 
                    panelID="recent-posts-panel" 
                    panelType="archive"
                    classes={ [ 'panel', 'panel-type-archive' ] }
                    heading={ { tag: 'h2', title: 'Recent Media Coverage' } }>
                        <RecentPosts postType={ post.post_type_details.post_type } postID={ post.ID } />
                </PanelWrapper>
                { /*post.fields.media_custom_cta_hide_panel === false ? 
                    <CustomCTA postID={ post.ID } ctaID={ post.fields.media_custom_cta } hideCTAPanel={ post.fields.media_custom_cta_hide_panel }/>
                : null */ }
            </>
        )
    } else {
        return null;
    }
}
export default DOMediaCoverage;