"use client";
import React, { useEffect } from 'react';
import { Tabs as MUITabs } from '@base-ui-components/react/tabs';
import { DoSelectList, DoVideosInTabs } from '@/utils/display';
import { doConvertNumberToWords, doLength, doParse, doSanitizeTitleWithDashes } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import MediaLoader from '@/components/shared/MediaLoader';
import { PanelProps } from '@/utils/types/PanelProps';
import { MetaFieldKeyMap } from '@/utils/types/MetaFieldKeyMap';
import { Tab } from '@/utils/types/Tab';
import '@/styles/components/select-list.scss';
import '@/styles/components/blocks.scss';
import '@/styles/components/tabs.scss';

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
            <MUITabs.Root defaultValue={ 0 } className="tabs-wrapper">
                <MUITabs.List /*slots={ { root: 'nav' } }*/ className="tabs-nav-wrapper">
                    <span className="select-list-toggle mobile-toggle do-tabs-nav-toggle" data-toggle={ 'tabs-nav-' + panelNumber }>{ firstTab && firstTab.nav_label ? firstTab.nav_label : '' }</span>
                    <ul id={ 'tabs-nav-' + panelNumber } className={ 'tabs-nav ' + doConvertNumberToWords( tabs.length ) }>
                        { tabs.map( ( tab: Tab, index: number ) => {
                            const id = doSanitizeTitleWithDashes( tab.nav_label );
                            return (
                                <li key={ index } id={ id ? 'tab-' + id : '' }>
                                    <MUITabs.Tab value={ index }>{ tab.nav_label }</MUITabs.Tab>
                                </li>
                            );
                        } ) }
                    </ul>
                </MUITabs.List>
                <div id={ 'tab-content-' + panelNumber } className="tabs-content-wrapper">
                { tabs.map( ( tab: Tab, index: number ) => {
                    return (
                        <MUITabs.Panel value={ index } key={ index } id={ tab.id } className={ 'tab-content' + ( tab.media && tab.media.type === 'video' ? ' has-video' : '' ) }>
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
                                { tab.list.map( ( item: Record<string, any>, index: number ): JSX.Element => {
                                    return (
                                        <li key={ index } data-icon={ item.icon }>
                                            <CTA url={ item.url } classes={ [] }>
                                                { doParse( item.title ) }
                                            </CTA>
                                        </li>
                                    )
                                } ) }
                                </ul>
                            : null }
                            { tab.cta_url ?
                                <CTA url={ tab.cta_url } modal={ tab.cta_modal } text={ tab.cta_text } classes={ [ 'solid-button' ] } />
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
export default Tabs;