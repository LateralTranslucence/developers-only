import React from 'react';
import { doConvertNumberToWords, doLength, doParse } from '@/utils/helpers';
import CTAs from '@/components/shared/CTAs';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import MediaLoader from '@/components/shared/MediaLoader';
import '@/styles/components/blocks.scss';
import { PanelProps } from '@/utils/types/PanelProps';
import { CTASettings } from '@/utils/types/CTASettings';

const Blocks:React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const blocksFieldKeys: Record<string, string> = {
        blocks: panelPrefix + '_blocks' + panelSuffix,
        perRow: panelPrefix + '_blocks_per_row' + panelSuffix,
        //slider: panelPrefix + '_slider' + panelSuffix,
        blockStyle: panelPrefix + '_block_style' + panelSuffix,
        cta: panelPrefix + '_cta' + panelSuffix,
    };
    // Block object
    const blocks: Record<string, any> = post.fields[ blocksFieldKeys.blocks ] ? post.fields[ blocksFieldKeys.blocks ] : {};

    // Block Style
    const blockStyle: string = post.fields[ blocksFieldKeys.blockStyle ] ? post.fields[ blocksFieldKeys.blockStyle ] : 'card';

    // CTAs
    const cta: Array<CTASettings> = post.fields[ blocksFieldKeys.cta ] ? post.fields[ blocksFieldKeys.cta ] : [];

    // Number of posts per row, or initially visible if slider (defaults to 3)
    const panelPerRow: number = post.fields[ blocksFieldKeys.perRow ] && ! isNaN( post.fields[ blocksFieldKeys.perRow ] ) ? Number( post.fields[ blocksFieldKeys.perRow ] ) : 3;

    const BlockContent: React.FC<Record<string, any>> = ( { block } ) => {
        return (
            <>
            <MediaLoader media={ block.media } size={ block.icon_logo ? 'logo' : 'cinema_600' } />
            <div className="block-content-wrapper">
                <Heading tag={ 'h3' } title={ block.title } classes={ doLength( block.cta_url ) && ! doLength( block.cta_text ) ? [ 'text-button' ] : [] } />
                { doParse( block.copy ) }
                { doLength( block.cta_url ) && doLength( block.cta_text ) ?
                    <CTA url={ block.cta_url } modal={ block.cta_modal } text={ block.cta_text } classes={ [ 'text-button' ] } />
                : null }
            </div>
            </>
        )
    }

    if ( doLength( blocks ) ) {
        return (
            <>
            <ul className={ 'panel-blocks blocks ' + doConvertNumberToWords( panelPerRow ) + ' ' + blockStyle }>
                { blocks.map( ( block: Record<string, any>, index: number ) => {
                    return (
                        <li key={ index } className={ doLength( block.cta_url ) ? 'has-block-link' : '' } data-aos="fade-up">
                            { doLength( block.cta_url ) && ! doLength( block.cta_text ) ?
                                <CTA url={ block.cta_url } modal={ block.cta_modal } classes={ [ 'block-link' ] }>
                                    <BlockContent block={ block } />
                                </CTA>
                            : <BlockContent block={ block } /> }
                        </li>
                    );
                } ) }
            </ul>
            { cta ? 
                <CTAs ctas={ cta } />
            : null }
            </>
        );
    } else {
        return null;
    }
}
export default Blocks;