export interface TemplateLoaderProps {
    iframe?: boolean;
    layoutClassesFunction?: ( classes: Array<string> ) => void;
    postType: string;
    queryString?: string;
    slug: string;
}