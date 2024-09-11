import React from 'react';
const { useEffect } = wp.element;
import { CTASettings } from 'src/utils/types/CTASettings';
import { HeroProps } from 'src/utils/types/HeroProps';
import { TemplateProps } from 'src/utils/types/TemplateProps';
import { doLength, doParse, doUpperCaseWords, doVideoEmbedURL } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA';
// import CustomCTA from 'src/components/shared/CustomCTA';
import Heading from 'src/components/shared/Heading';
import Hero from 'src/components/shared/Hero';
import Image from 'src/components/shared/Image';
import PanelWrapper from 'src/components/layout/PanelWrapper';
import PostDetails from 'src/components/shared/PostDetails';
import RecentPosts from 'src/components/shared/RecentPosts';
import RenderHubspotForm from 'src/components/shared/RenderHubspotForm';
import SEOTags from 'src/components/shared/SEOTags';
import StructuredData from 'src/components/shared/StructuredData';
import Video from 'src/components/shared/Video';
import 'assets/styles/pages/single.scss';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/posts.scss';

const DOPodcast: React.FC<TemplateProps> = ( {
    post, 
    iframe = false,
    layoutClasses = () => {}
} ): JSX.Element | null => {

    if ( doLength( post ) ) {

        const seriesName: string = doUpperCaseWords( post.fields.podcast_series.replace( '-', ' ' ) );

        const heroSettings: HeroProps = {
            pretitle: post.post_type_details.post_type_display_name,
            title: post.fields.podcast_title,
            breadcrumbs: post,
            publishDate: post.post_date.formatted,
            customHTML: <PostDetails podcastSeries={ seriesName } description={ post.fields.podcast_description } />,
            shareBar: true,
            url: homeURL + '/' + post.post_type_details.post_type_slug + '/' + post.post_name,
        }

        // CTA settings
        const ctaSettings: CTASettings = {
            url: post.fields.podcast_external_url,
            text: 'Listen to the Podcast',
            classes: [ 'button', 'color-border' ],
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
                         { doLength( post.fields.podcast_video_embed_url ) ? 
                            <Video url={ doVideoEmbedURL( post.fields.podcast_video_embed_url ) } id="post-image" />
                         : null }
                         { doLength( post.fields.podcast_audio_embed_codede ) ? 
                            <span id="post-image">{ doParse( post.fields.podcast_audio_embed_code ) }</span>
                         : null }
                         { ! doLength( post.fields.podcast_video_embed_url ) && ! doLength( post.fields.podcast_audio_embed_codede ) && doLength( post.fields.podcast_image )  ? 
                            <>
                                <Image image={ post.fields.podcast_image } size="cinema_1000" id="post-image" />
                                { post.fields.podcast_image_credit &&
                                    <span className="post-image-credit">{ post.fields.podcast_image_credit }</span>
                                }
                            </>
                         : null }
                        <div id="post-content">
                            { doParse( post.fields.podcast_content ) }
                        </div>
                        { post.fields.podcast_external_url &&
                            <p><CTA { ...ctaSettings } /></p>
                        }
                        { post.fields.podcast_hubspot_form_embed_code &&
                            <div className="panel-form-wrapper">
                                <Heading tag={ 'h2' } title={ post.fields.podcast_form_title } classes={ [ 'text-align-center' ] }/>
                                <RenderHubspotForm options={ post.fields.podcast_hubspot_form_embed_code } formID={ post.ID + '-form' }/>
                            </div>
                        }
                    </section>
                </article>
                <PanelWrapper 
                    panelID="recent-posts-panel" 
                    panelType="archive"
                    classes={ [ 'panel', 'panel-type-archive' ] }
                    heading={ { tag: 'h2', title: 'Recent Podcasts' } }>
                        <RecentPosts postType={ post.post_type_details.post_type } postID={ post.ID } />
                </PanelWrapper>
                { /* post.fields.podcast_custom_cta_hide_panel === false ? 
                    <CustomCTA postID={ post.ID } ctaID={ post.fields.podcast_custom_cta } hideCTAPanel={ post.fields.podcast_custom_cta_hide_panel }/>
                : null */ }
            </>
        )
    } else {
        return null;
    }
}
export default DOPodcast;