import React from 'react';
import CustomPanelLoader from 'src/loaders/CustomPanelLoader';
import { PanelProps } from 'src/utils/types/PanelProps';

const Custom:React.FC<PanelProps> = ( props ): JSX.Element => {
    return <CustomPanelLoader { ...props } />
}
export default Custom;