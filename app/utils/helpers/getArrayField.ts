const getArrayField = <T,>( fields: Record<string, unknown>, key: string ): Array<T> => {
    const value = fields[ key ];
    return Array.isArray( value ) ? value as Array<T> : [];
};
export default getArrayField;
