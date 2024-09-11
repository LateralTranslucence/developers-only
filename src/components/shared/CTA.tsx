import React, { HTMLAttributes, AnchorHTMLAttributes, ReactNode, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { CTASettings } from 'src/utils/types/CTASettings';
import { doLength, doTrimChar, doURLType, doVideoEmbedURL } from 'src/utils/helpers';
import { DoModal } from 'src/utils/display';
import 'assets/styles/components/buttons.scss';
import 'assets/styles/components/modals.scss';
import { TagType } from 'src/utils/types/TagType';
import { CustomAttributes } from 'src/utils/types/CustomAttributes';

const CTA: React.FC<CTASettings> = ( { 
    url, 
    modal = false, 
    modalClass = '', 
    classes = [], 
    title = '', 
    children, 
    target, 
    uk = false, 
    id = '', 
    onClick, 
    customAttributes = {},
    iframeName
} ) => {
    if ( typeof url === 'object' && url.url ) {
        url = url.url.replace( homeURL, '' ).replace( relativeHomeURL, '' );
    } else if ( typeof url === 'string' ) {
        url = doLength( url ) && url.indexOf( homeURL ) === 0 ? url.replace( homeURL, '' ).replace( relativeHomeURL, '' ) : url;
    } else {
        url = '';
    }
    
    const html: ReactNode = children ? children : <span>{ title }</span>;
    const relativeURL: boolean = Boolean( url.length ) && url.indexOf( 'http' ) === -1 && url.indexOf( 'mailto:' ) === -1;
    const externalURL: boolean = Boolean( url.length ) && ! relativeURL && url.indexOf( homeURL ) !== 0;
    const vimeoVideo: boolean = url.indexOf( 'vimeo' ) > -1;
    const containsAnchor: boolean = Boolean( url.length ) && url.indexOf( '#' ) > -1;
    const anchorOnlyURL: boolean = containsAnchor && url.indexOf( '#' ) === 0;
    const relativeContainsFileExtension: boolean = relativeURL && url.indexOf( '.' ) > -1;
    const containsQueryParam: boolean = Boolean( url.length ) && url.indexOf( '?' ) > -1;
    const queryParamOnly: boolean = containsQueryParam && url.indexOf( '?' ) === 0;
    let href: string = relativeURL && ! anchorOnlyURL && ! queryParamOnly ? relativeHomeURL + '/' + doTrimChar( url.replace( relativeHomeURL, '' ), '/' ) + ( containsAnchor || containsQueryParam || relativeContainsFileExtension ? '' : '/' ) : url;
    href = relativeURL ? href.replace( '//', '/' ) : href;
    href = vimeoVideo ? doVideoEmbedURL( href ) : href;
    href = href.indexOf( homeURL ) > -1 ? doTrimChar( href, '/' ) + '/' : href;
    const urlType: string = doURLType( href );
    const urlTarget = target ? target : ( relativeURL || href.indexOf( homeURL ) === 0 ? '_self' : '_blank' );
    const ukToggle = modal && anchorOnlyURL;
    const ukScroll = ! modal && anchorOnlyURL && ! uk;
    const ariaHidden = title.indexOf( 'do-video' ) > -1 && title.indexOf( 'embed' ) > -1;
    
    let Tag: TagType = doLength( href ) ? Link : 'span';

    let attributes: HTMLAttributes<HTMLAnchorElement> | AnchorHTMLAttributes<HTMLAnchorElement> = {
	    title: title,
        target: urlTarget,
        'data-url-type': urlType,
    };
    
    classes.push( 'do-cta' );

    if ( modal && ! anchorOnlyURL && ( vimeoVideo || ! externalURL ) ) {
        classes.push( 'do-modal' );
        attributes.onClick = ( e ) => { new DoModal( e as any ) };
    }
    if ( anchorOnlyURL || queryParamOnly ) {
        attributes.href = href;
        Tag = 'a';
    } else if (Tag === Link) {
        attributes.to = href;
    }
    if ( ukToggle ) {
        attributes['uk-toggle'] = '';
    }
    if ( ukScroll ) {
        attributes['uk-scroll'] = '';
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
    if ( iframeName ) {
        attributes['data-iframe-name'] = iframeName;
    }
    if ( urlType === 'pdf' ) {
        attributes.rel = 'nofollow';
    }
    if ( customAttributes ) {
        attributes = { ...attributes, ...customAttributes as CustomAttributes };
    }
    if ( modal && modalClass ) {
        attributes['data-modal-class'] = modalClass;
    }

    const classString: string = classes.join( ' ' );
    attributes.className = classString;

    function HTML() {
        return <>{ html }</>;
    }

    return ( 
        <>
        { href || title ? 
            <Tag  { ...attributes }>
                <HTML />
            </Tag>
        : <HTML />
        }
        </>
    );
}
export default CTA;
