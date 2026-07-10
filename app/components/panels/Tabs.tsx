import React, { JSX, useEffect, useState } from 'react';
import Tabs from '@/components/shared/Tabs';
import { SelectList, VideosInTabs } from '@/utils/display';
import { convertNumberToWords, parse, sanitizeTitleWithDashes } from '@/utils/helpers';
import { getTabsPanelConfig } from '@/utils/panels';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import MediaLoader from '@/components/shared/MediaLoader';
import { PanelProps } from '@/utils/types/PanelProps';
import { PanelTab } from '@/utils/types/Panels';
import '@/styles/components/select-list.scss';
import '@/styles/components/blocks.scss';
import '@/styles/components/tabs.scss';
import CTAs from '../shared/CTAs';

const TabsPanel: React.FC<PanelProps> = ( {
    post,
    panelNumber,
    panelPrefix = '',
    panelSuffix = ''
} ): JSX.Element | null => {
    const { tabs, mediaSize } = getTabsPanelConfig( post.fields, panelPrefix, panelSuffix );
    const [ activeTab, setActiveTab ] = useState<number>( 0 );

    useEffect( () => {
        new SelectList();
        new VideosInTabs();
    }, [] );

    if ( tabs.length > 0 ) {
        return (
            <Tabs.Root value={ activeTab } onValueChange={ setActiveTab } className="tabs">
                <div className="tabs__nav-wrapper">
                    <span className="select-list-toggle mobile-toggle tabs__nav-toggle" data-toggle={ 'tabs-nav-' + panelNumber }>
                        { tabs[ activeTab ]?.nav_label ?? tabs[0]?.nav_label ?? '' }
                    </span>
                    <ul id={ 'tabs-nav-' + panelNumber } role="tablist" className={ 'tabs__nav ' + convertNumberToWords( tabs.length ) }>
                        { tabs.map( ( tab: PanelTab, index: number ) => {
                            const id = sanitizeTitleWithDashes( tab.nav_label );
                            return (
                                <li className="tabs__nav-item" key={ index } id={ id ? 'tab-' + id : '' }>
                                    <Tabs.Tab className="tabs__tab" value={ index }>{ tab.nav_label }</Tabs.Tab>
                                </li>
                            );
                        } ) }
                    </ul>
                </div>
                <div id={ 'tab-content-' + panelNumber } className="tabs__content">
                { tabs.map( ( tab: PanelTab, index: number ) => {
                    return (
                        <Tabs.Panel value={ index } key={ index } anchorId={ tab.id } className={ 'tabs__panel' + ( tab.media && tab.media.type === 'video' ? ' tabs__panel--has-video' : '' ) }>
                            { tab.title ?
                                <Heading tag="h2" title={ tab.title } />
                            : null }
                            { tab.media && Object.keys( tab.media ).length > 0 ?
                                <MediaLoader media={ tab.media } size={ mediaSize || 'vertical_600' } mobileImage={ mediaSize ? mediaSize.replace( '600', '400' ) : 'vertical_400' } />
                            : null }
                            { tab.copy ?
                                <div className="tabs__copy">
                                    { parse( tab.copy ) }
                                </div>
                            : null }
                            { tab.ctas ?
                                <CTAs ctas={ tab.ctas } />
                            : null }
                        </Tabs.Panel>
                    );
                } ) }
                </div>
            </Tabs.Root>
        );
    } else {
        return null;
    }
};
export default TabsPanel;
