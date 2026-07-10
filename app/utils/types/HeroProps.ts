import { ReactNode } from 'react';
import { BackgroundProps } from '@/utils/types/BackgroundProps';
import { CTASettings } from '@/utils/types/CTASettings';
import { ImageLink } from '@/utils/types/ImageLink';
import { Media } from '@/utils/types/Media';

export interface HeroProps {
    backgroundSettings?: BackgroundProps;
    breadcrumbs?: Array<Record<string, any>>;
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
    pretitle?: string;
    publishDate?: string;
    shareBar?: boolean;
    subtitle?: string;
    textColor?: string;
    title?: string;
    url?: string;
}
