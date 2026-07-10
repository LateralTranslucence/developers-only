const wordCount = ( string: string ): number => {
    return string.split( ' ' ).filter( ( word: string ) => {
         return word != '';
    } ).length;
};
export default wordCount;