import React from 'react';
import { doConvertNumberToWords, doLength, doParse } from '@/utils/helpers';
import Heading from '@/components/shared/Heading';
import SliderNav from '@/components/shared/SliderNav';
import '@/styles/components/blocks.scss';
import '@/styles/components/timeline.scss';
import { PanelProps } from '@/utils/types/PanelProps';
import { MetaFieldKeyMap } from '@/utils/types/MetaFieldKeyMap';

const Timeline: React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const timelineFieldKeys: MetaFieldKeyMap = {
        timeline: panelPrefix + '_timeline' + panelSuffix,
    };
    const timeline: Array<Record<string, any>> = post.fields[ timelineFieldKeys.timeline ] ? post.fields[ timelineFieldKeys.timeline ] : [];
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