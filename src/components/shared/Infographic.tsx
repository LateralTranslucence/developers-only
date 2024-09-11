import React from 'react';
import CTA from 'src/components/shared/CTA';
import Image from 'src/components/shared/Image';
import 'assets/styles/components/infographic.scss';
import { Media } from 'src/utils/types/Media';
import { Post } from 'src/utils/types/Post';

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