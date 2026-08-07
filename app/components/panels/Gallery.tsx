import React, { JSX, useId } from 'react';
import CTAs from '@/components/shared/CTAs';
import MediaLoader from '@/components/shared/MediaLoader';
import Modal from '@/components/shared/Modal';
import { getArrayField } from '@/utils/helpers';
import { PanelProps } from '@/utils/types/PanelProps';
import { CTASettings } from '@/utils/types/CTASettings';
import { Media, MediaItem } from '@/utils/types/Media';
import '@/styles/components/blocks.scss';
import '@/styles/components/gallery.scss';

// Shape produced by the PHP gallery field (DO_Form_Field_API_Display::gallery)
interface GalleryItem {
    title?: string;
    media?: Media;
}

const Gallery: React.FC<PanelProps> = ( {
    post,
    panelPrefix = '',
    panelSuffix = ''
} ): JSX.Element | null => {
    const galleryID = useId();
    const media = getArrayField<GalleryItem>( post.fields, panelPrefix + '_gallery' + panelSuffix );
    const cta = getArrayField<CTASettings>( post.fields, panelPrefix + '_cta' + panelSuffix );

    const openLightbox = ( modalID: string ): void => {
        const dialog = document.getElementById( modalID ) as HTMLDialogElement | null;
        dialog?.showModal();
    };

    if ( media.length > 0 ) {
        return (
            <>
                <ul className="panel-gallery blocks blocks--logos blocks--four">
                    { media.map( ( mediaItem: GalleryItem, index: number ) => {
                        if ( mediaItem.media && Object.keys( mediaItem.media ).length > 0 ) {
                            const modalID = `${ galleryID }-lightbox-${ index }`;
                            const fullImage = ( mediaItem.media.full as MediaItem | undefined )?.url ?? ( mediaItem.media.url as string | undefined ) ?? '';
                            return (
                                <li key={ index }>
                                    <button type="button" className="panel-gallery__trigger" onClick={ () => openLightbox( modalID ) }>
                                        <MediaLoader media={ mediaItem.media } size={ 'square_600' } />
                                        <span className="screenReader">{ mediaItem.title ? mediaItem.title : 'Open image' }</span>
                                    </button>
                                    <Modal id={ modalID } className="gallery-lightbox" heading={ mediaItem.title ? { tag: 'h3', title: mediaItem.title } : undefined }>
                                        <img src={ fullImage } alt={ mediaItem.title ?? '' } />
                                    </Modal>
                                </li>
                            );
                        }
                    } ) }
                </ul>
                { cta.length > 0 ?
                    <CTAs ctas={ cta } />
                : null }
            </>
        );
    } else {
        return null;
    }
};
export default Gallery;
