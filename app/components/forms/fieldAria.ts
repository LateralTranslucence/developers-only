import type React from 'react';
import { FormField, SearchFormField } from '@/utils/types/Form';

type FieldAriaProps = Pick<React.AriaAttributes, 'aria-required' | 'aria-invalid' | 'aria-describedby'>;

// The id of a field's error message (see FieldError), for aria-describedby
export const fieldErrorId = ( name: string ): string => `${ name }-error`;

/* ARIA state for a field's input: required when the form says so, and, after
 * a submission that left it empty, invalid and described by its error
 * message. aria-required rather than the required attribute, so the browser
 * doesn't block the submit with its own bubble: the server validates, and
 * RenderForm shows one error summary and moves focus to the first invalid
 * field. Pass required: false for an input in a checkbox group, where the
 * requirement is "pick at least one", not "check this box". */
// The class for a field's <label> or <legend>: the form builder's Hide Label
// hides it visually but keeps it, so the field still has a name
export const fieldLabelClass = ( field: FormField | SearchFormField ): string | undefined => field.hide_label ? 'screenReader' : undefined;

export const fieldAriaProps =( field: FormField | SearchFormField, error: boolean, required: boolean = field.required ): FieldAriaProps => ( {
    'aria-required': required ? true : undefined,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? fieldErrorId( field.name ) : undefined,
} );
