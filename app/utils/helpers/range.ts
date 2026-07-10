const range = ( start: number, end: number, step: number = 1 ): Array<number> => {
    const result: Array<number> = [];
    for ( let i: number = start; i <= end; i += step ) {
        result.push( i );
    }
    return result;
};
export default range;