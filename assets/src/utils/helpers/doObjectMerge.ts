// If the input objects have the same string keys, then the later value for that key will overwrite the previous one
const doObjectMerge = ( obj1: Record<string, any>, obj2: Record<string, any> ): Record<string, any> => {
    const obj: Record<string, any> = obj1;
    for ( let key in obj2 ) {
        obj[ key ] = obj2[ key ];
    }
    return obj;
}
export default doObjectMerge;