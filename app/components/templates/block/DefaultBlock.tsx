import React, { JSX } from 'react';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import Image from '@/components/shared/Image';
import { PartialTemplateProps } from '@/utils/types/PartialTemplateProps';
import { getPostTitle } from '@/utils/helpers';

const DefaultBlock: React.FC<PartialTemplateProps> = ( {
    post,
} ): JSX.Element => {
    const title: string = getPostTitle( post );
    return (
        <li className=" --has-link">
            <CTA classes={ [ 'blocks__link' ] } url={ post.permalink } text={ title }>
                <Image image={ post.post_thumbnail } size="square_600" classes={ [ 'blocks__thumbnail' ] } />
                <div className="blocks__content">
                    <Heading tag="h3" title={ title } />
                    { post.post_type_details?.post_type_display_name ?
                        <span className="blocks__post-type">{ post.post_type_details.post_type_display_name }</span>
                    : null }
                    { post.post_date?.formatted ?
                        <span className="blocks__date">{ post.post_date.formatted }</span>
                    : null }
                </div>
            </CTA>
        </li>
    );
};
export default DefaultBlock;