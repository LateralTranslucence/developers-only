export interface Media {
    type: MediaType;
    [ sizeOrColor: string ]: MediaItem | MediaType;
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