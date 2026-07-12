// Deliberately `any`: loader maps mix components with different prop shapes
// (templates, partials); the loader passes the right props at the call site.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ComponentLoaderMap<TProps = any> {
    [ key: string ]: React.ComponentType<TProps>;
}
