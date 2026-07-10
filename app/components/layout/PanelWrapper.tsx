import React from 'react';
import { parse } from '@/utils/helpers';
import Heading from '@/components/shared/Heading';
import { CustomAttributes } from '@/utils/types/CustomAttributes';
import { HeadingProps } from '@/utils/types/HeadingProps';
import { CTASettings } from '@/utils/types/CTASettings';
import '@/styles/components/panels.scss';

interface PanelWrapperProps {
    background?: CustomAttributes;
    children?: React.ReactNode;
    classes?: Array<string>;
    copy?: string;
    cta?: CTASettings;
    featuredSettings?: CustomAttributes;
    heading?: HeadingProps;
    panelID: string;
    panelType: string;
}
const PanelWrapper: React.FC<PanelWrapperProps> = ( { 
    background, 
    classes = [],
    children,
    copy = '',
    cta,
    featuredSettings, 
    heading = {},
    panelID = '', 
 } ) => {
    return (
        <section id={ panelID } className={ classes.length > 0 ? classes.join( ' ' ) : '' } style={ background && background.style ? background.style : {} }>
            <div className="container" { ...featuredSettings }>
                { heading?.title ?
                    <header className={ 'panel-header' + ( cta ? ' has-cta' : '' ) }>
                        <Heading { ...heading } />
                    </header>
                : null }
                { copy ?
                    <div className="panel-copy-wrapper">
                        { parse( copy ) }
                    </div>
                : null }
                { children }
            </div>
        </section>
    );
};
export default PanelWrapper;
