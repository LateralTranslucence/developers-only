import React from 'react';
import CTAs from '@/components/shared/CTAs';
import '@/styles/components/text.scss';
import { PanelProps } from '@/utils/types/PanelProps';
import { MetaFieldKeyMap } from '@/utils/types/MetaFieldKeyMap';
import { CTASettings } from '@/utils/types/CTASettings';

const Text: React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element => {
    const textFieldKeys: MetaFieldKeyMap = {
        cta: panelPrefix + '_cta' + panelSuffix,
    };
    const cta: Array<CTASettings> = post.fields[ textFieldKeys.cta ] ? post.fields[ textFieldKeys.cta ] : [];
    
    return <CTAs ctas={ cta } />
}
export default Text;