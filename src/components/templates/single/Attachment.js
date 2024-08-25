const { useEffect } = wp.element;
import { doLength, doURLType, doParse } from 'src/utils/helpers.js';
import Hero from 'src/components/shared/Hero.js';
import SEOTags from 'src/components/shared/SEOTags.js';
import 'assets/styles/pages/single.scss';
import 'assets/styles/pages/attachment.scss';

export default function Attachment( props ) {
    const post = props.post;

    if ( doLength( post ) ) {
        const title = post.post_title;
        const publishDate = post.post_date.formatted;
        const guid = post.guid;
        const fileType = doURLType( guid );
        const description = post.post_content;
        const customHTML = doParse( description );

        // Hero Settings
        const heroSettings = {
            pretitle: 'Media',
            title: title,
            publishDate: publishDate,
            customHTML: customHTML,
            shareBar: true,
        };

        useEffect( () => {
            // Set classes for <main>
            props.layoutClasses( [ 'single-content-item', 'single-attachment' ] );
        }, [] );

        return (
            <>
                <SEOTags post={ post } />
                <Hero { ...heroSettings } />
                <article id="content-wrapper" class="container one-column">
                    <section id="main-content">
                        { doLength( description ) ?
                            <p id="post-description">{ description }</p>
                        : null }
                        { fileType === 'pdf' ?
                            <div id="do-attachment-single">
                                <iframe src={ guid } frameborder="0" scrolling="no"></iframe>
                            </div>
                        : null }
                        { fileType === 'image' ?
                            <img src={ guid } width="100%" />
                        : null }
                    </section>
                </article>
            </>
        );
    } else {
        return null;
    }
}