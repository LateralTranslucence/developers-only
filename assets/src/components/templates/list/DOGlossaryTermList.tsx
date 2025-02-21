import React from 'react';
import { useEffect, useState } from 'react';
import { PartialTemplateProps } from '@/utils/types/PartialTemplateProps';
import { doLength, doParse, doStripTags, doTruncate } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import Image from '@/components/shared/Image';
import '@/styles/components/blocks.scss';
import '@/styles/components/list.scss';
import { Post } from '@/utils/types/Post';

const DOGlossaryTermList: React.FC<PartialTemplateProps> = ( {
    index,
    panelSlider,
    perRow,
    post,
    type,
} ): JSX.Element | null => {
    const [ openTerm, setOpenTerm ] = useState<number | boolean>( false );
    useEffect( () => {
        setOpenTerm( false );
    }, [] );
    const openTheTerm = ( e: Event ) => {
        const target: HTMLElement = e.target as HTMLElement;
        if ( target ) {
            const closestLI: HTMLElement | null = target.closest( 'li' );
            const openIndex: number | undefined = closestLI ? Number( closestLI.getAttribute( 'data-index' ) ) : undefined;
            if ( openIndex ) {
                setOpenTerm( openIndex );
            }
        }
    };
    const closeTheTerm = ( e: Event ) => {
        setOpenTerm( false );
    };

    if ( doLength( post ) ) {
        return (
            <li key={ index } data-index={ index } className={ 'glossary' + ( openTerm === index ? ' open' : '' ) }>
                <div className="block-content-wrapper">
                    <Heading tag="h3" title={ post.post_title } />
                    <div className="glossary-term-overview">
                        { doParse( doTruncate( doStripTags( post.fields.term_definition ? post.fields.term_definition : '' ), { indicator: '...' } ) ) }
                    </div>
                    <div className="glossary-term-full">
                        { doParse( post.fields.term_definition ? post.fields.term_definition : '' ) }
                        { doLength( post.fields.term_related_posts ) ?
                            <>
                            <Heading tag="h4" title="Related Resources" />
                            <ul className="glossary-term-related-resources">
                                { post.fields.term_related_posts.map( ( resource: Post, index: number ) => {
                                    if ( doLength( resource ) ) {
                                        return (
                                            <li key={ index }>
                                                <CTA url={ resource.permalink } classes={ [ 'block-link' ] } >
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
                    <button className="glossary-term-open" onClick={ ( e ) => openTheTerm }>
                        <span>Expand</span>
                    </button>
                    <button className="glossary-term-close" onClick={ ( e ) => closeTheTerm }>
                        <span>Close</span>
                    </button>
                </div>
            </li>
        );
    } else {
        return null;
    }
}
export default DOGlossaryTermList;