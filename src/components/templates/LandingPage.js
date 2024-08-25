const { useEffect } = wp.element;
import { doLength, doSanitizeTitleWithDashes } from 'src/utils/helpers.js';
import colors from 'src/utils/fields/colors.js';
import Hero from 'src/components/shared/Hero.js';
import HeroPromo from 'src/components/shared/HeroPromo.js';
import FeaturedPost from 'src/templates/panels/FeaturedPost.js';
import Form from 'src/templates/panels/Form.js';
import Panel from 'src/templates/Panel.js';
import TableOfContents from 'src/templates/panels/inc/TableOfContents.js';
import SEOTags from 'src/components/shared/SEOTags.js';
import StructuredData from 'src/components/shared/StructuredData.js';

export default function LandingPage( props ) {
    const post = props.post;
    
    if ( post && doLength( post.fields ) ) {
        const metaPrefix = post.post_type_details.meta_prefix;
        const pagePostType = post.post_type;
        // Page
        const pageID = post.fields[ metaPrefix + '_slug' ].length ? doSanitizeTitleWithDashes( post.fields[ metaPrefix + '_slug' ] ) : doSanitizeTitleWithDashes( post.post_name );
        const pageCSS = post.fields[ metaPrefix + '_css' ];
        
        const pageTableOfContents = [];

        // Settings
        const heroSettings = {
            title: post.fields[ metaPrefix + '_title' ],
            copy: post.fields[ metaPrefix + '_copy' ],
            media: post.fields[ metaPrefix + '_media' ],
            mediaLoop: post.fields[ metaPrefix + '_media_loop' ],
            imageLink: post.fields[ metaPrefix + '_image_link' ],
            backgroundSettings: post.fields[ metaPrefix + '_background' ],
            cta: post.fields[ metaPrefix + '_cta' ] ? post.fields[ metaPrefix + '_cta' ] : [],
            id: 'hero',
            classes: [],
            breadcrumbs: post,
        };

        // Check for additional hero items
        const pageHeroPromo = doLength( post.fields[ metaPrefix + '_promo' ] );
        const pageFeatured = post.fields[ metaPrefix + '_panel_type_1' ] === 'featured-post' && Boolean( post.fields[ metaPrefix + '_overlay_hero_1' ] ) && ! Boolean( post.fields[ metaPrefix + '_hide_panel_1' ] );
        const pageForm = post.fields[ metaPrefix + '_panel_type_1' ] === 'form' && Boolean( post.fields[ metaPrefix + '_overlay_hero_1' ] )  && ! Boolean( post.fields[ metaPrefix + '_hide_panel_1' ] );
        // Add them, in priority order
        // 1) Promo
        if ( pageHeroPromo ) {
            // Load promo into Hero         
            heroSettings.customHTMLAfter = <HeroPromo promo={ post.fields[ metaPrefix + '_promo' ] } countdown={ post.fields[ metaPrefix + '_promo_countdown_date' ] } />;
        }
        // 2) Featured Post
        else if ( pageFeatured ) {
            // Settings for Featured Panel
            const featuredPanelParams = {
                data: post,
                panelNumber: 1,
                panelPrefix: metaPrefix,
                panelSuffix: '_1',
                pageID: pageID,
            };
            // Load featured panel into Hero         
            heroSettings.customHTMLAfter = <FeaturedPost { ...featuredPanelParams } />;
            // Add has-featured class to hero
            heroSettings.classes.push( 'has-featured' );
        }
        // 3) Form
        else if ( pageForm ) {
            // Settings for Featured Panel
            const formPanelParams = {
                data: post,
                panelNumber: 1,
                panelPrefix: metaPrefix,
                panelSuffix: '_1',
                pageID: pageID,
            };
            // Load featured panel into Hero         
            heroSettings.customHTMLAfter = <Form { ...formPanelParams } />;
            // Add has-featured class to hero
            heroSettings.classes.push( 'has-form' );
        }

        // Panels
        const panelCount = post.fields[ metaPrefix + '_panel_count' ];
        const panels = [];
        for ( let panelIndex = 0; panelIndex < panelCount; panelIndex++ ) {
            panels.push( panelIndex + 1 )
        }

        const classes = [ 'landing-page', pagePostType, pageID ];
        
        useEffect( () => {
            // Set classes for <main>
            props.layoutClasses( classes );
        }, [ pageID ] );
        
        return (
            <>
                <SEOTags post={ post } />
                <StructuredData post={ post } />
                <Hero { ...heroSettings } />
                <article id="content-wrapper">
                    { panels.map( ( panelNumber, index ) => {
                            { // If this panel is included in a Table of Contents
                            const panelHasTableOfContents = Boolean( post.fields[ metaPrefix + '_table_of_contents_' + panelNumber ] );
                            if ( panelHasTableOfContents ) {
                                const panelTitle = post.fields[ metaPrefix + '_title_' + panelNumber ];
                                const panelID = post.fields[ metaPrefix + '_panel_id_' + panelNumber ] ? post.fields[ metaPrefix + '_panel_id_' + panelNumber ] : doSanitizeTitleWithDashes( panelTitle );
                                const panelBackgroundSettings = post.fields[ metaPrefix + '_background_' + panelNumber ];
                                let tocColor;
                                if ( ! panelBackgroundSettings || ! panelBackgroundSettings.color ) {
                                    const filteredColors = colors.filter( function( color ) {
                                        const notGray = ! Boolean( color.gray );
                                        const notDark = ! Boolean( color.dark );
                                        return notGray && notDark;
                                    } );
                                    tocColor = filteredColors[ Math.random() * ( filteredColors.length - 1 ) ];
                                } else {
                                    tocColor = panelBackgroundSettings.color;
                                }
                                pageTableOfContents.push( {
                                    label: panelTitle,
                                    anchor: '#' + panelID,
                                    color: tocColor,
                                } );
                            } }
                            return <Panel post={ post } panelNumber={ panelNumber } metaPrefix={ metaPrefix } key={ index } index={ index } pageID={ pageID } pageCSS={ pageCSS } />
                    } ) }
                    { /* TODO:
                    if ( pageContentSurvey ) {
                        <ContentSurvey id={ post.ID } type="panel" />
                    } */
                    doLength( pageTableOfContents ) ?
                        <TableOfContents toc={ pageTableOfContents } file={ post.fields[ metaPrefix + '_file' ] } />
                    : null }
                </article>
            </>
        );
    } else {
        return null;
    }
}