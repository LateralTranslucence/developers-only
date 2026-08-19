import React from 'react';
import { getBackgroundStyle, panelClasses as getBackgroundClasses, parse } from '@/utils/helpers';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import { CTASettings } from '@/utils/types/CTASettings';
import { HeadingProps } from '@/utils/types/HeadingProps';
import { HeroProps } from '@/utils/types/HeroProps';
import '@/styles/components/hero.scss';

const Hero: React.FC<HeroProps> = ( {
    background,
    breadcrumbs,
    classes = [],
    copy = '',
    ctas = [],
    customHTML,
    id = 'hero',
    title = '',
} ) => {
    // Add some classes
    if ( copy ) {
        classes.push( 'has-copy' );
    }
    // The hero carries a Background field like a panel does, so it gets the same
    // classes and the same inline colour / --background-image treatment.
    const heroClasses: Array<string> = background
        ? [ ...classes, ...getBackgroundClasses( background ) ]
        : classes;
    const headingSettings: HeadingProps = {
        tag: 'h1',
        title: title,
    };

    return (
        <header
            id={ id }
            className={ heroClasses.length > 0 ? heroClasses.join( ' ' ) : undefined }
            style={ background ? getBackgroundStyle( background ) : undefined }
        >
            <div className="container">
                { breadcrumbs ?
                    <Breadcrumbs breadcrumbs={ breadcrumbs } />
                : null }
                    { title ?
                        <Heading { ...headingSettings } />
                    : null }
                    { copy ?
                        <div className="hero__copy">{ parse( copy ) }</div>
                        : null }
                    { ctas.length > 0 ?
                        <p id="cta">
                            { ctas.map( ( cta: CTASettings, index: number ) => {
                                const ctaSettings: CTASettings = {
                                    url: cta.url,
                                    text: cta.text,
                                    modal: cta.modal,
                                    modal_class: cta.modal_class,
                                    classes: cta.button_style ? [ 'button', cta.button_style ] : [ 'button' ],
                                };
                                return <CTA key={ index } { ...ctaSettings } />;
                            } ) }
                        </p>
                        : null
                    }
                    { customHTML ?? null }
            </div>
        </header>
    );
};
export default Hero;
