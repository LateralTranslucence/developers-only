import { doLength, doParse } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA.js';
import Heading from 'src/components/shared/Heading.js';
import Image from 'src/components/shared/Image.js';

export default function DOCompanyBlock( props ) {
    const index = Number( props.index );
    //const panelPerRow = Number( props.perRow );
    const metaPrefix = props.post.post_type_details.meta_prefix;
    const title = props.post.fields[ metaPrefix + '_company_name' ];
    const description = props.post.fields[ metaPrefix + '_description' ];
    const clientLink = props.post.client_link;
    const stats = props.post.fields[ metaPrefix + '_stats' ] ? props.post.fields[ metaPrefix + '_stats' ] : [];
    const image = props.post.fields[ metaPrefix + '_white_logo' ];
    const statIndustryFilter = props.post.ID && props.post.post_type == 'do_industry' ? props.post.post_name : false;

    return (
        <li key={ index }>
            <CTA url={ clientLink } title={ props.post_title } classes={ [ 'block-link' ] }>
                <span>
                    <Image image={ image } size="logo" />
                    <Heading tag="h3" title={ title } classes="screen-reader-text" />
                    { description ?
                        doParse( description )
                    : null }
                    { doLength( stats ) ? 
                        <ul className="blocks stats two">
                            { stats.map( ( stat, index ) => {
                                const statTitle = stat.title ? stat.title : '';
                                const statDescription = stat.copy ? stat.copy : '';
                                const statIndustry = stat.industry ? stat.industry : '';
                                if ( statIndustry == statIndustryFilter || statIndustry == false  ) {
                                    return(
                                        <li key={ index }>
                                            <Heading tag={ 'h4' } title={ statTitle } />
                                            { doParse( statDescription ) }
                                        </li>
                                    );
                                }
                            } ) }
                        </ul>
                    : null }
                </span>
            </CTA>
        </li>
    );

}


