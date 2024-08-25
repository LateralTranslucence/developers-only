
export default class DoTableOfContents {
    tocNav: HTMLElement | null;
    tocToggleButton: HTMLElement | null;
    tocToggleButtonTextElement: HTMLElement | null;
    tocToggleButtonOpenText: string | null;
    tocToggleButtonCloseText: string | null;
    constructor() {
        this.tocToggleButton = document.getElementById( 'do-toc-toggle' );
        this.tocNav = document.getElementById( 'do-table-of-contents' );
        this.tocToggleButtonTextElement = this.tocToggleButton ? this.tocToggleButton.getElementsByTagName( 'span' )[0] : null;
        this.tocToggleButtonOpenText = this.tocToggleButton ? this.tocToggleButton.getAttribute( 'data-open-text' ) : null;
        this.tocToggleButtonCloseText = this.tocToggleButton ? this.tocToggleButton.getAttribute( 'data-close-text' ) : null;
        if ( this.tocToggleButton ) {
            this.tocToggleButton.addEventListener( 'click', this.toggle );
            document.addEventListener( 'scroll', this.tooltip );
        }
    }

    toggle = ( e: Event ) => {
        if ( this.tocNav && this.tocNav.classList.contains( 'open' ) ) {
            this.tocNav.classList.remove( 'open' );
            if ( this.tocToggleButtonOpenText && this.tocToggleButtonTextElement ) {
                this.tocToggleButtonTextElement.innerText = this.tocToggleButtonOpenText;
            }
        } else if ( this.tocNav ) {
            this.tocNav.classList.add( 'open' );
            if ( this.tocToggleButtonCloseText && this.tocToggleButtonTextElement ) {
                this.tocToggleButtonTextElement.innerText = this.tocToggleButtonCloseText;
            }
        }
    }

    tooltip = ( e: Event ) => {
        const windowScrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        if ( this.tocToggleButton && windowScrollY > windowHeight * 2 ) {
            this.tocToggleButton.classList.remove( 'show' );
            if ( this.tocToggleButtonTextElement && this.tocToggleButtonOpenText ) {
                this.tocToggleButtonTextElement.innerText = this.tocToggleButtonOpenText;
            }
        }
    }
}