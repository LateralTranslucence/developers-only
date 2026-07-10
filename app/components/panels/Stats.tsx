import React, { JSX } from 'react';
import { getArrayField, parse } from '@/utils/helpers';
import useCountUp from '@/utils/hooks/useCountUp';
import { PanelProps } from '@/utils/types/PanelProps';
import '@/styles/components/blocks.scss';
import '@/styles/components/stats.scss';

const StatItem: React.FC<{ stat: Record<string, any> }> = ( { stat } ) => {
    const countDown: boolean = Boolean( stat.count_down );
    const from: number = countDown ? stat.number : 0;
    const target: number = countDown ? 0 : stat.number;
    const [ ref, value ] = useCountUp( target, { decimals: stat.decimal, from } );

    return (
        <li className="stats__item" ref={ ref as React.RefObject<HTMLLIElement> }>
            <div className="blocks__content">
                <h3>
                    { stat.before_number ?
                        <span className="stats__before-text">{ parse( stat.before_number ) }</span>
                    : null }
                    { stat.number !== '' && stat.number !== false && stat.number !== null ?
                        <figure className={ 'stats__value' + ( stat.decimal ? ' stats__value--decimal' : '' ) + ( countDown ? ' stats__value--down' : '' ) }>
                            { value }
                        </figure>
                    : null }
                    { stat.after_number ?
                        <span className={ stat.number === 0 ? 'stats__value' : 'stats__after-text' }>{ parse( stat.after_number ) }</span>
                    : null }
                </h3>
                { stat.description ?
                    parse( stat.description )
                : null }
            </div>
        </li>
    );
};

const Stats: React.FC<PanelProps> = ( {
    post,
    panelPrefix = '',
    panelSuffix = '',
} ): JSX.Element | null => {
    const stats = getArrayField<Record<string, any>>( post.fields, panelPrefix + '_stats' + panelSuffix );

    if ( stats.length > 0 ) {
        return (
            <ul className="stats">
                { stats.map( ( stat, index ) => (
                    <StatItem key={ index } stat={ stat } />
                ) ) }
            </ul>
        );
    } else {
        return null;
    }
};
export default Stats;
