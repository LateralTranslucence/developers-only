import React from 'react';
import { useEffect } from 'react';
import { doConvertNumberToWords, doParse } from '@/utils/helpers';
import { doCountUp } from '@/utils/display';
import Heading from '@/components/shared/Heading';
import Image from '@/components/shared/Image';
import { MetaFieldKeyMap } from '@/utils/types/MetaFieldKeyMap';
import { PanelProps } from '@/utils/types/PanelProps';
import '@/styles/components/blocks.scss';
import '@/styles/components/stats.scss';

const Stats: React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const statsFieldKeys: MetaFieldKeyMap = {
        stats: panelPrefix + '_stats' + panelSuffix,
        perRow: panelPrefix + '_blocks_per_row' + panelSuffix,
        blockStyle: panelPrefix + '_block_style' + panelSuffix,
    };
    const stats: Array<Record<string, any>> = post.fields[ statsFieldKeys.stats ] ? post.fields[ statsFieldKeys.stats ] : [];
    const perRow: number = post.fields[ statsFieldKeys.perRow ] && ! isNaN( post.fields[ statsFieldKeys.perRow ] ) ? Number( post.fields[ statsFieldKeys.perRow ] ) : 4;
    const blockStyle: string = post.fields[ statsFieldKeys.blockStyle ] ? post.fields[ statsFieldKeys.blockStyle ] : 'card';
    useEffect( () => {
        doCountUp();
    }, [] );
    if ( stats ) {
        return (
            <ul className={ 'panel-blocks blocks stats ' + doConvertNumberToWords( perRow ) + ' ' + blockStyle }>
            { stats.map( ( stat: Record<string, any>, index: number ) => {
                return (
                    <li key={ index }>
                        <Image image={ stat.icon } size="cinema_600" />
                        <div className="block-content-wrapper">
                            { stat.before_number ?
                                <span className="before-text">{ doParse( stat.before_number ) }</span>
                            : null }
                            { stat.number ?
                                <figure className={ 'stat' + ( stat.number !== false ? ' count-up' : '' ) + ( stat.decimal ? ' decimal' : '' ) + ( stat.count_down ? ' down' : '' ) }>
                                    { stat.number }
                                </figure>
                            : null }
                            { stat.after_number ?
                                <span className={ stat.number === 0 ? 'stat' : 'after-text' }>{ doParse( stat.after_number ) }</span>
                            : null }
                            { stat.title ?
                                <Heading tag={ 'h3' } title={ stat.title }/>
                            : null }
                            { stat.description ? 
                                doParse( stat.description )
                            : null }
                        </div>
                    </li>
                );
            } ) }
            </ul>
        );
    } else {
        return null;
    }
}
export default Stats;