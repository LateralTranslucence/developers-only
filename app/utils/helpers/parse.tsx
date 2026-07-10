import React, { JSX } from 'react';
import htmlReactParser, { domToReact } from 'html-react-parser';
import CTA from '@/components/shared/CTA';
import Image from '@/components/shared/Image';
import Menu from '@/components/shared/Menu';

const parse: ( string: string | JSX.Element ) => React.ReactElement | string = ( string ): React.ReactElement | string => {
    if ( string === null || string === undefined || string === '' ) {
        return '';
    }
    const options = {
        replace: ( domNode: Record<string, any> ): any => {
            if ( domNode.name === 'cta' ) {
                return (
                    <>
                    <CTA { ...domNode.attribs } />
                    { domToReact( domNode.children, options ) }
                    </>
                );
            }
            if ( domNode.name === 'image' ) {
                return (
                    <>
                    <Image { ...domNode.attribs } />
                    { domToReact( domNode.children, options ) }
                    </>
                );
            }
            if ( domNode.name === 'socialmenu' ) {
                return (
                    <>
                    <Menu name="social-nav" />
                    { domToReact( domNode.children, options ) }
                    </>
                );
            }
        }
    };
    return htmlReactParser( string.toString(), options ) as React.ReactElement;
};
export default parse;
