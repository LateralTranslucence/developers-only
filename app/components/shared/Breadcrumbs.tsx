import React, { JSX } from 'react';
import CTA from '@/components/shared/CTA';
import { Breadcrumbs as BreadcrumbsType } from '@/utils/types/Breadcrumbs';
import '@/styles/components/breadcrumbs.scss';

const Breadcrumbs: React.FC<{ breadcrumbs: Array<BreadcrumbsType> }> = ( { breadcrumbs = [] } ): JSX.Element | null => {
    if ( breadcrumbs.length > 0 ) {
        return (
            <ul className="breadcrumbs">
                { breadcrumbs.map( ( crumb: BreadcrumbsType, index: number ) => {
                    const text: string = crumb.text;
                    const url: string = crumb.url;
                    return (
                        <li className="breadcrumbs__item" key={ index }>
                            <CTA classes={ [ 'breadcrumbs__link' ] } key={ index } url={ url }>
                                { text }
                            </CTA>
                        </li>
                    );
                } ) }
            </ul>
        );
    } else {
        return null;
    }
};
export default Breadcrumbs;
