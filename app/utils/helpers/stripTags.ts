const stripTags = ( string: string ): string => {
    return string.replace(/(<([^>]+)>)/gi, '');
};
export default stripTags;