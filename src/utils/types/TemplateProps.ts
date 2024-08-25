export interface TemplateProps {
    post: Record<string, any>; 
    iframe: boolean;
    layoutClasses: ( ( classes: Array<string> ) => void ) | undefined;
}