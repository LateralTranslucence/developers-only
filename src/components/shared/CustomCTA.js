const { useEffect, useState } = wp.element;
import { getCustomCTA } from 'src/utils/api.js';
import { doLength, doParse } from 'src/utils/helpers.js';
import CTA from 'src/components/shared/CTA.js';
import Heading from 'src/components/shared/Heading.js';
import MediaLoader from 'src/components/shared/MediaLoader';
import 'assets/styles/components/panels.scss';
import 'assets/styles/components/text-media.scss';

export default function CustomCTA( props ) {
    const [ customCTA, setcustomCTA ] = useState( [] );
    useEffect( () => {
        async function fetchData() {
            await getCustomCTA().then( ( data ) => {
                setcustomCTA( data.json );
            } );
        }
        fetchData();
    }, [] );

    const ctaID = props.ctaID;
    const hideCTA = props.hideCTAPanel;
    const defaultCTA = customCTA.default_cta;
    const ctaOption = doLength( customCTA ) ? customCTA.cta_options[ ctaID ? ctaID : defaultCTA ] : false;
    if ( ctaOption && ! hideCTA ) {
        // CTA panel settings
        const titleAlign = 'left';
        const panelType = 'text-media';
        const title = ctaOption.title;
        const copy = ctaOption.text;
        const media = ctaOption.media;
        const mediaType = media.type;
        const buttonText = ctaOption.button_text;
        const buttonURL = ctaOption.button_url;
        const buttonModal = ctaOption.botton_modal === 1 ? true : false;
        const buttonModalClass = ctaOption.button_modal_class;
        const ctaButtonSettings = {
            url: buttonURL,
            text: buttonText,
            modal: buttonModal,
            modalClass: buttonModalClass,
            classes: [ 'solid-button' ],
        }
        return (
            <section id={ ctaID } className={ 'panel panel-type-' + panelType + ' media-alignment-left' }>
                <div className="panel-inner-wrapper container">
                    { title && 
                        <header className="panel-header">
                            <Heading tag={ 'h2' } title={ title } align={ titleAlign }/>
                        </header>
                    }
                    { copy && 
                        <div className="panel-copy-wrapper">
                            { doParse( copy ) }
                        </div>
                    }
                    { media ?
                        <MediaLoader media={ media } size="cinema_600" />
                    : null }
                    { buttonURL &&
                        <p className="panel-cta">
                            <CTA { ...ctaButtonSettings }/>
                        </p>
                    }
                </div>
            </section>
        );
    } else {
        return null;
    }
}