import React from 'react';
import { doLength, doUpperCaseWords } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA';
import Heading from 'src/components/shared/Heading';
import Image from 'src/components/shared/Image';
import { PartialTemplateProps } from 'src/utils/types/PartialTemplateProps';
import { Media } from 'src/utils/types/Media';

const DOEventBlock: React.FC<PartialTemplateProps> = ( {
    index,
    panelSlider,
    perRow,
    post,
    type,
} ): JSX.Element => {
    const eventTypePretty: string = doUpperCaseWords( post.fields.event_type.replace( '-', ' ' ) );
    const eventDateUTC: number = post.fields.event_date ? post.fields.event_date.stamp : '';
    const eventDate: string = post.fields.event_date ? post.fields.event_date.formatted : '';
    const eventEndDateUTC: number = post.fields.event_end_date ? post.fields.event_end_date.stamp : 0;
    //const eventEndDate: string = post.fields.event_end_date ? post.fields.event_end_date.formatted : '';
    const now: number = Math.ceil( Date.now() / 1000 );
    //const eventPast = eventEndDateUTC ? time() > eventEndDateUTC : now > eventDateUTC + 1800;
    const eventPast: boolean = eventEndDateUTC ? now > eventEndDateUTC : now > eventDateUTC + 1800;
    const eventImage: Media = post.fields.event_image;
    const eventRegistrationLink: string = post.fields.event_registration_link;
    //const eventCustomCTAText = post.fields.event_custom_cta_text ? post.fields.event_custom_cta_text : [];
    // Labels based on event type
    // // Webinars and Hybrid
    // let eventRegistrationText;
    // if ( post.fields.event_type === 'webinar' || post.fields.event_type === 'hybrid' ) {
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
    const showDate: boolean = Boolean( eventDate ) && ! eventPast && ( [ 'in-person', 'hybrid', 'conference' ].includes( post.fields.event_type ) );
    //const showLocation: boolean =  eventLocation && ! eventPast && ( post.fields.event_type === 'in-person' || 'hybrid' );

    return (
        <li className={ 'has-block-link ' + ( eventPast ? 'past-event' : 'do-event' ) } data-event-type={ post.fields.event_type } data-event-date={ eventDateUTC }>
            <CTA url={ eventRegistrationLink ? eventRegistrationLink : post.permalink } classes={ [ 'block-link' ] }>
                <Image image={ eventImage } size="cinema_600" classes={ [ post.fields.event_type, 'block-thumbnail' ] } wrapperDataAttr={ { 'data-label': eventTypePretty + '"' } } />
                <div className="block-content-wrapper">
                    <Heading tag="h3" pretitle={ post.post_type_details.post_type_display_name + ' - ' + eventTypePretty } title={ post.fields.event_title } subtitle={ post.fields.event_subtitle } />
                    { showDate ?
                        <div className="do-event-details">
                            { showDate &&
                                <p><span className="do-event-date">{ eventDate }</span></p> }
                        </div>
                    : null }
                    { /*post.fields.event_type === 'webinar' || post.fields.event_type === 'hybrid' || ! eventPast ?
                        <p className="do-event-register text-button">{ eventRegistrationText }</p>
                    : null*/ }
                </div>
            </CTA>
        </li>
    );
}
export default DOEventBlock;