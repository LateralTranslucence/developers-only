import React from 'react';
import { doConvertNumberToWords, doLength, doParse } from 'src/utils/helpers';
import Heading from 'src/components/shared/Heading';
import SliderNav from 'src/components/shared/SliderNav';
import Video from 'src/components/shared/Video';
import 'assets/styles/components/videos.scss';
import { PanelLoaderProps } from 'src/utils/types/PanelLoaderProps';
import { MetaFieldKeyMap } from 'src/utils/types/MetaFieldKeyMap';
import { Video as VideoType } from 'src/utils/types/Video';

const Videos: React.FC<PanelLoaderProps> = ( { 
    data, 
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
    const videos: Array<VideoType> = data.fields[ videosFieldKeys.videos ] ? data.fields[ videosFieldKeys.videos ] : [];
    const perRow = data.fields[ videosFieldKeys.perRow ] ? Number( data.fields[ videosFieldKeys.perRow ] ) : 4;
    const panelSlider = Boolean( data.fields[ videosFieldKeys.slider ] );
    const videoTitleStyle = data.fields[ videosFieldKeys.titleStyle ] ? data.fields[ videosFieldKeys.titleStyle ] : '';

    const VideoDetails: React.FC<{ video: VideoType }> = ( { video } ): JSX.Element => {
        return (
            <>
            { video.label ?
                <Heading tag="h3" title={ video.label } classes={ videoTitleStyle ? 'heading-' + videoTitleStyle : '' } />
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