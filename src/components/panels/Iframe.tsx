import React from 'react';
import { doParse } from 'src/utils/helpers';
import 'assets/styles/components/iframe.scss';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';

const Frame: React.FC<PanelLoaderProps> = ( { 
    data, 
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
    const iframe: string = data.fields[ frameFieldKeys.frame ].replace( '[]', '<>' );
    const defer: boolean = false;
    const ratio: string = data.fields[ frameFieldKeys.ratio ].length ? data.fields[ frameFieldKeys.ratio ] : '100';
    
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