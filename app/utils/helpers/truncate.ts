import { arrayFind, arrayMerge } from '@/utils/helpers';

// Truncates text at the end of a sentence if possible (or always if threshold == false )
const truncate = ( text: string = '', settings: Record<string, any> ): string => {
    if ( ! text.length ) {
        return '';
    }
    const indicator: string = settings.indicator || '';
    const indicatorHTML: string = indicator.length ? `<span class="truncated-indicator">${ indicator }</span>` : '';
    const count: number = settings.count ? settings.count : 25;
    const countType: string = settings.countType ? settings.countType : 'words';
    const threshold: number =  settings.threshold ? settings.threshold : 5;
    const splitter: string = countType == 'words' ? ' ' : '';
    const items: Array<string> = text.split( splitter );
    let truncatedText: string = text;
    if ( items.length > count ) {
        truncatedText = items.slice( 0, count ).join( splitter ) + indicatorHTML;
        const minThreshold: number = threshold && count - threshold > 0 ? count - threshold : 0;
        const maxThreshold: number = threshold && count + threshold < items.length ? count + threshold : items.length;
        const periods: Array<string> = arrayFind( '.', items );
        const exclamationPoints: Array<string> = arrayFind( '!', items );
        const questionMarks: Array<string> = arrayFind( '?', items );
        const punctuation: Array<number> = arrayMerge( periods, exclamationPoints, questionMarks );
        punctuation.sort( function( a: any, b: any ) { return a - b; } );
        punctuation.forEach( ( location: number, index: number ) => {
            // If the sentence end is within the min & max threshold, we're done
            if ( location >= minThreshold && location <= maxThreshold ) {
                truncatedText = items.slice( 0, location + 1 ).join( splitter ) + indicatorHTML;
                return;
            } 
            // If the sentence end is below the min threshold, hang onto it in case we need to return it
            else if ( location < minThreshold ) {
                truncatedText = items.slice( 0, location + 1 ).join( splitter ) + indicatorHTML;
            }
        } );
    }
    return truncatedText;
};
export default truncate;