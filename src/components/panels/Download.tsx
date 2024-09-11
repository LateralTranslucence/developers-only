import React from 'react';
import CTA from 'src/components/shared/CTA';
import { PanelProps } from 'src/utils/types/PanelProps';

const Download:React.FC<PanelProps> = ( { 
    post, 
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

    const ctaLabel: string = post.fields[ downloadFieldKeys.ctaLabel ] ? post.fields[ downloadFieldKeys.ctaLabel ] : 'Download';
    const downloadFile: string = post.fields[ downloadFieldKeys.downloadFile ] ? post.fields[ downloadFieldKeys.downloadFile ] : '';
    
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