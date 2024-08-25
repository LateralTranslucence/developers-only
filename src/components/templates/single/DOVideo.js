const { useEffect } = wp.element;
import { doLength, doParse } from 'src/utils/helpers.js';
import CustomCTA from 'src/components/shared/CustomCTA.js';
import Hero from 'src/components/shared/Hero.js';
import PanelWrapper from 'src/components/layout/PanelWrapper.js';
import RecentPosts from 'src/components/shared/RecentPosts.js';
import SEOTags from 'src/components/shared/SEOTags.js';
import StructuredData from 'src/components/shared/StructuredData.js';
import Video from 'src/components/shared/Video.js';
import 'assets/styles/pages/single.scss';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/posts.scss';

export default function DOVideo( props ) {
    const post = props.post;

    if ( doLength( post ) ) {
        // Set post variables
        const postID = post.ID;
        const postTypeRaw = post.post_type_details.post_type;
        const postTypeDisplayName = post.post_type_details.post_type_display_name;
        const postTypeSlug = post.post_type_details.post_type_slug;
        // Set content variables
        const title = post.fields.video_title ? post.fields.video_title : '';
        const publishDate = post.post_date.formatted ? post.post_date.formatted : '';
        const description = post.fields.video_description ? post.fields.video_description : '';
        const content = post.fields.video_content;
        const embedURL = post.fields.video_embed_url ? post.fields.video_embed_url : '';
        const hideCustomCTAPanel = Boolean( post.fields.video_custom_cta_hide_panel );
        const customCTA = post.fields.video_custom_cta ? post.fields.video_custom_cta : '';
        const customHTML = doParse( description );
        const url = homeURL + '/' + postTypeSlug + '/' + post.post_name;

        // Video Data Attrs
        const videoDataAttr = { 
            'src': embedURL, 
        };

        // Hero
        const heroSettings = {
            pretitle: postTypeDisplayName,
            title: title,
            breadcrumbs: post,
            publishDate: publishDate,
            customHTML: customHTML,
            customHTMLAfter: true,
            shareBar: true,
            url: url,
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
                        <Video url={ embedURL } videoDataAttr={ videoDataAttr } id="post-image" />
                        <div id="post-content">
                            { doParse( content ) }
                        </div>
                    </section>
                </article>
                <PanelWrapper 
                    panelID="recent-posts-panel" 
                    panelType="archive"
                    classes={ [ 'panel', 'panel-type-archive' ] }
                    heading={ { tag: 'h2', title: 'Recent Videos' } }>
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