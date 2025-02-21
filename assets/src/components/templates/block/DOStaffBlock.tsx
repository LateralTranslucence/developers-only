import React from 'react';
import { useEffect, useState } from 'react';
import { APIResult } from '@/utils/types/APIResult';
import { HeadingProps } from '@/utils/types/HeadingProps';
import { PartialTemplateProps } from '@/utils/types/PartialTemplateProps';
import { Post } from '@/utils/types/Post';
import { doGetPost } from '@/utils/api';
import { doParse } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import Image from '@/components/shared/Image';
import Modal from '@/components/shared/Modal';

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