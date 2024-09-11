import React from 'react';
const { useEffect } = wp.element;
import { CTASettings } from 'src/utils/types/CTASettings';
import { HeroProps } from 'src/utils/types/HeroProps';
import { TemplateProps } from 'src/utils/types/TemplateProps';
import { doFormatAddress, doLength, doParse, doUpperCaseWords } from 'src/utils/helpers';
import DOStaffBlock from 'src/components/templates/block/DOStaffBlock';
import CTA from 'src/components/shared/CTA';
// import CustomCTA from 'src/components/shared/CustomCTA';
import Heading from 'src/components/shared/Heading';
import Hero from 'src/components/shared/Hero';
import Image from 'src/components/shared/Image';
import PanelWrapper from 'src/components/layout/PanelWrapper';
import RecentPosts from 'src/components/shared/RecentPosts';
import RenderForm from 'src/components/shared/RenderForm';
import RenderHubspotForm from 'src/components/shared/RenderHubspotForm';
import SEOTags from 'src/components/shared/SEOTags';
import StructuredData from 'src/components/shared/StructuredData';
import Video from 'src/components/shared/Video';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/posts.scss';
import 'assets/styles/components/staff-bios.scss';
import 'assets/styles/components/iframe.scss';
import 'assets/styles/pages/single.scss';
import 'assets/styles/pages/event.scss';

const DOEvent: React.FC<TemplateProps> = ( {
    post, 
    iframe = false,
    layoutClasses = () => {}
} ): JSX.Element | null => {

    if ( doLength( post ) ) {

        const eventTypePretty: string = doUpperCaseWords( post.fields.event_type.replace( '-', ' ' ) );
        const eventDateSimple: string = post.fields.event_date.month && post.fields.event_date.day && post.fields.event_date.year ? post.fields.event_date.month + ' ' + post.fields.event_date.day + ', ' + post.fields.event_date.year : '';
        const eventEndDateUTC: number = post.fields.event_end_date.stamp && post.fields.event_end_date.stamp > post.fields.event_date.stamp ? post.fields.event_end_date.stamp : '';
        const eventEndDate: string = eventEndDateUTC && post.fields.event_end_date.formatted ? post.fields.event_end_date.formatted : '';
        const eventEndDateSimple: string = eventEndDateUTC && post.fields.event_end_date.month && post.fields.event_end_date.day && post.fields.event_end_date.year ? post.fields.event_end_date.month + ' ' + post.fields.event_end_date.day + ', ' + post.fields.event_end_date.year : '';
        const now: number = Math.ceil( Date.now() / 1000 );
        const eventPast: boolean = eventEndDateUTC ? now > eventEndDateUTC : now > post.fields.event_date.stamp + 1800;
        const videoURLParts: URL | undefined = doLength( post.fields.event_video ) ? new URL( post.fields.event_video ) : undefined;
        const videoTimestamp: string = videoURLParts && doLength( videoURLParts.hash ) && videoURLParts.hash.includes( '#t' ) ? videoURLParts.hash : '';
        const location: string | undefined = post.fields.event_location ? doFormatAddress( {
            name: post.fields.event_location.name ? post.fields.event_location.name : '',
            address1: post.fields.event_location.address_1 ? post.fields.event_location.address_1 : '',
            address2: post.fields.event_location.address_2 ? post.fields.event_location.address_2 : '',
            city: post.fields.event_location.city ? post.fields.event_location.city : '',
            state: post.fields.event_location.state_locality ? post.fields.event_location.state_locality : '',
            zip: post.fields.event_location.postal_code ? post.fields.event_location.postal_code : '',
            country: post.fields.event_location.country ? post.fields.event_location.country : '',
        } ) : undefined;
        const locationHeader: string = post.fields.event_location ? doFormatAddress( {
            city: post.fields.event_location.city ? post.fields.event_location.city : '',
            state: post.fields.event_location.state_locality ? post.fields.event_location.state_locality : '',
            country: post.fields.event_location.country ? post.fields.event_location.country : '',
        } ) : '';

        // Labels based on event type
        // Webinars and Hybrid
        let eventRegistrationText: string;
        if ( post.fields.event_type === 'webinar' || post.fields.event_type === 'hybrid' ) {
            // Custom
            if ( doLength( post.fields.event_custom_cta_text.before_event ) || doLength( post.fields.event_custom_cta_text.after_event ) ) {
                eventRegistrationText = eventPast ? post.fields.event_custom_cta_text.after_event : post.fields.event_custom_cta_text.before_event;
            }
            // Default
            else {
                eventRegistrationText = eventPast ? 'Watch the Replay' : 'Register Now'; 
            }
        }
        // In-Person and Conference
        else {
            eventRegistrationText = post.fields.event_custom_cta_text && post.fields.event_custom_cta_text.before_event ? post.fields.event_custom_cta_text.before_event : 'Register Now';
        }

        // Show things?
        const showDate: boolean = post.fields.event_date.formatted && ! eventPast;
        const showLocation: boolean = Boolean( location ) && ! eventPast;

        // Format the date differently if there is an end date
        let multiDayDate: string = '';
        if ( eventEndDate ) {
            const differentYear: boolean = post.fields.event_date.year && post.fields.event_end_date.year && post.fields.event_date.year !== post.fields.event_end_date.year;
            const differentMonth: boolean = differentYear || ( post.fields.event_date.month && post.fields.event_end_date.month && post.fields.event_date.month !== post.fields.event_end_date.month );
            const differentDay: boolean = differentMonth || differentYear || ( post.fields.event_date.day && post.fields.event_end_date.day && post.fields.event_date.day !== post.fields.event_end_date.day );
            const startDate: string = differentYear ? eventDateSimple : post.fields.event_date.month + ' ' + post.fields.event_date.day;
            const endDate: string = differentMonth ? eventEndDateSimple : ( differentDay ? post.fields.event_end_date.day + ', ' : '' ) + post.fields.event_end_date.year;
            const space: string = differentMonth || differentYear ? ' ' : ( differentDay ? '' : ' ' );
            multiDayDate = startDate + ( differentDay ? space + '-' : ',' ) + space + endDate;
        }

        const EventPostDetails: React.FC = (): JSX.Element => {
            return (
                <>
                { showDate || showLocation ?
                    <div id="post-details">
                        { showDate &&
                            <p><span className="do-event-date">{ ( multiDayDate ? multiDayDate : post.fields.event_date.formatted ) }</span></p> 
                        }
                        { showLocation &&
                            <p className="do-event-location">
                                <span className="do-event-in-person">{ doParse( locationHeader ) }</span>
                                { post.fields.event_type === 'hybrid' &&
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
            )
        }

        // Hero
        const heroSettings: HeroProps = {
            pretitle: post.fields.event_type + ' ' + post.post_type_details.post_type_display_name,
            title: post.fields.event_title,
            subtitle: post.fields.event_subtitle,
            breadcrumbs: post,
            publishDate: eventPast ? eventDateSimple : undefined,
            customHTML: doParse( post.fields.event_description ),
            customHTMLAfter: <EventPostDetails />,
            shareBar: true,
        }

        // CTA settings
        const ctaSettings: CTASettings = {
            url: post.fields.event_registration_link, 
            text: eventRegistrationText,
            classes: [ 'solid-button' ],
        }

        useEffect( () => {
            // Set classes for <main>
            layoutClasses( [ 'single-content-item', 'single-' + post.post_type_details.post_type ] );
        }, [] );

        return (
            <>
                <SEOTags post={ post } />
                <StructuredData post={ post } />
                <Hero { ...heroSettings } />
                <article id="content-wrapper" className="container one-column">
                    <section id="main-content">
                        { post.fields.event_video ?
                            <Video url={ post.fields.event_video } timestamp={ videoTimestamp } id="post-image" />
                        : // Else if no video, show an image
                            ( post.fields.event_image && 
                                <>
                                    <Image image={ post.fields.event_image } size={ 'cinema_1000' } classes={ [ post.fields.event_type ] } wrapperDataAttr={ { 'data-label': eventTypePretty } } id="post-image" />
                                    { post.fields.event_image_credit &&
                                        <span className="post-image-credit">{ post.fields.event_image_credit }</span>
                                    }
                                </> 
                            )
                        }
                        { post.fields.event_content && 
                            <div id="post-content">
                                { multiDayDate ?
                                    <>
                                        <p>
                                            <b>Begins</b><br />
                                            { post.fields.event_date.formatted }
                                        </p>
                                        <p>
                                            <b>Ends</b><br />
                                            { eventEndDate }
                                        </p>
                                    </>
                                : null }
                                { doParse( post.fields.event_content ) }
                            </div>
                        }
                        { doLength( post.fields.event_presenters ) ?
                            <PanelWrapper 
                                panelID="event-presenters" 
                                panelType="staff-bios"
                                classes={ [ 'panel', 'panel-type-staff-bios' ] }
                                heading={ { tag: 'h2', title: 'Presenter' + ( post.fields.event_presenters.length > 1 ? 's' : '' ) } }>
                                    <ul className={ 'panel-post-items staff-bios blocks card three do-modals' }>
                                        { post.fields.event_presenters.map( ( presenter: Record<string, any>, index: number ) => {
                                            return <DOStaffBlock key={ index } index={ index } presenter={ presenter } />
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
                                        <iframe src={ post.fields.event_location.google_maps } data-src="" width="100%" style={ { border: 0 } }></iframe>
                                    </div>
                                </div>
                                <div id="location-address">{ doParse( location ) }</div>
                            </div>
                            </>
                        }
                        { Boolean( eventPast ) == false &&
                            <>
                            { ! post.fields.event_video && post.fields.event_hubspot_form_embed_code ?
                                <div className="panel-form-wrapper" id="register-now">
                                    <Heading tag={ 'h2' } title={ eventRegistrationText } classes={ [ 'text-align-center' ] }/>
                                    <RenderHubspotForm options={ post.fields.event_hubspot_form_embed_code } formID={ post.post_name + '-form' }/>
                                </div>
                            : null }
                            { ! post.fields.event_video && post.fields.event_form ?
                                <div className="panel-form-wrapper" id="register-now">
                                    <Heading tag={ 'h2' } title={ eventRegistrationText } classes={ [ 'text-align-center' ] }/>
                                    <RenderForm formID={ post.fields.event_form } panelID="register-now" />
                                </div>
                            : null }
                            { ! post.fields.event_video && doLength( post.fields.event_registration_link ) ?
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
                        <RecentPosts postType={ post.post_type_details.post_type } postID={ post.ID } />
                </PanelWrapper>
                { /*post.fields.event_custom_cta_hide_panel === false ? 
                    <CustomCTA postID={ post.ID } ctaID={ post.fields.event_custom_cta } hideCTAPanel={ post.fields.event_custom_cta_hide_panel }/>
                : null */ }
            </>
        )
    } else {
        return null;
    }
}
export default DOEvent;