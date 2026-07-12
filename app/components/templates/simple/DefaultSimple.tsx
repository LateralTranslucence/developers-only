import React, { JSX } from 'react';
import { PartialTemplateProps } from '@/utils/types/PartialTemplateProps';
import { getMediaField, metaFieldKey } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import Image from '@/components/shared/Image';
import { CTASettings } from '@/utils/types/CTASettings';
import { Media } from '@/utils/types/Media';

const DefaultSimple: React.FC<PartialTemplateProps> = ( {
    index,
    post,
    showFeatured = false,
} ): JSX.Element => {
    const image: Media = post.post_type_details.post_thumbnail ? getMediaField( post.fields, metaFieldKey( post.post_type_details.post_thumbnail, post.post_type_details.meta_prefix ) ) : {} as Media;

    // CTA settings
    const ctaSettings: CTASettings = {
        url: post.permalink,
        text: post.post_title,
        classes: [ 'blocks__link' ],
    };

    return (
        <li key={ index } className={ ' --has-link' + ( showFeatured && post.is_featured ? ' featured' : '' ) }>
            <CTA { ...ctaSettings }>
                <Image image={ image } size="square_600" />
                <Heading tag="h3" title={ post.post_title } />
            </CTA>
        </li>
    );
};
export default DefaultSimple;