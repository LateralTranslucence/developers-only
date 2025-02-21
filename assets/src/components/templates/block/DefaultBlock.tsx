import React from 'react';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import Image from '@/components/shared/Image';
import { PartialTemplateProps } from '@/utils/types/PartialTemplateProps';

const DefaultBlock: React.FC<PartialTemplateProps> = ( {
    index,
    panelSlider,
    perRow,
    post,
    type,
} ): JSX.Element => {
    return (
        <li className="has-block-link">
            <CTA classes={ [ 'block-link' ] } url={ post.permalink } text={ post.post_title }>
                <Image image={ post.post_thumbnail } size="cinema_600" classes={ [ 'block-thumbnail' ] } />
                <div className="block-content-wrapper">
                    <Heading tag="h3" pretitle={ post.post_type_details.post_type_display_name } title={ post.post_title } />
                </div>
            </CTA>
        </li>
    );
}
export default DefaultBlock;