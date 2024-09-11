import React from 'react';
import { PartialTemplateProps } from 'src/utils/types/PartialTemplateProps';
import { doMetaFieldKey } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA';
import Heading from 'src/components/shared/Heading';
import Image from 'src/components/shared/Image';
import { CTASettings } from 'src/utils/types/CTASettings';

const DefaultSimple: React.FC<PartialTemplateProps> = ( {
    index,
    panelSlider,
    perRow,
    post,
    type,
} ): JSX.Element => {
    const image = post.post_type_details.post_thumbnail ? post.fields[ doMetaFieldKey( post.post_type_details.post_thumbnail, post.post_type_details.meta_prefix ) ] : [];

    // CTA settings
    const ctaSettings: CTASettings = {
        url: post.permalink,
        title: post.post_title,
        classes: [ 'block-link' ],
    }

    return (
        <li key={ index }>
            <CTA { ...ctaSettings }>
                <Image image={ image } size="cinema_600" />
                <Heading tag="h3" title={ post.post_title } />
            </CTA>
        </li>
    )
}
export default DefaultSimple;