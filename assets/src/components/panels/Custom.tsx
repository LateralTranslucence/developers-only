import React from 'react';
import CustomPanelLoader from '@/loaders/CustomPanelLoader';
import { PanelProps } from '@/utils/types/PanelProps';

const Custom:React.FC<PanelProps> = ( props ): JSX.Element => {
    return <CustomPanelLoader { ...props } />
}
export default Custom;