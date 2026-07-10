import React, { JSX } from 'react';

export type TagType = keyof JSX.IntrinsicElements | React.ComponentType<any> | HTMLAnchorElement;