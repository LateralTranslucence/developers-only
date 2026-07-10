import React, { JSX } from 'react';
import RenderForm from '@/components/shared/RenderForm';
import '@/styles/components/forms.scss';
import { PanelProps } from '@/utils/types/PanelProps';

const Form: React.FC<PanelProps> = ( { 
    post,
    panelID = '', 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element => {
    const formID = Number( post.fields[ panelPrefix + '_form' + panelSuffix ] ) || 0;
    return (
        <div className="panel-form-wrapper">
            { formID ?
                <RenderForm formID={ formID } panelID={ panelID } /> 
            : null }
        </div>
    );
};
export default Form;
