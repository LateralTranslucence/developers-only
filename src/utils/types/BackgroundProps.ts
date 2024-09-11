import { Media } from 'src/utils/types/Media';

export interface BackgroundProps {
    animated?: boolean;
    avatar?: boolean;
    color?: string;
    loop?: boolean;
    media?: Media;
    overlay?: boolean;
    parallax?: string;
    videoTranscript?: string;
}