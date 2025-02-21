
import React from 'react';
import { useEffect } from 'react';
import { HeroProps } from '@/utils/types/HeroProps';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { doLength, doParse } from '@/utils/helpers';
import Hero from '@/components/shared/Hero';
import Image from '@/components/shared/Image';
import SEOTags from '@/components/shared/SEOTags';
import StructuredData from '@/components/shared/StructuredData';
import '@/styles/pages/single.scss';

const DOSimplePage: React.FC<TemplateProps> = ( {
    post, 
    iframe = false,
    layoutClasses = () => {}
} ): JSX.Element | null => {

    if ( doLength( post ) ) {

        const heroSettings: HeroProps = {
            title: post.fields.page_title,
            shareBar: false,
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
                        { post.fields.page_image ?
                            <>
                                <Image image={ post.fields.page_image } size="cinema_1000" id="post-image" />
                                { post.fields.page_image_credit &&
                                    <span className="post-image-credit">{ post.fields.page_image_credit }</span>
                                }
                            </> 
                        : null }
                        <div id="post-content">
                            { doParse( post.fields.page_content ) }
                        </div>
                    </section>
                </article>
            </>
        );
    } else {
        return null;
    }
}
export default DOSimplePage;