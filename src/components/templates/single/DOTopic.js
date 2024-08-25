const { useEffect } = wp.element;
import { doLength, doParse, doSanitizeTitleWithDashes } from 'src/utils/helpers.js';
import CTA from 'src/components/shared/CTA.js';
import CustomCTA from 'src/components/shared/CustomCTA.js';
import Heading from 'src/components/shared/Heading.js';
import Hero from 'src/components/shared/Hero.js';
import Image from 'src/components/shared/Image.js';
import PanelWrapper from 'src/components/layout/PanelWrapper.js';
import RecentPosts from 'src/components/shared/RecentPosts.js';
import SEOTags from 'src/components/shared/SEOTags.js';
import StructuredData from 'src/components/shared/StructuredData.js';
import 'assets/styles/pages/single.scss';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/posts.scss';
import 'assets/styles/pages/topic.scss';

export default function DOTopic( props ) {
    const post = props.post;

    if ( doLength( post ) ) {
        // Set post variables
        const postID = post.ID;
        const postTypeRaw = post.post_type_details.post_type;
        const postTypeDisplayName = post.post_type_details.post_type_display_name;
        const postTypeSlug = post.post_type_details.post_type_slug;
        const metaPrefix = post.post_type_details.meta_prefix + '_';
        // Set content variables
        const title = post.fields.topic_page_title;
        const publishDate = post.post_date.formatted;
        const description = post.fields.topic_description;
        const image = post.fields.topic_image;
        const imageCredit = post.fields.topic_image_credit ? post.fields.topic_image_credit : null;
        const sectionCount = post.fields.topic_section_count ? post.fields.topic_section_count : 0;
        let content = '';
        const topicContentPrefix = metaPrefix + 'content_';
        for ( let i = 0; i < sectionCount; i++ ) {
            content += post.fields[ topicContentPrefix + ( i + 1 ) ];
        }
        let sections = [];
        for ( let sectionIndex = 0; sectionIndex < sectionCount; sectionIndex++ ) {
            sections.push( sectionIndex + 1 );
        }
        const hideCustomCTAPanel = Boolean( post.fields.topic_custom_cta_hide_panel );
        const customCTA = post.fields.topic_custom_cta ? post.fields.topic_custom_cta : '';
        const url = homeURL + '/' + postTypeSlug + '/' + post.post_name;
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
            url: url,
        };

        useEffect( () => {
            // Set classes for <main>
            props.layoutClasses( [ 'single-content-item', 'single-' + postTypeRaw ] );
        }, [] );

        // Section content component
        function TopicSection( props ) {
            return (
                <>
                <Heading tag={ 'h2' } title={ props.title } id={ props.id }/>
                { doParse( props.content ) }
                </>
            );
        }

        return (
            <>
                <SEOTags post={ post } />
                <StructuredData post={ post } />
                <Hero { ...heroSettings } />
                <article id="content-wrapper" className="container two-column right-rail">
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
                            { sections.map( ( sectionNumber, index ) => {
                                const sectionTitle = post.fields[ metaPrefix + 'title_' + sectionNumber ]
                                const sectionContent = post.fields[ metaPrefix + 'content_' + sectionNumber ];
                                const sectionID = doSanitizeTitleWithDashes( sectionTitle );
                                return (
                                    <TopicSection key={ index } title={ sectionTitle } content={ sectionContent } id={ sectionID }/>
                                );
                            } ) }
                        </div>
                    </section>
                    <nav>
                        <div className="color-navy">
                            <Heading tag={ 'h2' } title={ 'Table of Contents' }/>
                            <ul id="topic-nav" className="blocks post">
                            { sections.map( ( sectionNumber, index ) => {
                                const sectionTitle = post.fields[ metaPrefix + 'title_' + sectionNumber ]
                                const sectionID = doSanitizeTitleWithDashes( sectionTitle );
                                if ( doLength( sectionTitle ) ) {
                                    return (
                                        <li key={ index }>
                                            <CTA url={ '#' + sectionID } classes={ [ 'block-link' ] }>
                                                { sectionTitle }
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