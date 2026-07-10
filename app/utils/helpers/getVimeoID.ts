/**
 * Extracts the vimeo id from a vimeo url.
 * Returns false if the url is not recognized as a vimeo url.
 * Regex from https://stackoverflow.com/questions/10488943/easy-way-to-get-vimeo-id-from-a-vimeo-url/34027757#answer-50651372
 */
const getVimeoID = ( url: string ): string => {
    if ( url.indexOf( 'vimeo' ) > -1 ) {
        const matches: RegExpMatchArray | null = url.match( /[\d]+/ );
        if ( matches && matches[0] ) {
            return matches[0];
        }
    }
    return '';
};
export default getVimeoID;