import { hexToRGB } from '@/utils/helpers';

const getBrightness = ( hexColor: string ): number => {
    const rgbColor: Array<number> = hexToRGB( hexColor );
    return 0.2126 * rgbColor[0] + 0.7152 * rgbColor[1] + 0.0722 * rgbColor[2]; // per ITU-R BT.709
};
export default getBrightness;