import React, { AnchorHTMLAttributes, ReactNode, useId } from 'react';
import { Link } from 'react-router-dom';
import Modal from '@/components/shared/Modal';
import { CTASettings } from '@/utils/types/CTASettings';
import { CustomAttributes } from '@/utils/types/CustomAttributes';
import { sanitizeTitleWithDashes, urlType as getURLType, videoEmbedURL, videoType } from '@/utils/helpers';
import classifyURL, { ClassifiedURL } from '@/utils/helpers/classifyURL';
import '@/styles/components/buttons.scss';

// `modal` and `classes` can arrive as strings from post content or REST data
const isModalFlag = ( modal: CTASettings['modal'] ): boolean => {
    return modal === true || ( typeof modal === 'string' && [ 'true', '1', 'yes', 'modal' ].includes( modal.trim().toLowerCase() ) );
};
const toClassList = ( classes: CTASettings['classes'] ): Array<string> => {
    if ( Array.isArray( classes ) ) {
        return classes.filter( ( name ): name is string => typeof name === 'string' && name.length > 0 );
    }
    return typeof classes === 'string' ? classes.split( /\s+/ ).filter( Boolean ) : [];
};

// What a modal CTA shows: its own content (a video, an image, or a page in an
// iframe), or a Modal that already exists on the page (an #id link)
const ModalContent: React.FC<{ link: ClassifiedURL; text: string; type: string }> = ( { link, text, type } ) => {
    if ( type === 'video' ) {
        // Rendered only while the modal is open (see Modal renderWhenOpen), so
        // playing on mount means playing when the visitor opens it
        return videoType( link.href ) === 'streaming' ?
            <figure className="video">
                <iframe src={ videoEmbedURL( link.href ) } allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title={ text || 'Video' } />
            </figure>
        : <figure className="video">
            <video src={ link.href } controls autoPlay playsInline />
        </figure>;
    }
    if ( type === 'image' ) {
        return <img src={ link.href } alt={ text } />;
    }
    // A page of this site loads through its /iframe/ route, which renders it
    // without the header and footer
    const src: string = link.kind === 'route' ? ( window.relativeHomeURL || '' ).replace( /\/+$/, '' ) + '/iframe' + link.to : link.href;
    return (
        <div className="iframe-wrapper">
            <iframe src={ src } title={ text || 'Modal content' } />
        </div>
    );
};

const CTA: React.FC<CTASettings> = ( {
    button_style = '',
    children,
    className = '',
    classes = [],
    customAttributes = {},
    id = '',
    modal = false,
    modal_class = '',
    onClick,
    target,
    text = '',
    url,
} ) => {
    const generatedModalId: string = useId();
    const rawURL: string = typeof url === 'string' ? url : ( url && typeof url.url === 'string' ? url.url : '' );
    const link: ClassifiedURL = classifyURL( rawURL );
    const label: string = typeof text === 'string' ? text : '';
    const html: ReactNode = children ? children : <span>{ label }</span>;
    const type: string = link.kind === 'none' ? '' : getURLType( link.href );

    // A modal can show a page or file of this site, or any image or video.
    // An external page is opened normally: most sites refuse to be framed.
    const modalEnabled: boolean = isModalFlag( modal )
        && link.kind !== 'none' && link.kind !== 'scheme' && link.kind !== 'query'
        && ( link.kind !== 'external' || type === 'video' || type === 'image' );
    // "#id" + modal opens a Modal rendered elsewhere on the page (e.g. a panel's)
    const opensExistingModal: boolean = modalEnabled && link.kind === 'hash';
    const modalID: string = opensExistingModal ? link.href.slice( 1 ) : generatedModalId;

    const openModal = ( event: React.MouseEvent ): void => {
        event.preventDefault();
        const dialog = document.getElementById( modalID ) as HTMLDialogElement | null;
        dialog?.showModal();
    };

    const classNames: Array<string> = toClassList( classes );
    if ( label ) {
        classNames.push( sanitizeTitleWithDashes( label ) );
    }
    if ( className ) {
        classNames.push( className );
    }
    if ( button_style ) {
        classNames.push( 'button', button_style );
    }
    if ( modalEnabled ) {
        classNames.push( 'modal' );
    }

    const linkTarget: string = target ? target : ( link.kind === 'external' ? '_blank' : '_self' );
    const rel: Array<string> = [];
    if ( linkTarget === '_blank' ) {
        rel.push( 'noopener', 'noreferrer' );
    }
    if ( type === 'pdf' ) {
        rel.push( 'nofollow' );
    }

    let attributes: AnchorHTMLAttributes<HTMLAnchorElement> & CustomAttributes = {
        className: classNames.join( ' ' ) || undefined,
        title: label || undefined,
        'data-url-type': link.kind === 'none' ? undefined : type,
    };
    if ( id ) {
        attributes.id = id;
    }
    if ( customAttributes ) {
        attributes = { ...attributes, ...customAttributes };
    }
    if ( modalEnabled && modal_class ) {
        attributes['data-modal-class'] = modal_class;
    }

    // Modal trigger
    if ( modalEnabled ) {
        const trigger = (
            <a { ...attributes } href={ '#' + modalID } onClick={ openModal }>
                { html }
            </a>
        );
        if ( opensExistingModal ) {
            return trigger;
        }
        return (
            <>
                { trigger }
                <Modal className={ [ type, modal_class ].filter( Boolean ).join( ' ' ) } id={ modalID } renderWhenOpen>
                    <ModalContent link={ link } text={ label } type={ type } />
                </Modal>
            </>
        );
    }

    // A click handler with nowhere to go is a button, not a link
    if ( onClick && link.kind === 'none' ) {
        return (
            <button { ...( attributes as CustomAttributes ) } type="button" onClick={ onClick }>
                { html }
            </button>
        );
    }

    if ( link.kind === 'route' ) {
        return (
            <Link { ...attributes } to={ link.to } target={ linkTarget } rel={ rel.join( ' ' ) || undefined } onClick={ onClick }>
                { html }
            </Link>
        );
    }

    if ( link.kind !== 'none' ) {
        return (
            <a { ...attributes } href={ link.href } target={ linkTarget } rel={ rel.join( ' ' ) || undefined } onClick={ onClick }>
                { html }
            </a>
        );
    }

    // No link: a labelled span, or just the children
    return label ? <span { ...( attributes as CustomAttributes ) }>{ html }</span> : <>{ html }</>;
};
export default CTA;
