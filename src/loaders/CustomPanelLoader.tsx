import React from 'react';
import ComponentLoaderMap from 'src/utils/types/ComponentLoaderMap';
import Test from 'src/components/panels/custom/Test';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';

const customPanels: ComponentLoaderMap = {
    'test': Test,
};

const CustomPanelLoader: React.FC<PanelLoaderProps> = ( props ) => {
    const componentName = props.data.fields[ props.panelPrefix + '_component_name' + props.panelSuffix ] ? props.data.fields[ props.panelPrefix + '_component_name' + props.panelSuffix ] : '';
    const CustomPanel = customPanels[ componentName ] ? customPanels[ componentName ] : undefined;
    if ( CustomPanel ) {
        return <CustomPanel { ...props } />;    
    } else {
        return null;
    }
}
export default CustomPanelLoader;