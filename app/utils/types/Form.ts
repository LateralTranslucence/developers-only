export interface FieldOption {
    count?: number;
    icon?: string;
    label: string;
    name?: string;
    query_string?: string;
    value?: string;
}

export type FieldOptionList = Array<FieldOption>;
export type FieldOptionMap = Record<string, FieldOption>;
export type FieldOptions = FieldOptionList | FieldOptionMap;

interface BaseField {
    current_value?: string | Array<string> | number;
    hidden: boolean;
    label: string;
    label_location: string;
    name: string;
    required: boolean;
    settings: Record<string, unknown>;
}

export interface SearchFormField extends BaseField {
    options: FieldOptionMap;
    type: string;
}

export interface Form {
    autoupdate: boolean;
    error: Record<string, unknown>;
    id: string;
    items: Record<string, FormField>;
    missing_fields: Array<string>;
    name: string;
    post_id: number;
    submissions_email_to: string;
    submissions_email_subject: string;
    submissions_email_confirmation_copy: string;
    submitted: boolean;
    thank_you_message: string;
    thank_you_redirect: string;
}

export interface FormField extends BaseField {
    fields?: Record<string, FormField>;
    field_type: string;
    item_type: string;
    options: FieldOptions;
}

export const getFieldOptionsArray = ( options: FieldOptions = [] ): FieldOptionList => {
    return Array.isArray( options ) ? options : Object.values( options );
};

export const getFieldOptionsMap = ( options: FieldOptions = {} ): FieldOptionMap => {
    if ( Array.isArray( options ) ) {
        return options.reduce<FieldOptionMap>( ( accumulator, option, index ) => {
            const key = option.name || option.value || String( index );
            accumulator[ key ] = option;
            return accumulator;
        }, {} );
    }

    return options;
};

export const getFieldStringValue = ( value: FormField['current_value'] ): string => {
    if ( Array.isArray( value ) ) {
        return value.join( ',' );
    }

    if ( typeof value === 'number' ) {
        return String( value );
    }

    return value ?? '';
};

export const getFieldListValue = ( value: FormField['current_value'] ): string | Array<string> => {
    if ( Array.isArray( value ) ) {
        return value;
    }

    return typeof value === 'string' ? value : '';
};
