import React from 'react';
import { PartialTemplateProps } from 'src/utils/types/PartialTemplateProps';
import Heading from 'src/components/shared/Heading';
import Image from 'src/components/shared/Image';

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