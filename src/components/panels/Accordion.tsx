import React from 'react';
import { doLength, doParse } from 'src/utils/helpers';
import Heading from 'src/components/shared/Heading';
import 'assets/styles/components/accordion.scss';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';

const Accordion: React.FC<PanelLoaderProps> = ( { 
    data, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const accordionFieldKeys = {
        accordionItems: panelPrefix + '_accordion_items' + panelSuffix,
    };

    const accordionItems = data.fields[ accordionFieldKeys.accordionItems ] ? data.fields[ accordionFieldKeys.accordionItems ] : [];
    
    if ( doLength( accordionItems ) ) {
        return (
            <ul className="accordion" uk-accordion="">
                { accordionItems.map( ( itemElements: Array<string>, index: number ) => {
                    const itemTitle: string = itemElements[0] ? itemElements[0] : '';
                    const itemCopy: string = itemElements[1] ? itemElements[1] : '';
                    return (
                        <li key={ index }>
                            { itemTitle ?
                                <a href="#" className="uk-accordion-title accordion-title" title="Open/Close accordion">
                                    <Heading tag={ 'h3' } title={ itemTitle } />
                                </a>
                            : null }
                            { itemCopy ?
                                <div className="uk-accordion-content accordion-content">
                                    { doParse( itemCopy ) }
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
}
export default Accordion;