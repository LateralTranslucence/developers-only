const getObjectField = <T = Record<string, unknown>>( fields: Record<string, unknown>, key: string ): T => {
    const value = fields[ key ];
    return ( value && typeof value === 'object' && ! Array.isArray( value ) ? value : {} ) as T;
};
export default getObjectField;
