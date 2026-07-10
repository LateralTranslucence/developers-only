import React from 'react';
import { useState } from 'react';
import { getArrayField, length, parse } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import Image from '@/components/shared/Image';
import '@/styles/components/blocks.scss';
import '@/styles/components/decision-tree.scss';
import { PanelProps } from '@/utils/types/PanelProps';
import { CustomAttributes } from '@/utils/types/CustomAttributes';

const DecisionTree:React.FC<PanelProps> = ( { 
    post, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {

    // Cards
    const cards: Array<Record<string, any>> = getArrayField<Record<string, any>>( post.fields, panelPrefix + '_cards' + panelSuffix );

    const [ openTree, setOpenTree ] = useState<number | boolean | null>( null );
    const openTheTree = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
        const target: HTMLElement = e.target as HTMLElement;
        const li: HTMLElement | null = target ? target.closest( 'li' ) : null;
        const openIndex: number | null = li ? Number( li.getAttribute( 'data-index' ) ) : null;
        if ( openIndex !== null ) {
            setOpenTree( Number( openIndex ) );
        }
    };
    const closeTheTree = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
        setOpenTree( false );
    };
    
    if ( length( cards ) ) {
        return (
            <ul className={ 'decision-tree blocks blocks--card blocks--three' + ( typeof openTree === 'number' ? ' decision-tree--' + openTree + '-open' : '' ) }>
                { cards.map( ( card: Record<string, any>, index: number ) => {
                    if ( index < 2 ) {
                        const animation: CustomAttributes = openTree === null ? ( index === 0 ? { 'data-aos': 'fade-right' } : { 'data-aos': 'fade-left' } ) : {};
                        return (
                            <li key={ index } data-index={ index } className={ ' decision-tree__card' + ( openTree === index ? ' decision-tree__card--open' : '' ) } { ...animation }>
                                <div className="blocks__content">
                                    <Heading tag="h3" title={ card.title } />
                                    <span className="decision-tree__overview">
                                        { parse( card.overview ) }
                                    </span>
                                    <span className="decision-tree__detail">
                                        <span className="decision-tree__detail-copy">
                                            { parse( card.copy ) }
                                            <p><CTA url={ card.cta_url } text={ card.cta_text } classes={ [ 'text-button' ] } /></p>
                                        </span>
                                        <span className="decision-tree__detail-list">
                                            <ul>
                                                { ( card.list ?? [] ).map( ( item: Record<string, any>, index: number ) => {
                                                    return (
                                                        <li key={ index }>
                                                            <CTA url={ item.url } classes={ length( item.icon ) ? [ 'text-button', 'has-icon' ] : [ 'text-button' ] }>
                                                                { length( item.icon ) ?
                                                                    <Image image={ item.icon } />
                                                                : null }
                                                                <span>{ item.title }</span>
                                                            </CTA>
                                                        </li>
                                                    );
                                                } ) }
                                            </ul>
                                        </span>
                                    </span>
                                    <button className="decision-tree__expand" onClick={ ( e ) => openTheTree( e ) }>
                                        <span>Expand</span>
                                    </button>
                                    <button className="decision-tree__collapse" onClick={ ( e ) => closeTheTree( e ) }>
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