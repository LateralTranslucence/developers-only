import React from 'react';
import RadioGroup from '@/components/forms/RadioGroup';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

// Radio Buttons: one choice from the field's options
const Radio: React.FC<FormFieldProps> = ( props ) => <RadioGroup { ...props } variant="radio" />;
export default Radio;
