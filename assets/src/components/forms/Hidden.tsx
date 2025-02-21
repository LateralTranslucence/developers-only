import React from 'react';
import { doLength } from '@/utils/helpers';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Hidden: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue: string = doLength( field.current_value ) ? field.current_value : '';
    return (
        <input type="hidden" name={ field.name } id={ field.name } className={ field.name } defaultValue={ currentValue }/>
    );
}
export default Hidden;