import React from 'react';
const { useEffect, useState } = wp.element;
import { doVideoType, doVideoEmbedURL } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA';
import 'assets/styles/components/videos.scss';
import { CustomAttributes } from 'src/utils/types/CustomAttributes';
import { Video } from 'src/utils/types/Video';

const Video: React.FC<Video> = ( {
    id = '',
    label = 'Watch',
    loop = false,
    playerNumber = Math.floor( Math.random() * 1000 ),
    timestamp,
    url,
    videoDataAttr = {},
    width,
} ) => {
    const [ videoURL, setVideoURL ] = useState<string | undefined>( undefined );
    useEffect( () => {
        setVideoURL( url );
    }, [ url ] );
    if ( videoURL ) {
        const type: string = doVideoType( videoURL );
        const videoEmbedURL: string = type == 'streaming' ? doVideoEmbedURL( videoURL ) : '';
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
                )
            }
            else if ( type == 'embed' ) {
                const videoAttributes: CustomAttributes = {
                    autoPlay: true,
                    controls: false,
                    muted: true,
                    playsInline: true,
                    poster: poster,
                    loop: true,
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
        }
    
        return (
            <figure className={ 'do-video ' + type } { ...videoDataAttr }>
                <span className="do-video-wrapper">
                    <VideoElement />
                </span>
            </figure>
        )
    }
    else {
        return null;
    }
}
export default Video;