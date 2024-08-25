// 'Counts up' to a number, starting from 0. Can also count down if 'down' class is added to the element, using 'down-from' attribute as the starting point
import { CountUp } from 'countup.js'
const doCountUp = () => {
    const countMe: HTMLCollection = document.getElementsByClassName( 'count-up' );
    if ( countMe ) {
        [ ...countMe ].forEach( ( countElement: Element ) => {
            const countNumber: number = Number( countElement.textContent );
            const countOptions: Record<string, any> = {
                duration: 2,
                easingFn: ( t: number, b: number, c: number, d: number ) => { // from https://inorganik.github.io/countUp.js/
                    const ts = ( t /= d ) * t;
                    const tc = ts * t;
                    return b + c * ( tc + -3 * ts + 3 * t );
                },
            };
            if ( countElement.classList.contains( 'decimal' ) ) {
                countOptions.decimalPlaces = 1;
            }
            if ( countElement.classList.contains( 'down' ) ) {
                countOptions.startVal = countElement.getAttribute( 'data-from' );
            }
            const countUpInit = new CountUp( countElement as HTMLElement, countNumber, countOptions );
            if ( ! countUpInit.error ) {
                countUpInit.start();
            }
        } );
    }
}
export default doCountUp;