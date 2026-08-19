import React, { JSX } from 'react';
import { useEffect } from 'react';
import { HeroProps } from '@/utils/types/HeroProps';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { urlType } from '@/utils/helpers';
import Hero from '@/components/shared/Hero';
import SEOTags from '@/components/shared/SEOTags';
import '@/styles/pages/single.scss';
import '@/styles/pages/attachment.scss';

const Attachment: React.FC<TemplateProps> = ( {
    post,
    layoutClasses = () => {}
} ): JSX.Element | null => {

    useEffect( () => {
        // Set classes for <main>
        if ( post ) {
            layoutClasses( [ 'single-content-item', 'single-attachment' ] );
        }
    }, [ post, layoutClasses ] );

    if ( post ) {

        const fileType: string = urlType( post.guid );

        // Hero Settings
        const heroSettings: HeroProps = {
            pretitle: 'Media',
            title: post.post_title,
            publishDate: post.post_date.formatted,
            customHTML: post.post_content,
        };

        return (
            <>
                <SEOTags post={ post } />
                <Hero { ...heroSettings } />
                <article id="contentWrapper" className="container one-column">
                    <section id="main-content">
                        { post.post_content ?
                            <p id="post-description">{ post.post_content }</p>
                        : null }
                        { fileType === 'pdf' ?
                            <div id="attachment-single">
                                <iframe src={ post.guid }></iframe>
                            </div>
                        : null }
                        { fileType === 'image' ?
                            <img src={ post.guid } width="100%" />
                        : null }
                    </section>
                </article>
            </>
        );
    } else {
        return null;
    }
};
export default Attachment;
