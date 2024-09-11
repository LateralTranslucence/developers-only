import React from 'react';
import CTAs from 'src/components/shared/CTAs';
import 'assets/styles/components/cta.scss';
import { PanelProps } from 'src/utils/types/PanelProps';

const CTA:React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const CTAFieldKeys = {
        cta: panelPrefix + '_cta' + panelSuffix,
    };

    const cta = post.fields[ CTAFieldKeys.cta ] ? post.fields[ CTAFieldKeys.cta ] : [];

    return (
        <>
        { cta ? 
            <CTAs ctas={ cta } />
        : null }
        </>
    );
}
export default CTA;