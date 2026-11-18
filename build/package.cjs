/**
 * Writes an installable theme zip to release/.
 *
 * Run through `npm run package`, which builds first. The zip holds a single
 * `developers-only/` folder, so it can be uploaded as-is under
 * Appearance > Themes > Add New > Upload Theme.
 *
 * Plain Node, no dependencies: zlib does the deflating and the zip container
 * is written by hand below (no zip64, so the theme must stay under 4 GB and
 * 65,535 files, which it does by a wide margin).
 *
 * What goes in: everything in the theme directory except the paths in
 * EXCLUDE below (dev tooling, React source, build output that isn't needed at
 * runtime). public/dist ships as built. extensions/ ships with its source,
 * because it is the documented drop-in point for site customisations.
 */
'use strict';

const fs = require( 'fs' );
const path = require( 'path' );
const zlib = require( 'zlib' );

const ROOT = path.resolve( __dirname, '..' );
const THEME_SLUG = 'developers-only';
const OUT_DIR = path.join( ROOT, 'release' );

// Root-level entries that are for developing the theme, not running it.
const EXCLUDE_ROOT = new Set( [
    'app',                  // React/TypeScript source; public/dist is the build
    'build',                // build scripts (this file included)
    'release',              // previous zips
    'node_modules',
    'CLAUDE.md',
    'eslint.config.js',
    'postcss.config.cjs',
    'package.json',
    'package-lock.json',
    'vite.config.d.ts',
] );

// Root-level name patterns for dev configs (tsconfig.json, tsconfig.app.json,
// vite.config.ts, tsconfig.tsbuildinfo, ...).
const EXCLUDE_ROOT_PATTERNS = [
    /^tsconfig.*$/,
    /^vite\.config\./,
];

// Names excluded at any depth.
const EXCLUDE_ANYWHERE = new Set( [
    'node_modules',
    '.DS_Store',
    'Thumbs.db',
] );

// File patterns excluded at any depth.
const EXCLUDE_FILE_PATTERNS = [
    /\.map$/,               // source maps (only dev builds write them)
    /\.tsbuildinfo$/,
    /\.(bak|swp)$/,
    /^~/,
];

/**
 * Dotfiles and dot-directories (.git, .claude, .nvmrc, .npmrc, .gitignore,
 * .browserslistrc, ...) are excluded everywhere except Vite's manifest
 * directory, which functions.php reads to enqueue the bundle.
 */
function isAllowedDotEntry( relPath ) {
    return relPath === 'public/dist/.vite' || relPath.startsWith( 'public/dist/.vite/' );
}

function isExcluded( relPath, name, isDir ) {
    const atRoot = ! relPath.includes( '/' );

    if ( name.startsWith( '.' ) && ! isAllowedDotEntry( relPath ) ) {
        return true;
    }
    if ( EXCLUDE_ANYWHERE.has( name ) ) {
        return true;
    }
    if ( atRoot && ( EXCLUDE_ROOT.has( name ) || EXCLUDE_ROOT_PATTERNS.some( ( re ) => re.test( name ) ) ) ) {
        return true;
    }
    if ( ! isDir && EXCLUDE_FILE_PATTERNS.some( ( re ) => re.test( name ) ) ) {
        return true;
    }
    return false;
}

/** Walks the theme directory and returns sorted entries to package. */
function collect( dir = ROOT, rel = '' ) {
    const entries = [];
    const names = fs.readdirSync( dir ).sort();

    for ( const name of names ) {
        const abs = path.join( dir, name );
        const relPath = rel ? `${ rel }/${ name }` : name;
        const stat = fs.lstatSync( abs );

        if ( stat.isSymbolicLink() ) {
            // A symlink would either break or pull in something outside the
            // theme once unzipped on a server.
            throw new Error( `Refusing to package a symlink: ${ relPath }` );
        }
        if ( isExcluded( relPath, name, stat.isDirectory() ) ) {
            continue;
        }
        if ( stat.isDirectory() ) {
            entries.push( { relPath, isDir: true, mtime: stat.mtime } );
            entries.push( ...collect( abs, relPath ) );
        } else if ( stat.isFile() ) {
            entries.push( { relPath, isDir: false, mtime: stat.mtime, abs } );
        }
    }
    return entries;
}

/** Reads a header field ("Version: 1.0.0") from style.css. */
function themeHeader( field ) {
    const css = fs.readFileSync( path.join( ROOT, 'style.css' ), 'utf8' );
    const match = css.match( new RegExp( `^[ \\t/*#@]*${ field }:(.*)$`, 'mi' ) );
    return match ? match[ 1 ].trim() : '';
}

// ---------------------------------------------------------------------------
// Minimal zip writer
// ---------------------------------------------------------------------------

const CRC_TABLE = ( () => {
    const table = new Uint32Array( 256 );
    for ( let n = 0; n < 256; n++ ) {
        let c = n;
        for ( let k = 0; k < 8; k++ ) {
            c = c & 1 ? 0xedb88320 ^ ( c >>> 1 ) : c >>> 1;
        }
        table[ n ] = c >>> 0;
    }
    return table;
} )();

function crc32( buf ) {
    if ( typeof zlib.crc32 === 'function' ) {
        return zlib.crc32( buf ) >>> 0;
    }
    let crc = 0xffffffff;
    for ( let i = 0; i < buf.length; i++ ) {
        crc = CRC_TABLE[ ( crc ^ buf[ i ] ) & 0xff ] ^ ( crc >>> 8 );
    }
    return ( crc ^ 0xffffffff ) >>> 0;
}

/** Date to MS-DOS time/date words (local time, 2-second resolution). */
function dosDateTime( date ) {
    const year = Math.max( date.getFullYear(), 1980 );
    return {
        time: ( date.getHours() << 11 ) | ( date.getMinutes() << 5 ) | Math.floor( date.getSeconds() / 2 ),
        date: ( ( year - 1980 ) << 9 ) | ( ( date.getMonth() + 1 ) << 5 ) | date.getDate(),
    };
}

function writeZip( outFile, entries ) {
    const chunks = [];
    const central = [];
    let offset = 0;

    for ( const entry of entries ) {
        const name = Buffer.from( entry.isDir ? `${ entry.name }/` : entry.name, 'utf8' );
        const data = entry.isDir ? Buffer.alloc( 0 ) : fs.readFileSync( entry.abs );
        const deflated = entry.isDir ? data : zlib.deflateRawSync( data, { level: 9 } );
        // Store rather than deflate when deflating doesn't help (fonts, images).
        const method = ! entry.isDir && deflated.length < data.length ? 8 : 0;
        const body = method === 8 ? deflated : data;
        const crc = entry.isDir ? 0 : crc32( data );
        const { time, date } = dosDateTime( entry.mtime );
        const flags = 0x0800; // UTF-8 file names

        const local = Buffer.alloc( 30 );
        local.writeUInt32LE( 0x04034b50, 0 );
        local.writeUInt16LE( 20, 4 );               // version needed to extract
        local.writeUInt16LE( flags, 6 );
        local.writeUInt16LE( method, 8 );
        local.writeUInt16LE( time, 10 );
        local.writeUInt16LE( date, 12 );
        local.writeUInt32LE( crc, 14 );
        local.writeUInt32LE( body.length, 18 );
        local.writeUInt32LE( data.length, 22 );
        local.writeUInt16LE( name.length, 26 );
        local.writeUInt16LE( 0, 28 );               // extra field length

        const header = Buffer.alloc( 46 );
        header.writeUInt32LE( 0x02014b50, 0 );
        header.writeUInt16LE( ( 3 << 8 ) | 20, 4 ); // made by: Unix, zip 2.0
        header.writeUInt16LE( 20, 6 );
        header.writeUInt16LE( flags, 8 );
        header.writeUInt16LE( method, 10 );
        header.writeUInt16LE( time, 12 );
        header.writeUInt16LE( date, 14 );
        header.writeUInt32LE( crc, 16 );
        header.writeUInt32LE( body.length, 20 );
        header.writeUInt32LE( data.length, 24 );
        header.writeUInt16LE( name.length, 28 );
        header.writeUInt16LE( 0, 30 );              // extra field length
        header.writeUInt16LE( 0, 32 );              // comment length
        header.writeUInt16LE( 0, 34 );              // disk number
        header.writeUInt16LE( 0, 36 );              // internal attributes
        // External attributes: Unix mode in the high word, MS-DOS directory
        // bit in the low byte.
        const mode = entry.isDir ? 0o40755 : 0o100644;
        header.writeUInt32LE( ( ( mode << 16 ) | ( entry.isDir ? 0x10 : 0 ) ) >>> 0, 38 );
        header.writeUInt32LE( offset, 42 );

        chunks.push( local, name, body );
        central.push( header, name );
        offset += local.length + name.length + body.length;
    }

    const centralSize = central.reduce( ( sum, buf ) => sum + buf.length, 0 );
    if ( entries.length > 0xffff || offset > 0xffffffff || offset + centralSize > 0xffffffff ) {
        throw new Error( 'Theme is too large for a non-zip64 archive.' );
    }

    const end = Buffer.alloc( 22 );
    end.writeUInt32LE( 0x06054b50, 0 );
    end.writeUInt16LE( 0, 4 );                      // this disk
    end.writeUInt16LE( 0, 6 );                      // disk with central directory
    end.writeUInt16LE( entries.length, 8 );
    end.writeUInt16LE( entries.length, 10 );
    end.writeUInt32LE( centralSize, 12 );
    end.writeUInt32LE( offset, 16 );
    end.writeUInt16LE( 0, 20 );                     // comment length

    fs.writeFileSync( outFile, Buffer.concat( [ ...chunks, ...central, end ] ) );
}

// ---------------------------------------------------------------------------

function main() {
    const manifest = path.join( ROOT, 'public/dist/.vite/manifest.json' );
    if ( ! fs.existsSync( manifest ) ) {
        throw new Error( 'public/dist/.vite/manifest.json is missing. Run `npm run build` first (or use `npm run package`, which builds).' );
    }

    const version = themeHeader( 'Version' );
    if ( ! version ) {
        throw new Error( 'Could not read Version from the style.css header.' );
    }
    const pkgVersion = require( path.join( ROOT, 'package.json' ) ).version;
    if ( pkgVersion && pkgVersion !== version ) {
        console.warn( `Warning: style.css Version (${ version }) differs from package.json version (${ pkgVersion }). Using ${ version }.` );
    }

    const files = collect();
    for ( const required of [ 'style.css', 'functions.php', 'index.php', 'public/dist/.vite/manifest.json' ] ) {
        if ( ! files.some( ( f ) => f.relPath === required ) ) {
            throw new Error( `Required file missing from package: ${ required }` );
        }
    }

    const entries = [
        { name: THEME_SLUG, isDir: true, mtime: new Date() },
        ...files.map( ( f ) => ( { ...f, name: `${ THEME_SLUG }/${ f.relPath }` } ) ),
    ];

    fs.mkdirSync( OUT_DIR, { recursive: true } );
    const outFile = path.join( OUT_DIR, `${ THEME_SLUG }-${ version }.zip` );
    fs.rmSync( outFile, { force: true } );
    writeZip( outFile, entries );

    const fileCount = files.filter( ( f ) => ! f.isDir ).length;
    const topLevel = [ ...new Set( files.map( ( f ) => f.relPath.split( '/' )[ 0 ] ) ) ];
    const size = ( fs.statSync( outFile ).size / 1024 ).toFixed( 1 );
    console.log( `Packaged ${ fileCount } files (${ size } KB) into ${ path.relative( ROOT, outFile ) }` );
    console.log( `Contents of ${ THEME_SLUG }/: ${ topLevel.join( ', ' ) }` );
}

try {
    main();
} catch ( error ) {
    console.error( error.message );
    process.exit( 1 );
}
