"use client";
import React, { useEffect } from 'react';
import { Tabs as MUITabs } from '@base-ui-components/react/tabs';
import { DoSelectList, DoVideosInTabs } from '@/utils/display';
import { doConvertNumberToWords, doLength, doParse } from '@/utils/helpers';
import { PanelProps } from '@/utils/types/PanelProps';
import { CTASettings } from '@/utils/types/CTASettings';
import Image from '@/components/shared/Image';
import Heading from '@/components/shared/Heading';
import MediaLoader from '@/components/shared/MediaLoader';
import CTA from '@/components/shared/CTA';
import '@/styles/components/select-list.scss';
import '@/styles/components/videos.scss';
import '@/styles/components/media-tabs.scss';

const MediaTabs: React.FC<PanelProps> = ( { 
    post, 
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
    const tabs: Array<Record<string, any>> = post.fields[ tabsFieldKeys.tabs ] ? post.fields[ tabsFieldKeys.tabs ] : [];

    // Tabs nav orientation
    const tabsOrientation: string = post.fields[ tabsFieldKeys.tabsOrientation ] ? post.fields[ tabsFieldKeys.tabsOrientation ] : '';
    const buttonStyle: string = tabsOrientation === 'vertical' ? 'text-button' : ( tabsOrientation === 'horizontal' ? 'solid-button' : '' );
    
    useEffect( () => {
        new DoSelectList();
        new DoVideosInTabs();
    }, [] );

    if ( doLength( tabs ) ) {
        const firstTab: Record<string, any> = tabs[0] ? tabs[0] : {};

        return (
            <MUITabs.Root defaultValue={ 0 } className={ 'media-tabs-wrapper' + ( tabsOrientation === 'vertical' ? ' vertical' : ' horizontal' )  }>
                <MUITabs.List className="media-tabs-nav-wrapper">
                    <span className="select-list-toggle mobile-toggle do-tabs-nav-toggle" data-toggle={ 'media-tabs-nav-' + panelNumber }>
                        { doLength( firstTab ) && firstTab.nav_label ? firstTab.nav_label : '' }
                    </span>
                    <ul id={ 'media-tabs-nav-' + panelNumber } className={ 'media-tabs-nav ' + doConvertNumberToWords( tabs.length ) } data-aos="zoom-in">
                        { tabs.map( ( tab, index ) => {
                            const tabLabelIconClass = doLength( tab.nav_label_icon ) ? 'has-icon' : '';
                            return (
                                <li key={ index } id={ tab.id ? 'tab-' + tab.id : undefined }>
                                    <MUITabs.Tab value={ index } className={ tabLabelIconClass }>
                                        { doLength( tab.nav_label_icon ) ?
                                            <Image image={ tab.nav_label_icon } />
                                        : null }
                                        { tab.nav_label }
                                    </MUITabs.Tab>
                                </li>
                            );
                        } ) }
                    </ul>
                </MUITabs.List>
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
                            <MUITabs.Panel key={ index } value={ index } id={ tab.id } className={ 'tab-content' + ( tab.media.type === 'video' ? ' has-video' : '' ) }>
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
                            </MUITabs.Panel>
                        );
                    } ) }
                </div>
            </MUITabs.Root>
        );
    } else {
        return null;
    }
}
export default MediaTabs;