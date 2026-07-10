import React, { JSX } from 'react';
import CTAs from '@/components/shared/CTAs';
import { getArrayField } from '@/utils/helpers';
import '@/styles/components/text.scss';
import { PanelProps } from '@/utils/types/PanelProps';
import { CTASettings } from '@/utils/types/CTASettings';

const Text: React.FC<PanelProps> = ( { 
    post, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element => {
    const ctas = getArrayField<CTASettings>( post.fields, panelPrefix + '_ctas' + panelSuffix );
    
    return <CTAs ctas={ ctas } />;
};
export default Text;