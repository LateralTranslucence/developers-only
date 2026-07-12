import React, { useEffect, useMemo } from 'react';
import { useCurrentPage } from '@/utils/stores/CurrentPage';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { getArrayField, getNumberField, getStringField, sanitizeTitleWithDashes } from '@/utils/helpers';
import Hero from '@/components/shared/Hero';
import Panel from '@/components/shared/Panel';
import SEOTags from '@/components/shared/SEOTags';
import StructuredData from '@/components/shared/StructuredData';
import { HeroProps } from '@/utils/types/HeroProps';
import { CTASettings } from '@/utils/types/CTASettings';
import { Breadcrumbs } from '@/utils/types/Breadcrumbs';


const LandingPage: React.FC<TemplateProps> = ( {
    layoutClasses = () => {},
    post,
} ) => {
    const slug = useCurrentPage( ( state ) => state.slug );
    const fields = useMemo( () => post?.fields ?? {}, [ post ] );
    const metaPrefix: string = post?.post_type_details.meta_prefix ?? '';
    const pageSlug = getStringField( fields, metaPrefix + '_slug', post?.post_name ?? '' );
    const pageID: string = sanitizeTitleWithDashes( pageSlug );
    const pageCSS = getStringField( fields, metaPrefix + '_css' );

    useEffect( () => {
        if ( pageCSS ) {
            import( `@/styles/pages/${ pageCSS }.scss` ).catch( () => {} );
        }
    }, [ pageCSS ] );

    useEffect( () => {
        if ( post && Object.keys( fields ).length > 0 ) {
            // Set classes for <main>
            layoutClasses( [ 'landing-page', post.post_type, pageID ] );
        }
    }, [ fields, layoutClasses, pageID, post, slug ] );

    if ( post && Object.keys( fields ).length > 0 ) {
        const heroSettings: HeroProps = {
            title: getStringField( fields, metaPrefix + '_title' ),
            copy: getStringField( fields, metaPrefix + '_copy' ),
            breadcrumbs: getArrayField<Breadcrumbs>( fields, metaPrefix + '_breadcrumbs' ),
            ctas: getArrayField<CTASettings>( fields, metaPrefix + '_ctas' ),
            classes: [],
            id: 'hero',
        };
        // Panels
        const panels = [];
        for ( let panelIndex = 0; panelIndex < getNumberField( fields, metaPrefix + '_panel_count' ); panelIndex++ ) {
            panels.push( panelIndex + 1 );
        }

        return (
            <>
                <SEOTags post={ post } />
                <StructuredData post={ post } />
                <Hero { ...heroSettings } />
                <article id="contentWrapper">
                    { panels.map( ( panelNumber: number, index: number ) => {
                        return (
                            <Panel 
                                index={ index } 
                                key={ index } 
                                panelNumber={ panelNumber } 
                                panelPrefix={ metaPrefix } 
                                panelSuffix={ post.post_type_details.meta_suffix } 
                                post={ post } />
                        );
                    } ) }
                </article>
            </>
        );
    } else {
        return null;
    }
};
export default LandingPage;
