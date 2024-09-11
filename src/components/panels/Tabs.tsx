import React from 'react';
const { useEffect } = wp.element;
import { Tab as MUITab } from '@mui/base/Tab';
import { Tabs as MUITabs } from '@mui/base/Tabs';
import { TabsList as MUITabsList } from '@mui/base/TabsList';
import { TabPanel as MUITabPanel } from '@mui/base/TabPanel';
import { DoSelectList, DoVideosInTabs } from 'src/utils/display';
import { doConvertNumberToWords, doLength, doParse, doSanitizeTitleWithDashes } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA';
import Heading from 'src/components/shared/Heading';
import MediaLoader from 'src/components/shared/MediaLoader';
import SliderNav from 'src/components/shared/SliderNav';
import { PanelProps } from 'src/utils/types/PanelProps';
import { MetaFieldKeyMap } from 'src/utils/types/MetaFieldKeyMap';
import { Tab } from 'src/utils/types/Tab';
import 'assets/styles/components/select-list.scss';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/tabs.scss';
import { Post } from 'src/utils/types/Post';

const Tabs: React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const tabsFieldKeys: MetaFieldKeyMap = {
        tabs: panelPrefix + '_tabs' + panelSuffix,
        media_size: panelPrefix + '_media_size' + panelSuffix,
    };
    const tabs: Array<Tab> = post.fields[ tabsFieldKeys.tabs ] ? post.fields[ tabsFieldKeys.tabs ] : [];
    const mediaSize: string = post.fields[ tabsFieldKeys.media_size ] ? post.fields[ tabsFieldKeys.media_size ] : '';

    useEffect( () => {
        new DoSelectList();
        new DoVideosInTabs();
    }, [] );

    if ( doLength( tabs ) ) {
        const firstTab: Tab | undefined = tabs[0] ? tabs[0] : undefined;
        
        return (
            <MUITabs defaultValue={ 0 } className="tabs-wrapper">
                <MUITabsList slots={ { root: 'nav' } } className="tabs-nav-wrapper">
                    <span className="select-list-toggle mobile-toggle do-tabs-nav-toggle" data-toggle={ 'tabs-nav-' + panelNumber }>{ firstTab && firstTab.nav_label ? firstTab.nav_label : '' }</span>
                    <ul id={ 'tabs-nav-' + panelNumber } className={ 'tabs-nav ' + doConvertNumberToWords( tabs.length ) }>
                        { tabs.map( ( tab: Tab, index: number ) => {
                            const id = doSanitizeTitleWithDashes( tab.nav_label );
                            return (
                                <li key={ index } id={ id ? 'tab-' + id : '' }>
                                    <MUITab value={ index }>{ tab.nav_label }</MUITab>
                                </li>
                            );
                        } ) }
                    </ul>
                </MUITabsList>
                <div id={ 'tab-content-' + panelNumber } className="tabs-content-wrapper">
                { tabs.map( ( tab, index ) => {
                    const slider = doLength( tab.related ) > 2 ? { 'uk-slider': 'finite: true;' } : {};
                    return (
                        <MUITabPanel value={ index } key={ index } id={ tab.id } className={ 'tab-content' + ( tab.media && tab.media.type === 'video' ? ' has-video' : '' ) }>
                            { doLength( tab.title ) ?
                                <Heading tag="h2" title={ tab.title } />
                            : null }
                            { doLength( tab.media ) ? 
                                <MediaLoader media={ tab.media } size={ doLength( mediaSize ) ? mediaSize : 'vertical_600' } mobileImage={ doLength( mediaSize ) ? mediaSize.replace( '600', '400' ) : 'vertical_400' } />
                            : null }
                            { tab.copy ?
                                <div className="tab-text-wrapper">
                                    { doParse( tab.copy ) }
                                </div>
                            : null }
                            { tab.list ?
                                <ul className="tab-inner-list">
                                { tab.list.map( ( item: string, index: number ): JSX.Element | null => {
                                    if ( doLength( item ) ) {
                                        return (
                                            <li key={ index }>{ doParse( item ) }</li>
                                        )
                                    } else {
                                        return null;
                                    }
                                } ) }
                                </ul>
                            : null }
                            { tab.cta_url ?
                                <CTA url={ tab.cta_url } modal={ tab.cta_modal } text={ tab.cta_text } classes={ [ 'solid-button' ] } />
                            : null }
                            { tab.related ?
                                <>
                                <Heading tag="h3" title={ doLength( tab.related_title ) ? tab.related_title : 'Related Assets' } />
                                <div className="panel-slider-wrapper" { ...slider }>
                                    <ul className="blocks plain two tab-related-content uk-slider-items">
                                        { tab.related.map( ( post: Post, index: number ) => {
                                            return (
                                                <li key={ index } className="has-block-link">
                                                    <CTA url={ post.permalink } classes={ [ 'block-link' ] }>
                                                        <Heading tag="h4" title={ post.post_title } />
                                                        { doParse( post.post_excerpt ) }
                                                    </CTA>
                                                </li>
                                            )
                                    } ) }
                                    </ul>
                                    { doLength( tab.related ) > 2 ?
                                        <SliderNav dotNav={ true } length={ doLength( tab.related ) } />
                                    : null }
                                </div>
                                </>
                            : null }
                        </MUITabPanel>
                    );
                } ) }
                </div>
            </MUITabs>
        );
    } else {
        return null;
    }
}
export default Tabs;