import React from 'react';
import { useEffect } from 'react';
import { CTASettings } from '@/utils/types/CTASettings';
import { HeroProps } from '@/utils/types/HeroProps';
import { Media } from '@/utils/types/Media';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { doLength, doParse } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
// import CustomCTA from '@/components/shared/CustomCTA';
import Hero from '@/components/shared/Hero';
import Image from '@/components/shared/Image';
import PanelWrapper from '@/components/layout/PanelWrapper';
import PostDetails from '@/components/shared/PostDetails';
import RecentPosts from '@/components/shared/RecentPosts';
import SEOTags from '@/components/shared/SEOTags';
import StructuredData from '@/components/shared/StructuredData';
import '@/styles/pages/single.scss';
import '@/styles/components/blocks.scss';
import '@/styles/components/posts.scss';

const DefaultSingle: React.FC<TemplateProps> = ( {
    post, 
    iframe = false,
    layoutClasses = () => {}
} ): JSX.Element | null => {
    
    if ( doLength( post ) ) {
        const metaPrefix: string = post.post_type_details.meta_prefix;
        // Set content variables
        const title: string = post.fields[ metaPrefix + '_title' ];
        const author: string = post.fields[ metaPrefix + '_author' ] ? post.fields[ metaPrefix + '_author' ] : '';
        const url: string = homeURL + '/' + post.post_type_details.post_type_slug + '/' + post.post_name;
        const image: Media = post.fields[ metaPrefix + '_image' ];
        const imageCredit: string = post.fields[ metaPrefix + '_image_credit' ] ? post.fields[ metaPrefix + '_image_credit' ] : '';
        const description: string = post.fields[ metaPrefix + '_description' ] ? post.fields[ metaPrefix + '_description' ] : '';
        const content: string = post.fields[ metaPrefix + '_content' ] ? post.fields[ metaPrefix + '_content' ] : '';
        const file: string = post.fields[ metaPrefix + '_file' ] ? post.fields[ metaPrefix + '_file' ] : '';
        const downloadButtonText: string = post.fields[ metaPrefix + '_download_button_text' ] ? post.fields[ metaPrefix + '_download_button_text' ] : 'Download';
        //const hideCustomCTAPanel = Boolean( post.fields[ metaPrefix + '_custom_cta_hide_panel' ] );
        //const customCTA = post.fields[ metaPrefix + '_custom_cta' ] ? post.fields[ metaPrefix + '_custom_cta' ] : '';

        // Hero Settings
        const heroSettings: HeroProps = {
            pretitle: post.post_type_details.post_type_display_name,
            title: title,
            breadcrumbs: post,
            customHTML: <PostDetails author={ author } description={ description } />,
            publishDate: post.post_date.formatted,
            shareBar: true,
            url: url,
        }

        // CTA settings
        const ctaSettings: CTASettings = {
            url: file,
            text: downloadButtonText,
            modal: true,
            classes: [ 'solid-button' ],
            id: 'do-download-content',
            iframeName: 'do-downloadable-iframe',
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
                        { file &&
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
                        <RecentPosts postType={ post.post_type_details.post_type } postID={ post.ID } />
                </PanelWrapper>
                { /* <CustomCTA postID={ post.ID } ctaID={ customCTA } hideCTAPanel={ hideCustomCTAPanel } /> */ }
            </>
        );
    } else {
        return null;
    }
}
export default DefaultSingle;