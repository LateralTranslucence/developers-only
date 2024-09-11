import React from 'react';
const { useEffect } = wp.element;
import { doConvertNumberToWords, doParse } from 'src/utils/helpers';
import { doCountUp } from 'src/utils/display';
import Heading from 'src/components/shared/Heading';
import Image from 'src/components/shared/Image';
import { MetaFieldKeyMap } from 'src/utils/types/MetaFieldKeyMap';
import { PanelProps } from 'src/utils/types/PanelProps';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/stats.scss';

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