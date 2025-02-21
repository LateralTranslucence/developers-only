import { ReactNode } from 'react';
import { URLObject } from '@/utils/types/URLObject';
import { CustomAttributes } from '@/utils/types/CustomAttributes';

export interface CTASettings {
    buttonStyle?: string;
    children?: ReactNode;
    classes?: Array<string>;
    customAttributes?: CustomAttributes;
    id?: string;
    iframeName?: string;
    modal?: boolean;
    modalClass?: string;
    onClick?: (e: any) => void;
    target?: string;
    text?: string;
    uk?: boolean;
    url?: string | URLObject;
}