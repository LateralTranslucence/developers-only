const { useEffect } = wp.element;
import { useParams } from 'react-router-dom';
import { doParse, doLength } from 'src/utils/helpers.js';
import Hero from 'src/components/shared/Hero.js';
import SEOTags from 'src/components/shared/SEOTags.js';

export default function Page( props ) {
    const post = props.post;
    const { postType } = useParams();

    if ( doLength( post ) ) {
        // Set content variables
        const title = post.post_title;
        const content = post.post_content;

        useEffect( () => {
            // Set classes for <main>
            props.layoutClasses( [ 'single-content-item', 'single-' + postType ] );
        }, [] );

        return (
            <>
                <SEOTags post={ post } />
                <Hero title={ title } />
                <article id="content-wrapper" className="container one-column">
                    <section id="main-content">
                        { content ?
                            <div id="post-content">
                                { doParse( content ) }
                            </div>
                        : null }
                    </section>
                </article>
            </>
        );
    } else {
        return null;
    }
}
