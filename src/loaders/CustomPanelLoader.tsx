import React from 'react';
import { ComponentLoaderMap } from 'src/utils/types/ComponentLoaderMap';
import Test from 'src/components/panels/custom/Test';
import { PanelProps } from 'src/utils/types/PanelProps';

const customPanels: ComponentLoaderMap = {
    'test': Test,
};

const CustomPanelLoader: React.FC<PanelProps> = ( props ) => {
    const componentName = props.post.fields[ props.panelPrefix + '_component_name' + props.panelSuffix ] ? props.post.fields[ props.panelPrefix + '_component_name' + props.panelSuffix ] : '';
    const CustomPanel = customPanels[ componentName ] ? customPanels[ componentName ] : undefined;
    if ( CustomPanel ) {
        return <CustomPanel { ...props } />;    
    } else {
        return null;
    }
}
export default CustomPanelLoader;