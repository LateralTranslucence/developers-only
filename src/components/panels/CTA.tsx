import React from 'react';
import CTAs from 'src/components/shared/CTAs';
import 'assets/styles/components/cta.scss';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';

const CTA:React.FC<PanelLoaderProps> = ( { 
    data, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const CTAFieldKeys = {
        cta: panelPrefix + '_cta' + panelSuffix,
    };

    const cta = data.fields[ CTAFieldKeys.cta ] ? data.fields[ CTAFieldKeys.cta ] : [];

    return (
        <>
        { cta ? 
            <CTAs ctas={ cta } />
        : null }
        </>
    );
}
export default CTA;