export interface Media {
    type: MediaType;
    url?: string;
    alt?: string;
    [ sizeOrColor: string ]: MediaItem | MediaType | string | undefined;
}

export interface MediaItem {
    url: string;
    width: number;
    height: number;
}

export enum MediaType {
    Icon = 'icon',
    Image = 'image',
    PDF = 'pdf',
    URL = 'url',
    Video = 'video',
}