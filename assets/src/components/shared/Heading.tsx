import React, { ElementType } from 'react';
import { doLength, doParse, doTrimChar } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import CTAs from '@/components/shared/CTAs';
import { HeadingProps } from '@/utils/types/HeadingProps';

const Heading: React.FC<HeadingProps> = ( {
    align = '',
    classes = [],
    cta,
    id = '',
    pretitle = '',
    publishDate = '',
    tag = 'h2',
    title = '',
    url = '',
} ) => {
    const Tag: ElementType = doTrimChar( tag, '<>' ) as ElementType;
    const hasPretitle: boolean = Boolean( doLength( pretitle ) );
    const hasPublishDate: boolean = Boolean( doLength( publishDate ) );

    // Either has-date OR has-pretitle, not both
    if ( hasPublishDate ) {
        classes.push( 'has-date' )
    } else if ( hasPretitle ) {
        classes.push( 'has-pretitle' );
    }
    if ( align ) {
        classes.push( 'text-align-' + align );
    }
    const tagAttributes: Record<string, any> = {
        className: classes.join( ' ' ),
    }
    if ( doLength( id ) ) {
        tagAttributes.id = id;
    }
    if ( ! hasPublishDate ) {
        tagAttributes[ 'data-pretitle' ] = pretitle;
    }
    return (
        <>
        <Tag { ...tagAttributes } data-aos="fade-in">
            <CTA url={ url }>
                { hasPublishDate ?
                    <>
                    <span className="heading-title">{ doParse( title ) }</span>
                    <span className="heading-pretitle">{ pretitle }</span>
                    <span className="heading-publish-date">{ publishDate }</span>
                    </>
                : title }
            </CTA>
        </Tag>
        { cta ?
            <CTAs ctas={ [ cta ] } />
        : null }
        </>
    )
}
export default Heading;