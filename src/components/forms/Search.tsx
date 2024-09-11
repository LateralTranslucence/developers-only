import React from 'react';
import { doLength } from 'src/utils/helpers';
import FieldError from 'src/components/forms/FieldError';
import { FormFieldProps } from 'src/utils/types/FormFieldProps';

const Search: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue: string = doLength( field.current_value ) ? field.current_value : '';
    const required: boolean = field.required;
    return (
        <>
            <label htmlFor={ field.name } className="screen-reader-text">
                { field.label }
                { required ?
                    <span className="field-required">*</span>
                : null }
            </label>
            <FieldError error={ error } label={ field.label } />
            <input type="search" name={ field.name } id={ field.name } className={ field.name } autoComplete="off" defaultValue={ currentValue } placeholder={ field.label_location === 'inside' ? field.label : '' } />
            <button type="submit" className="button color-border search-submit" title="Search">
                <span><span>Search</span></span>
            </button>
        </>
    );
}
export default Search;