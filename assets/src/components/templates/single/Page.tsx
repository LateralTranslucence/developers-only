import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { doParse, doLength } from '@/utils/helpers';
import Hero from '@/components/shared/Hero';
import SEOTags from '@/components/shared/SEOTags';

const Page: React.FC<TemplateProps> = ( {
    post, 
    iframe = false,
    layoutClasses = () => {}
} ): JSX.Element | null => {

    const { postType } = useParams();

    if ( doLength( post ) ) {
        useEffect( () => {
            // Set classes for <main>
            layoutClasses( [ 'single-content-item', 'single-' + postType ] );
        }, [ postType ] );

        return (
            <>
                <SEOTags post={ post } />
                <Hero title={ post.post_title } />
                <article id="content-wrapper" className="container one-column">
                    <section id="main-content">
                        { post.post_content ?
                            <div id="post-content">
                                { doParse( post.post_content ) }
                            </div>
                        : null }
                    </section>
                </article>
            </>
        )
    } else {
        return null;
    }
}
export default Page;