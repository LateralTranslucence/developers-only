import React from 'react';
import { useEffect } from 'react';
import { HeroProps } from '@/utils/types/HeroProps';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { doLength, doParse, doStripTags } from '@/utils/helpers';
// import CustomCTA from '@/components/shared/CustomCTA';
import Hero from '@/components/shared/Hero';
import Image from '@/components/shared/Image';
import PanelWrapper from '@/components/layout/PanelWrapper';
import RecentPosts from '@/components/shared/RecentPosts';
import SEOTags from '@/components/shared/SEOTags';
import StructuredData from '@/components/shared/StructuredData';
import '@/styles/pages/single.scss';
import '@/styles/components/blocks.scss';
import '@/styles/components/posts.scss';

const DOPressRelease: React.FC<TemplateProps> = ( {
    post, 
    iframe = false,
    layoutClasses = () => {}
} ): JSX.Element | null => {

    if ( doLength( post ) ) {

        const heroSettings: HeroProps = {
            pretitle: post.post_type_details.post_type_display_name,
            title: doLength( post.fields.press_long_title ) ? doStripTags( post.fields.press_long_title ) : post.fields.press_title,
            breadcrumbs: post,
            publishDate: post.post_date.formatted,
            customHTML: doParse( post.fields.press_description ),
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
                <article id="content-wrapper" className={ 'container' + ( doLength( post.fields.press_client ) ? ' two-column right-rail' : ' one-column' ) }>
                    <section id="main-content">
                        { doLength( post.fields.press_image ) ?
                            <>
                                <Image image={ post.fields.press_image } size="cinema_1000" id="post-image" />
                                { doLength( post.fields.press_image_credit ) ?
                                    <span className="post-image-credit">{ post.fields.press_image_credit }</span>
                                : null }
                            </> 
                        : null }
                        <div id="post-content">
                            { doParse( post.fields.press_content ) }
                        </div>
                        { post.fields.press_hide_boilerplate !== true && post.press_boilerplate ?
                            doParse( post.press_boilerplate )
                        : null }
                    </section>
                </article>
                <PanelWrapper 
                    panelID="recent-posts-panel" 
                    panelType="archive"
                    classes={ [ 'panel', 'panel-type-archive' ] }
                    heading={ { tag: 'h2', title: 'Recent Press Releases' } }>
                        <RecentPosts postType={ post.post_type_details.post_type } postID={ post.ID } />
                </PanelWrapper>
                { /*post.fields.press_custom_cta_hide_panel === false ? 
                    <CustomCTA postID={ post.ID } ctaID={ post.fields.press_custom_cta } hideCTAPanel={ post.fields.press_custom_cta_hide_panel }/>
                : null*/ }
            </>
        )
    } else {
        return null;
    }
}
export default DOPressRelease;