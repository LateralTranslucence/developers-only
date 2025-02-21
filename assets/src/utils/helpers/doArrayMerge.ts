import { doArrayUnique } from '@/utils/helpers';

const doArrayMerge = ( ...arrays: Array<any> ): Array<any> => {
    const flatArray: Array<any> = arrays.flat();
    return doArrayUnique( flatArray );
}
export default doArrayMerge;