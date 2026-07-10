import { CustomAttributes } from '@/utils/types/CustomAttributes';
import { Media } from '@/utils/types/Media';

export interface ImageProps {
    classes?: Array<string>;
    height?: number;
    id?: string;
    image: Media;
    imageDataAttr?: CustomAttributes;
    mobileImage?: string;
    size?: string;
    url?: string;
    width?: number;
    wrapperDataAttr?: CustomAttributes;
}