import React from 'react';
import Heading from '@/components/shared/Heading';
import '@/styles/components/modals.scss';
import { HeadingProps } from '@/utils/types/HeadingProps';

interface ModalProps {
    children?: React.ReactNode;
    content?: JSX.Element | string;
    heading: HeadingProps;
    id: string;
}

const Modal: React.FC<ModalProps> = ( { children, content = '', heading = {}, id = '' } ) => {
    return (
        <section id={ id } className="panel do-inline-modal-wrapper modal-more" uk-modal="">
            <div className="panel-inner-wrapper do-inline-modal-inner-wrapper">
                <button className="do-modal-window-close uk-modal-close-default" type="button" uk-close="">
                    <span className="screen-reader-text">Close</span>
                </button>
                <div className="do-inline-modal-content-wrapper">
                    <header className="panel-header">
                        <Heading { ...heading } />
                    </header> 
                    { content ? 
                        content
                    : null }
                    { children ? 
                        children
                    : null }
                </div>
            </div>
        </section>
    );
}
export default Modal;