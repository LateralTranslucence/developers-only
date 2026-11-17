import { MouseEvent, ReactNode } from 'react';
import { URLObject } from '@/utils/types/URLObject';
import { CustomAttributes } from '@/utils/types/CustomAttributes';

export interface CTASettings {
    button_style?: string;
    children?: ReactNode;
    className?: string;
    // An array, or a space-separated string (as from a <cta classes="..."> tag)
    classes?: Array<string> | string;
    customAttributes?: CustomAttributes;
    id?: string;
    // true, or a string flag such as "true" / "1" ("false" is false)
    modal?: boolean | string;
    modal_class?: string;
    onClick?: ( e: MouseEvent ) => void;
    target?: string;
    text?: string;
    url?: string | URLObject;
}
