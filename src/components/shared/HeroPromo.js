const { useEffect, useState } = wp.element;
import { doLength } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA.js';
import Heading from 'src/components/shared/Heading.js';
import Image from 'src/components/shared/Image.js';
import 'assets/styles/components/hero-promo.scss';

export default function HeroPromo( props ) {
    const promo = props.promo ? props.promo : {};
    const headline = promo.headline ? promo.headline : '';
    const pretitle = promo.pretitle ? promo.pretitle : '';
    const url = promo.url ? promo.url : '';
    const image = promo.image ? promo.image : {};
    const iconLogo = promo.icon_logo ? Boolean( promo.image ) : false;
    const countdownDate = props.countdown ? props.countdown : {};

    if ( doLength( promo ) ) {
        
        const Countdown = () => {
            const dateRaw = new Date( Number( countdownDate.stamp ) * 1000 ); // convert to milliseconds
            const date = dateRaw.getTime(); // date is in UTC, so no further convertion is needed
            const nowRaw = new Date();
            const now = nowRaw.getTime();
            const [ days, setDays ] = useState( '00' );
            const [ hours, setHours ] = useState( '00' );
            const [ minutes, setMinutes ] = useState( '00' );
            const [ seconds, setSeconds ] = useState( '00' );
            const [ eventStarted, setEventStarted ] = useState( false );
            const [ eventOver, setEventOver ] = useState( false );
            useEffect( () => { 
                if ( date + 1800000 > now ) {
                    //Implementing the setInterval method 
                    const interval = setInterval( () => { 
                        const nowRaw = new Date();
                        const now = nowRaw.getTime();
                        const distance = date - now > 0 ? date - now : 0;
                        // Time calculations for days, hours, minutes and seconds
                        setDays( Math.floor( distance / ( 1000 * 60 * 60 * 24 ) ).toString().padStart( 2, '0' ) );
                        setHours( Math.floor( ( distance % ( 1000 * 60 * 60 * 24 ) ) / ( 1000 * 60 * 60 ) ).toString().padStart( 2, '0' ) );
                        setMinutes( Math.floor( ( distance % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 ) ).toString().padStart( 2, '0' ) );
                        setSeconds( Math.floor( ( distance % ( 1000 * 60 ) ) / 1000 ).toString().padStart( 2, '0' ) );
                        // Clearing the interval 
                        if ( distance === 0 ) {
                            setEventStarted( true );
                            return () => clearInterval( interval );
                        }
                    }, 1000 ); 
                } else {
                    setEventOver( true );
                }
            }, [] );
            if ( date > now ) {
                return (
                    <div className="date-countdown" data-date={ countdownDate.stamp }>
                        <span className="number-wrapper">
                            <span className="number">{ days }</span>
                            <span className="label">Days</span>
                        </span>
                        <span className="number-wrapper">
                            <span className="number">{ hours }</span>
                            <span className="label">Hours</span>
                        </span>
                        <span className="number-wrapper">
                            <span className="number">{ minutes }</span>
                            <span className="label">Minutes</span>
                        </span>
                        <span className="number-wrapper">
                            <span className="number">{ seconds }</span>
                            <span className="label">Seconds</span>
                        </span>
                    </div>
                )
            } else if ( eventStarted ) {
                return <CTA text="Join Now" classes="solid-button" />
            } else if ( eventOver ) {
                return null;
            }
        };

        return (
            <aside id="hero-promo">
                <CTA url={ url }>
                    <div className="hero-promo-wrapper">
                        <Image image={ image } size="logo" classes={ iconLogo ? 'mask-overlay' : false } mobileImage="logo_400" />
                        <div className="text-wrapper">
                            <Heading tag="h2" pretitle={ pretitle } title={ headline }/>
                        </div>
                        { doLength( countdownDate ) ?
                            <Countdown />
                        : null }
                    </div>
                </CTA>
            </aside>
        );
    } else {
        return null;
    }
}