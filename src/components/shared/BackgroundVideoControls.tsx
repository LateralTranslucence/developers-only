import React from 'react';
const { useEffect, useState } = wp.element;

const BackgroundVideoControls: React.FC<{ videoID: string }> = ( { videoID } ) => {
    const [ video, setVideo ] = useState<HTMLVideoElement | null>( null );
    useEffect( () => {
        setVideo( videoID ? document.getElementById( videoID ) as HTMLVideoElement : null );
    }, [] );
    if ( video ) {
        const controlsID: string = 'do-controls-' + videoID;
        video.removeAttribute( 'controls' );
        
        // Add event listeners
        //video.addEventListener( 'ended', onended );

        const playPauseOnclick = ( e: Event ): void => {
            const playPauseButton: HTMLElement = e.target as HTMLElement;
            if ( video.paused ) {
                video.play();
                playPauseButton.classList.remove( 'play' );
                playPauseButton.classList.add( 'pause' );
                playPauseButton.innerHTML = '<span>Pause</span>';
            } else {
                video.pause();
                playPauseButton.classList.remove( 'pause' );
                playPauseButton.classList.add( 'play' );
                playPauseButton.innerHTML = '<span>Play</span>';
            }
        }
        
        const rewindOnclick = ( e: Event ): void => {
            video.currentTime -= 3;
        }

        const forwardOnclick = ( e: Event ): void => {
            video.currentTime += 3;
        }

        // const onended = ( e ) => {
        //     const playPauseButton = '';
        //     playPauseButton.classList.remove( 'pause' );
        //     playPauseButton.classList.add( 'play' );
        //     playPauseButton.innerHTML = '<span>Play</span>';
        // }

        return ( 
            <div className="do-controls-wrapper" id={ controlsID + '-wrapper' }>
                <button className="do-control rewind" id={ controlsID + '-rewind' } onClick={ ( e ) => rewindOnclick }>
                    <span>Rewind</span>
                </button>
                <button className="do-control pause" id={ controlsID + '-playpause' } onClick={ ( e ) => playPauseOnclick }>
                    <span>Pause</span>
                </button>
                <button className="do-control forward" id={ controlsID + '-forward' } onClick={ ( e ) => forwardOnclick }>
                    <span>Forward</span>
                </button>
            </div>
        );
    }
    else {
        return null;
    }
}
export default BackgroundVideoControls;