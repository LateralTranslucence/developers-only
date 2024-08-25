const { useEffect } = wp.element;
import { doLength, doParse } from 'src/utils/helpers.js';
import CustomCTA from 'src/components/shared/CustomCTA.js';
import CTA from 'src/components/shared/CTA.js';
import Hero from 'src/components/shared/Hero.js';
import Image from 'src/components/shared/Image.js';
import PanelWrapper from 'src/components/layout/PanelWrapper.js';
import RecentPosts from 'src/components/shared/RecentPosts.js';
import SEOTags from 'src/components/shared/SEOTags.js';
import StructuredData from 'src/components/shared/StructuredData.js';
import 'assets/styles/pages/single.scss';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/posts.scss';

export default function DOMediaCoverage( props ) {
    const post = props.post;

    if ( doLength( post ) ) {
        // Set post variables
        const postID = post.ID;
        const postTypeRaw = post.post_type_details.post_type;
        const postTypeDisplayName = post.post_type_details.post_type_display_name;
        // Set content variables
        const title = post.fields.media_title;
        const publishDate = post.post_date.formatted;
        const content = post.fields.media_content;
        const description = post.fields.media_description;
        const url = post.fields.media_url;
        const image = post.fields.media_image;
        const imageCredit = post.fields.media_image_credit ? post.fields.media_image_credit : '';
        const hideCustomCTAPanel = Boolean( post.fields.media_custom_cta_hide_panel );
        const customCTA = post.fields.media_custom_cta ? post.fields.media_custom_cta : '';
        const customHTML = doParse( description );

        // Hero
        const heroSettings = {
            pretitle: postTypeDisplayName,
            title: title,
            breadcrumbs: post,
            publishDate: publishDate,
            customHTML: customHTML,
            customHTMLAfter: true,
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
                            { doLength( url ) ?
                                <CTA url={ url } classes="solid-button" text="Read the Article" />
                            : null }
                        </div>
                    </section>
                </article>
                <PanelWrapper 
                    panelID="recent-posts-panel" 
                    panelType="archive"
                    classes={ [ 'panel', 'panel-type-archive' ] }
                    heading={ { tag: 'h2', title: 'Recent Media Coverage' } }>
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