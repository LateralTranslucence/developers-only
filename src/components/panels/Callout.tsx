import React from 'react';
import { doParse } from 'src/utils/helpers';
import 'assets/styles/components/callout.scss';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';

const Callout:React.FC<PanelLoaderProps> = ( { 
    data, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element => {
    const calloutFieldKeys: Record<string, string> = {
        pretitle: panelPrefix + '_callout_pretitle' + panelSuffix,
        callout: panelPrefix + '_callout' + panelSuffix,
        additional_text: panelPrefix + '_additional_text' + panelSuffix,
        footnote: panelPrefix + '_footnote' + panelSuffix,
        calloutStyle: panelPrefix + '_callout_style' + panelSuffix,
    };

    const pretitle: string = data.fields[ calloutFieldKeys.pretitle ] ? data.fields[ calloutFieldKeys.pretitle ] : '';
    const callout: string = data.fields[ calloutFieldKeys.callout ] ? data.fields[ calloutFieldKeys.callout ] : '';
    const additionalText: string = data.fields[ calloutFieldKeys.additional_text ] ? data.fields[ calloutFieldKeys.additional_text ] : '';
    const footnote: string = data.fields[ calloutFieldKeys.footnote ] ? data.fields[ calloutFieldKeys.footnote ] : '';

    // Callout Style
    const calloutStyle: string = data.fields[ calloutFieldKeys.calloutStyle ] ? data.fields[ calloutFieldKeys.calloutStyle ] : 'plain';

    return (
        <div className={ 'callout-wrapper' + ' ' + calloutStyle }>
            {  calloutStyle == 'quote' ? 
                <span className="pretitle">{ pretitle }</span>
            : null }
            <div className="callout">
                {  pretitle && calloutStyle!== 'quote' ? 
                    <span className="pretitle">{ pretitle }</span>
                : null }
                { doParse( callout ) }
            </div>
            {  footnote ? 
                <div className="footnote">{ doParse( footnote ) }</div>
            : null }
            { additionalText ? 
                <div className="callout-additional">
                    { doParse( additionalText ) }
                </div>
            : null }
        </div>
    );
}
export default Callout;