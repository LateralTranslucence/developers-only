import React, { JSX } from 'react';
import htmlReactParser, { DOMNode, Element, domToReact, HTMLReactParserOptions } from 'html-react-parser';
import CTA from '@/components/shared/CTA';
import Image from '@/components/shared/Image';
import Menu from '@/components/shared/Menu';
import { isBlockedElement, sanitizeAttributes } from '@/utils/helpers/sanitize';

// HTML attribute strings for a boolean flag ("true", "1", "modal", or bare)
const attributeFlag = ( value: string | undefined ): boolean => {
    if ( value === undefined ) {
        return false;
    }
    return [ '', 'true', '1', 'yes', 'on', 'modal' ].includes( value.trim().toLowerCase() );
};

const classList = ( value: string | undefined ): Array<string> => {
    return value ? value.split( /\s+/ ).filter( Boolean ) : [];
};

/*
 * Renders an HTML string from the REST API as React elements.
 *
 * The theme's own tags become components: <cta> (CTA), <image> (Image) and
 * <socialmenu>. Everything is filtered on the way through - see
 * utils/helpers/sanitize.ts - so a bad value from the server can't add script
 * to the page: React 19 will load an <script async src> it renders.
 */
const parse: ( string: string | JSX.Element ) => React.ReactElement | string = ( string ): React.ReactElement | string => {
    if ( string === null || string === undefined || string === '' ) {
        return '';
    }
    const options: HTMLReactParserOptions = {
        replace: ( domNode: DOMNode ): JSX.Element | undefined => {
            if ( ! ( domNode instanceof Element ) ) {
                return undefined;
            }
            if ( isBlockedElement( domNode.name ) ) {
                return <></>;
            }
            // Mutating is safe: the DOM was parsed for this call alone
            sanitizeAttributes( domNode.name, domNode.attribs );
            const attribs: Record<string, string> = domNode.attribs;
            // Only for the theme's tags below; returning undefined lets the
            // parser handle everything else (and recurse) itself.
            const renderChildren = () => domNode.children.length ? domToReact( domNode.children as DOMNode[], options ) : null;

            if ( domNode.name === 'cta' ) {
                const children = renderChildren();
                const ctaProps = {
                    button_style: attribs.button_style,
                    className: attribs.class,
                    classes: classList( attribs.classes ),
                    id: attribs.id,
                    modal: attributeFlag( attribs.modal ),
                    modal_class: attribs.modal_class,
                    target: attribs.target,
                    text: attribs.text,
                    url: attribs.url ?? attribs.href,
                };
                // <cta text="..."> renders its own label; <cta>label</cta> wraps it
                return attribs.text ?
                    <><CTA { ...ctaProps } />{ children }</>
                : <CTA { ...ctaProps }>{ children }</CTA>;
            }
            // HTML parsing turns the theme's <image url="..."> into an <img>,
            // so it's recognised by having a url and no src
            if ( domNode.name === 'image' || ( domNode.name === 'img' && attribs.url && ! attribs.src ) ) {
                return (
                    <>
                    <Image
                        alt={ attribs.alt }
                        classes={ classList( attribs.class ) }
                        size={ attribs.size }
                        url={ attribs.url ?? attribs.src } />
                    { renderChildren() }
                    </>
                );
            }
            if ( domNode.name === 'socialmenu' ) {
                return (
                    <>
                    <Menu name="social-nav" />
                    { renderChildren() }
                    </>
                );
            }
            return undefined;
        }
    };
    return htmlReactParser( string.toString(), options ) as React.ReactElement;
};
export default parse;
