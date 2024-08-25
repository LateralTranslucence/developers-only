const { useEffect } = wp.element;
import { doLength, doParse, doStripTags } from 'src/utils/helpers.js';
import ClientDetails from 'src/components/shared/ClientDetails.js';
import CustomCTA from 'src/components/shared/CustomCTA.js';
import Hero from 'src/components/shared/Hero.js';
import Image from 'src/components/shared/Image.js';
import PanelWrapper from 'src/components/layout/PanelWrapper.js';
import RecentPosts from 'src/components/shared/RecentPosts.js';
import SEOTags from 'src/components/shared/SEOTags.js';
import StructuredData from 'src/components/shared/StructuredData.js';
import 'assets/styles/pages/single.scss';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/posts.scss';

export default function DOPressRelease( props ) {
    const post = props.post;

    if ( doLength( post ) ) {
        // Set post variables
        const postID = post.ID;
        const postTypeRaw = post.post_type_details.post_type;
        const postTypeDisplayName = post.post_type_details.post_type_display_name;
        // Set content variables
        const title = post.fields.press_title;
        const longTitle = post.fields.press_long_title;
        const publishDate = post.post_date.formatted;
        const content = post.fields.press_content;
        const description = post.fields.press_description;
        const image = post.fields.press_image;
        const imageCredit = post.fields.press_image_credit ? post.fields.press_image_credit : '';
        const hideBoilerplate = Boolean( post.fields.press_hide_boilerplate );
        const pressBoilerplate = post.press_boilerplate ? post.press_boilerplate : '';
        const client = post.fields.press_client;
        const hideCustomCTAPanel = Boolean( post.fields.press_custom_cta_hide_panel );
        const customCTA = post.fields.press_custom_cta ? post.fields.press_custom_cta : '';
        const customHTML = doParse( description );

        // Hero
        const heroSettings = {
            pretitle: postTypeDisplayName,
            title: doLength( longTitle ) ? doStripTags( longTitle ) : title,
            breadcrumbs: post,
            publishDate: publishDate,
            customHTML: customHTML,
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
                <article id="content-wrapper" className={ 'container' + ( doLength( client ) ? ' two-column right-rail' : ' one-column' ) }>
                    <section id="main-content">
                        { doLength( image ) ?
                            <>
                                <Image image={ image } size="cinema_1000" id="post-image" />
                                { doLength( imageCredit ) ?
                                    <span className="post-image-credit">{ imageCredit }</span>
                                : null }
                            </> 
                        : null }
                        <div id="post-content">
                            { doParse( content ) }
                        </div>
                        { hideBoilerplate !== true && doLength( pressBoilerplate ) ?
                            doParse( pressBoilerplate )
                        : null }
                    </section>
                    <aside>
                        { doLength( client ) ?
                            <ClientDetails postID ={ postID } client={ client } />
                        : null }
                    </aside>
                </article>
                <PanelWrapper 
                    panelID="recent-posts-panel" 
                    panelType="archive"
                    classes={ [ 'panel', 'panel-type-archive' ] }
                    heading={ { tag: 'h2', title: 'Recent Press Releases' } }>
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