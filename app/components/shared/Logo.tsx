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
            { window.devoLogo ?
                <>
                    <img className="logo__image" src={ window.devoLogo } alt="" aria-hidden="true" />
                    <span className="screenReader">{ '{Developers_Only}' }</span>
                </>
            : <span>{ '{Developers_Only}' }</span> }
        </CTA>
    );
};
export default Logo;
