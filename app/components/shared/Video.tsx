import React, { CSSProperties, JSX } from 'react';
import { useRef, useState } from 'react';
import { CustomAttributes } from '@/utils/types/CustomAttributes';
import { VideoProps } from '@/utils/types/VideoProps';
import { videoType, videoEmbedURL } from '@/utils/helpers';
import '@/styles/components/videos.scss';

const prefersReducedMotion = (): boolean => {
    return typeof window.matchMedia === 'function' && window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
};

// A YouTube or Vimeo player
const StreamingVideo: React.FC<{ label: string; url: string }> = ( { label, url } ) => {
    return (
        <iframe
            allow="fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            src={ videoEmbedURL( url ) }
            title={ label } />
    );
};

/*
 * A self-hosted, muted background video. It plays automatically unless the
 * visitor prefers reduced motion, and always has a play/pause button: moving
 * content that starts on its own must be pausable (WCAG 2.2.2).
 */
const BackgroundVideo: React.FC<{ label: string; loop: boolean; url: string }> = ( { label, loop, url } ) => {
    const videoRef = useRef<HTMLVideoElement>( null );
    const [ autoPlay ] = useState<boolean>( () => ! prefersReducedMotion() );
    // Follows the element's own play/pause events, so it stays right when
    // the browser blocks autoplay or a non-looping video ends
    const [ playing, setPlaying ] = useState<boolean>( false );
    // A sibling .webm and .jpg poster are expected next to an .mp4
    const isMP4: boolean = /\.mp4(\?|$)/i.test( url );

    const togglePlayback = (): void => {
        const video = videoRef.current;
        if ( ! video ) {
            return;
        }
        if ( video.paused ) {
            video.play().catch( () => {} );
        } else {
            video.pause();
        }
    };

    return (
        <>
            <video
                aria-label={ label }
                autoPlay={ autoPlay }
                loop={ loop }
                muted
                onPause={ () => setPlaying( false ) }
                onPlay={ () => setPlaying( true ) }
                playsInline
                poster={ isMP4 ? url.replace( /\.mp4(\?|$)/i, '.jpg$1' ) : undefined }
                ref={ videoRef }>
                { isMP4 ? <source src={ url.replace( /\.mp4(\?|$)/i, '.webm$1' ) } type="video/webm" /> : null }
                <source src={ url } type={ isMP4 ? 'video/mp4' : undefined } />
            </video>
            <button
                className={ 'video__toggle' + ( playing ? '' : ' video__toggle--paused' ) }
                onClick={ togglePlayback }
                type="button">
                <span className="screenReader">{ playing ? 'Pause video' : 'Play video' }</span>
            </button>
        </>
    );
};

const Video: React.FC<VideoProps> = ( {
    id = '',
    label = 'Video',
    loop = false,
    url,
    videoDataAttr = {},
    width,
} ): JSX.Element | null => {
    if ( ! url ) {
        return null;
    }
    const type: string = videoType( url );
    // Copied, not written onto the prop
    const figureAttributes: CustomAttributes = { ...videoDataAttr };
    if ( width ) {
        figureAttributes.style = { ...( videoDataAttr.style as CSSProperties | undefined ), maxWidth: width };
    }
    if ( id ) {
        figureAttributes.id = id;
    }

    return (
        <figure className={ 'video ' + type } { ...figureAttributes }>
            <span className="video-wrapper">
                { type === 'streaming' ?
                    <StreamingVideo label={ label } url={ url } />
                : type === 'embed' ?
                    <BackgroundVideo label={ label } loop={ loop } url={ url } />
                : null }
            </span>
        </figure>
    );
};
export default Video;
