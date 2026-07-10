import React, { JSX } from 'react';
import { convertNumberToWords, parse } from '@/utils/helpers';
import CTAs from '@/components/shared/CTAs';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import MediaLoader from '@/components/shared/MediaLoader';
import '@/styles/components/blocks.scss';
import { getBlocksPanelConfig } from '@/utils/panels';
import { PanelProps } from '@/utils/types/PanelProps';
import { BlockItem } from '@/utils/types/Panels';

const Blocks:React.FC<PanelProps> = ( { 
    post, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const {
        blocks,
        ctas,
        perRow: panelPerRow,
        color,
    } = getBlocksPanelConfig( post.fields, panelPrefix, panelSuffix );

    const BlockContent: React.FC<{ block: BlockItem }> = ( { block } ) => {
        return (
            <>
            <div className="blocks__content">
                {block.media &&
                    <MediaLoader media={ block.media } />
                }
                <Heading tag={ 'h3' } title={ block.title } />
                { parse( block.copy ) }
                { block.cta_url && block.cta_text ?
                    <CTA url={ block.cta_url } modal={ block.cta_modal } text={ block.cta_text } classes={ [ 'text-button' ] } />
                : null }
            </div>
            </>
        );
    };

    if ( blocks.length > 0 ) {
        return (
            <>
            <ul className={ `blocks blocks--${ convertNumberToWords( panelPerRow ) } blocks--${ color }` }>
                { blocks.map( ( block: BlockItem, index: number ) => {
                    if (block.hidden) return null;
                    return (
                        <li key={ index } className={ '' + ( block.cta_url && ! block.cta_text ? ' --has-link' : '' ) }>
                            { block.cta_url && ! block.cta_text ?
                                <CTA url={ block.cta_url } modal={ block.cta_modal } classes={ [ 'blocks__link' ] }>
                                    <BlockContent block={ block } />
                                </CTA>
                            : <BlockContent block={ block } /> }
                        </li>
                    );
                } ) }
            </ul>
            { ctas.length > 0 ? 
                <CTAs ctas={ ctas } />
            : null }
            </>
        );
    } else {
        return null;
    }
};
export default Blocks;
