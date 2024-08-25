const { useEffect } = wp.element;
import { doLength, doParse } from 'src/utils/helpers.js';
import CTA from 'src/components/shared/CTA.js';
import CustomCTA from 'src/components/shared/CustomCTA.js';
import Hero from 'src/components/shared/Hero.js';
import Image from 'src/components/shared/Image.js';
import PanelWrapper from 'src/components/layout/PanelWrapper.js';
import PostDetails from 'src/components/shared/PostDetails.js';
import RecentPosts from 'src/components/shared/RecentPosts.js';
import SEOTags from 'src/components/shared/SEOTags.js';
import StructuredData from 'src/components/shared/StructuredData.js';
import 'assets/styles/pages/single.scss';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/posts.scss';

export default function DefaultSingle( props ) {
    const post = props.post;

    if ( doLength( post ) ) {
        const metaPrefix = post.post_type_details.meta_prefix;
        const postTypeRaw = post.post_type_details.post_type;
        const postTypeDisplayName = post.post_type_details.post_type_display_name;
        const postTypeSlug = post.post_type_details.post_type_slug;
        const postID = post.ID;
        // Set content variables
        const title = post.fields[ metaPrefix + '_title' ];
        const author = post.fields[ metaPrefix + '_author' ] ? post.fields[ metaPrefix + '_author' ] : '';
        const publishDate = post.post_date.formatted;
        const url = homeURL + '/' + postTypeSlug + '/' + post.post_name;
        const image = post.fields[ metaPrefix + '_image' ];
        const imageCredit = post.fields[ metaPrefix + '_image_credit' ] ? post.fields[ metaPrefix + '_image_credit' ] : '';
        const description = post.fields[ metaPrefix + '_description' ] ? post.fields[ metaPrefix + '_description' ] : '';
        const content = post.fields[ metaPrefix + '_content' ] ? post.fields[ metaPrefix + '_content' ] : '';
        const file = post.fields[ metaPrefix + '_file' ] ? post.fields[ metaPrefix + '_file' ] : '';
        const downloadButtonText = post.fields[ metaPrefix + '_download_button_text' ] ? post.fields[ metaPrefix + '_download_button_text' ] : 'Download';
        const hideCustomCTAPanel = Boolean( post.fields[ metaPrefix + '_custom_cta_hide_panel' ] );
        const customCTA = post.fields[ metaPrefix + '_custom_cta' ] ? post.fields[ metaPrefix + '_custom_cta' ] : '';
        const customHTML = doParse( description );
        const postAuthor = <PostDetails author={ author }/>;

        // Hero Settings
        const heroSettings = {
            pretitle: postTypeDisplayName,
            title: title,
            breadcrumbs: post,
            postAuthor: postAuthor,
            publishDate: publishDate,
            customHTML: customHTML,
            customHTMLAfter: true,
            shareBar: true,
            url: url,
        };

        // CTA settings
        const ctaSettings = {
            url: file.url,
            text: downloadButtonText,
            modal: true,
            modalClass: true,
            classes: [ 'solid-button' ],
            id: 'do-download-content',
            iframeName: 'do-downloadable-iframe',
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
                        { image &&
                            <>
                                <Image image={ image } size="cinema_1000" id="post-image" />
                                { imageCredit &&
                                    <span className="post-image-credit">{ imageCredit }</span>
                                }
                            </>
                        }
                        { content &&
                            <div id="post-content">
                                { doParse( content ) }
                            </div>
                        }
                        { file.url &&
                            <p id="download" className="panel-cta">
                                <CTA { ...ctaSettings }/>
                            </p>
                        }
                    </section>
                </article>
                <PanelWrapper 
                    panelID="recent-posts-panel"
                    panelType="archive"
                    classes={ [ 'panel', 'panel-type-archive' ] }
                    heading={ { tag: 'h2', title: 'Recent Posts' } }>
                        <RecentPosts postType={ postTypeRaw } postID={ postID } heading={ postTypeDisplayName }/>
                </PanelWrapper>
                <CustomCTA postID={ postID } ctaID={ customCTA } hideCTAPanel={ hideCustomCTAPanel }/>
            </>
        );
    } else {
        return null;
    }
}
