import { FormField, SearchFormField } from '@/utils/types/Form';

export interface FormFieldProps {
    field: FormField | SearchFormField;
    callback?: () => void;
    error: boolean;
}
