import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import { doLength } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import Image from '@/components/shared/Image';
import Infographic from '@/components/shared/Infographic';
import Menu from '@/components/shared/Menu';
import { Post } from '@/utils/types/Post';

const doParse: ( string: string | JSX.Element, post?: Post | undefined ) => React.ReactElement | string = ( string, post = undefined ): React.ReactElement | string => {
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
    return parse( string.toString(), options ) as React.ReactElement;
}
export default doParse;