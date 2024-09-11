import React from 'react';
import { MetaFieldKeyMap } from 'src/utils/types/MetaFieldKeyMap';
import { PanelProps } from 'src/utils/types/PanelProps';
import { doParse } from 'src/utils/helpers';
import 'assets/styles/components/callout.scss';

const Callout:React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element => {
    const calloutFieldKeys: MetaFieldKeyMap = {
        pretitle: panelPrefix + '_callout_pretitle' + panelSuffix,
        callout: panelPrefix + '_callout' + panelSuffix,
        additional_text: panelPrefix + '_additional_text' + panelSuffix,
        footnote: panelPrefix + '_footnote' + panelSuffix,
        calloutStyle: panelPrefix + '_callout_style' + panelSuffix,
    }

    const pretitle: string = post.fields[ calloutFieldKeys.pretitle ] ? post.fields[ calloutFieldKeys.pretitle ] : '';
    const callout: string = post.fields[ calloutFieldKeys.callout ] ? post.fields[ calloutFieldKeys.callout ] : '';
    const additionalText: string = post.fields[ calloutFieldKeys.additional_text ] ? post.fields[ calloutFieldKeys.additional_text ] : '';
    const footnote: string = post.fields[ calloutFieldKeys.footnote ] ? post.fields[ calloutFieldKeys.footnote ] : '';

    // Callout Style
    const calloutStyle: string = post.fields[ calloutFieldKeys.calloutStyle ] ? post.fields[ calloutFieldKeys.calloutStyle ] : 'plain';

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