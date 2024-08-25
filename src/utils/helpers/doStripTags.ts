const doStripTags = ( string: string ): string => {
    return string.replace(/(<([^>]+)>)/gi, '');
}
export default doStripTags;