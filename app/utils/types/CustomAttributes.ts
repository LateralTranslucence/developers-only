export type CustomAttributes = {
    // Deliberately `any`: this is a pass-through bag for arbitrary HTML/JSX
    // attributes spread onto elements; `unknown` would fail JSX prop checks.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [ key: string ]: any;
}
