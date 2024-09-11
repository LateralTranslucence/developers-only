import { BackgroundProps } from 'src/utils/types/BackgroundProps';
import { CTASettings } from 'src/utils/types/CTASettings';
import { ImageLink } from 'src/utils/types/ImageLink';
import { Media } from 'src/utils/types/Media';
import { Post } from 'src/utils/types/Post';

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