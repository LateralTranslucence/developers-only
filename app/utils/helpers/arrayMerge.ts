import { arrayUnique } from '@/utils/helpers';

const arrayMerge = ( ...arrays: Array<any> ): Array<any> => {
    const flatArray: Array<any> = arrays.flat();
    return arrayUnique( flatArray );
};
export default arrayMerge;