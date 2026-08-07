import { useEffect, useRef, useState } from 'react';

interface CountUpOptions {
    duration?: number;
    decimals?: boolean;
    from?: number;
}

// Ease-out cubic: fast start, decelerates to finish
const ease = ( t: number ): number => 3 * t - 3 * t * t + t * t * t;

const useCountUp = ( target: number, options: CountUpOptions = {} ) => {
    const { duration = 2000, decimals = false, from = 0 } = options;
    const [ value, setValue ] = useState( from );
    const elementRef = useRef<HTMLElement | null>( null );
    const rdevoRef = useRef<number | null>( null );
    const startTimeRef = useRef<number | null>( null );

    useEffect( () => {
        const element = elementRef.current;
        if ( !element ) return;

        const animate = ( timestamp: number ) => {
            if ( !startTimeRef.current ) startTimeRef.current = timestamp;
            const progress = Math.min( ( timestamp - startTimeRef.current ) / duration, 1 );
            const current = from + ( target - from ) * ease( progress );
            setValue( decimals ? Math.round( current * 10 ) / 10 : Math.round( current ) );
            if ( progress < 1 ) {
                rdevoRef.current = requestAnimationFrame( animate );
            }
        };

        // Counting up is decorative; readers who ask for reduced motion get the
        // final value straight away.
        if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
            setValue( target );
            return;
        }

        const observer = new IntersectionObserver(
            ( entries ) => {
                if ( entries[ 0 ].isIntersecting ) {
                    observer.disconnect();
                    rdevoRef.current = requestAnimationFrame( animate );
                }
            },
            { threshold: 0.5 }
        );

        observer.observe( element );

        return () => {
            observer.disconnect();
            if ( rdevoRef.current !== null ) cancelAnimationFrame( rdevoRef.current );
        };
    }, [ target, from, duration, decimals ] );

    return [ elementRef, value ] as const;
};

export default useCountUp;
