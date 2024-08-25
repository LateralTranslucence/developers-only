const { merge } = require( 'webpack-merge' );
const common = require( './webpack.common.js' );

module.exports = merge( common, {
    mode: 'production',
    optimization: {
        chunkIds: 'size',
        minimize: true,
    },
} );