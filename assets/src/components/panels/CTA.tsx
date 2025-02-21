import React from 'react';
import { CTASettings } from '@/utils/types/CTASettings';
import { MetaFieldKeyMap } from '@/utils/types/MetaFieldKeyMap';
import { PanelProps } from '@/utils/types/PanelProps';
import CTAs from '@/components/shared/CTAs';
import '@/styles/components/cta.scss';

const CTA:React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const CTAFieldKeys: MetaFieldKeyMap = {
        ctas: panelPrefix + '_cta' + panelSuffix,
    }

    const ctas: Array<CTASettings> = post.fields[ CTAFieldKeys.ctas ] ? post.fields[ CTAFieldKeys.ctas ] : [];

    return (
        <>
        { ctas ? 
            <CTAs ctas={ ctas } />
        : null }
        </>
    )
}
export default CTA;