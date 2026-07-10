import { Media } from '@/utils/types/Media';

const getMediaField = ( fields: Record<string, unknown>, key: string ): Media => {
    const value = fields[ key ];
    return value && typeof value === 'object' && ! Array.isArray( value ) ? value as Media : {} as Media;
};
export default getMediaField;
