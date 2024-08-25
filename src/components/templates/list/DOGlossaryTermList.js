const { useEffect, useState } = wp.element;
import { doLength, doParse, doStripTags, doTruncate } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA.js';
import Heading from 'src/components/shared/Heading.js';
import Image from 'src/components/shared/Image.js';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/list.scss';

export default function DOGlossaryTermList( props ) {
    const post = props.post;

    const [ openTerm, setOpenTerm ] = useState( false );
    useEffect( () => {
        setOpenTerm( false );
    }, [] );
    const openTheTerm = ( e ) => {
        const openIndex = e.target.closest( 'li' ).getAttribute( 'data-index' );
        if ( openIndex ) {
            setOpenTerm( Number( openIndex ) );
        }
    };
    const closeTheTerm = ( e ) => {
        setOpenTerm( false );
    };

    if ( doLength( post ) ) {
        // Set post variables
        const postTitle = post.post_title;
        // Set content variables
        const definition = post.fields.term_definition ? post.fields.term_definition : '';
        const relatedResources = post.fields.term_related_posts ? post.fields.term_related_posts : {};

        return (
            <li key={ props.index } data-index={ props.index } className={ 'glossary' + ( openTerm === props.index ? ' open' : '' ) }>
                <div className="block-content-wrapper">
                    <Heading tag="h3" title={ postTitle } />
                    <div className="glossary-term-overview">
                        { doParse( doTruncate( doStripTags( definition ), { indicator: '...' } ) ) }
                    </div>
                    <div className="glossary-term-full">
                        { doParse( definition ) }
                        { doLength( relatedResources ) ?
                            <>
                            <Heading tag="h4" title="Related Resources" />
                            <ul className="glossary-term-related-resources">
                                { relatedResources.map( ( resource, index ) => {
                                    if ( doLength( resource ) ) {
                                        return (
                                            <li key={ index }>
                                                <CTA url={ resource.permalink } classes="block-link" >
                                                    <Image image={ resource.post_thumbnail } size="cinema_400" />
                                                    <Heading tag={ 'h5' } title={ resource.post_title } pretitle={ resource.post_type_details.post_type_display_name } />
                                                </CTA>
                                            </li>
                                        )
                                    }
                            } ) }
                            </ul>
                            </>
                        : null }
                    </div>
                    <button className="glossary-term-open" onClick={ ( e ) => openTheTerm( e ) }>
                        <span>Expand</span>
                    </button>
                    <button className="glossary-term-close" onClick={ ( e ) => closeTheTerm( e ) }>
                        <span>Close</span>
                    </button>
                </div>
            </li>
        );
    } else {
        return null;
    }
}