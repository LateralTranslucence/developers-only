import React from 'react';
import 'assets/styles/components/slider.scss';

const SliderNav: React.FC<{ dotNav?: boolean; length: number; }> = ( { dotNav = false, length = 0 } ): JSX.Element => {
    return (
        <>
        <a className="slider-buttons btn-previous" href="#" uk-slidenav-previous="" uk-slider-item="previous">
            <span className="screen-reader-text">Previous</span>
        </a>
        <a className="slider-buttons btn-next" href="#" uk-slidenav-next="" uk-slider-item="next">
            <span className="screen-reader-text">Next</span>
        </a>
        { dotNav === true ?
            <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin">
                { ( () => {
                    const dots = [];
                    for ( let i = 0; i < length; i++ ) {
                        dots.push(
                            <li key={ i } uk-slider-item={ i } className={ i === 0 ? 'uk-active' : '' }>
                                <a href="#">
                                    <span className="screen-reader-text">{ i + 1 }</span>
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
}
export default SliderNav;