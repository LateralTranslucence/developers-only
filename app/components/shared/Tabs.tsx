import React, { createContext, JSX, useContext, useId, useRef, useState } from 'react';

type TabsOrientation = 'horizontal' | 'vertical';

interface TabsContextValue {
    activeValue: number;
    baseId: string;
    moveFocus: ( currentValue: number, direction: 1 | -1 ) => void;
    moveFocusToEdge: ( edge: 'start' | 'end' ) => void;
    orientation: TabsOrientation;
    registerTab: ( value: number, el: HTMLButtonElement | null ) => void;
    setActiveValue: ( value: number ) => void;
}

const TabsContext = createContext<TabsContextValue | null>( null );

const useTabsContext = (): TabsContextValue => {
    const context = useContext( TabsContext );
    if ( ! context ) {
        throw new Error( 'Tabs.Tab and Tabs.Panel must be used within Tabs.Root' );
    }
    return context;
};

interface RootProps {
    children: React.ReactNode;
    className?: string;
    defaultValue?: number;
    onValueChange?: ( value: number ) => void;
    orientation?: TabsOrientation;
    value?: number;
}

const Root: React.FC<RootProps> = ( {
    children,
    className = '',
    defaultValue = 0,
    onValueChange,
    orientation = 'horizontal',
    value,
} ): JSX.Element => {
    const baseId = useId();
    const [ internalValue, setInternalValue ] = useState<number>( value ?? defaultValue );
    const activeValue: number = value ?? internalValue;
    const tabRefs = useRef<Map<number, HTMLButtonElement>>( new Map() );

    const setActiveValue = ( newValue: number ): void => {
        if ( value === undefined ) {
            setInternalValue( newValue );
        }
        onValueChange?.( newValue );
    };

    const registerTab = ( tabValue: number, el: HTMLButtonElement | null ): void => {
        if ( el ) {
            tabRefs.current.set( tabValue, el );
        } else {
            tabRefs.current.delete( tabValue );
        }
    };

    // WAI-ARIA APG tabs pattern: arrow keys move focus and selection between
    // tabs, wrapping at the ends; Home/End jump to the first/last tab.
    const moveFocus = ( currentValue: number, direction: 1 | -1 ): void => {
        const count: number = tabRefs.current.size;
        if ( count === 0 ) return;
        let nextValue: number = currentValue + direction;
        if ( nextValue < 0 ) nextValue = count - 1;
        if ( nextValue >= count ) nextValue = 0;
        setActiveValue( nextValue );
        tabRefs.current.get( nextValue )?.focus();
    };

    const moveFocusToEdge = ( edge: 'start' | 'end' ): void => {
        const count: number = tabRefs.current.size;
        if ( count === 0 ) return;
        const targetValue: number = edge === 'start' ? 0 : count - 1;
        setActiveValue( targetValue );
        tabRefs.current.get( targetValue )?.focus();
    };

    return (
        <TabsContext.Provider value={ { activeValue, baseId, moveFocus, moveFocusToEdge, orientation, registerTab, setActiveValue } }>
            <div className={ className }>
                { children }
            </div>
        </TabsContext.Provider>
    );
};

interface TabProps {
    anchorId?: string;
    children: React.ReactNode;
    className?: string;
    value: number;
}

// With an anchorId, the panel carries it (so #anchor links reach the content)
// and the tab gets the same id plus -tab; ids must be unique.
const tabElementId = ( anchorId: string | undefined, baseId: string, value: number ): string => anchorId ? `${ anchorId }-tab` : `${ baseId }-tab-${ value }`;
const panelElementId = ( anchorId: string | undefined, baseId: string, value: number ): string => anchorId || `${ baseId }-panel-${ value }`;

const Tab: React.FC<TabProps> = ( { anchorId, children, className = '', value } ): JSX.Element => {
    const { activeValue, baseId, moveFocus, moveFocusToEdge, orientation, registerTab, setActiveValue } = useTabsContext();
    const isActive: boolean = activeValue === value;
    const tabId: string = tabElementId( anchorId, baseId, value );
    const panelId: string = panelElementId( anchorId, baseId, value );
    const nextKey: string = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
    const prevKey: string = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';

    const handleKeyDown = ( event: React.KeyboardEvent<HTMLButtonElement> ): void => {
        switch ( event.key ) {
            case nextKey:
                event.preventDefault();
                moveFocus( value, 1 );
                break;
            case prevKey:
                event.preventDefault();
                moveFocus( value, -1 );
                break;
            case 'Home':
                event.preventDefault();
                moveFocusToEdge( 'start' );
                break;
            case 'End':
                event.preventDefault();
                moveFocusToEdge( 'end' );
                break;
        }
    };

    return (
        <button
            aria-controls={ panelId }
            aria-selected={ isActive }
            className={ className }
            id={ tabId }
            onClick={ () => setActiveValue( value ) }
            onKeyDown={ handleKeyDown }
            ref={ ( el ) => registerTab( value, el ) }
            role="tab"
            tabIndex={ isActive ? 0 : -1 }
            type="button">
            { children }
        </button>
    );
};

interface PanelProps {
    anchorId?: string;
    children: React.ReactNode;
    className?: string;
    value: number;
}

const Panel: React.FC<PanelProps> = ( { anchorId, children, className = '', value } ): JSX.Element => {
    const { activeValue, baseId } = useTabsContext();
    const isActive: boolean = activeValue === value;
    const tabId: string = tabElementId( anchorId, baseId, value );
    const panelId: string = panelElementId( anchorId, baseId, value );

    return (
        <div
            aria-labelledby={ tabId }
            className={ className }
            hidden={ ! isActive }
            id={ panelId }
            role="tabpanel"
            tabIndex={ 0 }>
            { children }
        </div>
    );
};

const Tabs = { Root, Tab, Panel };
export default Tabs;
