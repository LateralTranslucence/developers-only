import React from 'react';
const { useEffect } = wp.element;
import { doLength, doParse, doSanitizeTitleWithDashes } from 'src/utils/helpers';
import { DoSelectList } from 'src/utils/display';
import CTA from 'src/components/shared/CTA';
import Heading from 'src/components/shared/Heading';
import Image from 'src/components/shared/Image';
import MediaLoader from 'src/components/shared/MediaLoader';
import 'assets/styles/components/select-list.scss';
import 'assets/styles/components/linear-content.scss';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';

const LinearContent: React.FC<PanelLoaderProps> = ( { 
    data, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element => {
    const linearContentFieldKeys: Record<string, string> = {
        'content_blocks': panelPrefix + '_content_blocks' + panelSuffix,
    };

    // Block
    const linearContentBlocks = data.fields[ linearContentFieldKeys.content_blocks ] ? data.fields[ linearContentFieldKeys.content_blocks ] : [];
    const firstBlock = linearContentBlocks[0] ? linearContentBlocks[0] : {};

    useEffect( () => {
        new DoSelectList();
    }, [] );

    return (
        <div className="linear-content-wrapper" uk-slider="finite: true;">
            { /* Nav */ }
            <nav className="linear-content-nav-wrapper">
                <span className="select-list-toggle mobile-toggle do-tabs-nav-toggle" data-toggle={ 'linear-content-nav-' + String( panelNumber ) }>{ firstBlock.title ? firstBlock.title : '' }</span>
                <ul className="linear-content-nav container" id={ 'linear-content-nav-' + panelNumber }>
                    { linearContentBlocks.map( ( contentBlock: Record<string, any>, index: number ): JSX.Element => {
                        const contentBlockID: string = panelID + '-' + doSanitizeTitleWithDashes( contentBlock.title );                        
                        return (
                            <li key={ index } uk-slider-item={ index }>
                                <CTA url={ '#' + contentBlockID } uk={ true } customAttributes={ { rel: 'no-follow', tabIndex: 0 } } classes={ doLength( contentBlock.title_icon ) ? [ 'has-icon' ] : [] }>
                                    { doLength( contentBlock.title_icon ) ?
                                        <Image image={ contentBlock.title_icon } />
                                    : null }
                                    <span className="linear-content-nav-label">{ contentBlock.title }</span>
                                </CTA>
                            </li>
                        );
                    } ) }
                </ul>
            </nav>
            { /* Blocks */ }
            <div className="container uk-slider-container">
                <ul className="linear-content-blocks uk-slider-items">
                    { linearContentBlocks.map( ( contentBlock: Record<string, any>, index: number ) => {
                        const contentBlockID: string = panelID + '-' + doSanitizeTitleWithDashes( contentBlock.title );
                        return (
                            <li key={ index } id={ contentBlockID } data-index={ index }>
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
                            </li>
                        );
                    } ) }
                </ul>
            </div>
        </div>
    );
}
export default LinearContent;