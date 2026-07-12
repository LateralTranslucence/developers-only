import React, { JSX } from 'react';
import htmlReactParser, { DOMNode, Element, domToReact, HTMLReactParserOptions } from 'html-react-parser';
import CTA from '@/components/shared/CTA';
import Image from '@/components/shared/Image';
import Menu from '@/components/shared/Menu';
import { ImageProps } from '@/utils/types/ImageProps';

const parse: ( string: string | JSX.Element ) => React.ReactElement | string = ( string ): React.ReactElement | string => {
    if ( string === null || string === undefined || string === '' ) {
        return '';
    }
    const options: HTMLReactParserOptions = {
        replace: ( domNode: DOMNode ): JSX.Element | undefined => {
            if ( ! ( domNode instanceof Element ) ) {
                return undefined;
            }
            if ( domNode.name === 'cta' ) {
                return (
                    <>
                    <CTA { ...domNode.attribs } />
                    { domToReact( domNode.children as DOMNode[], options ) }
                    </>
                );
            }
            if ( domNode.name === 'image' ) {
                return (
                    <>
                    <Image { ...( domNode.attribs as unknown as ImageProps ) } />
                    { domToReact( domNode.children as DOMNode[], options ) }
                    </>
                );
            }
            if ( domNode.name === 'socialmenu' ) {
                return (
                    <>
                    <Menu name="social-nav" />
                    { domToReact( domNode.children as DOMNode[], options ) }
                    </>
                );
            }
        }
    };
    return htmlReactParser( string.toString(), options ) as React.ReactElement;
};
export default parse;
