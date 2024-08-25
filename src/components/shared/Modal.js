import { doLength } from 'src/utils/helpers.js';
import CTA from 'src/components/shared/CTA.js';
import Heading from 'src/components/shared/Heading.js';
import 'assets/styles/components/modals.scss';

export default function Modal( props ) {
    const id = props.id ? props.id : '';
    const headingSettings = props.heading ? props.heading : {};
    const content = props.content ? props.content : '';
    const linkedIn = props.linkedIn ? props.linkedIn : '';
    const position = props.position ? props.position : '';

    function BioDetails() {
        return (
            <span className="bio-details-wrapper">
                { doLength( linkedIn ) ?
                    <CTA url={ linkedIn } text="LinkedIn Profile" classes="linkedin" />
                : null }
                { headingSettings.title ?
                    <Heading tag="h3" title={ headingSettings.title } classes="bio-name" />
                : null }
                { position ?
                    <p className="bio-position">{ position }</p>
                : null }
            </span>
        );
    }

    return (
        <section id={ id } className="panel do-inline-modal-wrapper modal-more" uk-modal="">
            <div className="panel-inner-wrapper do-inline-modal-inner-wrapper">
                <button className="do-modal-window-close uk-modal-close-default" type="button" uk-close="">
                    <span className="screen-reader-text">Close</span>
                </button>
                <div className="do-inline-modal-content-wrapper">
                    { position ?
                        <BioDetails />
                    : 
                        <header className="panel-header">
                            <Heading { ...headingSettings } />
                        </header> 
                    }
                    { content }
                </div>
            </div>
        </section>
    );
}


/*
{ headingSettings ?
                        <header className="panel-header">
                            <Heading { ...headingSettings } />
                        </header>
                    : null }

*/