
import React from 'react';
const { useEffect } = wp.element;
import { HeroProps } from 'src/utils/types/HeroProps';
import { TemplateProps } from 'src/utils/types/TemplateProps';
import { doLength, doParse } from 'src/utils/helpers';
import Hero from 'src/components/shared/Hero';
import Image from 'src/components/shared/Image';
import SEOTags from 'src/components/shared/SEOTags';
import StructuredData from 'src/components/shared/StructuredData';
import 'assets/styles/pages/single.scss';

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