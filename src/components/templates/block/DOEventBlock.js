import { doFormatAddress, doDecimalFromDivision, doLength, doParse, doUpperCaseWords } from 'src/utils/helpers.js';
import CTA from 'src/components/shared/CTA.js';
import Heading from 'src/components/shared/Heading.js';
import Image from 'src/components/shared/Image.js';

export default function DOEventBlock( props ) {
    const eventType = props.post.fields.event_type;
    const eventTypePretty = doUpperCaseWords( eventType.replace( '-', ' ' ) );
    const eventTitle = props.post.fields.event_title;
    const eventSubtitle = props.post.fields.event_subtitle;
    const eventDateUTC = props.post.fields.event_date ? props.post.fields.event_date.stamp : '';
    const eventDate = props.post.fields.event_date ? props.post.fields.event_date.formatted : '';
    const eventEndDateUTC = props.post.fields.event_end_date ? props.post.fields.event_end_date.stamp : '';
    const eventEndDate = props.post.fields.event_end_date ? props.post.fields.event_end_date.formatted : '';
    const now = Math.ceil( Date.now() / 1000 );
    //const eventPast = eventEndDateUTC ? time() > eventEndDateUTC : now > eventDateUTC + 1800;
    const eventPast = eventEndDateUTC ? now > eventEndDateUTC : now > eventDateUTC + 1800;
    const eventImage = props.post.fields.event_image;
    const eventRegistrationLink = props.post.fields.event_registration_link;
    const eventCustomCTAText = props.post.fields.event_custom_cta_text ? props.post.fields.event_custom_cta_text : [];
    // Labels based on event type
    // // Webinars and Hybrid
    // let eventRegistrationText;
    // if ( eventType === 'webinar' || eventType === 'hybrid' ) {
    //     // Custom
    //     if ( doLength( eventCustomCTAText.before_the_event ) || doLength( eventCustomCTAText.after_the_event ) ) {
    //         eventRegistrationText = eventPast ? eventCustomCTAText[1] : eventCustomCTAText[0];
    //     }
    //     // Default
    //     else {
    //         eventRegistrationText = eventPast ? 'Watch the Replay' : 'Register Now';
    //     }
    // }
    // // In-Person
    // else {
    //     eventRegistrationText = eventCustomCTAText && eventCustomCTAText[0] ? eventCustomCTAText[0] : 'Register Now';
    // }

    // Show things?
    const showDate = eventDate && ! eventPast && ( eventType === 'in-person' || 'hybrid' || 'conference' );
    //const showLocation =  eventLocation && ! eventPast && ( eventType === 'in-person' || 'hybrid' );

    return (
        <li className={ 'has-block-link ' + ( eventPast ? 'past-event' : 'do-event' ) } data-event-type={ eventType } data-event-date={ eventDateUTC }>
            <CTA url={ eventRegistrationLink ? eventRegistrationLink : props.post.permalink } classes="block-link">
                <Image image={ eventImage } size="cinema_600" classes={ [ eventType, 'block-thumbnail' ] } wrapper_data_attr={ 'data-label="' +  eventTypePretty + '"' } />
                <div className="block-content-wrapper">
                    <Heading tag="h3" pretitle={ props.post.post_type_details.post_type_display_name + ' - ' + eventTypePretty } title={ eventTitle } subtitle={ eventSubtitle } />
                    { showDate ?
                        <div className="do-event-details">
                            { showDate &&
                                <p><span className="do-event-date">{ eventDate }</span></p> }
                        </div>
                    : null }
                    { /*eventType === 'webinar' || eventType === 'hybrid' || ! eventPast ?
                        <p className="do-event-register text-button">{ eventRegistrationText }</p>
                    : null*/ }
                </div>
            </CTA>
        </li>
    );
}