import React, { HTMLAttributes, AnchorHTMLAttributes, ReactNode, useId } from 'react';
import { Link } from 'react-router-dom';
import Modal from '@/components/shared/Modal';
import { CTASettings } from '@/utils/types/CTASettings';
import { sanitizeTitleWithDashes, trimChar, urlType as getURLType, videoEmbedURL } from '@/utils/helpers';
import { TagType } from '@/utils/types/TagType';
import { CustomAttributes } from '@/utils/types/CustomAttributes';
import '@/styles/components/buttons.scss';

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
    if ( typeof url === 'object' && url.url ) {
        url = url.url.replace( window.homeURL, '' ).replace( window.relativeHomeURL, '' );
    } else if ( typeof url === 'string' ) {
        url = url.length > 0 && url.indexOf( window.homeURL ) === 0 ? url.replace( window.homeURL, '' ).replace( window.relativeHomeURL, '' ) : url;
    } else {
        url = '';
    }

    const generatedModalId: string = useId();
    const html: ReactNode = children ? children : <span>{ text }</span>;
    const relativeURL: boolean = Boolean( url.length ) && url.indexOf( 'http' ) === -1 && url.indexOf( 'mailto:' ) === -1;
    const externalURL: boolean = Boolean( url.length ) && ! relativeURL && url.indexOf( window.homeURL ) !== 0;
    const vimeoVideo: boolean = url.indexOf( 'vimeo' ) > -1;
    const containsAnchor: boolean = Boolean( url.length ) && url.indexOf( '#' ) > -1;
    const anchorOnlyURL: boolean = containsAnchor && url.indexOf( '#' ) === 0;
    const relativeContainsFileExtension: boolean = relativeURL && url.indexOf( '.' ) > -1;
    const containsQueryParam: boolean = Boolean( url.length ) && url.indexOf( '?' ) > -1;
    const queryParamOnly: boolean = containsQueryParam && url.indexOf( '?' ) === 0;
    const internalPath: string = relativeURL && ! anchorOnlyURL && ! queryParamOnly ? '/' + trimChar( url.replace( window.relativeHomeURL, '' ), '/' ) + ( containsAnchor || containsQueryParam || relativeContainsFileExtension ? '' : '/' ) : url;
    let href: string = relativeURL ? internalPath.replace( '//', '/' ) : url;
    href = vimeoVideo ? videoEmbedURL( href ) : href;
    href = href.indexOf( window.homeURL ) > -1 ? trimChar( href, '/' ) + '/' : href;
    const urlType: string = getURLType( href );
    const urlTarget = target ? target : ( relativeURL || href.indexOf( window.homeURL ) === 0 ? '_self' : '_blank' );
    const ariaHidden = text.indexOf( 'video' ) > -1 && text.indexOf( 'embed' ) > -1;
    // Anchor-only + modal means "open a Modal that already exists elsewhere on the page";
    // any other URL + modal means this CTA owns and renders its own Modal content.
    const modalEnabled = modal && ( vimeoVideo || ! externalURL );
    const opensExistingModal: boolean = modalEnabled && anchorOnlyURL;
    const modalID: string = opensExistingModal ? href.replace( '#', '' ) : generatedModalId;
    const modalURL = modalEnabled && ! opensExistingModal && relativeURL && ! vimeoVideo && href.indexOf( '/iframe' ) === -1 ? window.relativeHomeURL + '/iframe' + href : href;

    const openModal = ( event: React.MouseEvent ): void => {
        event.preventDefault();
        const dialog = document.getElementById( modalID ) as HTMLDialogElement | null;
        dialog?.showModal();
    };

    let Tag: TagType = href || onClick ? Link : 'span';

    let attributes: HTMLAttributes<HTMLAnchorElement> | AnchorHTMLAttributes<HTMLAnchorElement> = {
	    title: text,
        target: urlTarget,
        'data-url-type': urlType,
    };

    classes.push(sanitizeTitleWithDashes(text));

    if ( className.length ) {
        classes.push( className );
    }
    if ( button_style ) {
        classes.push( 'button', button_style );
    }
    if ( modalEnabled ) {
        classes.push( 'modal' );
    }
    const shouldUseAnchor = externalURL || anchorOnlyURL || queryParamOnly || relativeContainsFileExtension || Boolean( onClick );
    if ( shouldUseAnchor ) {
        if ( ! onClick ) {
            attributes.href = relativeURL && ! externalURL ? window.relativeHomeURL + href : href;
        }
        Tag = 'a';
    } else if ( Tag === Link ) {
        attributes.to = href;
    }
    if ( id ) {
        attributes.id = id;
    }
    if ( onClick ) {
        attributes.onClick = onClick;
    }
    if ( ariaHidden ) {
        attributes['aria-hidden'] = true;
    }
    if ( urlType === 'pdf' ) {
        attributes.rel = 'nofollow';
    }
    if ( customAttributes ) {
        attributes = { ...attributes, ...customAttributes as CustomAttributes };
    }
    if ( modal && modal_class ) {
        attributes['data-modal-class'] = modal_class;
    }
    if ( modalEnabled ) {
        Tag = 'a';
        attributes.href = '#' + modalID;
        attributes.onClick = openModal;
    }

    const classString: string = classes.join( ' ' );
    attributes.className = classString;

    function HTML() {
        return <>{ html }</>;
    }

    // This CTA owns its own modal content (video/image/iframe) - render trigger + Modal together.
    if ( modalEnabled && ! opensExistingModal ) {
        return (
            <>
                <Tag { ...attributes }>
                    <HTML />
                </Tag>
                <Modal className={ [ urlType, modal_class ].filter( Boolean ).join( ' ' ) } id={ modalID }>
                    { urlType === 'video' ?
                        <figure className="video">
                            <iframe src={ modalURL } allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title={ text || 'Video modal' } />
                        </figure>
                    : urlType === 'image' ?
                        <img src={ modalURL } alt={ text } />
                    : <div className="iframe-wrapper">
                        <iframe src={ modalURL } title={ text || 'Modal content' } />
                    </div> }
                </Modal>
            </>
        );
    }

    return (
        <>
        { href || text || onClick ?
            <Tag { ...attributes }>
                <HTML />
            </Tag>
        : <HTML />
        }
        </>
    );
};
export default CTA;
