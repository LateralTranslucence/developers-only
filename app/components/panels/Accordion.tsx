import React, { JSX, useId, useRef, useState } from 'react';
import { getArrayField, parse } from '@/utils/helpers';
import { PanelProps } from '@/utils/types/PanelProps';
import '@/styles/components/accordion.scss';

interface AccordionItem {
    title?: string;
    text?: string;
}

const Accordion: React.FC<PanelProps> = ( {
    post,
    panelPrefix = '',
    panelSuffix = ''
} ): JSX.Element | null => {
    const accordionItems = getArrayField<AccordionItem>(
        post.fields,
        panelPrefix + '_accordion_items' + panelSuffix
    );
    const baseId = useId();
    const [ openIndex, setOpenIndex ] = useState<number | null>( null );
    const triggerRefs = useRef<Array<HTMLButtonElement | null>>( [] );

    const toggleItem = ( index: number ): void => {
        setOpenIndex( openIndex === index ? null : index );
    };

    const focusTrigger = ( index: number ): void => {
        triggerRefs.current[ index ]?.focus();
    };

    // WAI-ARIA APG accordion pattern: arrow keys move focus between headers,
    // Home/End jump to the first/last header. Enter/Space toggle for free via <button>.
    const handleKeyDown = ( event: React.KeyboardEvent<HTMLButtonElement>, index: number ): void => {
        const lastIndex = accordionItems.length - 1;
        switch ( event.key ) {
            case 'ArrowDown':
                event.preventDefault();
                focusTrigger( index === lastIndex ? 0 : index + 1 );
                break;
            case 'ArrowUp':
                event.preventDefault();
                focusTrigger( index === 0 ? lastIndex : index - 1 );
                break;
            case 'Home':
                event.preventDefault();
                focusTrigger( 0 );
                break;
            case 'End':
                event.preventDefault();
                focusTrigger( lastIndex );
                break;
        }
    };

    if ( accordionItems.length > 0 ) {
        return (
            <ul className="accordion">
                { accordionItems.map( ( item: AccordionItem, index: number ) => {
                    const isOpen: boolean = openIndex === index;
                    const triggerId: string = `${ baseId }-trigger-${ index }`;
                    const panelId: string = `${ baseId }-panel-${ index }`;
                    return (
                        <li className={ 'accordion__item' + ( isOpen ? ' accordion__item--open' : '' ) } key={ index }>
                            { item.title ?
                                <h3 className="accordion__header">
                                    <button
                                        aria-controls={ panelId }
                                        aria-expanded={ isOpen }
                                        className="accordion__trigger"
                                        id={ triggerId }
                                        onClick={ () => toggleItem( index ) }
                                        onKeyDown={ ( event ) => handleKeyDown( event, index ) }
                                        ref={ ( el ) => { triggerRefs.current[ index ] = el; } }
                                        type="button">
                                        <span className="accordion__trigger-text">{ parse( item.title ) }</span>
                                        <span aria-hidden="true" className="accordion__icon"></span>
                                    </button>
                                </h3>
                            : null }
                            { item.text ?
                                <div
                                    aria-labelledby={ triggerId }
                                    className="accordion__panel"
                                    hidden={ ! isOpen }
                                    id={ panelId }
                                    role="region">
                                    { parse( item.text ) }
                                </div>
                            : null }
                        </li>
                    );
                } ) }
            </ul>
        );
    }
    else {
        return null;
    }
};
export default Accordion;
