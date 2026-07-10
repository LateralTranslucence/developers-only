import { getBrightness } from '@/utils/helpers';

const lightOrDark = ( hexColor: string ): string => {
    const brightness: number = getBrightness( hexColor );
    return brightness >= 127 ? 'light' : 'dark';
};
export default lightOrDark;