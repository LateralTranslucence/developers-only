export interface ComponentLoaderMap<TProps = any> {
    [ key: string ]: React.ComponentType<TProps>;
}
