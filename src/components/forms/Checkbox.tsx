import React from 'react';
import { doLength } from 'src/utils/helpers';
import FieldError from 'src/components/forms/FieldError';
import FormFieldProps from 'src/utils/types/FormFieldProps';

const Checkbox: React.FC<FormFieldProps> = ( { field, error = false } ) => {
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
            <ul className="field-list">
            { field.options.map( ( option: Record<string, any>, index: number ) => {
                const id: string = field.name + '_' + option.value.replace( ' ', '-' ).toLowerCase();
                const optionAttrs: Record<string, any> = {
                    type: 'checkbox',
                    name: field.name,
                    id: id,
                    value: option.value,
                    className: 'checkbox',
                    defaultChecked: undefined,
                };
                if ( currentValue === option.value ) {
                    optionAttrs.defaultChecked = true;
                }
                return (
                    <li key={ index } className="multi-field">
                        <label htmlFor={ id } className="checkbox-label">
                            <input { ...optionAttrs } /> 
                            <span>{ option.label }</span>
                        </label>
                    </li>
                )
            } ) }
            </ul>
        </>
    );
}
export default Checkbox;