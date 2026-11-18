import React from 'react';
import RadioGroup from '@/components/forms/RadioGroup';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

/* Button Select: one choice from the field's options, shown as buttons. They
 * are native radios with their labels styled as buttons by the theme, so
 * arrow keys, screen readers and form submission all work as for any radio
 * group. Single choice: the form builder renders it as radios too. */
const ButtonSelect: React.FC<FormFieldProps> = ( props ) => <RadioGroup { ...props } variant="button-select" />;
export default ButtonSelect;
