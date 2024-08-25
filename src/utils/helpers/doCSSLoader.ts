import { doLength } from 'src/utils/helpers';

// Inserts css file into <head>
const doCSSLoader = ( cssFile:string ): void => {
    const existingPageCSS: HTMLElement | null = document.getElementById( 'pageCSS' );
    if ( existingPageCSS ) {
        existingPageCSS.remove();
    }
    if ( doLength( cssFile ) ) {
        const head: HTMLElement | null = document.getElementsByTagName( 'head' )[0];
        const link: HTMLElement = document.createElement( 'link' );
        link.setAttribute( 'rel', 'stylesheet' );
        link.setAttribute( 'href', templateDirectory + 'assets/styles/landing-pages/css/' + cssFile + '.css' );
        link.setAttribute( 'type', 'text/css' );
        link.setAttribute( 'media', 'all' );
        link.setAttribute( 'id', 'pageCSS' );
        head.appendChild( link );
    }
}
export default doCSSLoader;