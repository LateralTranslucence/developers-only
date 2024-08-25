import React from 'react';
import CTAs from 'src/components/shared/CTAs';
import 'assets/styles/components/text.scss';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';
import MetaFieldKeyMap from 'src/utils/types/MetaFieldKeyMap';
import CTASettings from 'src/utils/types/CTASettings';

const Text: React.FC<PanelLoaderProps> = ( { 
    data, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element => {
    const textFieldKeys: MetaFieldKeyMap = {
        cta: panelPrefix + '_cta' + panelSuffix,
    };
    const cta: Array<CTASettings> = data.fields[ textFieldKeys.cta ] ? data.fields[ textFieldKeys.cta ] : [];
    
    return <CTAs ctas={ cta } />
}
export default Text;