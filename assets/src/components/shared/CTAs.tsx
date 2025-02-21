import React from 'react';
import CTA from '@/components/shared/CTA';
import { CTASettings } from '@/utils/types/CTASettings';

const CTAs: React.FC<{ ctas: Array<CTASettings> }> = ( { ctas = [] } ): JSX.Element => {
    return (
        <p className="panel-cta">
            { ctas.map( ( cta: CTASettings, index: number ) => {
                const ctaSettings: CTASettings = {
                    url: cta.url ? cta.url : '',
                    text: cta.text ? cta.text : '',
                    modal: cta.modal ? cta.modal : false,
                    modalClass: cta.modalClass ? cta.modalClass : '',
                    classes: cta.buttonStyle ? [ 'button', cta.buttonStyle ] : [ 'button' ],
                };
                return <CTA key={ index } { ...ctaSettings } />
            } ) }
        </p>
    );
}
export default CTAs;