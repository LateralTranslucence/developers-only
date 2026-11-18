import React from 'react';
import FieldError from '@/components/forms/FieldError';
import RequiredMarker from '@/components/forms/RequiredMarker';
import { getFieldStringValue } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Search: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue: string = getFieldStringValue( field.current_value );
    const required: boolean = field.required;
    return (
        <>
            <label htmlFor={ field.name } className="screenReader">
                { field.label }
                { required ? <RequiredMarker /> : null }
            </label>
            <FieldError error={ error } label={ field.label } />
            <input type="search" aria-required={ required || undefined } name={ field.name } id={ field.name } className={ field.name } autoComplete="off" defaultValue={ currentValue } placeholder={ field.label_location === 'inside' ? field.label : '' } />
            <button type="submit" className="button color-border search-submit" title="Search">
                <span><span>Search</span></span>
            </button>
        </>
    );
};
export default Search;
