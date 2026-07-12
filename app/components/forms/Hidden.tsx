import React from 'react';
import { getFieldStringValue } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Hidden: React.FC<FormFieldProps> = ( { field } ) => {
    const currentValue: string = getFieldStringValue( field.current_value );
    return (
        <input type="hidden" name={ field.name } id={ field.name } className={ field.name } defaultValue={ currentValue }/>
    );
};
export default Hidden;
