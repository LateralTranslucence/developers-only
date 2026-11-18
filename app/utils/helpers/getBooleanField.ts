// Fields without an API-display method come back as the stored string, and
// "0" is truthy in JS, so the strings "0" and "false" read as false here
const getBooleanField = ( fields: Record<string, unknown>, key: string ): boolean => {
    const value = fields[ key ];
    if ( typeof value === 'string' ) {
        const trimmed = value.trim().toLowerCase();
        return trimmed !== '' && trimmed !== '0' && trimmed !== 'false';
    }
    return Boolean( value );
};
export default getBooleanField;
