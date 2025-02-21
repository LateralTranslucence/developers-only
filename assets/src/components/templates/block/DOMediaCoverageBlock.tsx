import React from 'react';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import Image from '@/components/shared/Image';
import { PartialTemplateProps } from '@/utils/types/PartialTemplateProps';

const DOMediaCoverageBlock: React.FC<PartialTemplateProps> = ( {
    index,
    panelSlider,
    perRow,
    post,
    type,
} ): JSX.Element => {
    const mediaLink = post.fields.media_url ? post.fields.media_url : post.permalink;

    return (
        <li className="has-block-link">
            <CTA classes={ [ 'block-link' ] } url={ mediaLink } text={ post.fields.media_title }>
                <Image image={ post.fields.media_image } size="cinema_600" classes={ [ 'block-thumbnail' ] } />
                <div className="block-content-wrapper">
                    <Heading tag="h3" pretitle={ post.post_type_details.post_type_display_name } title={ post.fields.media_title } />
                </div>
            </CTA>
        </li>
    )
}
export default DOMediaCoverageBlock;