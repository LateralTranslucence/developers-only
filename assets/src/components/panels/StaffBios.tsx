import React from 'react';
import { doConvertNumberToWords } from '@/utils/helpers';
import PartialTemplateLoader from '@/loaders/PartialTemplateLoader';
import '@/styles/components/blocks.scss';
import '@/styles/components/staff-bios.scss';
import { PanelProps } from '@/utils/types/PanelProps';
import { MetaFieldKeyMap } from '@/utils/types/MetaFieldKeyMap';
import { Post } from '@/utils/types/Post';

const StaffBios: React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const biosFieldKeys: MetaFieldKeyMap = {
        bios: panelPrefix + '_staff' + panelSuffix,
    }
    const bios: Array<Post> = post.fields[ biosFieldKeys.bios ];
    const panelPerRow: number = 3;

    if ( bios ) {
        return (
            <ul className={ 'panel-post-items staff-bios blocks card ' + doConvertNumberToWords( panelPerRow ) + ' do-modals' }>
                { bios.map( ( post: Post, index: number ) => {
                    return <PartialTemplateLoader key={ index } index={ index } type="block" post={ post } />
                } ) }
            </ul>
        );
    } else {
        return null;
    }
}
export default StaffBios;