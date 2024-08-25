import React from 'react';
import CTA from 'src/components/shared/CTA';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';

const Download:React.FC<PanelLoaderProps> = ( { 
    data, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element => {
    const downloadFieldKeys: Record<string, string> = {
        ctaLabel: panelPrefix + '_cta_label' + panelSuffix,
        downloadFile: panelPrefix + '_file',
    };

    const ctaLabel: string = data.fields[ downloadFieldKeys.ctaLabel ] ? data.fields[ downloadFieldKeys.ctaLabel ] : 'Download';
    const downloadFile: string = data.fields[ downloadFieldKeys.downloadFile ] ? data.fields[ downloadFieldKeys.downloadFile ] : '';
    
    return (
        <p className="panel-cta">
            <span>
                <CTA text={ ctaLabel } 
                    url={ downloadFile } 
                    modal={ true } 
                    //modalClass={ doURLType( downloadFile ) === 'pdf' && ! iframe ? 'do-downloadable-content' : false } 
                    classes={ [ 'button', 'color-border' ] }
                    id="do-download-content"
                    iframeName="do-downloadable-iframe" />
            </span>
        </p>
    );
}
export default Download;