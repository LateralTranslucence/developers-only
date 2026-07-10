const sanitizeTitleWithDashes = ( string: string ): string => {
    if ( string ) {
        return string
            .toLowerCase()
            .replace( /[\s\_]/g, '-' )
            .replace( /[^A-Za-z0-9\-]/g, '' );
    } else {
        return '';
    }
};
export default  sanitizeTitleWithDashes;