import React from 'react';
import { PartialTemplateProps } from '@/utils/types/PartialTemplateProps';
import Heading from '@/components/shared/Heading';
import Image from '@/components/shared/Image';

const DOCompanySimple: React.FC<PartialTemplateProps> = ( {
    index,
    panelSlider,
    perRow,
    post,
    type,
} ): JSX.Element => {
    const image = post.fields[ post.post_type_details.meta_prefix + '_logo' ];

    return (
        <li key={ index }>
            <Image image={ image } size="logo" />
            <Heading tag="h3" title={ post.post_title } classes={ [ 'screen-reader-text' ] } />
        </li>
    );
}
export default DOCompanySimple;