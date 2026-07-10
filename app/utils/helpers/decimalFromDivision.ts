// Returns only the decimal value that results from division
const decimalFromDivision = ( numerator: number = 1, denominator: number = 1 ): number => {
    const divide: number =  Number.isInteger( denominator ) && denominator ? numerator / denominator : 1;
    const decimals: number = divide - Math.floor( divide );
    return decimals;
};
export default decimalFromDivision;