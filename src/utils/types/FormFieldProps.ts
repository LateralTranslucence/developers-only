export interface FormFieldProps {
    field: Record<string, any>;
    callback: ( e: Event ) => void;
    error: boolean;
}