import React, { JSX, useEffect, useState } from 'react';
import { Media } from '@/utils/types/Media';
import { APIEndpoint } from '@/globalVariables';
import { sanitizeSVG } from '@/utils/helpers/sanitize';

type IconProps =
    | { media: Media; name?: never }
    | { name: string; media?: never };

// The URL of the SVG file for an icon post, looked up by slug
const getIconURL = async ( name: string, signal: AbortSignal ): Promise<string> => {
    const response = await fetch( `${ APIEndpoint }/icon?slug=${ encodeURIComponent( name ) }`, { signal } );
    if ( ! response.ok ) {
        return '';
    }
    const data = await response.json();
    const iconFile = ( Array.isArray( data ) ? data[0] : data )?.fields?.icon_file as Media | undefined;
    return typeof iconFile?.url === 'string' ? iconFile.url : '';
};

// Inlines an SVG icon (so it can take currentColor), either from an icon post
// by slug or from a media field. The markup is sanitized before injection.
const Icon: React.FC<IconProps> = ( props ): JSX.Element | null => {
    const iconName = 'name' in props ? props.name : undefined;
    const mediaUrl = 'media' in props && typeof props.media?.url === 'string' ? props.media.url : undefined;
    const source: string = iconName ? 'name:' + iconName : ( mediaUrl ? 'url:' + mediaUrl : '' );
    // Keyed by source, so a stale icon is never shown for new props
    const [ icon, setIcon ] = useState<{ source: string; svg: string }>( { source: '', svg: '' } );

    useEffect( () => {
        if ( ! source ) {
            return;
        }
        const controller = new AbortController();
        ( async () => {
            const svgUrl: string = iconName ? await getIconURL( iconName, controller.signal ) : ( mediaUrl ?? '' );
            if ( ! svgUrl ) {
                return;
            }
            const response = await fetch( svgUrl, { signal: controller.signal } );
            if ( response.ok ) {
                setIcon( { source, svg: sanitizeSVG( await response.text() ) } );
            }
        } )().catch( () => {} );
        return () => controller.abort();
    }, [ iconName, mediaUrl, source ] );

    if ( ! icon.svg || icon.source !== source ) return null;
    return (
        <figure className="icon" aria-hidden="true" dangerouslySetInnerHTML={ { __html: icon.svg } } />
    );
};
export default Icon;
