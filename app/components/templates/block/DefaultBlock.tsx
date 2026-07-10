import React, { JSX } from 'react';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import Image from '@/components/shared/Image';
import { PartialTemplateProps } from '@/utils/types/PartialTemplateProps';

const DefaultBlock: React.FC<PartialTemplateProps> = ( {
    index,
    panelSlider,
    perRow,
    post,
    showFeatured = false,
    type,
} ): JSX.Element => {
    return (
        <li className="blocks__item blocks__item--has-link">
            <CTA classes={ [ 'blocks__link' ] } url={ post.permalink } text={ post.post_title }>
                <Image image={ post.post_thumbnail } size="square_600" classes={ [ 'blocks__thumbnail' ] } />
                <div className="blocks__content">
                    <Heading tag="h3" title={ post.post_title } />
                    <span className="type">{post.post_type_details.post_type_display_name}</span>
                    <span className="date">{post.post_date.formatted}</span>
                </div>
            </CTA>
        </li>
    );
};
export default DefaultBlock;