export default class DoLinearContent {
    constructor() {
        const linearContentSliders: HTMLCollection = document.getElementsByClassName( 'linear-content-blocks' );
        if ( linearContentSliders ) {
            for ( const slider of linearContentSliders ) {
                this.updateIndicator( slider );
            }
        }
    }
    updateIndicator( contentSlider: HTMLElement | Element ) {
        const contentNav: Element | null = contentSlider.nextElementSibling;
        const styleAttribute: string | null = contentNav ? contentNav.getAttribute( 'style' ) : '';
        const increment = styleAttribute ? Number( styleAttribute.replace( '--linear-content-nav-width: ', '' ).replace( '%;', '' ) ) : 0;
        // UIkit.util.on( contentSlider, 'itemshow', function ( e: Event ) {
        //     const contentBlock: HTMLElement | null = e.target as HTMLElement;
        //     const contentBlockIndex: number = Number( contentBlock.getAttribute( 'data-index' ) );
        //     const indicatorWidth: number = ( contentBlockIndex + 1 ) * increment;
        //     if ( indicatorWidth >= increment && contentNav ) {
        //         contentNav.setAttribute( 'style', '--linear-content-nav-width: ' + indicatorWidth + '%;' );
        //     }
        // } );
    }
}