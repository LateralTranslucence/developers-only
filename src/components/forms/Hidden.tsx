import React from 'react';
import { doLength } from 'src/utils/helpers';
import { FormFieldProps } from 'src/utils/types/FormFieldProps';

const Hidden: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue: string = doLength( field.current_value ) ? field.current_value : '';
    return (
        <input type="hidden" name={ field.name } id={ field.name } className={ field.name } defaultValue={ currentValue }/>
    );
}
export default Hidden;