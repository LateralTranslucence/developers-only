import React, { JSX, useEffect, useState } from 'react';
import { Media } from '@/utils/types/Media';
import { APIEndpoint } from '@/globalVariables';

type IconProps =
    | { media: Media; name?: never }
    | { name: string; media?: never };

const Icon: React.FC<IconProps> = ( props ): JSX.Element | null => {
    const [ svg, setSvg ] = useState<string>( '' );
    const [ svgUrl, setSvgUrl ] = useState<string>( '' );

    const iconName = 'name' in props ? props.name : undefined;
    const mediaUrl = 'media' in props ? props.media?.url as string : undefined;

    useEffect( () => {
        if ( iconName ) {
            fetch( `${APIEndpoint}/icon?slug=${iconName}` )
                .then( r => r.json() )
                .then( ( data ) => {
                    const url = ( Array.isArray( data ) ? data[0] : data )?.fields?.icon_file as Media | undefined;
                    if ( url?.url ) setSvgUrl( url.url as string );
                } )
                .catch( () => {} );
        } else if ( mediaUrl ) {
            setSvgUrl( mediaUrl );
        }
    }, [ iconName, mediaUrl ] );

    useEffect( () => {
        if ( !svgUrl ) return;
        fetch( svgUrl )
            .then( r => r.text() )
            .then( setSvg )
            .catch( () => {} );
    }, [ svgUrl ] );

    if ( !svg ) return null;
    return (
        <figure className="icon" aria-hidden="true" dangerouslySetInnerHTML={ { __html: svg } } />
    );
};
export default Icon;
