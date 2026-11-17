import React, { JSX, useEffect, useRef, useState } from 'react';
import Heading from '@/components/shared/Heading';
import '@/styles/components/modals.scss';
import { HeadingProps } from '@/utils/types/HeadingProps';

interface ModalProps {
    children?: React.ReactNode;
    className?: string;
    content?: JSX.Element | string;
    heading?: HeadingProps;
    id: string;
    // Render the content only while the dialog is open: media and iframes
    // then load on demand, and closing unmounts them, which stops playback.
    renderWhenOpen?: boolean;
}

// Pauses anything playing inside a dialog that keeps its content mounted
const stopMedia = ( dialog: HTMLDialogElement ): void => {
    dialog.querySelectorAll( 'video, audio' ).forEach( ( media ) => ( media as HTMLMediaElement ).pause() );
    // A cross-origin player can't be paused from here; setting src again
    // (even to the same value) reloads it, which stops it
    dialog.querySelectorAll( 'iframe' ).forEach( ( iframe ) => {
        const src = iframe.getAttribute( 'src' );
        if ( src ) {
            iframe.setAttribute( 'src', src );
        }
    } );
};

// Backed by the native <dialog> element: browser-provided focus trap,
// Escape-to-close, and ::backdrop - opened elsewhere via dialog.showModal().
const Modal: React.FC<ModalProps> = ( { children, className = '', content = '', heading, id, renderWhenOpen = false } ) => {
    const dialogRef = useRef<HTMLDialogElement>( null );
    const [ isOpen, setIsOpen ] = useState<boolean>( false );

    useEffect( () => {
        const dialog = dialogRef.current;
        if ( ! dialog ) {
            return;
        }
        // Dialogs are opened from outside (dialog.showModal()), and there's no
        // cross-browser "open" event yet, so watch the attribute
        const sync = (): void => setIsOpen( dialog.open );
        const observer = new MutationObserver( sync );
        observer.observe( dialog, { attributes: true, attributeFilter: [ 'open' ] } );
        const onClose = (): void => {
            sync();
            if ( ! renderWhenOpen ) {
                stopMedia( dialog );
            }
        };
        dialog.addEventListener( 'close', onClose );
        return () => {
            observer.disconnect();
            dialog.removeEventListener( 'close', onClose );
        };
    }, [ renderWhenOpen ] );

    // A click that lands on the <dialog> itself (not its content) is a backdrop click.
    const handleBackdropClick = ( event: React.MouseEvent<HTMLDialogElement> ): void => {
        if ( event.target === dialogRef.current ) {
            dialogRef.current?.close();
        }
    };

    const showContent: boolean = ! renderWhenOpen || isOpen;

    return (
        <dialog className={ [ 'modal', className ].filter( Boolean ).join( ' ' ) } id={ id } onClick={ handleBackdropClick } ref={ dialogRef }>
            <div className="modal__inner">
                <button className="modal__close" onClick={ () => dialogRef.current?.close() } type="button">
                    <span className="screenReader">Close</span>
                </button>
                <div className="modal__content">
                    { heading ?
                        <header className="modal__header">
                            <Heading { ...heading } />
                        </header>
                    : null }
                    { showContent && content ?
                        content
                    : null }
                    { showContent && children ?
                        children
                    : null }
                </div>
            </div>
        </dialog>
    );
};
export default Modal;
