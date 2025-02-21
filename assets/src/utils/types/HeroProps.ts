import { BackgroundProps } from '@/utils/types/BackgroundProps';
import { CTASettings } from '@/utils/types/CTASettings';
import { ImageLink } from '@/utils/types/ImageLink';
import { Media } from '@/utils/types/Media';
import { Post } from '@/utils/types/Post';

export interface HeroProps {
    backgroundSettings?: BackgroundProps;
    breadcrumbs?: Post;
    classes?: Array<string>;
    copy?: string;
    ctas?: Array<CTASettings>;
    customHTML?: string | JSX.Element;
    customHTMLAfter?: string | JSX.Element;
    id?: string;
    imageLink?: ImageLink;
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