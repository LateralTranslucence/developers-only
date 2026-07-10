// Returns 'even' or 'odd' for the given number
const evenOdd = ( i: number ): string => {
    if ( i % 2 ) {
        return 'odd';
    } else {
        return 'even';
    }
};
export default evenOdd;