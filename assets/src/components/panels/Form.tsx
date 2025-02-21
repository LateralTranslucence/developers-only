import React from 'react';
import { doLength } from '@/utils/helpers';
import RenderForm from '@/components/shared/RenderForm';
import RenderHubspotForm from '@/components/shared/RenderHubspotForm';
import '@/styles/components/forms.scss';
import { PanelProps } from '@/utils/types/PanelProps';

const Form: React.FC<PanelProps> = ( { 
    post,
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element => {
    const formFieldKeys: Record<string, string> = {
        form: panelPrefix + '_form' + panelSuffix,
        formEmbedCode: panelPrefix + '_form_embed_code' + panelSuffix,
    };
    const queryString = window.location.search;
    const formData = new URLSearchParams( queryString );
    const formID = post.fields[ formFieldKeys.form ];
    const hubspotFormOptionsString = doLength( post.fields[ formFieldKeys.formEmbedCode ] ) ? post.fields[ formFieldKeys.formEmbedCode ] : {};
    return (
        <div className="panel-form-wrapper">
            { doLength( hubspotFormOptionsString ) ? 
                <RenderHubspotForm options={ hubspotFormOptionsString } formID={ pageID + '-form' } />
            : null }
            { doLength( formID ) ?
                <RenderForm formID={ formID } panelID={ panelID } /> 
            : null }
        </div>
    );
}
export default Form;