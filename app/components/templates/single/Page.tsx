import React, { JSX } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TemplateProps } from '@/utils/types/TemplateProps';
import { parse } from '@/utils/helpers';
import Hero from '@/components/shared/Hero';
import SEOTags from '@/components/shared/SEOTags';

const Page: React.FC<TemplateProps> = ( {
    post,
    layoutClasses = () => {}
} ): JSX.Element | null => {
    const { postType } = useParams();

    useEffect( () => {
        if ( post ) {
            layoutClasses( [ 'single-content-item', 'single-' + postType ] );
        }
    }, [ postType ] );

    if ( !post ) return null;

    return (
        <>
            <SEOTags post={ post } />
            <Hero title={ post.post_title } />
            <article id="contentWrapper" className="container one-column">
                <section id="main-content">
                    { post.post_content ?
                        <div id="post-content">
                            { parse( post.post_content ) }
                        </div>
                    : null }
                </section>
            </article>
        </>
    );
};
export default Page;
