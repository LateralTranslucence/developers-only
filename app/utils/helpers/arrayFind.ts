import { arrayUnique } from '@/utils/helpers';

// Searches an array for a string up to two levels deep
const arrayFind = ( needle: string, haystack: Array<any>, keepGoing: boolean = true, searchKeys: boolean = true ): Array<any> => {
    const keys: Array<any> = [];
    const type: string = Array.isArray( haystack ) ? 'array' : 'object';
    for ( const key in haystack ) {
        const value: any = haystack[ key ];
        if ( typeof value != 'object' ) {
            // Search key
            if ( type === 'object' && searchKeys && ( key.includes( needle ) || key === needle ) ) {
                keys.push( key );
            }
            // Search value
            else if ( value.includes( needle ) || value === needle ) {
                keys.push( type === 'object' ? key : Number( key ) );
            }
        } else if ( keepGoing ) {
            for ( const valueKey in value ) {
                const valueValue: any = value[ valueKey ];
                if ( typeof valueValue != 'object' ) {
                    // Search key
                    if ( 
                        type === 'object' && 
                        searchKeys && 
                        ( valueKey.includes( needle ) || valueKey === needle ) 
                    ) {
                        keys.push( key );
                    }
                    // Search value
                    else if ( ( Array.isArray( valueValue ) && valueValue.includes( needle ) ) || valueValue == needle ) {
                        keys.push( type === 'object' ? key : Number( key ) );
                    }
                } else {
                    for ( const valueValueKey in valueValue ) {
                        const valueValueValue: any = valueValue[ valueValueKey ];
                        if ( typeof valueValueValue != 'object' ) {
                            // Search key
                            if ( 
                                type === 'object' && 
                                searchKeys && 
                                valueValueKey.includes( needle ) 
                            ) {
                                keys.push( key );
                            }
                            // Search value
                            else if ( valueValueValue.includes( needle ) ) {
                                keys.push( type === 'object' ? key : Number( key ) );
                            }
                        }
                    }
                }
            }
        }
    }
    return arrayUnique( keys );
};
export default arrayFind;