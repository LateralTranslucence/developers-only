import React from 'react';
import CTA from '@/components/shared/CTA';
import '@/styles/components/share.scss';

const ShareBar: React.FC<{ title: string; url: string; }> = ( { title = '', url = ''} ): JSX.Element => {
    const facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
    const twitterLink = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title;
    const linkedinLink = 'https://www.linkedin.com/shareArticle?mini=true&url=' + url;
    const mailLink = 'mailto:?subject=' + title + '&body=' + url;

    return (
        <ul className="do-share-bar" data-label="Share">
            <li>
                <CTA classes={ [ 'do-fa', 'fa-facebook-f' ] } text="Facebook" url={ facebookLink } />
            </li>
            <li>
                <CTA classes={ [ 'do-fa', 'fa-twitter' ] } text="Twitter" url={ twitterLink } />
            </li>
            <li>
                <CTA classes={ [ 'do-fa', 'fa-linkedin' ] } text="LinkedIn" url={ linkedinLink } />
            </li>
            <li>
                <CTA classes={ [ 'do-fa', 'fa-envelope' ] } text="Email" url={ mailLink } />
            </li>
        </ul>
    );
}
export default ShareBar;