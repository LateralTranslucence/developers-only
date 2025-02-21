import React from 'react';
import { lazy, useEffect } from 'react';
import { TemplateLoaderProps } from '@/utils/types/TemplateLoaderProps';
import { doLength, doSanitizeTitleWithDashes } from '@/utils/helpers';
import Hero from '@/components/shared/Hero';
import HeroPromo from '@/components/shared/HeroPromo';
const FeaturedPost = lazy( () => import( '@/components/panels/FeaturedPost' ) );
const Form = lazy( () => import( '@/components/panels/Form' ) );
import Panel from '@/components/shared/Panel';
import SEOTags from '@/components/shared/SEOTags';
import StructuredData from '@/components/shared/StructuredData';
import { HeroProps } from '@/utils/types/HeroProps';
import { PanelProps } from '@/utils/types/PanelProps';

const LandingPage: React.FC<TemplateLoaderProps> = ( {
    iframe = false,
    layoutClassesFunction = ( classes: Array<string> ) => {},
    post,
    postType,
    queryString,
    slug,
} ) => {
    
    if ( post && doLength( post.fields ) ) {
        const metaPrefix: string = post.post_type_details.meta_prefix;
        const pageID: string = post.fields[ metaPrefix + '_slug' ].length ? doSanitizeTitleWithDashes( post.fields[ metaPrefix + '_slug' ] ) : doSanitizeTitleWithDashes( post.post_name );

        const heroSettings: HeroProps = {
            title: post.fields[ metaPrefix + '_title' ],
            copy: post.fields[ metaPrefix + '_copy' ],
            media: post.fields[ metaPrefix + '_media' ],
            mediaLoop: post.fields[ metaPrefix + '_media_loop' ],
            imageLink: post.fields[ metaPrefix + '_image_link' ],
            backgroundSettings: post.fields[ metaPrefix + '_background' ],
            ctas: post.fields[ metaPrefix + '_cta' ] ? post.fields[ metaPrefix + '_cta' ] : [],
            id: 'hero',
            classes: [],
            breadcrumbs: post,
        }

        // Check for additional hero items
        const pageHeroPromo: boolean = Boolean( doLength( post.fields[ metaPrefix + '_promo' ] ) );
        const pageFeatured: boolean = post.fields[ metaPrefix + '_panel_type_1' ] === 'featured-post' && Boolean( post.fields[ metaPrefix + '_overlay_hero_1' ] ) && ! Boolean( post.fields[ metaPrefix + '_hide_panel_1' ] );
        const pageForm: boolean = post.fields[ metaPrefix + '_panel_type_1' ] === 'form' && Boolean( post.fields[ metaPrefix + '_overlay_hero_1' ] )  && ! Boolean( post.fields[ metaPrefix + '_hide_panel_1' ] );
        // Add them, in priority order
        // 1) Promo
        if ( pageHeroPromo ) {
            // Load promo into Hero         
            heroSettings.customHTMLAfter = <HeroPromo promo={ post.fields[ metaPrefix + '_promo' ] } countdown={ post.fields[ metaPrefix + '_promo_countdown_date' ] } />;
        }
        // 2) Featured Post
        else if ( pageFeatured ) {
            // Settings for Featured Panel
            const featuredPanelParams: PanelProps = {
                post: post,
                panelNumber: 1,
                panelPrefix: metaPrefix,
                panelSuffix: '_1',
                pageID: pageID,
                panelID: 'featured-post',
            }
            // Load featured panel into Hero         
            heroSettings.customHTMLAfter = <FeaturedPost { ...featuredPanelParams } />;
            // Add has-featured class to hero
            if ( heroSettings.classes ) {
                heroSettings.classes.push( 'has-featured' );
            }
        }
        // 3) Form
        else if ( pageForm ) {
            // Settings for inline Form
            const formPanelParams: PanelProps = {
                post: post,
                panelNumber: 1,
                panelPrefix: metaPrefix,
                panelSuffix: '_1',
                pageID: pageID,
                panelID: 'hero-form',
            }
            // Load form into Hero         
            heroSettings.customHTMLAfter = <Form { ...formPanelParams } />;
            // Add has-featured class to hero
            if ( heroSettings.classes ) {
                heroSettings.classes.push( 'has-form' );
            }
        }

        // Panels
        const panels = [];
        for ( let panelIndex = 0; panelIndex < post.fields[ metaPrefix + '_panel_count' ]; panelIndex++ ) {
            panels.push( panelIndex + 1 )
        }
        
        useEffect( () => {
            // Set classes for <main>
            layoutClassesFunction( [ 'landing-page', post.post_type, pageID ] );
        }, [ pageID ] );
        
        return (
            <>
                <SEOTags post={ post } />
                <StructuredData post={ post } />
                <Hero { ...heroSettings } />
                <article id="content-wrapper">
                    { panels.map( ( panelNumber: number, index: number ) => {
                            return <Panel 
                                index={ index } 
                                key={ index } 
                                panelNumber={ panelNumber } 
                                panelPrefix={ metaPrefix } 
                                panelSuffix={ post.post_type_details.meta_suffix } 
                                pageCSS={ post.fields[ metaPrefix + '_css' ] }
                                pageID={ pageID } 
                                post={ post } />
                    } ) }
                </article>
            </>
        )
    } else {
        return null;
    }
}
export default LandingPage;