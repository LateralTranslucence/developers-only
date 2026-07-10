import React, { useEffect, useState } from 'react';
import '@/styles/components/to-top.scss';

const BackToTopButton: React.FC = () => {
    const [ visible, setVisible ] = useState<boolean>( false );

    useEffect( () => {
        const onScroll = () => {
            setVisible( window.scrollY > 400 );
        };

        onScroll();
        window.addEventListener( 'scroll', onScroll, { passive: true } );

        return () => {
            window.removeEventListener( 'scroll', onScroll );
        };
    }, [] );

    return (
        <button
            id="toTop"
            title="Scroll To Top"
            className={ 'back-to-top' + ( visible ? ' back-to-top--visible' : '' ) }
            onClick={ () => window.scrollTo( { top: 0, behavior: 'smooth' } ) }>
            <span className="back-to-top__label">To Top</span>
        </button>
    );
};

export default BackToTopButton;
