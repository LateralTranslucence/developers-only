import React from 'react';
import CTA from '@/components/shared/CTA';
import Image from '@/components/shared/Image';
import '@/styles/components/infographic.scss';
import { Media } from '@/utils/types/Media';
import { Post } from '@/utils/types/Post';

const Infographic: React.FC<{ post: Post; }> = ( { post } ) => {
    const image: Media = post.fields.story_infographic.image;
    const pdf: string = post.fields.story_infographic.pdf.url;
    return (
        <CTA url={ pdf } modal={ true } modalClass="modal-infographic" classes={ [ 'infographic' ] }>
            <Image image={ image } size="cinema_1000" />
        </CTA>
    )
}
export default Infographic;