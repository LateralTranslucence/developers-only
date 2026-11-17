import React, { JSX } from 'react';
import '@/styles/components/slider.scss';

interface SliderNavProps {
    length: number;
    currentIndex?: number;
    onPrev?: () => void;
    onNext?: () => void;
    onGoTo?: ( index: number ) => void;
}

// Previous/next buttons and dot navigation for a scroll-based slider. The
// slider itself owns the position; this only reports what was asked for.
const SliderNav: React.FC<SliderNavProps> = ( { length = 0, currentIndex, onPrev, onNext, onGoTo } ): JSX.Element => {
    return (
        <>
        <button type="button" className={ `slider-nav__button slider-nav__button--previous${ currentIndex === 0 ? ' slider-nav__button--disabled' : '' }` } onClick={ onPrev }>
            <span className="screenReader">Previous</span>
        </button>
        <button type="button" className={ `slider-nav__button slider-nav__button--next${ currentIndex === length - 1 ? ' slider-nav__button--disabled' : '' }` } onClick={ onNext }>
            <span className="screenReader">Next</span>
        </button>
        <nav aria-label="Slide Navigation">
            <ul className="slider-nav__dots">
                { Array.from( { length }, ( _, i ) => (
                    <li key={ i } className="slider-nav__dot">
                        <button
                            type="button"
                            aria-label={ `Go to slide ${ i + 1 }` }
                            aria-current={ currentIndex === i ? true : undefined }
                            onClick={ () => onGoTo?.( i ) }
                        >
                            <span>{ i + 1 }</span>
                        </button>
                    </li>
                ) ) }
            </ul>
        </nav>
        </>
    );
};
export default SliderNav;
