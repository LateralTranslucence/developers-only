export interface Form {
    autoupdate: boolean;
    error: Record<string, any>;
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

export interface FormField {
    current_value: string;
    fields?: Record<string, FormField>;
    field_type: string;
    hidden: boolean;
    item_type: string;
    label: string;
    label_location: string;
    name: string;
    required: boolean;
    options: Record<string, any>;
    settings: Record<string, any>;
}