module.exports = {
    plugins: [
        require("postcss-preset-env"),
        // Runs last so anything preset-env generates ends up inside the layer.
        // See build/postcss-layer-framework.cjs for why the framework is layered
        // and the extensions layer deliberately is not.
        require("./build/postcss-layer-framework.cjs")({ debug: !!process.env.DEVO_LAYER_DEBUG }),
    ],
};
