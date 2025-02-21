import React from 'react';
import { doParse } from '@/utils/helpers';
import '@/styles/components/iframe.scss';
import { PanelProps } from '@/utils/types/PanelProps';

const Frame: React.FC<PanelProps> = ( { 
    post,
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const frameFieldKeys: Record<string, string> = {
        'frame': panelPrefix + '_frame' + panelSuffix,
        'defer': panelPrefix + '_defer' + panelSuffix,
        'ratio': panelPrefix + '_height_width_ratio' + panelSuffix,
    };
    
    // iframe code
    const iframe: string = post.fields[ frameFieldKeys.frame ].replace( '[]', '<>' );
    const defer: boolean = false;
    const ratio: string = post.fields[ frameFieldKeys.ratio ].length ? post.fields[ frameFieldKeys.ratio ] : '100';
    
    if ( iframe ) {
        return (
            <div className="do-iframe-wrapper" style={ { paddingTop: ratio + '%' } }>
                { defer ? doParse( defer ) : doParse( iframe ) }
            </div>
        );
    } else {
        return null;
    }
}
export default Frame;