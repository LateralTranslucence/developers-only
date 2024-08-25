import React from 'react';
import { doLength } from 'src/utils/helpers';
import BackgroundVideo from 'src/components/shared/BackgroundVideo';
import Heading from 'src/components/shared/Heading';
import 'assets/styles/components/panels.scss';
import CustomAttributes from 'src/utils/types/CustomAttributes';
import HeadingProps from 'src/utils/types/HeadingProps';
import CTASettings from 'src/utils/types/CTASettings';
import BackgroundSettings from 'src/utils/types/BackgroundSettings';

interface PanelProps {
    background?: CustomAttributes;
    backgroundVideo?: BackgroundSettings;
    children?: React.ReactNode;
    classes?: Array<string>;
    copy?: string;
    copyParallax?: CustomAttributes,
    cta?: CTASettings;
    featuredSettings?: CustomAttributes;
    heading?: HeadingProps;
    headerParallax?: CustomAttributes;
    mediaBackgroundSettings?: CustomAttributes;
    panelID: string;
    panelType: string;
}
const PanelWrapper: React.FC<PanelProps> = ( { 
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
    mediaBackgroundSettings = {},
    panelID = '', 
    panelType = '', 
 } ) => {
    return (
        <section id={ panelID } className={ doLength( classes ) ? classes.join( ' ' ) : '' } { ...mediaBackgroundSettings }>
            <div className={ 'panel-inner-wrapper' + ( panelType == 'linear-content' ? '' : ' container' ) } { ...featuredSettings }>
                { ( heading && doLength( heading.title ) ) || doLength( backgroundVideo ) ?
                    <header className={ 'panel-header' + ( doLength( cta ) ? ' has-cta' : '' ) } { ...headerParallax }>
                        <BackgroundVideo { ...backgroundVideo } id={ panelID + '-video' } />
                        <Heading { ...heading } />
                    </header>
                : null }
                { doLength( copy ) ?
                    <div className="panel-copy-wrapper" { ...copyParallax }>
                        { copy }
                    </div>
                : null }
                { children }
            </div>
        </section>
    );
}
export default PanelWrapper;