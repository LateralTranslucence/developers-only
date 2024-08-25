import React from 'react';
import CTA from 'src/components/shared/CTA';
import CTASettings from 'src/utils/types/CTASettings';
import URLObject from 'src/utils/types/URLObject';

const CTAs: React.FC<{ ctas: CTASettings | Array<CTASettings> }> = ( { ctas } ): JSX.Element => {
    return (
        <p className="panel-cta">
            { ( Array.isArray( ctas ) ? ctas : [ ctas ] ).map( ( cta: CTASettings, index: number ) => {
                const ctaText: string = cta.text ? cta.text : '';
                const ctaURL: string | URLObject = cta.url ? cta.url : '';
                const ctaModal: boolean = cta.modal ? cta.modal : false;
                const ctaClasses: Array<string> = cta.buttonStyle ? [ 'button', cta.buttonStyle ] : [ 'button' ];
                const ctaModalClass: string = cta.modalClass ? cta.modalClass : '';
                const ctaSettings: CTASettings = {
                    url: ctaURL,
                    text: ctaText,
                    modal: ctaModal,
                    modalClass: ctaModalClass,
                    classes: ctaClasses,
                };
                return <CTA key={ index } { ...ctaSettings } />
            } ) }
        </p>
    );
}
export default CTAs;