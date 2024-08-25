import React from 'react';
import CustomPanelLoader from 'src/loaders/CustomPanelLoader';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';

const Custom:React.FC<PanelLoaderProps> = ( props ): JSX.Element => {
    return <CustomPanelLoader { ...props } />
}
export default Custom;