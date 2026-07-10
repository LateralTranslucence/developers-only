import React, { JSX, useRef } from 'react';
import Heading from '@/components/shared/Heading';
import '@/styles/components/modals.scss';
import { HeadingProps } from '@/utils/types/HeadingProps';

interface ModalProps {
    children?: React.ReactNode;
    className?: string;
    content?: JSX.Element | string;
    heading?: HeadingProps;
    id: string;
}

// Backed by the native <dialog> element: browser-provided focus trap,
// Escape-to-close, and ::backdrop - opened elsewhere via dialog.showModal().
const Modal: React.FC<ModalProps> = ( { children, className = '', content = '', heading, id } ) => {
    const dialogRef = useRef<HTMLDialogElement>( null );

    // A click that lands on the <dialog> itself (not its content) is a backdrop click.
    const handleBackdropClick = ( event: React.MouseEvent<HTMLDialogElement> ): void => {
        if ( event.target === dialogRef.current ) {
            dialogRef.current?.close();
        }
    };

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
                    { content ?
                        content
                    : null }
                    { children ?
                        children
                    : null }
                </div>
            </div>
        </dialog>
    );
};
export default Modal;
