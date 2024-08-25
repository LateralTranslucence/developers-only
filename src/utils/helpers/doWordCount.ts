const doWordCount = ( string: string ): number => {
    return string.split( ' ' ).filter( ( word: string ) => {
         return word != ''
    } ).length;
}
export default doWordCount;