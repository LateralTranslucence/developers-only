const getNumberField = ( fields: Record<string, unknown>, key: string, fallback: number = 0 ): number => {
    const value = fields[ key ];
    const numberValue = typeof value === 'number' ? value : Number( value );
    return Number.isFinite( numberValue ) ? numberValue : fallback;
};
export default getNumberField;
