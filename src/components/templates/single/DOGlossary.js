const { useEffect } = wp.element;
import { useParams } from 'react-router-dom';
import { doLength, doParse } from 'src/utils/helpers.js';
import PanelWrapper from 'src/components/layout/PanelWrapper.js';
import PartialTemplateLoader from 'src/loaders/PartialTemplateLoader.js';
import CTA from 'src/components/shared/CTA.js';
import Hero from 'src/components/shared/Hero.js';
import SEOTags from 'src/components/shared/SEOTags.js';
import SliderNav from 'src/components/shared/SliderNav';
import StructuredData from 'src/components/shared/StructuredData.js';
import 'assets/styles/pages/glossary-term.scss';
import 'assets/styles/pages/single.scss';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/posts.scss';

export default function DOGlossary( props ) {
    const { postType } = useParams();
    const post = props.post;

    if ( doLength( post ) ) {
        const postTypeRaw = post.post_type_details.post_type;
        // Set content variables
        const pretitle = 'Glossary Term';
        const term = post.fields.term_term;
        const termDefinition = post.fields.term_definition;
        const termSource = post.fields.term_source;
        const termRelatedPosts = post.fields.term_related_posts;

        // Hero
        const heroSettings = {
            pretitle: pretitle,
            title: term,
        };

        // CTA settings
        const ctaSettings = {
            url: termSource,
            classes: false,
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
                        { termDefinition ?
                            doParse( termDefinition )
                        : null }
                        { termSource ? 
                            <p id="term-source">
                                <CTA { ...ctaSettings }>Source</CTA>
                            </p>
                        : null }
                    </section>
                </article>
                { doLength( termRelatedPosts ) ? 
                    <PanelWrapper 
                    panelID="glossary-term-related" 
                    panelType="posts"
                    classes={ [ 'panel', 'panel-type-posts', 'color-yellow', 'has-avatar' ] }
                    heading={ { tag: 'h2', title: 'Related Resources' } }>
                        <div className="panel-slider-wrapper" uk-slider="finite: true">
                            <ul className={ 'blocks post three tab-related-content ' + postType + ' ' + 'uk-slider-items ' }>
                            { termRelatedPosts.map( ( post, index ) => {
                                return <PartialTemplateLoader key={ index } index={ index } type="block" post={ post } panelSlider= { true } />
                            } ) }
                            </ul>
                            <SliderNav dotNav={ false } length={ doLength( termRelatedPosts ) } />
                        </div>
                    </PanelWrapper>
                : null }
            </>
        );
    } else {
        return null;
    }
};