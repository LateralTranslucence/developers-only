/*
 * postcss-layer-framework
 *
 * Wraps the framework's compiled CSS in a single `@layer framework { … }` so the
 * extensions layer can override it with plain, low-specificity selectors.
 *
 * -- Why this exists ---------------------------------------------------------
 *
 * Component styles are imported from inside lazily-loaded React components, and
 * `cssCodeSplit` emits one stylesheet per chunk. Those chunk stylesheets are not
 * enqueued by PHP at all - Vite injects a <link> for them at runtime, when the
 * chunk loads. They therefore land in <head> *after* extensions-global.css and
 * win every specificity tie on source order alone. The previous workaround was
 * to prefix every extension selector with `#root`, buying an id's worth of
 * specificity; this replaces that with the cascade feature designed for the job.
 *
 * Cascade layers rank below unlayered CSS, so once the framework is layered the
 * extensions layer wins by virtue of being unlayered - no id prefix, no
 * specificity matching, and load order stops mattering entirely.
 *
 * -- Two deliberate exclusions ----------------------------------------------
 *
 * 1. Admin and login stylesheets are never layered. They are enqueued alongside
 *    WordPress core's own admin CSS, which is unlayered; layering the theme's
 *    would put core *above* it and break the admin UI.
 *
 * 2. Anything under extensions/ is never layered - that is the whole point.
 *
 * -- Known trade-off ---------------------------------------------------------
 *
 * Layered CSS also loses to unlayered third-party CSS, so a plugin that enqueues
 * front-end styles would now outrank the framework. That is largely theoretical
 * here: the SPA renders every front-end page, so plugin CSS has almost no theme
 * markup to attach to, and the framework's selectors are BEM-scoped.
 *
 * -- !important -------------------------------------------------------------
 *
 * Important declarations invert layer order: an `!important` inside a layer
 * beats an unlayered `!important`. Any framework rule that the extensions layer
 * is expected to override must therefore not use `!important`.
 */

const path = require( 'path' );

// At-rules that must stay at the top of a stylesheet, outside the layer block.
const PREAMBLE_AT_RULES = new Set( [ 'charset', 'import', 'namespace' ] );

const toPosix = ( value ) => value.split( path.sep ).join( '/' );

module.exports = ( opts = {} ) => {
    const layerName = opts.layer || 'framework';
    // Only stylesheets whose source path contains one of these gets wrapped.
    const include = ( opts.include || [ 'app/styles/' ] ).map( toPosix );
    // ...unless it also matches one of these.
    const exclude = ( opts.exclude || [ 'extensions/', 'app/styles/admin', 'app/styles/login' ] ).map( toPosix );
    const debug = !! opts.debug;

    return {
        postcssPlugin: 'postcss-layer-framework',

        Once( root, { AtRule, result } ) {
            const from = result.opts.from;
            // No source path means we can't tell framework from extension CSS;
            // wrapping blindly would be worse than not wrapping at all.
            if ( ! from ) {
                return;
            }
            const filePath = toPosix( from );

            if ( ! include.some( ( fragment ) => filePath.includes( fragment ) ) ) {
                return;
            }
            if ( exclude.some( ( fragment ) => filePath.includes( fragment ) ) ) {
                if ( debug ) {
                    console.log( `[layer-framework] skip ${ filePath }` );
                }
                return;
            }

            // Collect everything that belongs inside the layer, leaving @charset
            // and @import where they are - both are invalid after other rules.
            const moved = [];
            root.each( ( node ) => {
                if ( node.type === 'atrule' ) {
                    const name = node.name.toLowerCase();
                    if ( PREAMBLE_AT_RULES.has( name ) ) {
                        return;
                    }
                    // Never nest a layer inside another layer.
                    if ( name === 'layer' ) {
                        return;
                    }
                }
                moved.push( node );
            } );

            if ( ! moved.length ) {
                return;
            }

            const layer = new AtRule( { name: 'layer', params: layerName } );
            // Preserve the original formatting style of the file.
            layer.raws.between = ' ';
            layer.raws.after = '\n';
            root.append( layer );
            moved.forEach( ( node ) => {
                node.remove();
                layer.append( node );
            } );

            if ( debug ) {
                console.log( `[layer-framework] wrapped ${ moved.length } node(s) in ${ filePath }` );
            }
        },
    };
};

module.exports.postcss = true;
