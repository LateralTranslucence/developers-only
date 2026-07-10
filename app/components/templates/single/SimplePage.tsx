
import React, { JSX } from 'react';
import { useEffect } from 'react';
import { HeroProps } from '@/utils/types/HeroProps';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { getMediaField, getStringField, parse } from '@/utils/helpers';
import Hero from '@/components/shared/Hero';
import Image from '@/components/shared/Image';
import SEOTags from '@/components/shared/SEOTags';
import StructuredData from '@/components/shared/StructuredData';
import '@/styles/pages/single.scss';

const SimplePage: React.FC<TemplateProps> = ( {
    post,
    iframe = false,
    layoutClasses = () => {}
} ): JSX.Element | null => {
    useEffect( () => {
        if ( post ) {
            layoutClasses( [ 'single-content-item', 'single-' + post.post_type_details.post_type ] );
        }
    }, [] );

    if ( !post ) return null;

    const fields = post.fields;
    const pageTitle = getStringField( fields, 'page_title' );
    const pageImage = getMediaField( fields, 'page_image' );
    const pageImageCredit = getStringField( fields, 'page_image_credit' );
    const pageContent = getStringField( fields, 'page_content' );

    const heroSettings: HeroProps = {
        title: pageTitle,
        shareBar: false,
    };

    return (
        <>
            <SEOTags post={ post } />
            <StructuredData post={ post } />
            <Hero { ...heroSettings } />
            <article id="contentWrapper" className="container one-column">
                <section id="main-content">
                    { pageImage?.url ?
                        <>
                            <Image image={ pageImage } size="cinema_1000" id="post-image" />
                            { pageImageCredit &&
                                <span className="post-image-credit">{ pageImageCredit }</span>
                            }
                        </>
                    : null }
                    <div id="post-content">
                        { parse( pageContent ) }
                    </div>
                </section>
            </article>
        </>
    );
};
export default SimplePage;
