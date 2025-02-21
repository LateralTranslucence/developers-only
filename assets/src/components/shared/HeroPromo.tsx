import React from 'react';
import { useEffect, useState } from 'react';
import { doLength } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import Image from '@/components/shared/Image';
import '@/styles/components/hero-promo.scss';
import { Media } from '@/utils/types/Media';
import { DateTime } from '@/utils/types/DateTime';

interface HeroPromoProps {
    countdown: DateTime;
    promo: {
        headline?: string;
        iconLogo?: boolean;
        image?: Media;
        pretitle?: string;
        url?: string;
    }
}

const HeroPromo: React.FC<HeroPromoProps> = ( {
    countdown,
    promo = {},
} ): JSX.Element | null => {
    const headline: string = promo.headline ? promo.headline : '';
    const pretitle: string = promo.pretitle ? promo.pretitle : '';
    const url: string = promo.url ? promo.url : '';
    const image: Media = promo.image ? promo.image : {} as Media;
    const iconLogo: boolean = promo.iconLogo ? promo.iconLogo : false;
    const countdownDate: DateTime = countdown ? countdown : {} as DateTime;

    if ( doLength( promo ) ) {
        
        const Countdown = () => {
            const dateRaw: Date = new Date( Number( countdownDate.stamp ) * 1000 ); // convert to milliseconds
            const date: number = dateRaw.getTime(); // date is in UTC, so no further convertion is needed
            const nowRaw: Date = new Date();
            const now: number = nowRaw.getTime();
            const [ days, setDays ] = useState<string>( '00' );
            const [ hours, setHours ] = useState<string>( '00' );
            const [ minutes, setMinutes ] = useState<string>( '00' );
            const [ seconds, setSeconds ] = useState<string>( '00' );
            const [ eventStarted, setEventStarted ] = useState<boolean>( false );
            const [ eventOver, setEventOver ] = useState<boolean>( false );
            useEffect( () => { 
                if ( date + 1800000 > now ) {
                    //Implementing the setInterval method 
                    const interval = setInterval( () => { 
                        const nowRaw: Date = new Date();
                        const now: number = nowRaw.getTime();
                        const distance: number = date - now > 0 ? date - now : 0;
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
                return <CTA text="Join Now" classes={ [ 'solid-button' ] } />
            } else if ( eventOver ) {
                return null;
            }
        };

        return (
            <aside id="hero-promo">
                <CTA url={ url }>
                    <div className="hero-promo-wrapper">
                        <Image image={ image } size="logo" classes={ iconLogo ? [ 'mask-overlay' ] : [] } mobileImage="logo_400" />
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
export default HeroPromo;