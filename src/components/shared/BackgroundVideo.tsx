import React from 'react';
import BackgroundVideoControls from 'src/components/shared/BackgroundVideoControls';
import BackgroundSettings from 'src/utils/types/BackgroundSettings';
import 'assets/styles/components/background-videos.scss';
import CustomAttributes from 'src/utils/types/CustomAttributes';

interface BackgroundVideoProps extends BackgroundSettings {
    id: string;
}
const BackgroundVideo: React.FC<BackgroundVideoProps> = ( { animated, avatar, color, id } ) => {  
    if ( avatar && animated && color ) {
        const media: string = templateDirectory + '/images/avatar/avatar-' + color + '.mp4';
        const jpg: string = media.replace( '.mp4', '.jpg' );
        const webm: string = media.replace( '.mp4', '.webm' );
        const videoAttributes: CustomAttributes = {
            autoPlay: true,
            controls: false,
            muted: true,
            playsInline: true,
            id: id,
            poster: jpg,
            loop: true,
        };
        return (
            <>
            <div className="background-video-wrapper has-avatar">
                <video { ...videoAttributes }>
                    <source src={ webm } type="video/webm" />
                    <source src={ media } type="video/mp4" />
                </video>
            </div>
            <BackgroundVideoControls videoID={ id } />
            </>
        );
    } else {
        return null;
    }
}
export default BackgroundVideo;