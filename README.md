# {DevelopersOnly}

A hybrid-headless WordPress theme. PHP handles the CMS and a custom REST API; a React/TypeScript SPA (built with Vite) consumes that API and renders all front-end pages.

## Install

### Requirements

- WordPress 6.4 or later (tested up to 7.0.3)
- PHP 8.1 or later
- Pretty permalinks (any setting except "Plain"). Landing pages are served at `/{slug}/` and the SPA routes on the path.
- Node.js `^20.19.0 || >=22.12.0`, only if you build the front end yourself. `.nvmrc` pins Node 24 LTS.

### Get the theme

**From a release zip.** Upload `developers-only-<version>.zip` under *Appearance → Themes → Add New Theme → Upload Theme*, then activate it. To make the zip yourself from a checkout, run `npm run package`; it lands in `release/`.

**From a git checkout.** Clone the repository into `wp-content/themes/developers-only`. The compiled bundle in `public/dist/` is committed, so the theme works as soon as you activate it under *Appearance → Themes*. To rebuild after changing the front end:

```bash
nvm use            # or any Node ^20.19.0 || >=22.12.0
npm ci
npm run build
```

### Environment

The theme uses an environment of `local`, `dev`, `stg` or `prod`. It controls asset cache-busting, endpoint logging in the browser console (everywhere except `prod`), `noindex` on `dev` and `stg`, and the admin colour scheme.

Defining it is optional. You can pin it in `wp-config.php`:

```php
define( 'DO_ENVIRONMENT', 'prod' );
```

Without that define, the theme derives it from WordPress's own `wp_get_environment_type()` (set with `WP_ENVIRONMENT_TYPE`):

| `wp_get_environment_type()` | `DO_ENVIRONMENT` |
|---|---|
| `local` | `local` |
| `development` | `dev` |
| `staging` | `stg` |
| `production` (WordPress's default) | `prod` |

### Content

- **Home page.** The front page (`/`) is the Landing Page whose slug is `home`. Create one after activating the theme.
- **Documentation.** `documentation.wxr.xml` holds a Landing Page, served at `/documentation/`, that documents the theme's panels and fields. Import it under *Tools → Import → WordPress* (this needs the WordPress Importer plugin). Activate the theme first, so its post types exist when the import runs.
- **Menus.** Assign menus to the Top, Main, Social and Legal Footer locations under *Appearance → Menus*.

### Customising

Site-specific code goes in `extensions/`, not in the core `api/` and `app/` folders. It can hold custom post types, REST routes, panels, single-post templates and a global stylesheet, and all of it is auto-discovered, so you never edit core files and theme updates don't overwrite your work. See [`extensions/README.md`](extensions/README.md).

## Commands

```bash
npm run dev        # Vite build in watch mode, with source maps (development)
npm run build      # TypeScript check + Vite build + cascade-layer check (production)
npm run lint       # ESLint
npm run package    # build, then write an installable theme zip to release/
```

These need Node `^20.19.0 || >=22.12.0`. On older versions `npm install` stops with an EBADENGINE error.

The release zip contains the PHP, `public/` (including the built `public/dist/`), `languages/`, `extensions/`, `style.css`, `screenshot.png`, `LICENSE`, this README and `documentation.wxr.xml`. It leaves out the `app/` source, `node_modules/`, source maps, dotfiles and dev configs.

## Structure

```
developers-only/
├── api/                     # PHP: custom post types, REST routes, helpers
│   ├── classes/             # DO_* classes (post types in classes/post-types/)
│   └── fields/              # PHP field definitions
├── app/                     # React/TypeScript SPA source
│   ├── components/
│   │   ├── forms/           # Form field components
│   │   ├── layout/          # Header, Footer, PanelWrapper, CookieConsent
│   │   ├── panels/          # Landing-page panel components
│   │   ├── shared/          # Reusable components (CTA, Heading, Modal, ...)
│   │   └── templates/       # Page templates (LandingPage, SimplePage, Form, Page404)
│   ├── loaders/             # Dynamic component loaders (Template/Panel/Partial)
│   ├── styles/              # SCSS (abstracts, base, components, pages)
│   ├── utils/               # API calls, helpers, hooks, stores, types
│   └── index.tsx            # SPA entry point
├── build/                   # Build scripts (cascade-layer PostCSS plugin and check, release packager)
├── extensions/              # Drop-in site customisations (see extensions/README.md)
├── languages/               # Translation template
├── public/
│   ├── dist/                # Vite build output (enqueued via manifest)
│   ├── images/              # Static images
│   └── js/                  # Static JavaScript (wp-admin)
├── functions.php            # Theme setup, class loading, asset enqueueing
├── header.php / footer.php  # Document shell
├── index.php                # Renders <div id="root">; React mounts into it
└── documentation.wxr.xml    # Importable documentation page
```

## How it fits together

`functions.php` reads the Vite manifest at `public/dist/.vite/manifest.json`, enqueues the compiled bundle, and injects PHP globals (`window.devoEnv`, `window.homeURL`, `window.relativeHomeURL`, `window.devoCookieConsentText`) via `devo_js_globals()`. `header.php` opens the document and `index.php` renders the `<div id="root">`. React mounts into `#root` and takes over routing.

See `CLAUDE.md` for a deeper architecture walkthrough (panel system, custom post types, REST routes, field helpers).
