import { trimChar } from '@/utils/helpers'
;
// Should be kept in sync with devo_meta_field_key in function.helpers
const metaFieldKey = ( fieldLabel: string, metaPrefix: string = '' ): string => {
    fieldLabel = fieldLabel.replace( /[<>]/, '' );
    let metaFieldKey: string = ( metaPrefix.length ? metaPrefix + '_' : '' ) + trimChar( fieldLabel.replace( /[-()]/, '' ).replace( /[^\w\d_]/, '_' ).toLowerCase(), '_' );
    metaFieldKey = metaFieldKey.replace( '__', '_' ).replace( '__', '_' );
    
    return metaFieldKey;
};
export default metaFieldKey;