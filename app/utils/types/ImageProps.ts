import { CustomAttributes } from '@/utils/types/CustomAttributes';
import { Media } from '@/utils/types/Media';

export interface ImageProps {
    // Used when the media data has no alt text of its own. Omit for a
    // decorative image (one whose meaning is carried by nearby text).
    alt?: string;
    classes?: Array<string>;
    height?: number;
    id?: string;
    // A media field's value. Without one, `url` is used as the source.
    image?: Media;
    imageDataAttr?: CustomAttributes;
    // 'eager' for an image that's likely to be the largest thing above the fold
    loading?: 'lazy' | 'eager';
    mobileImage?: string;
    size?: string;
    url?: string;
    width?: number;
    wrapperDataAttr?: CustomAttributes;
}
