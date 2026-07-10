import { CustomAttributes } from '@/utils/types/CustomAttributes';

export interface VideoProps {
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