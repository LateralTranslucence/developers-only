import React from 'react';
import { MetaFieldKeyMap } from '@/utils/types/MetaFieldKeyMap';
import { PanelProps } from '@/utils/types/PanelProps';
import { VideoProps } from '@/utils/types/VideoProps';
import { doConvertNumberToWords, doLength, doParse } from '@/utils/helpers';
import Heading from '@/components/shared/Heading';
import SliderNav from '@/components/shared/SliderNav';
import Video from '@/components/shared/Video';
import '@/styles/components/videos.scss';

const Videos: React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const videosFieldKeys: MetaFieldKeyMap = {
        videos: panelPrefix + '_videos' + panelSuffix,
        perRow: panelPrefix + '_videos_per_row' + panelSuffix,
        slider: panelPrefix + '_slider' + panelSuffix,
        titleStyle: panelPrefix + '_video_title_style' + panelSuffix,
    };
    const videos: Array<VideoProps> = post.fields[ videosFieldKeys.videos ] ? post.fields[ videosFieldKeys.videos ] : [];
    const perRow = post.fields[ videosFieldKeys.perRow ] ? Number( post.fields[ videosFieldKeys.perRow ] ) : 4;
    const panelSlider = Boolean( post.fields[ videosFieldKeys.slider ] );
    const videoTitleStyle = post.fields[ videosFieldKeys.titleStyle ] ? post.fields[ videosFieldKeys.titleStyle ] : '';

    const VideoDetails: React.FC<{ video: VideoProps }> = ( { video } ): JSX.Element => {
        return (
            <>
            { video.label ?
                <Heading tag="h3" title={ video.label } classes={ videoTitleStyle ? [ 'heading-' + videoTitleStyle ] : [] } />
            : null }
            { video.copy ?
                doParse( video.copy )
            : null }
            </>
        )
    }
    const VideoList: React.FC = (): JSX.Element => {
        return (
            <>
            { videos.map( ( video, index ) => {
                return ( 
                    <li key={ index } { ...( perRow == 1 && video.label && video.copy ? { class: 'has-copy' } : {} ) }>
                        <Video url={ video.url } label={ 'Watch ' + video.label } />
                        { perRow == 1 && video.label && video.copy ?
                            <div className="video-copy-wrapper">
                                <VideoDetails video={ video } />
                            </div>
                        : <VideoDetails video={ video } /> }
                    </li>
                );
            } ) }
            </>
        )
    }

    if ( doLength( videos ) ) {
        return (
            <>
            { panelSlider ?
                <div className="panel-slider-wrapper" uk-slider="finite: true">
                    <ul className={ 'panel-videos blocks ' + ( panelSlider ? 'uk-slider-items ' : '' ) + doConvertNumberToWords( perRow ) }>
                        <VideoList />
                    </ul>
                    <SliderNav length={ doLength( videos ) } />
                </div>
            : <VideoList /> }
            </> 
        )
    } else {
        return null;
    }        
}
export default Videos;