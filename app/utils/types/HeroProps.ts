import { ReactNode } from 'react';
import { BackgroundProps } from '@/utils/types/BackgroundProps';
import { Breadcrumbs } from '@/utils/types/Breadcrumbs';
import { CTASettings } from '@/utils/types/CTASettings';
import { ImageLink } from '@/utils/types/ImageLink';
import { Media } from '@/utils/types/Media';

export interface HeroProps {
    backgroundSettings?: BackgroundProps;
    breadcrumbs?: Array<Breadcrumbs>;
    classes?: Array<string>;
    copy?: string;
    ctas?: Array<CTASettings>;
    customHTML?: ReactNode;
    customHTMLAfter?: ReactNode;
    id?: string;
    imageLink?: ImageLink;
    logo?: Media;
    media?: Media;
    mediaLoop?: boolean;
    // Colour + optional media from the post's Background field.
    background?: BackgroundProps;
    pretitle?: string;
    publishDate?: string;
    subtitle?: string;
    textColor?: string;
    title?: string;
    url?: string;
}
