const doHexToRGB = ( hex: string ): Array<number> => {
    hex = hex.toLowerCase();
    hex = hex.replace( '#', '' );
    let colorParts: Array<string>;
    if ( hex.length == 3 ) {
        colorParts = [
            hex.substring( 0, 1 ) + hex.substring( 0, 1 ),
            hex.substring( 1, 1 ) + hex.substring( 1, 1 ),
            hex.substring( 2, 1 ) + hex.substring( 2, 1 ),
        ];
    } else {
        colorParts = [ hex.substring( 0, 2 ), hex.substring( 2, 2 ), hex.substring( 4, 2 ) ];
    }
    const map: Record<string, number> = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        a: 10,
        b: 11,
        c: 12,
        d: 13,
        e: 14,
        f: 15,
    };
    const rgb: Array<number> = [];
    colorParts.forEach( ( segment: string, index: number ) => {
        const firstDigit: number = map[ segment[0] ];
        const secondDigit: number = map[ segment[1] ];
        rgb.push( firstDigit * Math.pow( 16, 1 ) + secondDigit * Math.pow( 16, 0 ) );
    } );
    return rgb;
}
export default doHexToRGB;