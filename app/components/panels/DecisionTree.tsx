import React, { JSX } from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import { getArrayField, htmlToText, length, parse } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import MediaLoader from '@/components/shared/MediaLoader';
import '@/styles/components/blocks.scss';
import '@/styles/components/decision-tree.scss';
import { PanelProps } from '@/utils/types/PanelProps';
import { Media } from '@/utils/types/Media';

interface DecisionTreeListItem {
    icon?: Media;
    title?: string;
    url?: string;
}
interface DecisionTreeCard {
    title?: string;
    overview?: string;
    copy?: string;
    cta_text?: string;
    cta_url?: string;
    list?: Array<DecisionTreeListItem>;
}

const DecisionTree:React.FC<PanelProps> = ( {
    post,
    panelPrefix = '',
    panelSuffix = ''
} ): JSX.Element | null => {

    // Cards
    const cards: Array<DecisionTreeCard> = getArrayField<DecisionTreeCard>( post.fields, panelPrefix + '_cards' + panelSuffix );

    const baseId: string = useId();
    const [ openTree, setOpenTree ] = useState<number | null>( null );
    // Each card's expand and collapse buttons. Only one of the two is shown at
    // a time, so focus moves to the other when it's pressed.
    const expandRefs = useRef<Array<HTMLButtonElement | null>>( [] );
    const collapseRefs = useRef<Array<HTMLButtonElement | null>>( [] );
    const focusAfterRender = useRef<HTMLButtonElement | null>( null );

    useEffect( () => {
        focusAfterRender.current?.focus();
        focusAfterRender.current = null;
    }, [ openTree ] );

    const openTheTree = ( index: number ): void => {
        focusAfterRender.current = collapseRefs.current[ index ];
        setOpenTree( index );
    };
    const closeTheTree = ( index: number ): void => {
        focusAfterRender.current = expandRefs.current[ index ];
        setOpenTree( null );
    };

    if ( length( cards ) ) {
        return (
            <ul className={ 'decision-tree blocks blocks--card blocks--three' + ( typeof openTree === 'number' ? ' decision-tree--' + openTree + '-open' : '' ) }>
                { cards.map( ( card: DecisionTreeCard, index: number ) => {
                    if ( index < 2 ) {
                        const isOpen: boolean = openTree === index;
                        const detailId: string = `${ baseId }-detail-${ index }`;
                        return (
                            <li key={ index } data-index={ index } className={ 'decision-tree__card' + ( isOpen ? ' decision-tree__card--open' : '' ) }>
                                <div className="blocks__content">
                                    <Heading tag="h3" title={ card.title } />
                                    <span className="decision-tree__overview">
                                        { parse( card.overview ?? '' ) }
                                    </span>
                                    <span className="decision-tree__detail" id={ detailId }>
                                        <span className="decision-tree__detail-copy">
                                            { parse( card.copy ?? '' ) }
                                            <p><CTA url={ card.cta_url } text={ card.cta_text } classes={ [ 'text-button' ] } /></p>
                                        </span>
                                        <span className="decision-tree__detail-list">
                                            <ul>
                                                { ( card.list ?? [] ).map( ( item: DecisionTreeListItem, index: number ) => {
                                                    return (
                                                        <li key={ index }>
                                                            <CTA url={ item.url } classes={ length( item.icon ) ? [ 'text-button', 'has-icon' ] : [ 'text-button' ] }>
                                                                { item.icon && length( item.icon ) ?
                                                                    <MediaLoader media={ item.icon } />
                                                                : null }
                                                                <span>{ htmlToText( item.title ?? '' ) }</span>
                                                            </CTA>
                                                        </li>
                                                    );
                                                } ) }
                                            </ul>
                                        </span>
                                    </span>
                                    <button
                                        aria-controls={ detailId }
                                        aria-expanded={ isOpen }
                                        className="decision-tree__expand"
                                        onClick={ () => openTheTree( index ) }
                                        ref={ ( el ) => { expandRefs.current[ index ] = el; } }
                                        type="button">
                                        <span>Expand</span>
                                    </button>
                                    <button
                                        aria-controls={ detailId }
                                        aria-expanded={ isOpen }
                                        className="decision-tree__collapse"
                                        onClick={ () => closeTheTree( index ) }
                                        ref={ ( el ) => { collapseRefs.current[ index ] = el; } }
                                        type="button">
                                        <span>Close</span>
                                    </button>
                                </div>
                            </li>
                        );
                    } else {
                        return null;
                    }
                } ) }
            </ul>
        );
    } else {
        return null;
    }
};
export default DecisionTree;