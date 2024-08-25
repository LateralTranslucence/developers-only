const { useEffect } = wp.element;
import { doLength, doParse } from 'src/utils/helpers.js';
import Heading from 'src/components/shared/Heading.js';
import Hero from 'src/components/shared/Hero.js';
import RecentPosts from 'src/components/shared/RecentPosts.js';
import SEOTags from 'src/components/shared/SEOTags.js';
import StructuredData from 'src/components/shared/StructuredData.js';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/pages/legal.scss';
import 'assets/styles/components/posts.scss';
import 'assets/styles/pages/single.scss';

export default function DOLegal( props ) {
    const post = props.post;

    if ( doLength( post ) ) {
        // Set post variables
        const postTypeRaw = post.post_type_details.post_type;
        const postTypeSlug = post.post_type_details.post_type_slug;
        // Set content variables
        const title = post.fields.legal_title;
        const effectiveDate = post.fields.legal_effective_date;
        const legalEffective = effectiveDate ? effectiveDate.formatted : false;
        const modifiedDate = post.fields.legal_last_updated_date;
        const legalUpdated = modifiedDate ? modifiedDate.formatted : false ;
        const legalUpdatedChange = post.fields.legal_last_updated_change ? post.fields.legal_last_updated_change : '';
        const content = post.fields.legal_content;
        const customHTML = <LegalPostDetails />;
        
        // Hero
        const heroSettings = {
            pretitle: 'Legal',
            title: title,
            breadcrumbs: post,
            customHTML: customHTML,
        };

        useEffect( () => {
            // Set classes for <main>
            props.layoutClasses( [ 'single-content-item', 'single-' + postTypeRaw ] );
        }, [] );

        function LegalPostDetails() {
            return(
                <>
                    <div id="post-details">
                        { legalEffective &&
                        <p>Effective Date <b>{ legalEffective }</b></p>
                        }
                        { legalUpdated && 
                        <p> Last Modified <b>{ legalUpdated }</b></p>
                        }
                        { legalUpdatedChange &&
                        <p><i>{ legalUpdatedChange }</i></p>
                        }
                    </div>
                </>
            );
        }

        return (
            <>
                <SEOTags post={ post } />
                <StructuredData post={ post } />
                <Hero { ...heroSettings } />
                <article id="content-wrapper" className="container two-column right-rail">
                    <section id="main-content">
                       { doParse( content ) }
                    </section>
                    <aside id="legal-index">
                        <div className="legal-index-wrapper color-navy">
                            <Heading tag={ 'h2' } title={ 'Legal Index' } /> 
                            <RecentPosts postID={ post.ID } type="text" postType={ post.post_type } count="50" slider={ false } />
                        </div>
                    </aside>
                </article>
            </>
        );
    } else {
        return null;
    }
}