const arrayUnique = ( array: Array<any> ): Array<any> => {
    return Array.from( new Set( array ) );
};
export default arrayUnique;