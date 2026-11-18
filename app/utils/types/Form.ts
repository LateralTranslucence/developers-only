export interface FieldOption {
    count?: number;
    // Shown under a Button Select option
    description?: string;
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
    // The form builder's Hide Field: not shown, and never required
    hidden: boolean;
    // The form builder's Hide Label: the label is still there for assistive
    // tech, but visually hidden (.screenReader)
    hide_label?: boolean;
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
    error: boolean;
    // Name of the honeypot input, resolved server-side from the
    // devo_form_honeypot_field filter so client and server always agree.
    honeypot_field?: string;
    id: string;
    items: Record<string, FormField>;
    missing_fields: Array<string>;
    name: string;
    // Server-side message shown above the form, e.g. when the submit endpoint's
    // rate limit is hit. Null on a normal response.
    notice?: string | null;
    post_id: number;
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

// A string from a field's settings (the autocomplete token, say), or ''
export const getFieldStringSetting = ( field: FormField | SearchFormField, key: string ): string => {
    const value: unknown = field.settings?.[ key ];
    return typeof value === 'string' ? value : '';
};

// A whole number from a field's settings (a range's min, max and step)
export const getFieldNumberSetting = ( field: FormField | SearchFormField, key: string, fallback: number ): number => {
    const value: unknown = field.settings?.[ key ];
    const number: number = typeof value === 'number' ? value : typeof value === 'string' && value.trim() !== '' ? Number( value ) : NaN;
    return Number.isFinite( number ) ? number : fallback;
};

// One state of a toggle: what it sends, and its option label
export interface ToggleState {
    label: string;
    value: string;
}

// A toggle's off or on state from its settings (see
// DO_Form_Builder::toggle_settings())
export const getToggleState = ( field: FormField | SearchFormField, key: 'off' | 'on' ): ToggleState => {
    const state: unknown = field.settings?.[ key ];
    const record: Record<string, unknown> = state && typeof state === 'object' ? state as Record<string, unknown> : {};
    return {
        label: typeof record.label === 'string' ? record.label : '',
        value: typeof record.value === 'string' ? record.value : key === 'on' ? '1' : '',
    };
};

export const getFieldListValue = ( value: FormField['current_value'] ): string | Array<string> => {
    if ( Array.isArray( value ) ) {
        return value;
    }

    return typeof value === 'string' ? value : '';
};
