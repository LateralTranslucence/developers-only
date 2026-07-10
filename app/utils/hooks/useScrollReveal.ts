import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SELECTORS = [
    'section.panel h2',
    'section.panel h3',
    'ul.blocks > li',
    'ul.stats > li',
].join( ', ' );

const useScrollReveal = () => {
    const { pathname } = useLocation();

    useEffect( () => {
        const observer = new IntersectionObserver(
            ( entries ) => {
                entries.forEach( ( entry ) => {
                    if ( entry.isIntersecting ) {
                        entry.target.setAttribute( 'data-revealed', '' );
                        observer.unobserve( entry.target );
                    }
                } );
            },
            { threshold: 0.1, rootMargin: '0px 0px -3rem 0px' }
        );

        const observe = () => {
            document.querySelectorAll<Element>( SELECTORS ).forEach( ( el ) => {
                if ( !el.hasAttribute( 'data-revealed' ) ) {
                    observer.observe( el );
                }
            } );
        };

        observe();

        // Second pass after lazy-loaded content settles
        const timeout = setTimeout( observe, 400 );

        return () => {
            clearTimeout( timeout );
            observer.disconnect();
        };
    }, [ pathname ] );
};

export default useScrollReveal;
