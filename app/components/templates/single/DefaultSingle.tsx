import React, { JSX } from 'react';
import { useEffect } from 'react';
import { CTASettings } from '@/utils/types/CTASettings';
import { HeroProps } from '@/utils/types/HeroProps';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { getMediaField, getStringField, parse } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import Hero from '@/components/shared/Hero';
import Image from '@/components/shared/Image';
import PostDetails from '@/components/shared/PostDetails';
import SEOTags from '@/components/shared/SEOTags';
import StructuredData from '@/components/shared/StructuredData';
import '@/styles/pages/single.scss';
import '@/styles/components/blocks.scss';
import '@/styles/components/posts.scss';

const DefaultSingle: React.FC<TemplateProps> = ( {
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
    const metaPrefix = post.post_type_details.meta_prefix;
    const title = getStringField( fields, metaPrefix + '_title' );
    const author = getStringField( fields, metaPrefix + '_author' );
    const image = getMediaField( fields, metaPrefix + '_image' );
    const imageCredit = getStringField( fields, metaPrefix + '_image_credit' );
    const description = getStringField( fields, metaPrefix + '_description' );
    const content = getStringField( fields, metaPrefix + '_content' );
    const file = getStringField( fields, metaPrefix + '_file' );
    const downloadButtonText = getStringField( fields, metaPrefix + '_download_button_text' ) || 'Download';
    const url = window.homeURL + '/' + post.post_type_details.post_type_slug + '/' + post.post_name;

    const heroSettings: HeroProps = {
        pretitle: post.post_type_details.post_type_display_name,
        title: title,
        customHTML: <PostDetails author={ author } description={ description } />,
        publishDate: post.post_date.formatted,
        shareBar: true,
        url: url,
    };

    const ctaSettings: CTASettings = {
        url: file,
        text: downloadButtonText,
        modal: true,
        classes: [ 'solid-button' ],
        id: 'download-content',
        iframeName: 'downloadable-iframe',
    };

    return (
        <>
            <SEOTags post={ post } />
            <StructuredData post={ post } />
            <Hero { ...heroSettings } />
            <article id="contentWrapper" className="container one-column">
                <section id="main-content">
                    { image?.url &&
                        <>
                            <Image image={ image } size="cinema_1000" id="post-image" />
                            { imageCredit &&
                                <span className="post-image-credit">{ imageCredit }</span>
                            }
                        </>
                    }
                    { content &&
                        <div id="post-content">
                            { parse( content ) }
                        </div>
                    }
                    { file &&
                        <p id="download" className="panel-ctas">
                            <CTA { ...ctaSettings } />
                        </p>
                    }
                </section>
            </article>
        </>
    );
};
export default DefaultSingle;
