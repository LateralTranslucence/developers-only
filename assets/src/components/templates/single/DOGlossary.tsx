import React from 'react';
import { useEffect } from 'react';
import { CTASettings } from '@/utils/types/CTASettings';
import { HeroProps } from '@/utils/types/HeroProps';
import { Post } from '@/utils/types/Post';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { doLength, doParse } from '@/utils/helpers';
import PanelWrapper from '@/components/layout/PanelWrapper';
import PartialTemplateLoader from '@/loaders/PartialTemplateLoader';
import CTA from '@/components/shared/CTA';
import Hero from '@/components/shared/Hero';
import SEOTags from '@/components/shared/SEOTags';
import SliderNav from '@/components/shared/SliderNav';
import StructuredData from '@/components/shared/StructuredData';
import '@/styles/pages/glossary-term.scss';
import '@/styles/pages/single.scss';
import '@/styles/components/blocks.scss';
import '@/styles/components/posts.scss';

const DOGlossary: React.FC<TemplateProps> = ( {
    post, 
    iframe = false,
    layoutClasses = () => {}
} ): JSX.Element | null => {

    if ( doLength( post ) ) {

        // Hero
        const heroSettings: HeroProps = {
            pretitle: 'Glossary Term',
            title: post.fields.term_term,
        }

        // CTA settings
        const ctaSettings: CTASettings = {
            url: post.fields.term_source,
            classes: [],
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
                        { post.fields.term_definition ?
                            doParse( post.fields.term_definition )
                        : null }
                        { post.fields.term_source ? 
                            <p id="term-source">
                                <CTA { ...ctaSettings }>Source</CTA>
                            </p>
                        : null }
                    </section>
                </article>
                { doLength( post.fields.term_related_posts ) ? 
                    <PanelWrapper 
                    panelID="glossary-term-related" 
                    panelType="posts"
                    classes={ [ 'panel', 'panel-type-posts', 'color-yellow', 'has-avatar' ] }
                    heading={ { tag: 'h2', title: 'Related Resources' } }>
                        <div className="panel-slider-wrapper" uk-slider="finite: true">
                            <ul className={ 'blocks post three tab-related-content ' + post.post_type + ' ' + 'uk-slider-items ' }>
                            { post.fields.term_related_posts.map( ( post: Post, index: number ) => {
                                return <PartialTemplateLoader key={ index } index={ index } type="block" post={ post } panelSlider= { true } />
                            } ) }
                            </ul>
                            <SliderNav dotNav={ false } length={ doLength( post.fields.term_related_posts ) } />
                        </div>
                    </PanelWrapper>
                : null }
            </>
        )
    } else {
        return null;
    }
}
export default DOGlossary;