// Select List
export default class SelectList {
    constructor() {
        const selectListToggles: HTMLCollection = document.getElementsByClassName( 'select-list-toggle' );
        if ( selectListToggles ) {
            [ ...selectListToggles ].forEach( ( selectList: Element, index: number ) => {
                // First remove the event listener, just in case, then add it back
                selectList.removeEventListener( 'click', this.onClick );
                selectList.addEventListener( 'click', this.onClick );
                // If this is tabs, do more things
                if ( selectList.classList.contains( 'tabs-nav-toggle' ) ) {
                    const tabList: Element | null = selectList.nextElementSibling;
                    if ( tabList ) {
                        tabList.removeEventListener( 'click', this.tabOnClick );
                        tabList.addEventListener( 'click', this.tabOnClick );
                    }
                }
            } );
        }
    }

    onClick( e: Event ) {
        const clicked = e.currentTarget as HTMLElement;
        const selectListToToggleID = clicked.getAttribute( 'data-toggle' );
        const selectListToToggle = selectListToToggleID ? document.getElementById( selectListToToggleID ) : clicked.nextElementSibling;
        // Already open
        if ( clicked.classList.contains( 'open' ) && selectListToToggle ) {
            clicked.classList.remove( 'open' );
            selectListToToggle.classList.remove( 'open' );
        }
        // Already closed
        else if ( selectListToToggle ) {
            clicked.classList.add( 'open' );
            selectListToToggle.classList.add( 'open' );
        }
    }

    tabOnClick( e: Event ) {
        const currentTarget = e.target as HTMLElement;
        const parentUL: HTMLElement | null = currentTarget.closest('ul');
        const selectList: HTMLElement | null = parentUL ? parentUL.previousElementSibling as HTMLElement : null;
        // Close select list
        if ( selectList && parentUL ) {
            parentUL.classList.remove( 'open' );
            selectList.classList.remove( 'open' );
            selectList.innerHTML = currentTarget.textContent ? currentTarget.textContent : '';
        }
    }
}