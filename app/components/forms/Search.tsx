import React from 'react';
import FieldError from '@/components/forms/FieldError';
import { fieldAriaProps } from '@/components/forms/fieldAria';
import { getFieldStringValue } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Search: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue: string = getFieldStringValue( field.current_value );
    const required: boolean = field.required;
    return (
        <>
            <label htmlFor={ field.name } className="screenReader">
                { field.label }
                { required ?
                    <span className="form-field__required">*</span>
                : null }
            </label>
            <FieldError error={ error } label={ field.label } name={ field.name } />
            <input type="search" name={ field.name } id={ field.name } className={ field.name } autoComplete="off" defaultValue={ currentValue } placeholder={ field.label_location === 'inside' ? field.label : '' } { ...fieldAriaProps( field, error ) } />
            <button type="submit" className="button color-border search-submit" title="Search">
                <span><span>Search</span></span>
            </button>
        </>
    );
};
export default Search;
