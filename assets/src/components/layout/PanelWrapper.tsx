import React from 'react';
import { doLength, doParse } from '@/utils/helpers';
import BackgroundVideo from '@/components/shared/BackgroundVideo';
import Heading from '@/components/shared/Heading';
import '@/styles/components/panels.scss';
import { CustomAttributes } from '@/utils/types/CustomAttributes';
import { HeadingProps } from '@/utils/types/HeadingProps';
import { CTASettings } from '@/utils/types/CTASettings';
import { BackgroundProps } from '@/utils/types/BackgroundProps';

interface PanelWrapperProps {
    background?: CustomAttributes;
    backgroundVideo?: BackgroundProps;
    children?: React.ReactNode;
    classes?: Array<string>;
    copy?: string;
    copyParallax?: CustomAttributes,
    cta?: CTASettings;
    featuredSettings?: CustomAttributes;
    heading?: HeadingProps;
    headerParallax?: CustomAttributes;
    panelID: string;
    panelType: string;
}
const PanelWrapper: React.FC<PanelWrapperProps> = ( { 
    background, 
    backgroundVideo,
    classes = [],
    children,
    copy = '',
    copyParallax = {},
    cta,
    featuredSettings, 
    heading = {},
    headerParallax = {},
    panelID = '', 
    panelType = '', 
 } ) => {
    return (
        <section id={ panelID } className={ doLength( classes ) ? classes.join( ' ' ) : '' }>
            <div className={ 'panel-inner-wrapper' + ( panelType == 'linear-content' ? '' : ' container' ) } { ...featuredSettings }>
                { ( heading && doLength( heading.title ) ) || doLength( backgroundVideo ) ?
                    <header className={ 'panel-header' + ( doLength( cta ) ? ' has-cta' : '' ) } { ...headerParallax }>
                        <BackgroundVideo { ...backgroundVideo } id={ panelID + '-video' } />
                        <Heading { ...heading } />
                    </header>
                : null }
                { doLength( copy ) ?
                    <div className="panel-copy-wrapper" { ...copyParallax }>
                        { doParse( copy ) }
                    </div>
                : null }
                { children }
            </div>
        </section>
    );
}
export default PanelWrapper;