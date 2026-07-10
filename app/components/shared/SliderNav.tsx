import React, { JSX } from 'react';
import '@/styles/components/slider.scss';

interface SliderNavProps {
    dotNav?: boolean;
    length: number;
    currentIndex?: number;
    onPrev?: () => void;
    onNext?: () => void;
    onGoTo?: ( index: number ) => void;
}

const SliderNav: React.FC<SliderNavProps> = ( { dotNav = false, length = 0, currentIndex, onPrev, onNext, onGoTo } ): JSX.Element => {
    // Functional (JS-driven) navigation, used by newer scroll-based sliders
    if ( onPrev || onNext || onGoTo ) {
        return (
            <>
            <button type="button" className={ `slider-nav__button slider-nav__button--previous${ currentIndex === 0 ? ' slider-nav__button--disabled' : '' }` } onClick={ onPrev } aria-label="Previous">
                <span>Previous</span>
            </button>
            <button type="button" className={ `slider-nav__button slider-nav__button--next${ currentIndex === length - 1 ? ' slider-nav__button--disabled' : '' }` } onClick={ onNext } aria-label="Next">
                <span>Next</span>
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
    }

    // Declarative (UIkit-directive) navigation, used by legacy uk-slider panels
    return (
        <>
        <a className="slider-buttons btn-previous" href="#" uk-slidenav-previous="" uk-slider-item="previous">
            <span className="screenReader">Previous</span>
        </a>
        <a className="slider-buttons btn-next" href="#" uk-slidenav-next="" uk-slider-item="next">
            <span className="screenReader">Next</span>
        </a>
        { dotNav === true ?
            <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin">
                { ( () => {
                    const dots = [];
                    for ( let i = 0; i < length; i++ ) {
                        dots.push(
                            <li key={ i } uk-slider-item={ i } className={ i === 0 ? 'uk-active' : '' }>
                                <a href="#">
                                    <span className="screenReader">{ i + 1 }</span>
                                </a>
                            </li>
                        );
                    }
                    return dots;
                } ) () }
            </ul>
        : null }
        </>
    );
};
export default SliderNav;
