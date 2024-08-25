import React from 'react';
const { useEffect } = wp.element;
import { Tab } from '@mui/base/Tab';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { DoSelectList, DoVideosInTabs } from 'src/utils/display';
import { doConvertNumberToWords, doLength, doParse } from 'src/utils/helpers';
import Image from 'src/components/shared/Image';
import Heading from 'src/components/shared/Heading';
import MediaLoader from 'src/components/shared/MediaLoader';
import CTA from 'src/components/shared/CTA';
import 'assets/styles/components/select-list.scss';
import 'assets/styles/components/videos.scss';
import 'assets/styles/components/media-tabs.scss';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';
import CTASettings from 'src/utils/types/CTASettings';

const MediaTabs: React.FC<PanelLoaderProps> = ( { 
    data, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const tabsFieldKeys: Record<string, string> = {
        tabs: panelPrefix + '_tabs' + panelSuffix,
        tabsOrientation: panelPrefix + '_tabs_orientation' + panelSuffix,
    };
    const tabs: Array<Record<string, any>> = data.fields[ tabsFieldKeys.tabs ] ? data.fields[ tabsFieldKeys.tabs ] : [];

    // Tabs nav orientation
    const tabsOrientation: string = data.fields[ tabsFieldKeys.tabsOrientation ] ? data.fields[ tabsFieldKeys.tabsOrientation ] : '';
    const buttonStyle: string = tabsOrientation === 'vertical' ? 'text-button' : ( tabsOrientation === 'horizontal' ? 'solid-button' : '' );
    
    useEffect( () => {
        new DoSelectList();
        new DoVideosInTabs();
    }, [] );

    if ( doLength( tabs ) ) {
        const firstTab: Record<string, any> = tabs[0] ? tabs[0] : {};

        return (
            <Tabs defaultValue={ 0 } className={ 'media-tabs-wrapper' + ( tabsOrientation === 'vertical' ? ' vertical' : ' horizontal' )  }>
                <TabsList slots={ { root: 'nav' /*, tab: 'li'*/ } } className="media-tabs-nav-wrapper">
                    <span className="select-list-toggle mobile-toggle do-tabs-nav-toggle" data-toggle={ 'media-tabs-nav-' + panelNumber }>
                        { doLength( firstTab ) && firstTab.nav_label ? firstTab.nav_label : '' }
                    </span>
                    <ul id={ 'media-tabs-nav-' + panelNumber } className={ 'media-tabs-nav ' + doConvertNumberToWords( tabs.length ) } data-aos="zoom-in">
                        { tabs.map( ( tab, index ) => {
                            const tabLabelIconClass = doLength( tab.nav_label_icon ) ? 'has-icon' : '';
                            return (
                                <li key={ index } id={ tab.id ? 'tab-' + tab.id : undefined }>
                                    <Tab value={ index } className={ tabLabelIconClass }>
                                        { doLength( tab.nav_label_icon ) ?
                                            <Image image={ tab.nav_label_icon } />
                                        : null }
                                        { tab.nav_label }
                                    </Tab>
                                </li>
                            );
                        } ) }
                    </ul>
                </TabsList>
                <div id={ 'tab-content-' + panelNumber } className="tabs-content-wrapper" data-aos="zoom-in">
                    { tabs.map( ( tab: Record<string, any>, index: number ) => {
                        const tabCTASettings: CTASettings = {
                            url: tab.cta_url,
                            classes: [ buttonStyle ],
                            modal: tab.cta_modal,
                            modalClass: tab.cta_modal_class,
                            text: tab.cta_text,
                        }
                        return (
                            <TabPanel key={ index } value={ index } id={ tab.id } className={ 'tab-content' + ( tab.media.type === 'video' ? ' has-video' : '' ) }>
                                { doLength( tab.title ) ?
                                    <Heading tag={ 'h3' } title={ tab.title } />
                                : null }
                                { doLength( tab.media ) ? 
                                    <MediaLoader media={ tab.media } size="cinema_600" />
                                : null }
                                { doLength( tab.copy ) ? 
                                    <div className={ 'tab-text-wrapper' }>
                                        { doParse( tab.copy ) }
                                    </div>
                                : null }
                                { doLength( tab.cta_text ) ? 
                                    <CTA { ...tabCTASettings } />
                                : null }
                            </TabPanel>
                        );
                    } ) }
                </div>
            </Tabs>
        );
    } else {
        return null;
    }
}
export default MediaTabs;