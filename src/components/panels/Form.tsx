import React from 'react';
import { doLength } from 'src/utils/helpers';
import RenderForm from 'src/components/shared/RenderForm';
import RenderHubspotForm from 'src/components/shared/RenderHubspotForm';
import 'assets/styles/components/forms.scss';
import { PanelProps } from 'src/utils/types/PanelProps';

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
        hubspotForm: panelPrefix + '_hubspot_form_embed_code' + panelSuffix,
    };
    const queryString = window.location.search;
    const formData = new URLSearchParams( queryString );
    const formID = post.fields[ formFieldKeys.form ];
    const hubspotFormOptionsString = doLength( post.fields[ formFieldKeys.hubspotForm ] ) ? post.fields[ formFieldKeys.hubspotForm ] : {};
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