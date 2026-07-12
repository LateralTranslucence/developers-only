import React, { JSX } from 'react';
import { CTASettings } from '@/utils/types/CTASettings';
import { PanelProps } from '@/utils/types/PanelProps';
import CTAs from '@/components/shared/CTAs';
import '@/styles/components/cta.scss';

const CTA: React.FC<PanelProps> = ( { 
    post, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const cta: Partial<CTASettings> = ( post.fields[ panelPrefix + '_cta' + panelSuffix ] ?? {} ) as Partial<CTASettings>;
    const ctas: Array<CTASettings> = [];
    ctas.push( {
        url: cta.url ? cta.url : '',
        text: cta.text ? cta.text : '',
        modal: cta.modal ? cta.modal : false,
        modal_class: cta.modal_class ? cta.modal_class : '',
        button_style: cta.button_style ? cta.button_style : '',
        classes: [],
    } );
    return (
        <>
        { ctas ? 
            <CTAs ctas={ ctas } />
        : null }
        </>
    );
};
export default CTA;