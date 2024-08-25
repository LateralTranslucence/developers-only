const { useEffect, useState } = wp.element;
import { getPost } from 'src/utils/api.js';
import { doLength, doParse, doSanitizeTitleWithDashes } from 'src/utils/helpers.js';
import CTA from 'src/components/shared/CTA.js';
import Heading from 'src/components/shared/Heading.js';
import Image from 'src/components/shared/Image.js';
import Modal from 'src/components/shared/Modal.js';

export default function DOStaffBioBlock( props ) {
    const [ post, setPost ] = useState( [] );
    useEffect( () => {
        if ( doLength( props.post.staff ) ) {
            async function fetchData() {
                await getPost( 'staff', props.post.staff ).then( ( data ) => {
                    setPost( data.json[0] );
                } )
            }
            fetchData();
        } else {
            setPost( props.post )
        }
    }, [] );

    if ( doLength( post ) ) {
        const staff = Boolean( doLength( props.post.staff ) );
        const bioFirstName = post.fields && post.fields.staff_first_name ? post.fields.staff_first_name : ( post.name ? post.name : '' );
        const bioLastName = post.fields && post.fields.staff_last_name ? post.fields.staff_last_name : '';
        const bioPosition = post.fields && post.fields.staff_position ? post.fields.staff_position : ( post.position ? post.position : '' );
        const bioImage = post.fields && post.fields.staff_image ? post.fields.staff_image : ( post.image ? post.image : {} );
        const bioLinkedIn = post.fields && post.fields.staff_linkedin ? post.fields.staff_linkedin : ( post.linkedin ? post.linkedin : '' );
        const bioSlug = post.fields && post.post_name ? post.post_name : ( post.name ? doSanitizeTitleWithDashes( post.name ) : '' );
        const bioModal = post.fields && post.fields.staff_bio ? post.fields.staff_bio : ( post.bio ? post.bio : '' );

        function BioModal() {
            return(
                <>
                <Image image={ bioImage } size="square_400" />
                <div className="panel-copy-wrapper">
                    { doParse( bioModal ) }
                </div>
                </>
            );
        }

        return (
            <li>
                <CTA classes="block-link" url={ '#modal-' + bioSlug } modal={ true }>
                    <div className="block-content-wrapper">
                        <Image image={ bioImage } size="square_400" />
                        <span className="bio-details-wrapper">
                            { bioFirstName || bioLastName ?
                                <Heading tag="h3" title={ bioFirstName + ' ' + bioLastName } classes="bio-name" />
                            : null }
                            { bioPosition ?
                                <p className="bio-position">{ bioPosition + ( staff ? ', {DevelopersOnly}' : '' ) }</p>
                            : null }
                        </span>
                    </div>
                </CTA>
                <Modal id={ 'modal-' + bioSlug } heading={ bioFirstName || bioLastName ? { tag: 'h3', title: bioFirstName + ' ' + bioLastName, classes: 'bio-name' } : {} } linkedIn={ bioLinkedIn } position={ bioPosition + ( staff ? ', {DevelopersOnly}' : '' ) } content={ <BioModal /> } />
            </li>
        );
    } else {
        return null;
    }
}