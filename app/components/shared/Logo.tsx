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
            { /* Braces are split out so a theme can accent them independently */ }
            <span><span className="logo__brace">{ '{' }</span>Developers_Only<span className="logo__brace">{ '}' }</span></span>
        </CTA>
    );
};
export default Logo;
