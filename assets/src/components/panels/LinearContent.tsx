import React from 'react';
import { useEffect, useState } from 'react';
import { doLength, doParse, doSanitizeTitleWithDashes } from '@/utils/helpers';
import { DoSelectList } from '@/utils/display';
import { PanelProps } from '@/utils/types/PanelProps';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import Image from '@/components/shared/Image';
import MediaLoader from '@/components/shared/MediaLoader';
import '@/styles/components/select-list.scss';
import '@/styles/components/linear-content.scss';

const LinearContent: React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {

    const linearContentFieldKeys: Record<string, string> = {
        'content_blocks': panelPrefix + '_content_blocks' + panelSuffix,
    };
    
    const generateBlockID =( blockTitle: string, panelID: string ): string => {
        return panelID + '-' + doSanitizeTitleWithDashes( blockTitle );
    }
    
    // Block
    const linearContentBlocks: Array<Record<string, any>> = post.fields[ linearContentFieldKeys.content_blocks ] ? post.fields[ linearContentFieldKeys.content_blocks ] : [];
    const firstBlock: Record<string, any> = linearContentBlocks[0] ? linearContentBlocks[0] : {};
    const firstBlockID: string = generateBlockID( firstBlock.title, panelID );
    const [ currentTabID, setCurrentTabID ] = useState<string>( firstBlockID );
    
    useEffect( () => {
        new DoSelectList();
    }, [] );
    
    useEffect( () => {
        const currentTab: HTMLElement | null = document.getElementById( currentTabID );
        const container: HTMLElement | null = document.getElementById( panelID + '-linear-content-container' );
        if ( currentTab && container ) {
            container.scrollTo( {
                left: currentTab.offsetLeft,
                behavior: 'smooth',
            } );
        }
    }, [ currentTabID ] );
     
    
    //return <h1>HERE!!</h1>; //(
    return ( 
        <div className="linear-content-wrapper">
            { /* Nav */ }
            <nav className="linear-content-nav-wrapper">
                <span className="select-list-toggle mobile-toggle do-tabs-nav-toggle" data-toggle={ 'linear-content-nav-' + String( panelNumber ) }>{ firstBlock.title ? firstBlock.title : '' }</span>
                <ul className="linear-content-nav container" id={ 'linear-content-nav-' + panelNumber } role="tablist">
                    { linearContentBlocks.map( ( contentBlock: Record<string, any>, index: number ): JSX.Element => {
                        const contentBlockID: string = generateBlockID( contentBlock.title, panelID );                        
                        return (
                            <li key={ index }>
                                <CTA url={ '#' + contentBlockID } 
                                    customAttributes={ { 
                                        rel: 'no-follow', 
                                        tabIndex: 0, 
                                        role: 'tab', 
                                        'aria-controls': contentBlockID, 
                                        'aria-selected': 'true', 
                                        onClick: ( e: MouseEvent ) => {
                                            e.preventDefault();
                                            console.log('here');
                                            setCurrentTabID( contentBlockID );
                                        },
                                    } } 
                                    classes={ doLength( contentBlock.title_icon ) ? [ 'has-icon' ] : [] }>
                                    { doLength( contentBlock.title_icon ) ?
                                        <Image image={ contentBlock.title_icon } />
                                    : null }
                                    <span className="linear-content-nav-label" id={ 'tab-' + contentBlockID }>{ contentBlock.title }</span>
                                </CTA>
                            </li>
                        );
                    } ) }
                </ul>
            </nav>

            { /* Blocks */ }
            <div className="linear-content-blocks container" id={ panelID + '-linear-content-container' }>
                { linearContentBlocks.map( ( contentBlock: Record<string, any>, index: number ) => {
                    const contentBlockID: string = generateBlockID( contentBlock.title, panelID );
                    return (
                        <section key={ index } className="linear-content-block" id={ contentBlockID } data-index={ index } role="tabpanel" aria-labelledby={ 'tab-' + contentBlockID }>
                            <div className="content-block-content">
                                <Heading tag={ 'h2' } title={ contentBlock.heading } />
                                { doLength( contentBlock.media ) ? 
                                    <MediaLoader media={ contentBlock.media } size="square_600"/>
                                : null } 
                                <div className="linear-content-text-wrapper">
                                    { doParse( contentBlock.content ) }
                                    { contentBlock.cta_text && contentBlock.cta_url ?
                                        <p><CTA url={ contentBlock.cta_url } text={ contentBlock.cta_text } classes={ [ 'solid-button' ] } /></p>
                                    : null }
                                </div>
                            </div>
                        </section>
                    );
                } ) }
            </div>
        </div>
    );
}
export default LinearContent;