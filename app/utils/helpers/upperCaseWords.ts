import { upperFirst } from '@/utils/helpers';

const upperCaseWords = ( string: string ): string => {
    const words: Array<string> = string.split( ' ' );
    const ucWords: Array<string> = [];
    words.forEach( ( word ) => {
        ucWords.push( upperFirst( word ) );
    } );
    return ucWords.join( ' ' );
};
export default upperCaseWords;