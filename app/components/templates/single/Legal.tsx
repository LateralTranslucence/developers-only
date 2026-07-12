import React from 'react';
import { useEffect } from 'react';
import { HeroProps } from '@/utils/types/HeroProps';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { getObjectField, getStringField, length, parse } from '@/utils/helpers';
import Heading from '@/components/shared/Heading';
import Hero from '@/components/shared/Hero';
import RecentPosts from '@/components/shared/RecentPosts';
import SEOTags from '@/components/shared/SEOTags';
import StructuredData from '@/components/shared/StructuredData';
import { DateTime } from '@/utils/types/DateTime';
import '@/styles/components/blocks.scss';
import '@/styles/pages/legal.scss';
import '@/styles/components/posts.scss';
import '@/styles/pages/single.scss';

const Legal: React.FC<TemplateProps> = ( {
    post,
    layoutClasses = () => {}
} ): JSX.Element | null => {

    useEffect( () => {
        // Set classes for <main>
        if ( length( post ) ) {
            layoutClasses( [ 'single-content-item', 'single-' + post.post_type_details.post_type ] );
        }
    }, [ post, layoutClasses ] );

    if ( length( post ) ) {

        const legalEffectiveDate = getObjectField<DateTime>( post.fields, 'legal_effective_date' );
        const legalLastUpdatedDate = getObjectField<DateTime>( post.fields, 'legal_last_updated_date' );
        const legalLastUpdatedChange = getStringField( post.fields, 'legal_last_updated_change' );

        const LegalPostDetails: React.FC = (): JSX.Element => {
            return(
                <div id="post-details">
                    { legalEffectiveDate.formatted &&
                    <p>Effective Date <b>{ legalEffectiveDate.formatted }</b></p>
                    }
                    { legalLastUpdatedDate.formatted &&
                    <p> Last Modified <b>{ legalLastUpdatedDate.formatted }</b></p>
                    }
                    { legalLastUpdatedChange &&
                    <p><i>{ legalLastUpdatedChange }</i></p>
                    }
                </div>
            );
        };

        // Hero
        const heroSettings: HeroProps = {
            pretitle: 'Legal',
            title: getStringField( post.fields, 'legal_title' ),
            breadcrumbs: post.post_type_details.breadcrumbs,
            customHTML: <LegalPostDetails />,
        };

        return (
            <>
                <SEOTags post={ post } />
                <StructuredData post={ post } />
                <Hero { ...heroSettings } />
                <article id="content-wrapper" className="container two-column right-rail">
                    <section id="main-content">
                       { parse( getStringField( post.fields, 'legal_content' ) ) }
                    </section>
                    <aside id="legal-index">
                        <div className="legal-index-wrapper color-navy">
                            <Heading tag={ 'h2' } title={ 'Legal Index' } /> 
                            <RecentPosts postID={ post.ID } type="text" postType={ post.post_type } count={ 50 } slider={ false } />
                        </div>
                    </aside>
                </article>
            </>
        );
    } else {
        return null;
    }
};
export default Legal;