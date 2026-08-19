import React from 'react';
import { BackgroundProps } from '@/utils/types/BackgroundProps';
import { Media, MediaItem } from '@/utils/types/Media';

/*
 * Turns a background field into inline style for the element that carries it.
 *
 * The Background field holds a colour and an optional media file. Colour is set
 * directly; the image is handed over as the `--background-image` custom
 * property, because that is what the stylesheets already read:
 *
 *   section.panel { background-image: var(--background-image); }
 *   header#hero   { background-image: var(--background-image); }
 *
 * Passing a custom property rather than `background-image` leaves the theming
 * layer free to decide how the image is drawn - or to ignore it - without the
 * component prescribing it.
 */

// Resolving a URL out of a Media object is not as simple as reading .url:
// the API only sets a top-level url for icons. A regular image comes back as one
// entry per registered size ({ type, thumbnail, cinema_600, …, full }), so a
// size has to be picked. 'background' is registered at 1500px wide for exactly
// this purpose; 'full' is the same fallback Image.tsx uses.
const mediaURL = ( media: Media, preferred: string ): string => {
    if ( typeof media.url === 'string' && media.url.length ) {
        return media.url; // icons, and anything the API gave a direct url
    }
    for ( const key of [ preferred, 'full' ] ) {
        const size = media[ key ] as MediaItem | undefined;
        if ( size && typeof size.url === 'string' && size.url.length ) {
            return size.url;
        }
    }
    // Last resort: the first registered size that carries a url.
    for ( const value of Object.values( media ) ) {
        const size = value as MediaItem | undefined;
        if ( size && typeof size === 'object' && typeof size.url === 'string' && size.url.length ) {
            return size.url;
        }
    }
    return '';
};

const getBackgroundStyle = ( settings: BackgroundProps, size: string = 'background' ): React.CSSProperties => {
    const style: React.CSSProperties = {};
    const color: string = settings.color ?? '';
    const media: Media | undefined = settings.media;

    if ( color.length ) {
        style.backgroundColor = color;
    }

    // A video background is played by a media component, not painted on an
    // element, so it is left alone here.
    if ( media && media.type !== 'video' ) {
        const url: string = mediaURL( media, size );
        if ( url.length ) {
            // Quoted so a filename containing brackets or spaces cannot break
            // the url() token.
            ( style as Record<string, string> )[ '--background-image' ] = `url("${ url }")`;
        }
    }

    return style;
};
export default getBackgroundStyle;
