#!/usr/bin/env node
/*
 * Post-build assertion for the cascade-layer setup.
 *
 * The framework's CSS must ship wrapped in `@layer framework`, and the
 * extensions layer must ship unlayered - that pairing is what lets extension
 * authors override the framework with plain selectors instead of `#root` id
 * hacks.
 *
 * It can break silently. Lightning CSS strips `@layer` and hoists its contents
 * whenever a browserslist target lacks support, so widening .browserslistrc, or
 * a browser-data update that re-admits an old target, quietly inverts the
 * cascade with no build error. This turns that into a failed build.
 */

const fs = require( 'fs' );
const path = require( 'path' );

const DIST = path.join( __dirname, '..', 'public', 'dist' );

// Must be wrapped in @layer framework.
const MUST_BE_LAYERED = [ 'devo-global.css', 'index.css' ];
// Must NOT be layered: the extensions layer wins by being unlayered, and the
// admin/login sheets sit alongside unlayered WordPress core CSS.
const MUST_BE_UNLAYERED = [ 'extensions-global.css', 'admin.css', 'login.css' ];

const failures = [];

const read = ( file ) => {
    const full = path.join( DIST, file );
    if ( ! fs.existsSync( full ) ) {
        return null;
    }
    return fs.readFileSync( full, 'utf8' );
};

const isLayered = ( css ) => /@layer\s+framework/.test( css );

for ( const file of MUST_BE_LAYERED ) {
    const css = read( file );
    if ( css === null ) {
        failures.push( `${ file }: missing from public/dist` );
    } else if ( css.trim() && ! isLayered( css ) ) {
        failures.push( `${ file }: expected "@layer framework" wrapper, found none - Lightning CSS has stripped the layer. Check .browserslistrc.` );
    }
}

for ( const file of MUST_BE_UNLAYERED ) {
    const css = read( file );
    if ( css !== null && isLayered( css ) ) {
        failures.push( `${ file }: must NOT be layered, but a "@layer framework" wrapper is present. Check the exclude list in build/postcss-layer-framework.cjs.` );
    }
}

// Every code-split component stylesheet is framework CSS and must be layered.
// These are the ones Vite injects at runtime, i.e. exactly the files the layer
// exists to outrank.
const known = new Set( [ ...MUST_BE_LAYERED, ...MUST_BE_UNLAYERED ] );
const chunkSheets = fs.existsSync( DIST )
    ? fs.readdirSync( DIST ).filter( ( f ) => f.endsWith( '.css' ) && ! known.has( f ) )
    : [];

for ( const file of chunkSheets ) {
    const css = read( file );
    // Vite emits a 1-byte placeholder for entries with no CSS; skip those.
    if ( css && css.trim() && ! isLayered( css ) ) {
        failures.push( `${ file }: component stylesheet is not layered` );
    }
}

if ( failures.length ) {
    console.error( '\nCascade-layer verification FAILED:\n' );
    failures.forEach( ( f ) => console.error( `  - ${ f }` ) );
    console.error( '' );
    process.exit( 1 );
}

console.log( `Cascade layers OK - ${ MUST_BE_LAYERED.length + chunkSheets.length } framework stylesheet(s) layered, ${ MUST_BE_UNLAYERED.length } deliberately unlayered.` );
