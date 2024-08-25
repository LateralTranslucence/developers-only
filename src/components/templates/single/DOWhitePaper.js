const { useEffect } = wp.element;
import { doLength, doParse } from 'src/utils/helpers.js';
import CustomCTA from 'src/components/shared/CustomCTA.js';
import Gated from 'src/components/shared/Gated.js';
import Hero from 'src/components/shared/Hero.js';
import Image from 'src/components/shared/Image.js';
import PanelWrapper from 'src/components/layout/PanelWrapper.js';
import RecentPosts from 'src/components/shared/RecentPosts.js';
import SEOTags from 'src/components/shared/SEOTags.js';
import StructuredData from 'src/components/shared/StructuredData.js';
import 'assets/styles/pages/single.scss';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/posts.scss';

export default function DOWhitePaper( props ) {
    const post = props.post;

    if ( doLength( post ) ) {
        // Set post variables
        const postID = post.ID;
        const postTypeRaw = post.post_type_details.post_type;
        const postTypeDisplayName = post.post_type_details.post_type_display_name;
        const postTypeSlug = post.post_type_details.post_type_slug;
        // Set content variables
        const title = post.fields.paper_title;
        const publishDate = post.post_date.formatted;
        const content = post.fields.paper_content;
        const description = post.fields.paper_description;
        const image = post.fields.paper_image;
        const imageCredit = post.fields.paper_image_credit ? post.fields.paper_image_credit : '';
        const url = homeURL + '/' + postTypeSlug + '/' + post.post_name;
        const file = post.fields.paper_file ? post.fields.paper_file : '';
        const hideCustomCTAPanel = Boolean( post.fields.paper_custom_cta_hide_panel );
        const customCTA = post.fields.paper_custom_cta ? post.fields.paper_custom_cta : '';
        const customHTML = doParse( description );
        // Gated props
        const gated = {
            post: post,
        }

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
                        { file &&
                            <Gated { ...gated } />
                        }
                    </section>
                </article>
                <PanelWrapper 
                    panelID="recent-posts-panel" 
                    panelType="archive"
                    classes={ [ 'panel', 'panel-type-archive' ] }
                    heading={ { tag: 'h2', title: 'Recent White Papers' } }>
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