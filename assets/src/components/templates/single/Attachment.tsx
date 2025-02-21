import React from 'react';
import { useEffect } from 'react';
import { HeroProps } from '@/utils/types/HeroProps';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { doLength, doURLType } from '@/utils/helpers';
import Hero from '@/components/shared/Hero';
import SEOTags from '@/components/shared/SEOTags';
import '@/styles/pages/single.scss';
import '@/styles/pages/attachment.scss';

const Attachment: React.FC<TemplateProps> = ( {
    post, 
    iframe = false,
    layoutClasses = () => {}
} ): JSX.Element | null => {

    if ( doLength( post ) ) {

        const fileType: string = doURLType( post.guid );

        // Hero Settings
        const heroSettings: HeroProps = {
            pretitle: 'Media',
            title: post.post_title,
            publishDate: post.post_date.formatted,
            customHTML: post.post_content,
            shareBar: true,
        }

        useEffect( () => {
            // Set classes for <main>
            layoutClasses( [ 'single-content-item', 'single-attachment' ] );
        }, [] );

        return (
            <>
                <SEOTags post={ post } />
                <Hero { ...heroSettings } />
                <article id="content-wrapper" className="container one-column">
                    <section id="main-content">
                        { doLength( post.post_content ) ?
                            <p id="post-description">{ post.post_content }</p>
                        : null }
                        { fileType === 'pdf' ?
                            <div id="do-attachment-single">
                                <iframe src={ post.guid }></iframe>
                            </div>
                        : null }
                        { fileType === 'image' ?
                            <img src={ post.guid } width="100%" />
                        : null }
                    </section>
                </article>
            </>
        )
    } else {
        return null;
    }
}
export default Attachment;