import React from 'react';
import { ComponentLoaderMap } from '@/utils/types/ComponentLoaderMap';
import Test from '@/components/panels/custom/Test';
import { getStringField } from '@/utils/helpers';
import { PanelProps } from '@/utils/types/PanelProps';

const customPanels: ComponentLoaderMap = {
    'test': Test,
};

const CustomPanelLoader: React.FC<PanelProps> = ( props ) => {
    const componentName: string = getStringField( props.post.fields, props.panelPrefix + '_component_name' + props.panelSuffix );
    const CustomPanel = customPanels[ componentName ] ? customPanels[ componentName ] : undefined;
    if ( CustomPanel ) {
        return <CustomPanel { ...props } />;    
    } else {
        return null;
    }
};
export default CustomPanelLoader;