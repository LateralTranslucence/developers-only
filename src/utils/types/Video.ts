import { CustomAttributes } from 'src/utils/types/CustomAttributes';

export interface Video {
    copy?: string;
    id?: string;
    label?: string;
    loop?: boolean;
    playerNumber?: number;
    timestamp?: string;
    url: string;
    videoDataAttr?: CustomAttributes;
    width?: string;
}