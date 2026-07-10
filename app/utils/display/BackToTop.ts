// Back to Top
export default class BackToTop {
    buttonID: string = 'toTop';
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
        const devoToTop: HTMLElement | null = document.getElementById( this.buttonID );
        const windowScrollY: number = window.scrollY;
        const windowHeight: number = window.innerHeight;
        const buttonAction: string = windowScrollY > windowHeight * 1.5 ? 'show' : 'hide';
        if ( devoToTop && buttonAction == 'show' ) {
            devoToTop.classList.add( 'show' );
        } else if ( devoToTop && buttonAction == 'hide' ) {
            devoToTop.classList.remove( 'show' );
        }
    };
}