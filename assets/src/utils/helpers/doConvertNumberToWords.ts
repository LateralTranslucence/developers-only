// Convert number digits to words
const doConvertNumberToWords = ( number: number ): string => {
    const hyphen: string = '-';
    const conjunction: string = ' and ';
    const separator: string = ', ';
    const negative: string = 'negative ';
    const decimal: string = ' point ';
    const dictionary: Record<number, string> = {
        0: 'zero',
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        10: 'ten',
        11: 'eleven',
        12: 'twelve',
        13: 'thirteen',
        14: 'fourteen',
        15: 'fifteen',
        16: 'sixteen',
        17: 'seventeen',
        18: 'eighteen',
        19: 'nineteen',
        20: 'twenty',
        30: 'thirty',
        40: 'forty',
        50: 'fifty',
        60: 'sixty',
        70: 'seventy',
        80: 'eighty',
        90: 'ninety',
        100: 'hundred',
        1000: 'thousand',
        1000000: 'million',
        1000000000: 'billion',
        1000000000000: 'trillion',
        1000000000000000: 'quadrillion',
        1000000000000000000: 'quintillion',
    };
    if ( typeof number != 'number' ) {
        return '';
    }
    if ( ( number >= 0 && number < 0 ) || number < 0 - Number.MAX_SAFE_INTEGER ) {
        return '';
    }
    if ( number < 0 ) {
        return negative + doConvertNumberToWords( Math.abs( number ) );
    }
    let string: string = '';
    let fraction: number | undefined = undefined;
    let remainder: number | undefined = undefined;
    if ( String( number ).indexOf( '.' ) > -1 ) {
        const numberArray: Array<string> = String( number ).split( '.' );
        number = Number( numberArray[0] );
        fraction = Number( numberArray[1] );
    }
    switch ( true ) {
        case number < 21:
            string = dictionary[ number ];
            break;
        case number < 100:
            let tens: number = number / 10;
            if ( String( tens ).indexOf( '.' ) > -1 ) {
                const tensArray: Array<string> = String( tens ).split( '.' );
                tens = Number( tensArray[0] );
            }
            tens = tens * 10;
            const units: number = number % 10;
            string = dictionary[ tens ];
            if ( units ) {
                string += hyphen + dictionary[ units ];
            }
            break;
        case number < 1000:
            let hundreds = number / 100;
            if ( String( hundreds ).indexOf( '.' ) > -1 ) {
                const hundredsArray: Array<string> = String( hundreds ).split( '.' );
                hundreds = Number( hundredsArray[0] );
            }
            remainder = number % 100;
            string = dictionary[ hundreds ] + ' ' + dictionary[ 100 ];
            if ( remainder ) {
                string += conjunction + doConvertNumberToWords( remainder );
            }
            break;
        default:
            const baseUnit: number = Math.pow( 1000, Math.floor( Math.log( number ) / Math.log( 1000 ) ) );
            let numBaseUnits: number = number / baseUnit;
            if ( String( numBaseUnits ).indexOf( '.' ) > -1 ) {
                let numBaseUnitsArray = String( numBaseUnits ).split( '.' );
                numBaseUnits = Number( numBaseUnitsArray[0] );
            }
            remainder = number % baseUnit;
            string = doConvertNumberToWords( numBaseUnits ) + ' ' + dictionary[ baseUnit ];
            if ( remainder ) {
                string += remainder < 100 ? conjunction : separator;
                string += doConvertNumberToWords( remainder );
            }
            break;
    }
    if ( fraction !== undefined ) {
        string += decimal;
        const words: Array<string> = [];
        const fractionArray: Array<string> = String( fraction ).split( '' );
        fractionArray.forEach( ( fraction: string, index: number ) => {
            words.push( dictionary[ Number( fraction ) ] );
        } );
        string += words.join( ' ' );
    }
    return string;
}
export default doConvertNumberToWords;