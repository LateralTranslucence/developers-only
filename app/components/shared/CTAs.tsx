import React, { JSX } from 'react';
import CTA from '@/components/shared/CTA';
import { CTASettings } from '@/utils/types/CTASettings';

const CTAs: React.FC<{ ctas: Array<CTASettings> }> = ( { ctas = [] } ): JSX.Element => {
    return (
        <p className="panel-ctas">
            { ctas.map( ( cta: CTASettings, index: number ) => {
                const ctaSettings: CTASettings = {
                    url: cta.url ? cta.url : '',
                    text: cta.text ? cta.text : '',
                    modal: cta.modal ? cta.modal : false,
                    modal_class: cta.modal_class ? cta.modal_class : '',
                    button_style: cta.button_style ? cta.button_style : '',
                    classes: cta.classes ? cta.classes : [],
                };
                return <CTA key={ index } { ...ctaSettings } />;
            } ) }
        </p>
    );
};
export default CTAs;