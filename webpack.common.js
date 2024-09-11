const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' );
const defaults = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const newRules = [ 
    ...defaults.module.rules,
    {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    },
    {
        test: /\/assets\/styles\/\.(s[ac]|c)ss$/i,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
            'postcss-loader',
        ],
    },
];
module.exports = {
    ...defaults,
    cache: false,
    stats: {
        loggingDebug: [ 'sass-loader' ],
    },
    entry: { 
        main: './src/index.tsx', 
        styles: './assets/styles/developers-only.scss', 
        admin: './assets/styles/do-admin.scss',
        wplogin: './assets/styles/do-login.scss',
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    plugins: [ 
        new MiniCssExtractPlugin( {
            filename: '[name].css?v=' + new Date().getTime(),
            chunkFilename: '[id].css?v=' + new Date().getTime(),
            ignoreOrder: true,
        } ),
    ],
    module: {
        rules: newRules,
    },
    output: {
        // Clean the output directory before emit.
        clean: true, 
        // `filename` provides a template for naming your bundles (remember to use `[name]`)
        filename: '[name].bundle.js?v=' + new Date().getTime(),
        // `chunkFilename` provides a template for naming code-split bundles (optional)
        chunkFilename: '[name].bundle.js?v=' + new Date().getTime(),
        // `path` is the folder where Webpack will place your bundles
        path: path.resolve( __dirname, './build' ),
    },
    devtool: 'source-map',
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
        ],
    },
    resolve: {
        alias: {
          src: path.resolve(__dirname, 'src'),
          assets: path.resolve(__dirname, 'assets'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'], // Add other relevant file extensions here
    },
};


