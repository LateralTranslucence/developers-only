// Mobile menu
export default class DoMobileMenu {
    navbar: HTMLElement | null;
    menuButton: HTMLElement | null;
    constructor() {
        // Elements
        this.navbar = document.getElementById( 'do-navbar-main' );
        this.menuButton = document.getElementById( 'do-navbar-toggle' );
        // Methods
        if ( this.navbar ) {
            if ( this.menuButton ) {
                this.menuButton.addEventListener( 'click', this.menu_toggle );
            }
            
        }
    }

    menu_toggle = ( e: Event ) => {
        // Close it (currently open)
        if ( this.menuButton && this.menuButton.classList.contains( 'open')) {
            this.close();
        }
        // Open it (currently closed)
        else {
            this.open();
        }
    }

    open = () => {
        if ( this.navbar && this.menuButton ) {
            this.navbar.classList.add( 'open' );
            this.menuButton.classList.add( 'open' );
            const headerPromo: HTMLElement | null = document.getElementById( 'do-header-promo' );
            if ( headerPromo ) {
                headerPromo.classList.add( 'hide' );
            }
            this.dropdowns();
            const mainMenu: HTMLElement | null = document.getElementById( 'menu-main-nav' );
            if ( mainMenu ) {
                const menuLinks: HTMLCollection = mainMenu.getElementsByClassName( 'do-cta' );
                if ( menuLinks ) {
                    for ( const link of menuLinks ) {
                        link.addEventListener( 'click', this.close );
                    };
                }
            }
        }
    }

    close = () => {
        if ( this.navbar && this.menuButton ) {
            this.navbar.classList.remove( 'open' );
            this.menuButton.classList.remove( 'open' );
            const headerPromo: HTMLElement | null = document.getElementById( 'do-header-promo' );
            if ( headerPromo ) {
                headerPromo.classList.remove( 'hide' );
            }
            const mainMenu = document.getElementById( 'menu-main-nav' );
            if ( mainMenu ) {
                const menuLinks: HTMLCollection = mainMenu.getElementsByClassName( 'do-cta' );
                if ( menuLinks ) {
                    for ( let i = 0, length = menuLinks.length; i < length; i++ ) {
                        menuLinks[ i ].removeEventListener( 'click', this.close );
                    }
                }
            }
        }
    }

    dropdowns() {
        const dropdownButtons: HTMLCollection = document.getElementsByClassName( 'do-navbar-dropdown' );
        for ( let i = 0; i < dropdownButtons.length; i++ ) {
            if ( ! dropdownButtons[ i ].hasAttribute( 'data-event-click' ) ) {
                dropdownButtons[ i ].addEventListener( 'click', ( e: Event ) => {
                    const currentElement: HTMLElement = e.currentTarget as HTMLElement;
                    if ( currentElement ) {
                        const parentLi: HTMLElement | null = currentElement.parentElement;
                        // Currently open
                        if ( currentElement.classList.contains( 'open' ) && parentLi ) {
                            parentLi.classList.remove( 'open' );
                            currentElement.classList.remove( 'open' );
                        }
                        // Currently closed
                        else {
                            // Close all others
                            const dropdownButtons: HTMLCollection = document.getElementsByClassName( 'do-navbar-dropdown' );
                            for ( let j = 0; j < dropdownButtons.length; j++ ) {
                                dropdownButtons[ j ].classList.remove( 'open' );
                                const dropdownButtonsParent: HTMLElement | null = dropdownButtons[ j ].parentElement;
                                if ( dropdownButtonsParent ) {
                                    dropdownButtonsParent.classList.remove( 'open' );
                                }
                            }
                            // Open this one
                            if ( parentLi ) {
                                parentLi.classList.add( 'open' );
                            }
                            currentElement.classList.add( 'open' );
                        }
                    }
                } );
                dropdownButtons[ i ].setAttribute( 'data-event-click', 'true' );
            }
        }
    }
}