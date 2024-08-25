import CTA from 'src/components/shared/CTA.js';
import 'assets/styles/components/share.scss';

export default function ShareBar( props ) {
    const pageTitle = props.title ? props.title : '';
    const pageURL = props.url ? props.url : '';
    const facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=' + pageURL;
    const twitterLink = 'https://twitter.com/intent/tweet?url=' + pageURL + '&text=' + pageTitle;
    const linkedinLink = 'https://www.linkedin.com/shareArticle?mini=true&url=' + pageURL;
    const mailLink = 'mailto:?subject=' + pageTitle + '&body=' + pageURL;

    return (
        <ul className="do-share-bar" data-label="Share">
            <li>
                <CTA classes="do-fa fa-facebook-f" text="Facebook" url={ facebookLink } />
            </li>
            <li>
                <CTA classes="do-fa fa-twitter" text="Twitter" url={ twitterLink } />
            </li>
            <li>
                <CTA classes="do-fa fa-linkedin" text="LinkedIn" url={ linkedinLink } />
            </li>
            <li>
                <CTA classes="do-fa fa-envelope" text="Email" url={ mailLink } />
            </li>
        </ul>
    );
}