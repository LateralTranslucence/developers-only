
const { useEffect } = wp.element;
import { doLength, doParse } from 'src/utils/helpers.js';
import Hero from 'src/components/shared/Hero.js';
import Image from 'src/components/shared/Image.js';
import SEOTags from 'src/components/shared/SEOTags.js';
import StructuredData from 'src/components/shared/StructuredData.js';
import 'assets/styles/pages/single.scss';

export default function DOSimplePage( props ) {
    const post = props.post;
    if ( doLength( post ) ) {
        // Set post variables
        const postTypeRaw = post.post_type_details.post_type;
        // Set content variables
        const title = post.fields.page_title;
        const content = post.fields.page_content;
        const image = post.fields.page_image;
        const imageCredit = post.fields.page_image_credit ? post.fields.page_image_credit : '';

        // Hero
        const heroSettings = {
            title: title,
            shareBar: false,
        };

        useEffect( () => {
            // Set classes for <main>
            props.layoutClasses( [ 'single-content-item', 'single-' + postTypeRaw ] );
        }, [] );

        return (
            <>
                <SEOTags post={ post } />
                <StructuredData post={ post } />
                <Hero { ...heroSettings } />
                <article id="content-wrapper" className="container one-column">
                    <section id="main-content">
                        { image ?
                            <>
                                <Image image={ image } size="cinema_1000" id="post-image" />
                                { imageCredit &&
                                    <span className="post-image-credit">{ imageCredit }</span>
                                }
                            </> 
                        : null }
                        <div id="post-content">
                            { doParse( content ) }
                        </div>
                    </section>
                </article>
            </>
        );
    } else {
        return null;
    }

}