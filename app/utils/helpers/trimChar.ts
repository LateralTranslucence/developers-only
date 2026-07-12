// Trim character from beginning and end of string - like php trim($str,char)
const trimChar = ( str: string = '', chars: string = '' ): string => {
    const charArray: Array<string> = chars.split( '' );
    charArray.forEach(  ( char: string ) => {
        if ( str.charAt(0) == char ) {
            str = str.slice(1);
        }
        if ( str.charAt( str.length - 1 ) == char ) {
            str = str.substring( 0, str.length - 1 );
        }
    } );
    return str;
};
export default trimChar;