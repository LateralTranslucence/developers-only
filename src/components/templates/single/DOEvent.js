const { useEffect } = wp.element;
import { doFormatAddress, doLength, doParse, doUpperCaseWords } from 'src/utils/helpers.js';
import DOStaffBlock from 'src/templates/block/DOStaffBlock.js';
import CTA from 'src/components/shared/CTA.js';
import CustomCTA from 'src/components/shared/CustomCTA.js';
import Heading from 'src/components/shared/Heading.js';
import Hero from 'src/components/shared/Hero.js';
import Image from 'src/components/shared/Image.js';
import PanelWrapper from 'src/components/layout/PanelWrapper.js';
import RecentPosts from 'src/components/shared/RecentPosts.js';
import RenderDOForm from 'src/components/shared/RenderDOForm.js';
import RenderHubspotForm from 'src/components/shared/RenderHubspotForm.js';
import SEOTags from 'src/components/shared/SEOTags.js';
import StructuredData from 'src/components/shared/StructuredData.js';
import Video from 'src/components/shared/Video.js';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/posts.scss';
import 'assets/styles/components/staff-bios.scss';
import 'assets/styles/components/iframe.scss';
import 'assets/styles/pages/single.scss';
import 'assets/styles/pages/event.scss';

export default function DOEvent( props ) {
    const post = props.post;

    if ( doLength( post ) ) {
        // Set post variables
        const postID = post.ID;
        const postTypeRaw = post.post_type_details.post_type;
        const postTypeDisplayName = post.post_type_details.post_type_display_name;
        const postName = post.post_name;
        // Set content variables
        const eventType = post.fields.event_type;
        const eventTypePretty = doUpperCaseWords( eventType.replace( '-', ' ' ) );
        const title = post.fields.event_title;
        const subtitle = post.fields.event_subtitle;
        const eventDateUTC = post.fields.event_date.stamp ? post.fields.event_date.stamp : '';
        const eventDate = post.fields.event_date.formatted ? post.fields.event_date.formatted : '';
        const eventDateSimple = post.fields.event_date.month && post.fields.event_date.day && post.fields.event_date.year ? post.fields.event_date.month + ' ' + post.fields.event_date.day + ', ' + post.fields.event_date.year : '';
        const eventEndDateUTC = post.fields.event_end_date.stamp && post.fields.event_end_date.stamp > eventDateUTC ? post.fields.event_end_date.stamp : '';
        const eventEndDate = eventEndDateUTC && post.fields.event_end_date.formatted ? post.fields.event_end_date.formatted : '';
        const eventEndDateSimple = eventEndDateUTC && post.fields.event_end_date.month && post.fields.event_end_date.day && post.fields.event_end_date.year ? post.fields.event_end_date.month + ' ' + post.fields.event_end_date.day + ', ' + post.fields.event_end_date.year : '';
        const now = Math.ceil( Date.now() / 1000 );
        const eventPast = eventEndDateUTC ? now > eventEndDateUTC : now > eventDateUTC + 1800;
        const image = post.fields.event_image;
        const imageCredit = post.fields.event_image_credit ? post.fields.event_image_credit : '';
        const video = post.fields.event_video;
        const videoURLParts = doLength( video ) ? new URL( video ) : false;
        const videoTimestamp = videoURLParts && doLength( videoURLParts.hash ) && videoURLParts.hash.includes( '#t' ) ? videoURLParts.hash : '';
        const registrationLink = post.fields.event_registration_link;
        const description = post.fields.event_description ? post.fields.event_description : '';
        const content = post.fields.event_content ? post.fields.event_content : '';
        const location = post.fields.event_location ? doFormatAddress( {
            name: post.fields.event_location.name ? post.fields.event_location.name : '',
            address1: post.fields.event_location.address_1 ? post.fields.event_location.address_1 : '',
            address2: post.fields.event_location.address_2 ? post.fields.event_location.address_2 : '',
            city: post.fields.event_location.city ? post.fields.event_location.city : '',
            state: post.fields.event_location.state_locality ? post.fields.event_location.state_locality : '',
            zip: post.fields.event_location.postal_code ? post.fields.event_location.postal_code : '',
            country: post.fields.event_location.country ? post.fields.event_location.country : '',
        } ) : '';
        const locationHeader = post.fields.event_location ? doFormatAddress( {
            city: post.fields.event_location.city ? post.fields.event_location.city : '',
            state: post.fields.event_location.state_locality ? post.fields.event_location.state_locality : '',
            country: post.fields.event_location.country ? post.fields.event_location.country : '',
        } ) : '';
        const eventLocationMap = post.fields.event_location.google_maps;
        const eventPresenters = post.fields.event_presenters ? post.fields.event_presenters : [];
        const formID = post.fields.event_form ? post.fields.event_form : '';
        const hubspotFormOptionsString = post.fields.event_hubspot_form_embed_code ? post.fields.event_hubspot_form_embed_code : '';
        const eventCustomCTAText = post.fields.event_custom_cta_text ? post.fields.event_custom_cta_text : {};
        const hideCustomCTAPanel = Boolean( post.fields.event_custom_cta_hide_panel );
        const customCTA = post.fields.event_custom_cta ? post.fields.event_custom_cta : '';
        const customHTML = doParse( description );
        const customHTMLAfter = <EventPostDetails />;

        // Labels based on event type
        // Webinars and Hybrid
        let eventRegistrationText;
        if ( eventType === 'webinar' || eventType === 'hybrid' ) {
            // Custom
            if ( doLength( eventCustomCTAText.before_event ) || doLength( eventCustomCTAText.after_event ) ) {
                eventRegistrationText = eventPast ? eventCustomCTAText.after_event : eventCustomCTAText.before_event;
            }
            // Default
            else {
                eventRegistrationText = eventPast ? 'Watch the Replay' : 'Register Now'; 
            }
        }
        // In-Person and Conference
        else {
            eventRegistrationText = eventCustomCTAText && eventCustomCTAText.before_event ? eventCustomCTAText.before_event : 'Register Now';
        }

        // Show things?
        const showDate = eventDate && ! eventPast;
        const showLocation = location && ! eventPast;

        // Format the date differently if there is an end date
        let multiDayDate;
        if ( eventEndDate ) {
            const differentYear = post.fields.event_date.year && post.fields.event_end_date.year && post.fields.event_date.year !== post.fields.event_end_date.year;
            const differentMonth = differentYear || ( post.fields.event_date.month && post.fields.event_end_date.month && post.fields.event_date.month !== post.fields.event_end_date.month );
            const differentDay = differentMonth || differentYear || ( post.fields.event_date.day && post.fields.event_end_date.day && post.fields.event_date.day !== post.fields.event_end_date.day );
            const startDate = differentYear ? eventDateSimple : post.fields.event_date.month + ' ' + post.fields.event_date.day;
            const endDate = differentMonth ? eventEndDateSimple : ( differentDay ? post.fields.event_end_date.day + ', ' : '' ) + post.fields.event_end_date.year;
            const space = differentMonth || differentYear ? ' ' : ( differentDay ? '' : ' ' );
            multiDayDate = startDate + ( differentDay ? space + '-' : ',' ) + space + endDate;
        }

        // Hero
        const heroSettings = {
            pretitle: eventType + ' ' + postTypeDisplayName,
            title: title,
            subtitle: subtitle,
            breadcrumbs: post,
            publishDate: eventPast ? eventDateSimple : null,
            customHTML: customHTML,
            customHTMLAfter: customHTMLAfter,
            shareBar: true,
        };

        // Image settings 
        const imageSettings = {
            image: image,
            size: 'cinema_1000',
            classes: [ eventType ],
            wrapperDataAttr: { 'data-label': eventTypePretty },
        };

        // CTA settings
        const ctaSettings = {
            url: registrationLink, 
            text: eventRegistrationText,
            classes: [ 'solid-button' ],
        };

        useEffect( () => {
            // Set classes for <main>
            props.layoutClasses( [ 'single-content-item', 'single-' + postTypeRaw ] );
        }, [] );

        function EventPostDetails() {
            return(
                <>
                { showDate || showLocation ?
                    <div id="post-details">
                        { showDate &&
                            <p><span className="do-event-date">{ ( multiDayDate ? multiDayDate : eventDate ) }</span></p> 
                        }
                        { showLocation &&
                            <p className="do-event-location">
                                <span className="do-event-in-person">{ doParse( locationHeader ) }</span>
                                { eventType === 'hybrid' &&
                                <>
                                    <span>or</span>
                                    <span className="do-event-hybrid">Live Webcast</span> 
                                </> 
                                }
                            </p> 
                        }
                    </div>
                : null }   
                </>
            );
        }

        return(
            <>
                <SEOTags post={ post } />
                <StructuredData post={ post } />
                <Hero { ...heroSettings } />
                <article id="content-wrapper" className="container one-column">
                    <section id="main-content">
                        { video ?
                            <Video url={ video } timestamp={ videoTimestamp } id="post-image" />
                        : // Else if no video, show an image
                            ( image && 
                                <>
                                    <Image { ...imageSettings } id="post-image" />
                                    { imageCredit &&
                                        <span className="post-image-credit">{ imageCredit }</span>
                                    }
                                </> 
                            )
                        }
                        { content && 
                            <div id="post-content">
                                { multiDayDate ?
                                    <>
                                        <p>
                                            <b>Begins</b><br />
                                            { eventDate }
                                        </p>
                                        <p>
                                            <b>Ends</b><br />
                                            { eventEndDate }
                                        </p>
                                    </>
                                : null }
                                { doParse( content ) }
                            </div>
                        }
                        { doLength( eventPresenters ) ?
                            <PanelWrapper 
                                panelID="event-presenters" 
                                panelType="staff-bios"
                                classes={ [ 'panel', 'panel-type-staff-bios' ] }
                                heading={ { tag: 'h2', title: 'Presenter' + ( eventPresenters.length > 1 ? 's' : '' ) } }>
                                    <ul className={ 'panel-post-items staff-bios blocks card three do-modals' }>
                                        { eventPresenters.map( ( presenter, index ) => {
                                            return <DOStaffBlock key={ index } index={ index } post={ presenter } />
                                        } ) }
                                    </ul>
                            </PanelWrapper>
                        : null }
                        { location &&
                            <>
                            <Heading tag={ 'h2' } title={ 'Location Address' }/>
                            <div id="location">
                                <div id="location-map">
                                    <div className="do-iframe-wrapper" style={ { paddingTop: 100 + '%' } }>
                                        <iframe src={ eventLocationMap } data-src="" width="100%" frameBorder="0" style={ { border: 0 } } allowFullScreen=""></iframe>
                                    </div>
                                </div>
                                <div id="location-address">{ doParse( location ) }</div>
                            </div>
                            </>
                        }
                        { Boolean( eventPast ) == false &&
                            <>
                            { ! video && hubspotFormOptionsString ?
                                <div className="panel-form-wrapper" id="register-now">
                                    <Heading tag={ 'h2' } title={ eventRegistrationText } classes={ [ 'text-align-center' ] }/>
                                    <RenderHubspotForm options={ hubspotFormOptionsString } formID={ postName + '-form' }/>
                                </div>
                            : null }
                            { ! video && formID ?
                                <div className="panel-form-wrapper" id="register-now">
                                    <Heading tag={ 'h2' } title={ eventRegistrationText } classes={ [ 'text-align-center' ] }/>
                                    <RenderDOForm formID={ formID } formData={ '' }/>
                                </div>
                            : null }
                            { ! video && doLength( registrationLink ) ?
                                <p className="do-event-register">
                                    <CTA { ...ctaSettings }/>
                                </p>
                            : null }        
                            </>
                        }
                    </section>
                </article>
                <PanelWrapper 
                    panelID="recent-posts-panel" 
                    panelType="archive"
                    classes={ [ 'panel', 'panel-type-archive' ] }
                    heading={ { tag: 'h2', title: 'Recent Events' } }>
                        <RecentPosts postType={ postTypeRaw } postID={ postID } heading={ postTypeDisplayName }/>
                </PanelWrapper>
                { hideCustomCTAPanel === false ? 
                    <CustomCTA postID={ postID } ctaID={ customCTA } hideCTAPanel={ hideCustomCTAPanel }/>
                : null }
            </>
        );
    } else {
        return null;
    }
}