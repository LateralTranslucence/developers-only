import { BackgroundProps } from '@/utils/types/BackgroundProps';

const getBackgroundField = ( fields: Record<string, unknown>, key: string ): BackgroundProps => {
    const value = fields[ key ];
    return value && typeof value === 'object' && ! Array.isArray( value ) ? value as BackgroundProps : {};
};
export default getBackgroundField;
