import React from 'react';
import { doConvertNumberToWords, doLength, doParse } from 'src/utils/helpers';
import Heading from 'src/components/shared/Heading';
import SliderNav from 'src/components/shared/SliderNav';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/timeline.scss';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';
import MetaFieldKeyMap from 'src/utils/types/MetaFieldKeyMap';

const Timeline: React.FC<PanelLoaderProps> = ( { 
    data, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const timelineFieldKeys: MetaFieldKeyMap = {
        timeline: panelPrefix + '_timeline' + panelSuffix,
    };
    const timeline: Array<Record<string, any>> = data.fields[ timelineFieldKeys.timeline ] ? data.fields[ timelineFieldKeys.timeline ] : [];
    const perRow: number = 3;
    
    if ( doLength( timeline ) ) {
        return (
            <div className="panel-slider-wrapper" uk-slider="finite: true">
                <ul className={ 'panel-blocks blocks timeline plain uk-slider-items ' + doConvertNumberToWords( perRow ) }>
                    { timeline.map( ( year: Record<string, any>, index: number ) => {
                        return (
                            <li key={ index }>
                                <div className="block-content-wrapper">
                                    { year.year ?
                                        <figure className="year">
                                            { year.year }
                                        </figure>
                                    : null }
                                    { year.title ?
                                        <Heading tag="h3" title={ year.title }/>
                                    : null }
                                    { year.description ? 
                                        doParse( year.description )
                                    : null }
                                </div>
                            </li>
                        );
                    } ) }
                </ul>
                <SliderNav dotNav={ true } length={ doLength( timeline ) } />
            </div>
        );
    } else {
        return null;
    }

}
export default Timeline;