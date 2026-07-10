const getStringField = ( fields: Record<string, unknown>, key: string, fallback: string = '' ): string => {
    const value = fields[ key ];
    return typeof value === 'string' ? value : fallback;
};
export default getStringField;
