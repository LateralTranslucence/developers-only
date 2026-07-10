import { Media } from '@/utils/types/Media';

export interface BackgroundProps {
    animated?: boolean;
    avatar?: boolean;
    color?: string;
    effect?: string;
    loop?: boolean;
    media?: Media;
    overlay?: boolean;
    parallax?: string;
    videoTranscript?: string;
}