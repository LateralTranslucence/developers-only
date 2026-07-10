// Get the specified parent element
const getParent = ( element: Element, parentSelector: string ): HTMLElement | null => {
    // element and parentSelector are required
    if ( ! element || ! parentSelector ) {
        return null;
    }
    // Determine the type of parentSelector and act accordingly
    // ID
    if ( parentSelector.indexOf( '#' ) == 0 ) {
        const parentID: string = parentSelector.replace( '#', '' );
        let parent: HTMLElement | null = element.parentNode as HTMLElement;
        while ( parent && parent.getAttribute( 'id' ) !== parentID ) {
            parent = parent.parentNode as HTMLElement;
        }
        return parent;
    }
    // Class
    else if ( parentSelector.indexOf( '.' ) == 0 ) {
        const parentClass = parentSelector.replace( '.', '' );
        let parent: HTMLElement | null = element.parentNode as HTMLElement;
        while ( ! parent.classList.contains( parentClass ) ) {
            parent = parent.parentNode as HTMLElement;
        }
        return parent;
    }
    // Assume it's a tag
    else {
        const parentTag = parentSelector;
        let parent: HTMLElement | null = element.parentNode as HTMLElement;
        while ( parent && parent.tagName !== parentTag.toUpperCase() ) {
            parent = parent.parentNode as HTMLElement;
        }
        return parent;
    }
};
export default getParent;