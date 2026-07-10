const getBooleanField = ( fields: Record<string, unknown>, key: string ): boolean => {
    return Boolean( fields[ key ] );
};
export default getBooleanField;
