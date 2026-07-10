import React, { ElementType } from 'react';
import { parse, trimChar } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import CTAs from '@/components/shared/CTAs';
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
    // Either has-date OR has-pretitle, not both
    if ( hasPublishDate ) {
        classes.push( 'has-date' );
    } else if ( hasPretitle ) {
        classes.push( 'has-pretitle' );
    }
    if ( logo?.full ) {
        classes.push( 'has-logo' );
    }
    if ( align ) {
        classes.push( 'text-align-' + align );
    }
    const tagAttributes: Record<string, any> = {
        className: classes.join( ' ' ),
    };
    if ( id ) {
        tagAttributes.id = id;
    }
    if ( ! hasPublishDate && pretitle.length ) {
        tagAttributes[ 'data-pretitle' ] = pretitle;
    } else if ( logo?.full ) {
        const fullLogo: MediaItem = logo.full as MediaItem;
        tagAttributes[ 'style' ] = {
            '--logo': `url(${fullLogo.url})`,
        };
    }
    return (
        <>
        <Tag { ...tagAttributes } data-aos="fade-in">
            <CTA url={ url }>
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
