import React from 'react';
import { doLength } from 'src/utils/helpers';
import FieldError from 'src/components/forms/FieldError';
import FormFieldProps from 'src/utils/types/FormFieldProps';

const Select: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue: string = doLength( field.current_value ) ? field.current_value : '';
    const required: boolean = field.required;
    return (
        <>
        <label htmlFor={ field.name }>
            { field.label }
            { required ?
                <span className="field-required">*</span>
            : null }
        </label>
        <FieldError error={ error } label={ field.label } />
        <select name={ field.name } id={ field.name } defaultValue={ currentValue } >
            <option value="">Select</option>
            { field.options.map( ( option: Record<string, any>, index: number ) => {
                return <option key={ index } value={ option.value }>{ option.label }</option>
            } ) }
        </select>
        </>
    );
}
export default Select;