import React from 'react';
const { useEffect, useState } = wp.element;
import { APIResult } from 'src/utils/types/APIResult';
import { HeadingProps } from 'src/utils/types/HeadingProps';
import { PartialTemplateProps } from 'src/utils/types/PartialTemplateProps';
import { Post } from 'src/utils/types/Post';
import { doGetPost } from 'src/utils/api';
import { doParse } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA';
import Heading from 'src/components/shared/Heading';
import Image from 'src/components/shared/Image';
import Modal from 'src/components/shared/Modal';

interface StaffBlockProps extends Omit<PartialTemplateProps, 'post'> {
    post?: Post;
    presenter?: Record<string, any>;
}

const DOStaffBlock: React.FC<StaffBlockProps> = ( {
    index,
    panelSlider,
    perRow,
    post,
    presenter,
    type,
} ): JSX.Element | null => {
    const [ staff, setStaff ] = useState<Record<string, any>>();
    useEffect( () => {
        if ( presenter ) {
            const fetchData: ( staff: string ) => Promise<void> = async ( staff ): Promise<void> => {
                await doGetPost( 'staff', staff ).then( ( data: APIResult ) => {
                    setStaff( data.json as Post );
                } )
            }
            fetchData( presenter.staff );
        } else {
            setStaff( post )
        }
    }, [] );

    if ( staff ) {
        const modalHeading: HeadingProps = {
             tag: 'h3',
             title: staff.fields.staff_first_name + ' ' + staff.fields.staff_last_name, 
             classes: [ 'bio-name' ],
        }
        const BioModal: React.FC = (): JSX.Element => {
            return (
                <>
                <Image image={ staff.fields.staff_image } size="square_400" />
                <div className="panel-copy-wrapper">
                    { doParse( staff.fields.staff_bio ) }
                </div>
                </>
            )
        }

        return (
            <li>
                <CTA classes={ [ 'block-link' ] } url={ '#modal-' + staff.post_name } modal={ true }>
                    <div className="block-content-wrapper">
                        <Image image={ staff.fields.staff_image } size="square_400" />
                        <span className="bio-details-wrapper">
                            { staff.fields.staff_first_name || staff.fields.staff_last_name ?
                                <Heading tag="h3" title={ staff.fields.staff_first_name + ' ' + staff.fields.staff_last_name } classes={ [ 'bio-name' ] } />
                            : null }
                            { staff.fields.staff_position ?
                                <p className="bio-position">{ staff.fields.staff_position }</p>
                            : null }
                        </span>
                    </div>
                </CTA>
                <Modal id={ 'modal-' + staff.post_name } heading={ modalHeading } content={ <BioModal /> } />
            </li>
        )
    } else {
        return null;
    }
}
export default DOStaffBlock;