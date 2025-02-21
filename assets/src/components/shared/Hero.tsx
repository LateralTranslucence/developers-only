import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BackgroundProps } from '@/utils/types/BackgroundProps';
import { ImageLink } from '@/utils/types/ImageLink';
import { Media } from '@/utils/types/Media';
import { doBackgroundImage, doLength, doParse } from '@/utils/helpers';
import BackgroundVideo from '@/components/shared/BackgroundVideo';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import MediaLoader from '@/components/shared/MediaLoader';
import ShareBar from '@/components/shared/ShareBar';
import { CTASettings } from '@/utils/types/CTASettings';
import { CustomAttributes } from '@/utils/types/CustomAttributes';
import { HeadingProps } from '@/utils/types/HeadingProps';
import { HeroProps } from '@/utils/types/HeroProps';
import '@/styles/components/hero.scss';

const Hero: React.FC<HeroProps> = ( {
    backgroundSettings,
    breadcrumbs,
    classes = [],
    copy = '',
    ctas = [],
    customHTML,
    customHTMLAfter,
    id = 'hero',
    imageLink = {
        modal: false,
        url: '',
    },
    media = {},
    mediaLoop = false,
    pretitle = '',
    publishDate = '',
    shareBar = false,
    subtitle = '',
    textColor = '',
    title = '',
    url = '',
} ) => {
    // Add some classes
    if ( textColor.length ) {
        classes.push( 'text-' + textColor );
    }
    if ( doLength( backgroundSettings ) ) {
        classes.push( 'has-background' );
    }
    if ( doLength( copy ) ) {
        classes.push( 'has-copy' );
    }
    if ( doLength( media ) ) {
        classes.push( 'has-media' );
    }
    
    const heroBackground: CustomAttributes = doBackgroundImage( backgroundSettings, classes );
    const headingSettings: HeadingProps = {
        tag: 'h1',
        pretitle: pretitle,
        title: title,
        subtitle: subtitle,
        publishDate: publishDate,
    };

    return (
        <header id={ id }{ ...heroBackground }>
            <BackgroundVideo { ...backgroundSettings } id="hero-background" />
            <div className="hero-container container">
                { breadcrumbs ? 
                    <Breadcrumbs post={ breadcrumbs } />
                : null }
                <div className="hero-text-wrapper">
                    { doLength( title ) ?
                        <Heading { ...headingSettings } />
                    : null }
                    { doLength( copy ) ?
                        <>{ doParse( copy ) }</>
                        : null }
                    { doLength( ctas ) ?
                        <p id="hero-cta">
                            { ctas.map( ( cta: CTASettings, index: number ) => {
                                const ctaSettings: CTASettings = {
                                    url: cta.url,
                                    text: cta.text,
                                    modal: cta.modal,
                                    modalClass: cta.modalClass,
                                    classes: cta.buttonStyle ? [ 'button', cta.buttonStyle ] : [ 'button' ],
                                };
                                return <CTA key={ index } { ...ctaSettings } />
                            } ) }
                        </p>
                        : null
                    }
                    { customHTML ? doParse( ReactDOMServer.renderToStaticMarkup( customHTML ) ) : null }
                </div>
                
                { doLength( media ) ? 
                    <div className="hero-media-wrapper">
                        <CTA url={ imageLink.url } modal={ imageLink.modal } classes={ [] }>
                            <MediaLoader media={ media } size="square_600" loop={ mediaLoop } />
                        </CTA>
                    </div>
                : null }
                { customHTMLAfter ?
                    customHTMLAfter
                : null }
                { shareBar ?
                    <ShareBar title={ title } url={ url }/>
                : null }
            </div>
        </header>
    );
}
export default Hero;