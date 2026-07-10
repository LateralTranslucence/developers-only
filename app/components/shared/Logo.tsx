import React from 'react';
import CTA from '@/components/shared/CTA';

interface LogoProps {
    id: string;
}
const Logo: React.FC<LogoProps> = ( { id = '' } )=> {
    return (
        <CTA 
            classes={ [ 'logo' ] } 
            url={ window.homeURL + '/' } 
            id={ id }
        >
            <span>{ '{Developers_Only}' }</span>
        </CTA>
    );
};
export default Logo;