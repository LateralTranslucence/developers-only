import React from 'react';
import { useEffect } from 'react';
import { HeroProps } from '@/utils/types/HeroProps';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { doLength, doParse } from '@/utils/helpers';
import Heading from '@/components/shared/Heading';
import Hero from '@/components/shared/Hero';
import RecentPosts from '@/components/shared/RecentPosts';
import SEOTags from '@/components/shared/SEOTags';
import StructuredData from '@/components/shared/StructuredData';
import '@/styles/components/blocks.scss';
import '@/styles/pages/legal.scss';
import '@/styles/components/posts.scss';
import '@/styles/pages/single.scss';

const DOLegal: React.FC<TemplateProps> = ( {
    post, 
    iframe = false,
    layoutClasses = () => {}
} ): JSX.Element | null => {

    if ( doLength( post ) ) {        

        useEffect( () => {
            // Set classes for <main>
            layoutClasses( [ 'single-content-item', 'single-' + post.post_type_details.post_type ] );
        }, [] );

        const LegalPostDetails: React.FC = (): JSX.Element => {
            return(
                <div id="post-details">
                    { post.fields.legal_effective_date &&
                    <p>Effective Date <b>{ post.fields.legal_effective_date.formatted }</b></p>
                    }
                    { post.fields.legal_last_updated_date && 
                    <p> Last Modified <b>{ post.fields.legal_last_updated_date.formatted }</b></p>
                    }
                    { post.fields.legal_last_updated_change &&
                    <p><i>{ post.fields.legal_last_updated_change }</i></p>
                    }
                </div>
            )
        }

        // Hero
        const heroSettings: HeroProps = {
            pretitle: 'Legal',
            title: post.fields.legal_title,
            breadcrumbs: post,
            customHTML: <LegalPostDetails />,
        }

        return (
            <>
                <SEOTags post={ post } />
                <StructuredData post={ post } />
                <Hero { ...heroSettings } />
                <article id="content-wrapper" className="container two-column right-rail">
                    <section id="main-content">
                       { doParse( post.fields.legal_content ) }
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
}
export default DOLegal;