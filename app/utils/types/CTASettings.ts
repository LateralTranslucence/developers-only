import { MouseEvent, ReactNode } from 'react';
import { URLObject } from '@/utils/types/URLObject';
import { CustomAttributes } from '@/utils/types/CustomAttributes';

export interface CTASettings {
    button_style?: string;
    children?: ReactNode;
    className?: string;
    classes?: Array<string>;
    customAttributes?: CustomAttributes;
    id?: string;
    iframeName?: string;
    modal?: boolean;
    modal_class?: string;
    onClick?: ( e: MouseEvent ) => void;
    target?: string;
    text?: string;
    url?: string | URLObject;
}