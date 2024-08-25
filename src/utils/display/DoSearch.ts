export default class DoSearch {
    constructor() {
        const form: HTMLElement | null = document.getElementById( 'do-custom-search' );
        // Scroll up to top of search results
        if ( form ) {
            form.scrollIntoView();
        }
    }
}