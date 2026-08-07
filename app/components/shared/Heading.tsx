import React, { ElementType } from 'react';
import { parse, trimChar } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import CTAs from '@/components/shared/CTAs';
import { CustomAttributes } from '@/utils/types/CustomAttributes';
import { HeadingProps } from '@/utils/types/HeadingProps';
import { MediaItem } from '@/utils/types/Media';

const Heading: React.FC<HeadingProps> = ( {
    align = '',
    classes = [],
    ctas = [],
    id = '',
    logo,
    pretitle = '',
    publishDate = '',
    tag = 'h2',
    title = '',
    url = '',
} ) => {
    const Tag: ElementType = trimChar( tag, '<>' ) as ElementType;
    const hasPretitle: boolean = Boolean( pretitle );
    const hasPublishDate: boolean = Boolean( publishDate );
    const logoURL: string = ( logo?.full as MediaItem | undefined )?.url ?? '';
    const hasLogo: boolean = Boolean( logoURL );
    // Either has-date OR has-pretitle, not both
    if ( hasPublishDate ) {
        classes.push( 'has-date' );
    } else if ( hasPretitle ) {
        classes.push( 'has-pretitle' );
    }
    if ( hasLogo ) {
        classes.push( 'has-logo' );
    }
    if ( align ) {
        classes.push( 'text-align-' + align );
    }
    const tagAttributes: CustomAttributes = {
        className: classes.join( ' ' ),
    };
    if ( id ) {
        tagAttributes.id = id;
    }
    if ( ! hasPublishDate && pretitle.length ) {
        tagAttributes[ 'data-pretitle' ] = pretitle;
    }
    return (
        <>
        <Tag { ...tagAttributes } data-aos="fade-in">
            <CTA url={ url }>
                { hasLogo ?
                    <span className="title-logo">
                        <img src={ logoURL } alt="" aria-hidden="true" />
                    </span>
                : null }
                { hasPublishDate ?
                    <>
                    <span className="heading__title">{ parse( title ) }</span>
                    <span className="heading__publish-date">{ publishDate }</span>
                    </>
                : title }
            </CTA>
        </Tag>
        { ctas.length > 0 ?
            <CTAs ctas={ ctas } />
        : null }
        </>
    );
};
export default Heading;
