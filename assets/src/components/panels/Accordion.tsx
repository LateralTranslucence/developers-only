"use client";
import React from 'react';
import { Accordion as MUIAccordion,
         AccordionDetails as MUIAccordionDetails,
         AccordionSummary as MUIAccordionSummary } from '@mui/material';
import { doLength, doParse } from '@/utils/helpers';
import Heading from '@/components/shared/Heading';
import '@/styles/components/accordion.scss';
import { PanelProps } from '@/utils/types/PanelProps';

const Accordion: React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const accordionFieldKeys = {
        accordionItems: panelPrefix + '_accordion_items' + panelSuffix,
    };

    const accordionItems = post.fields[ accordionFieldKeys.accordionItems ] ? post.fields[ accordionFieldKeys.accordionItems ] : [];
    
    if ( doLength( accordionItems ) ) {
        return (
            <ul className="accordion">
                { accordionItems.map( ( item: Record<string, any>, index: number ) => {
                    return (
                        <MUIAccordion key={ index }>
                            { item.title ?
                                <MUIAccordionSummary
                                    title="Open/Close accordion"
                                    className="accordion-title"
                                    //expandIcon={ <MUIArrowDropDown /> }
                                    aria-controls={ index + '-content' }
                                    id={ index + '-header' }>
                                    <Heading tag={ 'h3' } title={ item.title } />
                                </MUIAccordionSummary>
                            : null }
                            { item.text ?
                                <MUIAccordionDetails className="accordion-content">
                                    { doParse( item.text ) }
                                </MUIAccordionDetails>
                            : null }
                        </MUIAccordion>
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