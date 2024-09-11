import React from 'react';
const { useEffect } = wp.element;
import { HeroProps } from 'src/utils/types/HeroProps';
import { TemplateProps } from 'src/utils/types/TemplateProps';
import { doLength, doParse } from 'src/utils/helpers';
// import CustomCTA from 'src/components/shared/CustomCTA';
import Gated from 'src/components/shared/Gated';
import Hero from 'src/components/shared/Hero';
import Image from 'src/components/shared/Image';
import PanelWrapper from 'src/components/layout/PanelWrapper';
import RecentPosts from 'src/components/shared/RecentPosts';
import SEOTags from 'src/components/shared/SEOTags';
import StructuredData from 'src/components/shared/StructuredData';
import 'assets/styles/pages/single.scss';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/posts.scss';

const DOWhitePaper: React.FC<TemplateProps> = ( {
    post, 
    iframe = false,
    layoutClasses = () => {}
} ): JSX.Element | null => {

    if ( doLength( post ) ) {

        const heroSettings: HeroProps = {
            pretitle: post.post_type_details.post_type_display_name,
            title: post.fields.paper_title,
            breadcrumbs: post,
            publishDate: post.post_date.formatted,
            customHTML: doParse( post.fields.paper_description ),
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
                        { post.fields.paper_image ?
                            <>
                                <Image image={ post.fields.paper_image } size="cinema_1000" id="post-image" />
                                { post.fields.paper_image_credit &&
                                    <span className="post-image-credit">{ post.fields.paper_image_credit }</span>
                                }
                            </> 
                        : null }
                        <div id="post-content">
                            { doParse( post.fields.paper_content ) }
                        </div>
                        { post.fields.paper_file &&
                            <Gated post={ post } iframe={ iframe } />
                        }
                    </section>
                </article>
                <PanelWrapper 
                    panelID="recent-posts-panel" 
                    panelType="archive"
                    classes={ [ 'panel', 'panel-type-archive' ] }
                    heading={ { tag: 'h2', title: 'Recent White Papers' } }>
                        <RecentPosts postType={ post.post_type_details.post_type } postID={ post.ID } />
                </PanelWrapper>
                { /*post.fields.paper_custom_cta_hide_panel === false ? 
                    <CustomCTA postID={ post.ID } ctaID={ post.fields.paper_custom_cta } hideCTAPanel={ post.fields.paper_custom_cta_hide_panel }/>
                : null*/ }
            </>
        )
    } else {
        return null;
    }
}
export default DOWhitePaper;