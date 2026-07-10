// Unload a video when it is hidden, load it when visible again
export default class VideosInTabs {
    savedVideos: any = {};
    constructor() {
        const hasVideoElements: HTMLCollection = document.getElementsByClassName( 'has-video' );
        if ( hasVideoElements.length ) {
            [ ...hasVideoElements ].forEach( ( video: Element, index: number ) => {
                this.watchVisibility( video );
            } );
        }
    }

    watchVisibility = ( obj: Element ) => {
        const observer = new MutationObserver(
        () => {
            if ( obj.classList.contains( 'active' ) == false ) {
                const videoPlayer: HTMLCollection = obj.getElementsByClassName( 'video-player' );
                [ ...videoPlayer ].forEach( ( player: Element, index: number ) => {
                    const playerID: string | null = player.getAttribute( 'id' );
                    if ( playerID ) {
                        this.savedVideos[ playerID ] = player.innerHTML;
                    }
                    player.innerHTML = '';
                } );
            } else {
                const videoPlayers: HTMLCollection = obj.getElementsByClassName( 'video-player' );
                [ ...videoPlayers ].forEach( ( videoPlayer: Element, index: number ) => {
                    const playerID: string | null = videoPlayer.getAttribute( 'id' );
                    if ( playerID && this.savedVideos[ playerID ] ) {
                        videoPlayer.innerHTML = this.savedVideos[ playerID ];
                    }
                } );
            }
        } );
        observer.observe( obj, {
            attributes: true,
            childList: true,
            attributeFilter: [ 'style', 'class' ],
        } );
    };
}