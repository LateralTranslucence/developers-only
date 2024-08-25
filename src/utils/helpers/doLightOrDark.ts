import { doGetBrightness } from 'src/utils/helpers';

const doLightOrDark = ( hexColor: string ): string => {
    const brightness: number = doGetBrightness( hexColor );
    return brightness >= 127 ? 'light' : 'dark';
}
export default doLightOrDark;