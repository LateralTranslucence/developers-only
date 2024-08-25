import { doHexToRGB } from 'src/utils/helpers';

const doGetBrightness = ( hexColor: string ): number => {
    const rgbColor: Array<number> = doHexToRGB( hexColor );
    return 0.2126 * rgbColor[0] + 0.7152 * rgbColor[1] + 0.0722 * rgbColor[2]; // per ITU-R BT.709
}
export default doGetBrightness;