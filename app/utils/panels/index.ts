import { CTASettings } from '@/utils/types/CTASettings';
import { BlockItem, BlocksPanelConfig, PanelTab, SearchPanelConfig, TabsPanelConfig } from '@/utils/types/Panels';

type FieldBag = Record<string, unknown>;

const getString = ( fields: FieldBag, key: string, fallback: string = '' ): string => {
    const value = fields[ key ];
    return typeof value === 'string' ? value : fallback;
};

const getBoolean = ( fields: FieldBag, key: string ): boolean => Boolean( fields[ key ] );

const getArray = <T>( fields: FieldBag, key: string ): Array<T> => {
    const value = fields[ key ];
    return Array.isArray( value ) ? value as Array<T> : [];
};

export const getSearchPanelConfig = ( fields: FieldBag, prefix: string, suffix: string ): SearchPanelConfig => ( {
    heading: getString( fields, `${prefix}_search_heading${suffix}` ),
    modal: getBoolean( fields, `${prefix}_modal${suffix}` ),
} );

export const getBlocksPanelConfig = ( fields: FieldBag, prefix: string, suffix: string ): BlocksPanelConfig => ( {
    blocks: getArray<BlockItem>( fields, `${prefix}_blocks${suffix}` ),
    ctas: getArray<CTASettings>( fields, `${prefix}_ctas${suffix}` ),
    perRow: Number( fields[ `${prefix}_blocks_per_row${suffix}` ] ) || 3,
    color: getString( fields, `${prefix}_block_color${suffix}` ) || 'multi',
} );

export const getTabsPanelConfig = ( fields: FieldBag, prefix: string, suffix: string ): TabsPanelConfig => ( {
    tabs: getArray<PanelTab>( fields, `${prefix}_tabs${suffix}` ),
    mediaSize: getString( fields, `${prefix}_media_size${suffix}` ),
} );