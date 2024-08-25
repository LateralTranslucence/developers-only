const { useEffect } = wp.element;
import { doLength, doParse, doUpperCaseWords, doVideoEmbedURL } from 'src/utils/helpers.js';
import CTA from 'src/components/shared/CTA.js';
import CustomCTA from 'src/components/shared/CustomCTA.js';
import Heading from 'src/components/shared/Heading.js';
import Hero from 'src/components/shared/Hero.js';
import Image from 'src/components/shared/Image.js';
import PanelWrapper from 'src/components/layout/PanelWrapper.js';
import PostDetails from 'src/components/shared/PostDetails.js';
import RecentPosts from 'src/components/shared/RecentPosts.js';
import RenderHubspotForm from 'src/components/shared/RenderHubspotForm.js';
import SEOTags from 'src/components/shared/SEOTags.js';
import StructuredData from 'src/components/shared/StructuredData.js';
import Video from 'src/components/shared/Video.js';
import 'assets/styles/pages/single.scss';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/posts.scss';

export default function DOPodcast( props ) {
    const post = props.post;

    if ( doLength( post ) ) {
        // Set post variables
        const postID = post.ID;
        const postTypeRaw = post.post_type_details.post_type;
        const postTypeDisplayName = post.post_type_details.post_type_display_name;
        const postTypeSlug = post.post_type_details.post_type_slug;
        // Set content variables
        const title = post.fields.podcast_title;
        const seriesRaw = post.fields.podcast_series;
        const seriesName = doUpperCaseWords( seriesRaw.replace( '-', ' ' ) );
        const publishDate = post.post_date.formatted;
        const content = post.fields.podcast_content;
        const description = post.fields.podcast_description;
        const image = post.fields.podcast_image;
        const imageCredit = post.fields.podcast_image_credit ? post.fields.podcast_image_credit : '';
        const hideCustomCTAPanel = Boolean( post.fields.podcast_custom_cta_hide_panel );
        const customCTA = post.fields.podcast_custom_cta ? post.fields.podcast_custom_cta : '';
        const url = homeURL + '/' + postTypeSlug + '/' + post.post_name;
        const podcastAudioEmbedCode = doLength( post.fields.podcast_audio_embed_code ) ? doParse( post.fields.podcast_audio_embed_code ) : '';
        const podcastVideoEmbedCode = doLength( post.fields.podcast_video_embed_url ) ? doVideoEmbedURL( post.fields.podcast_video_embed_url ) : '';
        const externalURL = post.fields.podcast_external_url ? post.fields.podcast_external_url : '';
        const podcastHubSpotFormEmbedCode = post.fields.podcast_hubspot_form_embed_code ? post.fields.podcast_hubspot_form_embed_code : '';
        const formTitle = post.fields.podcast_form_title ? post.fields.podcast_form_title : '';
        const customHTML = <PostDetails seriesName={ seriesName } description={ description } />;
        //const schemaPodcastURL = podcastAudioEmbedCode ? podcastAudioEmbedCode : ( podcastVideoEmbedCode ? podcastVideoEmbedCode : externalURL );

        // Hero
        const heroSettings = {
            pretitle: postTypeDisplayName,
            title: title,
            breadcrumbs: post,
            publishDate: publishDate,
            customHTML: customHTML,
            shareBar: true,
            url: url,
        };

        // CTA settings
        const ctaSettings = {
            url: externalURL,
            text: 'Listen to the Podcast',
            classes: [ 'button', 'color-border' ],
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
                         { doLength( podcastVideoEmbedCode ) ? 
                            <Video url={ podcastVideoEmbedCode } id="post-image" />
                         : null }
                         { doLength( podcastAudioEmbedCode ) ? 
                            <span id="post-image">{ podcastAudioEmbedCode }</span>
                         : null }
                         { ! doLength( podcastVideoEmbedCode ) && ! doLength( podcastAudioEmbedCode ) && doLength( image )  ? 
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
                        { externalURL &&
                            <p><CTA { ...ctaSettings } /></p>
                        }
                        { podcastHubSpotFormEmbedCode &&
                            <div className="panel-form-wrapper">
                                <Heading tag={ 'h2' } title={ formTitle } classes={ [ 'text-align-center' ] }/>
                                <RenderHubspotForm options={ podcastHubSpotFormEmbedCode } formID={ postID + '-form' }/>
                            </div>
                        }
                    </section>
                </article>
                <PanelWrapper 
                    panelID="recent-posts-panel" 
                    panelType="archive"
                    classes={ [ 'panel', 'panel-type-archive' ] }
                    heading={ { tag: 'h2', title: 'Recent Podcasts' } }>
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