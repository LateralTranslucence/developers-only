const doLength = ( item: any ): number => {
    // Null or undefined
    if ( item === null || item === undefined ) {
        return 0;
    }
    // Array or String
    else if ( Array.isArray( item ) || typeof item === 'string' ) {
        return item.length;
    }
    // Number
    else if ( typeof item === 'number' ) {
        return item.toString().length;
    }
    // Object
    else if ( typeof item === 'object' ) {
        return Object.keys( item ).length;
    } 
    // Who knows
    else {
        return 0;
    }
}
export default doLength;