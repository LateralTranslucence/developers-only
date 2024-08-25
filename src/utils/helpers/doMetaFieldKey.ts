import { doTrimChar } from 'src/utils/helpers'
;
// Should be kept in sync with do_meta_field_key in function.helpers
const doMetaFieldKey = ( fieldLabel: string, metaPrefix: string = '' ): string => {
    fieldLabel = fieldLabel.replace( /[<>]/, '' );
    let metaFieldKey: string = ( metaPrefix.length ? metaPrefix + '_' : '' ) + doTrimChar( fieldLabel.replace( /[-\(\)]/, '' ).replace( /[^\w\d_]/, '_' ).toLowerCase(), '_' );
    metaFieldKey = metaFieldKey.replace( '__', '_' ).replace( '__', '_' );
    
    return metaFieldKey;
}
export default doMetaFieldKey;