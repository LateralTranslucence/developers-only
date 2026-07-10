import React, { JSX } from 'react';
import CTA from '@/components/shared/CTA';
import '@/styles/components/share.scss';

const ShareBar: React.FC<{ title: string; url: string; }> = ( { title = '', url = ''} ): JSX.Element => {
    const facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
    const xLink = 'https://x.com/intent/tweet?url=' + url + '&text=' + title;
    const linkedinLink = 'https://www.linkedin.com/shareArticle?mini=true&url=' + url;
    const mailLink = 'mailto:?subject=' + title + '&body=' + url;

    return (
        <ul className="share-bar" data-label="Share">
            <li className="share-bar__item">
                <CTA classes={ [ 'share-bar__link', 'share-bar__link--facebook' ] } text="Facebook" url={ facebookLink } />
            </li>
            <li className="share-bar__item">
                <CTA classes={ [ 'share-bar__link', 'share-bar__link--x' ] } text="X" url={ xLink } />
            </li>
            <li className="share-bar__item">
                <CTA classes={ [ 'share-bar__link', 'share-bar__link--linkedin' ] } text="LinkedIn" url={ linkedinLink } />
            </li>
            <li className="share-bar__item">
                <CTA classes={ [ 'share-bar__link', 'share-bar__link--email' ] } text="Email" url={ mailLink } />
            </li>
        </ul>
    );
};
export default ShareBar;