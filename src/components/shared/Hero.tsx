import React from 'react';
import { doBackgroundImage, doLength, doParse } from 'src/utils/helpers';
import BackgroundVideo from 'src/components/shared/BackgroundVideo';
import Breadcrumbs from 'src/components/shared/Breadcrumbs';
import CTA from 'src/components/shared/CTA';
import Heading from 'src/components/shared/Heading';
import MediaLoader from 'src/components/shared/MediaLoader';
import ShareBar from 'src/components/shared/ShareBar';
import 'assets/styles/components/hero.scss';
import BackgroundSettings from 'src/utils/types/BackgroundSettings';

interface HeroProps {
    backgroundSettings: BackgroundSettings;
    breadcrumbs: Record<string, any>;
    classes: Array<string>;
    copy: string;
    customHTML: string;
    customHTMLAfter: string;
    id: string;
    imageLink: string;
    media: Media;
    mediaLoop: boolean;
    pretitle: string;
    publishDate: string;
    shareBar: boolean;
    subtitle: string;
    textColor: string;
    title: string;
    url: string;
}

const Hero: React.FC<HeroProps> = ( {
    backgroundSettings,
    breadcrumbs,
    classes,
    copy,
    customHTML,
    customHTMLAfter,
    id,
    imageLink,
    media: {},
    mediaLoop,
    pretitle = '',
    publishDate,
    shareBar,
    subtitle = '',
    textColor,
    title = '',
    url,
} ) => {
    const heroPretitle = pretitle;
    const heroTitle = title;
    const heroSubtitle = subtitle;
    const heroCopy = copy ? doParse( copy ) : '';
    const heroMedia = media;
    const heroMediaLoop = props.mediaLoop ? Boolean( props.mediaLoop ) : false;
    //const heroMediaType = heroMedia ? doURLType( heroMedia ) : false;
    const heroMediaLink = props.imageLink && doLength( props.imageLink ) ? props.imageLink : false;
    const heroMediaLinkURL = heroMediaLink[0] ? heroMediaLink[0] : false;
    const heroMediaLinkModal = heroMediaLink[1] ? heroMediaLink[1] : false;
    const heroBackgroundSettings = props.backgroundSettings ? props.backgroundSettings : {};
    const heroCTA = props.cta ? props.cta : [];
    const heroTextColor = props.textColor ? props.textColor : '';
    const heroCustomHTML = props.customHTML ? props.customHTML : '';
    const heroCustomHTMLAfter = props.customHTMLAfter ? props.customHTMLAfter : '';
    const heroShareBar = props.shareBar === true ? true : false;
    const breadcrumbs = props.breadcrumbs ? props.breadcrumbs : {};
    const pageURL = props.url ? props.url : '';
    const publishDate = props.publishDate ? props.publishDate : '';
    const heroClasses = props.classes ? ( Array.isArray( props.classes ) ? props.classes : ( props.classes.length ? [ props.classes ] : [] ) ) : [];
    const hero = props.id ? ( props.id !== false ? props.id : '' ) : 'hero';
    if ( heroTextColor.length ) {
        heroClasses.push( 'text-' + heroTextColor );
    }
    // if there's background settings
    if ( doLength( heroBackgroundSettings ) ) {
        heroClasses.push( 'has-background' );
    }
    if ( doLength( heroCopy ) ) {
        heroClasses.push( 'has-copy' );
    }
    if ( doLength( heroMedia ) ) {
        heroClasses.push( 'has-media' );
    }
    
    const heroBackground = doBackgroundImage( heroBackgroundSettings, heroClasses.join( ' ' ) );
    const headingSettings = {
        tag: 'h1',
        pretitle: heroPretitle,
        title: heroTitle,
        //logo: heroTitleLogo,
        //titleCont: heroTitleCont,
        //subtitle: heroSubtitle,
        publishDate: publishDate,
    };

    return (
        <header id={ hero }{ ...heroBackground }>
            <BackgroundVideo { ...heroBackgroundSettings } id="hero-background" />
            <div className="hero-container container">
                { doLength( breadcrumbs ) ? 
                    <Breadcrumbs post={ breadcrumbs } />
                : null }
                <div className="hero-text-wrapper">
                    { doLength( heroTitle ) ?
                        <Heading { ...headingSettings } />
                    : null }
                    { doLength( heroCopy ) ?
                        <>{ heroCopy }</>
                    : null }
                    { doLength( heroCTA ) ?
                        <p id="hero-cta">
                            { heroCTA.map( function( cta, index ) {
                                const ctaText = cta.text ? cta.text : '';
                                const ctaURL = cta.url ? cta.url : '';
                                const ctaModal = cta.modal ? cta.modal : false;
                                const ctaClasses = cta.buttonStyle ? [ 'button', cta.buttonStyle ] : [ 'button' ];
                                const ctaModalClass = cta.modalClass ? cta.modalClass : '';
                                const ctaSettings = {
                                    url: ctaURL,
                                    text: ctaText,
                                    modal: ctaModal,
                                    modalClass: ctaModalClass,
                                    classes: ctaClasses,
                                };
                                return <CTA key={ index } { ...ctaSettings } />
                            } ) }
                        </p>
                        : null
                    }
                    { heroCustomHTML ? heroCustomHTML : null }
                </div>
                
                { doLength( heroMedia ) ? 
                    <div className="hero-media-wrapper">
                        <CTA url={ heroMediaLinkURL } modal={ heroMediaLinkModal } classes={ false }>
                            <MediaLoader media={ heroMedia } size="square_600" loop={ heroMediaLoop } />
                        </CTA>
                    </div>
                : null }
                { heroCustomHTMLAfter ?
                    heroCustomHTMLAfter
                : null }
                { heroShareBar === true ?
                    <ShareBar title={ heroTitle } url={ pageURL }/>
                : null }
            </div>
        </header>
    );
}
export default Hero;