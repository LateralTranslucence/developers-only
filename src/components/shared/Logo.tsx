import React from 'react';
import CTA from 'src/components/shared/CTA';

interface LogoProps {
    id: string;
}
const Logo: React.FC<LogoProps> = ( { id = '' } )=> {
    return (
        <CTA classes={ [ 'do-logo' ] } url={ homeURL + '/' } id={ id }><span>{ '{DevelopersOnly}' }</span></CTA>
    )
}
export default Logo;