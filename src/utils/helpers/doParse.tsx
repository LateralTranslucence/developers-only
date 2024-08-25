import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import { doLength } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA';
import Image from 'src/components/shared/Image';
import Infographic from 'src/components/shared/Infographic';
import Menu from 'src/components/shared/Menu';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import Post from 'src/utils/types/Post';

const doParse = ( string: string, post: Post | undefined = undefined ): ReactJSXElement | string => {
    if ( ! doLength( string ) ) {
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
                )
            }
            if ( domNode.name === 'image' ) {
                return (
                    <>
                    <Image { ...domNode.attribs } />
                    { domToReact( domNode.children, options ) }
                    </>
                )
            }
            if ( post && domNode.name === 'infographic' ) {
                return (
                    <>
                    <Infographic post={ post } />
                    { domToReact( domNode.children, options ) }
                    </>
                )
            }
            if ( domNode.name === 'socialmenu' ) {
                return (
                    <>
                    <Menu name="social-nav" />
                    { domToReact( domNode.children, options ) }
                    </>
                )
            }
        }
    };
    return parse( string, options ) as ReactJSXElement;
}
export default doParse;