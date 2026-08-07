// Converts a PascalCase component filename into the kebab-case slug
// convention used for panel/template type keys, e.g. 'DecisionTree' -> 'decision-tree'.
// Used by the extension auto-loaders (PanelLoader, TemplateLoader) so a
// dropped-in file's name becomes its registered type key with no manual mapping.
const pascalToKebab = ( value: string ): string => {
    return value.replace( /([a-z0-9])([A-Z])/g, '$1-$2' ).toLowerCase();
};
export default pascalToKebab;
