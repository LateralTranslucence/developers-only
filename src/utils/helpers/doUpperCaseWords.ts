import { doUpperFirst } from 'src/utils/helpers';

const doUpperCaseWords = ( string: string ): string => {
    const words: Array<string> = string.split( ' ' );
    const ucWords: Array<string> = [];
    words.forEach( ( word, index ) => {
        ucWords.push( doUpperFirst( word ) );
    } );
    return ucWords.join( ' ' );
}
export default doUpperCaseWords;