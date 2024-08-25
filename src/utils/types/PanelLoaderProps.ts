import { CustomAttributes } from 'src/utils/types/CustomAttributes';

export interface PanelLoaderProps {
    data: Record<string, any>;
    name?: string;
    pageCSS?: string;
    pageID: string;
    panelID: string;
    panelNumber: number;
    panelPrefix: string;
    panelSuffix: string;
    parallaxMediaEffect?: CustomAttributes;
}