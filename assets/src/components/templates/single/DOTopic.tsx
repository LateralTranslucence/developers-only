import React from 'react';
import { useEffect } from 'react';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { doLength, doParse, doSanitizeTitleWithDashes } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
// import CustomCTA from '@/components/shared/CustomCTA';
import Heading from '@/components/shared/Heading';
import Hero from '@/components/shared/Hero';
import Image from '@/components/shared/Image';
import PanelWrapper from '@/components/layout/PanelWrapper';
import RecentPosts from '@/components/shared/RecentPosts';
import SEOTags from '@/components/shared/SEOTags';
import StructuredData from '@/components/shared/StructuredData';
import '@/styles/pages/single.scss';
import '@/styles/components/blocks.scss';
import '@/styles/components/posts.scss';
import '@/styles/pages/topic.scss';
import { HeroProps } from '@/utils/types/HeroProps';

const DOTopic: React.FC<TemplateProps> = ( {
    post, 
    iframe = false,
    layoutClasses = () => {}
} ): JSX.Element | null => {

    if ( doLength( post ) ) {

        // Set content variables
        const sectionCount: number = post.fields.topic_section_count ? post.fields.topic_section_count : 0;
        //const content: string = Array.from( { length: sectionCount }, (_, i) => post.fields['topic_content_' + ( i + 1) ] ).join('');
        const sections: Array<number> = Array.from( { length: sectionCount }, ( _, i ) => i + 1 );

        // Hero
        const heroSettings: HeroProps = {
            pretitle: post.post_type_details.post_type_display_name,
            title: post.fields.topic_page_title,
            breadcrumbs: post,
            publishDate: post.post_date.formatted,
            customHTML: doParse( post.fields.topic_description ),
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
                <article id="content-wrapper" className="container two-column right-rail">
                    <section id="main-content">
                        { post.fields.topic_image ?
                            <>
                                <Image image={ post.fields.topic_image } size="cinema_1000" id="post-image" />
                                { post.fields.topic_image_credit &&
                                    <span className="post-image-credit">{ post.fields.topic_image_credit }</span>
                                }
                            </> 
                        : null }
                        <div id="post-content">
                            { sections.map( ( sectionNumber: number, index: number ) => {
                                return (
                                    <>
                                    <Heading tag={ 'h2' } title={ post.fields[ 'topic_title_' + sectionNumber ] } id={ doSanitizeTitleWithDashes( post.fields[ 'topic_title_' + sectionNumber ] ) } />
                                    { doParse( post.fields[ 'topic_content_' + sectionNumber ] ) }
                                    </>
                                )
                            } ) }
                        </div>
                    </section>
                    <nav>
                        <div className="color-navy">
                            <Heading tag={ 'h2' } title={ 'Table of Contents' }/>
                            <ul id="topic-nav" className="blocks post">
                            { sections.map( ( sectionNumber: number, index: number ) => {
                                if ( doLength( post.fields[ 'topic_title_' + sectionNumber ] ) ) {
                                    return (
                                        <li key={ index }>
                                            <CTA url={ '#' + doSanitizeTitleWithDashes( post.fields[ 'topic_title_' + sectionNumber ] ) } classes={ [ 'block-link' ] }>
                                                { post.fields[ 'topic_title_' + sectionNumber ] }
                                            </CTA>
                                        </li>  
                                    );
                                } else {
                                    return null;
                                }
                            } ) }
                            </ul>
                        </div>
                    </nav>
                </article>
                <PanelWrapper 
                    panelID="recent-posts-panel" 
                    panelType="archive"
                    classes={ [ 'panel', 'panel-type-archive' ] }
                    heading={ { tag: 'h2', title: 'Recent Topics' } }>
                        <RecentPosts postType={ post.post_type_details.post_type } postID={ post.ID } />
                </PanelWrapper>
                { /*post.fields.topic_custom_cta_hide_panel === false ? 
                    <CustomCTA postID={ post.ID } ctaID={ post.fields.topic_custom_cta } hideCTAPanel={ post.fields.topic_custom_cta_hide_panel }/>
                : null*/ }
            </>
        );
    } else {
        return null;
    }
}
export default DOTopic;