import { CustomAttributes } from 'src/utils/types/CustomAttributes';
import { Media } from 'src/utils/types/Media';

export interface ImageProps {
    classes?: Array<string>;
    fullWidthSVG?: boolean;
    height?: number;
    id?: string;
    image: Media;
    imageDataAttr?: CustomAttributes;
    mobileImage?: string;
    overlay?: boolean;
    size?: string;
    url?: string;
    width?: number;
    wrapperDataAttr?: CustomAttributes;
}