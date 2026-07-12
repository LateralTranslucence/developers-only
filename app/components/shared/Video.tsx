import React, { JSX } from 'react';
import { useEffect, useState } from 'react';
import { CustomAttributes } from '@/utils/types/CustomAttributes';
import { VideoProps } from '@/utils/types/VideoProps';
import { videoType, videoEmbedURL as getVideoEmbedURL } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import '@/styles/components/videos.scss';

const Video: React.FC<VideoProps> = ( {
    id = '',
    label = 'Watch',
    loop = false,
    url,
    videoDataAttr = {},
    width,
} ) => {
    const [ videoURL, setVideoURL ] = useState<string | undefined>( undefined );
    useEffect( () => {
        setVideoURL( url );
    }, [ url ] );
    if ( videoURL ) {
        const type: string = videoType( videoURL );
        const videoEmbedURL: string = type == 'streaming' ? getVideoEmbedURL( videoURL ) : '';
        const webmFile: string = videoURL.replace( '.mp4', '.webm' );
        const webm: string = type == 'embed' && webmFile.length ? webmFile : '';
        const posterFile: string = videoURL.replace( '.mp4', '.jpg' );
        const poster: string = type == 'embed' && posterFile.length ? posterFile : '';
        if ( width ) {
            videoDataAttr.style = { 'max-width': width };
        }
        if ( id ) {
            videoDataAttr.id = id;
        }
        
        const VideoElement: React.FC = (): JSX.Element | null => {
            if ( type == 'streaming' ) {
                return (
                    <iframe src={ videoEmbedURL } allowFullScreen>
                        <CTA url={ videoEmbedURL } target="_blank" text={ label }>{ label }</CTA>
                    </iframe>
                );
            }
            else if ( type == 'embed' ) {
                const videoAttributes: CustomAttributes = {
                    autoPlay: true,
                    controls: false,
                    muted: true,
                    playsInline: true,
                    poster: poster,
                    loop: loop,
                };
                return (
                    <video { ...videoAttributes }>
                        <source src={ webm } type="video/webm" />
                        <source src={ videoURL } type="video/mp4" />
                    </video>
                );
            } else {
                return null;
            }
        };
    
        return (
            <figure className={ 'video ' + type } { ...videoDataAttr }>
                <span className="video-wrapper">
                    <VideoElement />
                </span>
            </figure>
        );
    }
    else {
        return null;
    }
};
export default Video;