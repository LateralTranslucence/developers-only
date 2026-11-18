import React, { ElementType } from 'react';
import { htmlToText, parse, trimChar } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import CTAs from '@/components/shared/CTAs';
import { CustomAttributes } from '@/utils/types/CustomAttributes';
import { HeadingProps } from '@/utils/types/HeadingProps';

const Heading: React.FC<HeadingProps> = ( {
    align = '',
    classes = [],
    ctas = [],
    id = '',
    pretitle = '',
    publishDate = '',
    tag = 'h2',
    title = '',
    url = '',
} ) => {
    const Tag: ElementType = trimChar( tag, '<>' ) as ElementType;
    const hasPretitle: boolean = Boolean( pretitle );
    const hasPublishDate: boolean = Boolean( publishDate );
    // Copy rather than push onto the prop, which belongs to the caller
    const headingClasses: Array<string> = [ ...classes ];
    // Either has-date OR has-pretitle, not both
    if ( hasPublishDate ) {
        headingClasses.push( 'has-date' );
    } else if ( hasPretitle ) {
        headingClasses.push( 'has-pretitle' );
    }
    if ( align ) {
        headingClasses.push( 'text-align-' + align );
    }
    const tagAttributes: CustomAttributes = {
        className: headingClasses.join( ' ' ),
    };
    if ( id ) {
        tagAttributes.id = id;
    }
    // Titles are stored as sanitised HTML ("R&amp;D"). The pretitle is shown
    // by CSS content: attr(), and the plain title as a React text node, so
    // both need it as text.
    if ( ! hasPublishDate && pretitle.length ) {
        tagAttributes[ 'data-pretitle' ] = htmlToText( pretitle );
    }
    return (
        <>
        <Tag { ...tagAttributes }>
            <CTA url={ url }>
                { hasPublishDate ?
                    <>
                    <span className="heading__title">{ parse( title ) }</span>
                    <span className="heading__publish-date">{ publishDate }</span>
                    </>
                : htmlToText( title ) }
            </CTA>
        </Tag>
        { ctas.length > 0 ?
            <CTAs ctas={ ctas } />
        : null }
        </>
    );
};
export default Heading;
