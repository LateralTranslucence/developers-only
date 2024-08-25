import React from 'react';
import { doLength } from 'src/utils/helpers';
import RenderDOForm from 'src/components/shared/RenderDOForm';
import RenderHubspotForm from 'src/components/shared/RenderHubspotForm';
import 'assets/styles/components/forms.scss';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';

const Form: React.FC<PanelLoaderProps> = ( { 
    data, 
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
    const formID = data.fields[ formFieldKeys.form ];
    const hubspotFormOptionsString = doLength( data.fields[ formFieldKeys.hubspotForm ] ) ? data.fields[ formFieldKeys.hubspotForm ] : {};
    return (
        <div className="panel-form-wrapper">
            { doLength( hubspotFormOptionsString ) ? 
                <RenderHubspotForm options={ hubspotFormOptionsString } formID={ pageID + '-form' } />
            : null }
            { doLength( formID ) ?
                <RenderDOForm formID={ formID } formData={ formData } /> 
            : null }
        </div>
    );
}
export default Form;