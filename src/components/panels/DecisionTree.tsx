import React from 'react';
const { useEffect, useState } = wp.element;
import { doLength, doParse } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA';
import Heading from 'src/components/shared/Heading';
import Image from 'src/components/shared/Image';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/decision-tree.scss';
import { PanelProps } from 'src/utils/types/PanelProps';
import { CustomAttributes } from 'src/utils/types/CustomAttributes';

const DecisionTree:React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {

    const treeFieldKeys: Record<string, string> = {
        'cards': panelPrefix + '_cards' + panelSuffix,
    };

    // Cards
    const cards: Record<string, any> = post.fields[ treeFieldKeys.cards ] ? post.fields[ treeFieldKeys.cards ] : {};

    const [ openTree, setOpenTree ] = useState<number | boolean | null>( null );
    const openTheTree = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
        const target: HTMLElement = e.target as HTMLElement;
        const li: HTMLElement | null = target ? target.closest( 'li' ) : null;
        const openIndex: number | null = li ? Number( li.getAttribute( 'data-index' ) ) : null;
        if ( openIndex ) {
            setOpenTree( Number( openIndex ) );
        }
    };
    const closeTheTree = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
        setOpenTree( false );
    };
    
    if ( doLength( cards ) ) {
        return (
            <ul className={ 'panel-decision-tree blocks card three' + ( openTree !== false ? ' card-' + openTree + '-open' : '' ) }>
                { cards.map( ( card: Record<string, any>, index: number ) => {
                    if ( index < 2 ) {
                        const animation: CustomAttributes = openTree === null ? ( index === 0 ? { 'data-aos': 'fade-right' } : { 'data-aos': 'fade-left' } ) : {};
                        return (
                            <li key={ index } data-index={ index } className={ openTree === index ? 'open' : '' } { ...animation }>
                                <div className="block-content-wrapper">
                                    <Heading tag="h3" title={ card.title } />
                                    <span className="decision-tree-overview">
                                        { doParse( card.overview ) }
                                    </span>
                                    <span className="decision-tree-full">
                                        <span className="left">
                                            { doParse( card.copy ) }
                                            <p><CTA url={ card.cta_url } text={ card.cta_text } classes={ [ 'text-button' ] } /></p>
                                        </span>
                                        <span className="right">
                                            <ul>
                                                { card.list.map( ( item: Record<string, any>, index: number ) => {
                                                    return (
                                                        <li key={ index }>
                                                            <CTA url={ item.url } classes={ doLength( item.icon ) ? [ 'text-button', 'has-icon' ] : [ 'text-button' ] }>
                                                                { doLength( item.icon ) ?
                                                                    <Image image={ item.icon } />
                                                                : null }
                                                                <span>{ item.title }</span>
                                                            </CTA>
                                                        </li>
                                                    )
                                                } ) }
                                            </ul>
                                        </span>
                                    </span>
                                    <button className="decision-tree-open" onClick={ ( e ) => openTheTree( e ) }>
                                        <span>Expand</span>
                                    </button>
                                    <button className="decision-tree-close" onClick={ ( e ) => closeTheTree( e ) }>
                                        <span>Close</span>
                                    </button>
                                </div>
                            </li>
                        )
                    } else {
                        return null;
                    }
                } ) }
            </ul>
        );
    } else {
        return null;
    }
}
export default DecisionTree;