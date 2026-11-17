export interface TemplateLoaderProps {
    iframe?: boolean;
    layoutClassesFunction?: ( classes: Array<string> ) => void;
    // Render the 404 template without asking the API (e.g. a URL no route matches)
    notFound?: boolean;
    onLoad?: () => void;
    postType: string;
    slug: string;
}
