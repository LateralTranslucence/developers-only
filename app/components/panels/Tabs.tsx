import React, { JSX, useRef, useState } from 'react';
import Tabs from '@/components/shared/Tabs';
import { convertNumberToWords, parse, sanitizeTitleWithDashes } from '@/utils/helpers';
import { getTabsPanelConfig } from '@/utils/panels';
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
    // A link to a tab's anchor (#its-id) opens on that tab
    const [ activeTab, setActiveTab ] = useState<number>( () => {
        const hash: string = decodeURIComponent( window.location.hash.slice( 1 ) );
        const index: number = hash ? tabs.findIndex( ( tab: PanelTab ) => tab.id === hash ) : -1;
        return index > -1 ? index : 0;
    } );
    // Below the breakpoint the tab list collapses behind a toggle
    const [ navOpen, setNavOpen ] = useState<boolean>( false );
    const navId: string = 'tabs-nav-' + panelNumber;
    const toggleRef = useRef<HTMLButtonElement | null>( null );

    // Closing hides the list (display: none below the breakpoint), and with
    // it the focused tab, which would drop focus to <body>. Hand focus to the
    // toggle, which stays visible. Above the breakpoint the list never closes,
    // so this does nothing there.
    const closeNav = (): void => {
        if ( ! navOpen ) return;
        setNavOpen( false );
        toggleRef.current?.focus();
    };

    // Arrow keys, Home and End move between tabs and select as they go
    // (Tabs.Root calls onValueChange for those too), so selecting alone
    // mustn't close the list. A click - or Enter/Space, which click - picks a
    // tab and closes it; so does Escape.
    const navClick = ( event: React.MouseEvent<HTMLUListElement> ): void => {
        if ( ( event.target as Element ).closest( '[role="tab"]' ) ) {
            closeNav();
        }
    };
    const navKeyDown = ( event: React.KeyboardEvent<HTMLUListElement> ): void => {
        if ( event.key === 'Escape' && navOpen ) {
            event.preventDefault();
            closeNav();
        }
    };

    if ( tabs.length > 0 ) {
        return (
            <Tabs.Root value={ activeTab } onValueChange={ setActiveTab } className="tabs">
                <div className="tabs__nav-wrapper">
                    <button
                        aria-controls={ navId }
                        aria-expanded={ navOpen }
                        className={ 'select-list-toggle mobile-toggle tabs__nav-toggle' + ( navOpen ? ' open' : '' ) }
                        onClick={ () => setNavOpen( ! navOpen ) }
                        ref={ toggleRef }
                        type="button">
                        { tabs[ activeTab ]?.nav_label ?? tabs[0]?.nav_label ?? '' }
                    </button>
                    { /* Clicks and Escape bubble up from the tab buttons */ }
                    <ul id={ navId } role="tablist" className={ 'tabs__nav ' + convertNumberToWords( tabs.length ) + ( navOpen ? ' open' : '' ) } onClick={ navClick } onKeyDown={ navKeyDown }>
                        { tabs.map( ( tab: PanelTab, index: number ) => {
                            const id = sanitizeTitleWithDashes( tab.nav_label );
                            // role="presentation": a tablist's children must
                            // be tabs. The id includes the panel number,
                            // since two tab panels can share labels.
                            return (
                                <li className="tabs__nav-item" key={ index } id={ id ? 'tab-' + panelNumber + '-' + id : undefined } role="presentation">
                                    <Tabs.Tab anchorId={ tab.id } className="tabs__tab" value={ index }>{ tab.nav_label }</Tabs.Tab>
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
