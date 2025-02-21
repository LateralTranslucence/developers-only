// Back to Top
export default class DoBackToTop {
    buttonID: string = 'do-to-top';
    constructor() {
        // Button
        if ( ! document.getElementById( this.buttonID ) ) {
            this.button();
        }
        // On scroll
        document.removeEventListener( 'scroll', this.onScroll );
        document.addEventListener( 'scroll', this.onScroll );
        this.onScroll();
    }

    button = () => {
        const backToTopButton: HTMLElement = document.createElement( 'button' );
        backToTopButton.setAttribute( 'id', this.buttonID );
        backToTopButton.setAttribute( 'title', 'Scroll To Top' );
        backToTopButton.innerHTML = '<span>To Top</span>';
        document.body.appendChild( backToTopButton );
        backToTopButton.addEventListener( 'click', this.buttonOnClick );
    };

    buttonOnClick = () => {
        window.scrollTo( 0, 0 );
    };

    onScroll = () => {
        const doToTop: HTMLElement | null = document.getElementById( this.buttonID );
        const windowScrollY: number = window.scrollY;
        const windowHeight: number = window.innerHeight;
        const buttonAction: string = windowScrollY > windowHeight * 1.5 ? 'show' : 'hide';
        if ( doToTop && buttonAction == 'show' ) {
            doToTop.classList.add( 'show' );
        } else if ( doToTop && buttonAction == 'hide' ) {
            doToTop.classList.remove( 'show' );
        }
    };
}