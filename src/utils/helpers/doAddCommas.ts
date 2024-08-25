const doAddCommas = ( number: number ): string => {
    // convert to string for regex processing
    const stringNumber: string = number.toString();
    // add thousands separator
    const x: Array<string> = stringNumber.split( '.' );
    let x1: string = x[0];
    const x2: string = x.length > 1 ? '.' + x[1] : '';
    const rgx: RegExp = /(\d+)(\d{3})/;
    while ( rgx.test( x1 ) ) {
        x1 = x1.replace( rgx, '$1' + ',' + '$2' );
    }
    const result: string = x1 + x2;
    return result;
}
export default doAddCommas;