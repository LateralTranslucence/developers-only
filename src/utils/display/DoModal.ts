import { doURLType } from 'src/utils/helpers';

// Custom modal handling
// Custom 'modal_open' event
const modalOpenEvent = new Event( 'modal_open' );
export default class DoModal {
    constructor( e: Event ) {
        e.preventDefault();
        const obj: HTMLElement = e.currentTarget as HTMLElement;
        if ( obj.classList.contains( 'do-modals' ) ) {
            this.modalsInWrapper( obj );
        }
        if ( obj.classList.contains( 'do-modal' ) ) {
            this.modal( obj );
        }
    }
    modalsInWrapper( modals: HTMLElement ) {
        const aTags: HTMLCollection = modals.getElementsByTagName( 'a' );
        modals.setAttribute( 'uk-lightbox', '' );
        for ( const aTag of aTags ) {
            const href: string | null = aTag.getAttribute( 'href' );
            if ( href && href.indexOf( 'http' ) == -1 && href.indexOf( '/iframe' ) == -1 ) {
                aTag.setAttribute( 'href', '/iframe' + href );
            }
            if ( href && href.indexOf( 'vimeo' ) == -1 ) {
                aTag.setAttribute( 'data-type', 'iframe' );
            }
        }
    }
    modal( modal: HTMLElement ) {
        let href: string | null = modal.getAttribute( 'href' );
        href = href ? href.replace( relativeHomeURL, '' ) : '';
        // If relative url or local url or vimeo video
        if ( href.indexOf( 'http' ) == -1 || href.indexOf( 'vimeo' ) > -1 ) { 
            // If page or video
            if ( doURLType( href ) === 'page' || doURLType( href ) === 'video' ) {
                // If relative url
                if ( href.indexOf( 'http' ) == -1 ) {
                    // If no iframe parameter
                    if ( href.indexOf( '/iframe' ) == -1 ) {
                        // Add iframe parameter to url
                        modal.setAttribute( 'href', relativeHomeURL + '/iframe' + href );
                    }
                }
            }
            // If we're proceeding with the modal, lightbox element hasn't been added yet
            if ( ! modal.classList.contains( 'do-modal-window' ) ) {
                modal.classList.add( 'do-modal-window' );
            }
        }
        this.modalWindow( modal );
    }
    modalWindow( modal: HTMLElement ) {
        const urlRaw: string | null = modal.getAttribute( 'href' );
        const url: string = urlRaw ? urlRaw : '';
        const urlType: string | null = modal.getAttribute( 'data-url-type' ) ? modal.getAttribute( 'data-url-type' ) : '';
        const modalClass: string | null = modal.getAttribute( 'data-modal-class' ) ? modal.getAttribute('data-modal-class') : '';
        const iframeName: string | null = modal.getAttribute( 'data-iframe-name' ) ? modal.getAttribute('data-iframe-name') : '';
        // Build the modal
        const modalWrapper: HTMLElement = document.createElement( 'div' );
        const modalInnerWrapper: HTMLElement = document.createElement( 'div' );
        const closeButton: HTMLElement = document.createElement( 'button' );
        const closeButtonText: HTMLElement = document.createElement( 'span' );
        modalWrapper.setAttribute( 'class', 'do-modal-window-wrapper ' + urlType );
        if ( modalClass ) {
            modalWrapper.classList.add( modalClass );
        }
        modalInnerWrapper.setAttribute( 'class', 'do-modal-window-inner-wrapper' );
        closeButton.setAttribute( 'class', 'do-modal-window-close' );
        closeButtonText.textContent = 'Close';
        closeButton.appendChild( closeButtonText );
        closeButton.addEventListener( 'click', function ( e ) {
            modalWrapper.remove();
        } );
        modalInnerWrapper.appendChild( closeButton );
        modalWrapper.appendChild( modalInnerWrapper );
        switch ( urlType ) {
            case 'image':
                break;
            case 'video':
                const modalVideo: HTMLElement = document.createElement( 'figure' );
                const modalVideoIframe: HTMLElement = document.createElement( 'iframe' );
                modalInnerWrapper.classList.add( 'do-video-wrapper' );
                modalVideo.setAttribute( 'class', 'do-video' );
                modalVideoIframe.setAttribute( 'src', url );
                modalVideoIframe.setAttribute( 'frameborder', '0' );
                modalVideoIframe.setAttribute( 'allow', 'autoPlay; fullscreen; picture-in-picture' );
                modalVideoIframe.setAttribute( 'allowfullscreen', '' );
                if ( iframeName ) {
                    modalVideoIframe.setAttribute( 'name', iframeName );
                }
                modalVideo.appendChild( modalVideoIframe );
                modalInnerWrapper.appendChild( modalVideo );
                break;
            default:
                const modalIframeWrapper: HTMLElement = document.createElement( 'div' );
                const modalIframe: HTMLElement = document.createElement( 'iframe' );
                modalIframeWrapper.setAttribute( 'class', 'do-iframe-wrapper' );
                modalIframe.setAttribute( 'src', url );
                modalIframe.setAttribute( 'frameborder', '0' );
                if ( iframeName ) {
                    modalIframe.setAttribute( 'name', iframeName );
                }
                modalIframeWrapper.appendChild( modalIframe );
                modalInnerWrapper.appendChild( modalIframeWrapper );
                break;
        }
        document.body.appendChild( modalWrapper );
        closeButton.focus();
        document.dispatchEvent( modalOpenEvent );
    }
}