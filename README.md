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

Site-specific code goes in `extensions/`, not in the core `api/` and `app/` folders. It can hold custom post types, REST routes, panels, single-post templates and a global stylesheet, and all of it is auto-discovered, so you never edit core files. See [`extensions/README.md`](extensions/README.md).

Keeping your work separate from core files makes updates easy to merge, but it doesn't protect `extensions/` from an update on its own:

- **Updating from a zip replaces the whole theme folder, `extensions/` included.** Back it up first, or don't update that way.
- **Keep `extensions/` under your own version control.** The simplest route is to fork this repository, commit your extensions there, and pull updates from upstream with git. Your work then survives every update, and the merge shows you anything that changed underneath it.
- **A child theme only covers part of it.** Extensions are discovered in this theme's own folder, and panels and templates are compiled into its bundle, so a child theme can't add them. A child theme's `functions.php` can still register post types (subclass `DO_Custom_Post_Type`), add REST routes and hook the theme's filters, and its stylesheet can override the framework.
- **Changing extension TSX or SCSS needs the repository, not the zip.** The release zip ships the `extensions/app/` source, but not `app/`, `package.json` or the Vite config that build it. Edit and rebuild in a git checkout (`npm ci && npm run build`), then deploy the result, `public/dist/` included. PHP extensions in `extensions/api/` need no build.

### Permissions

SVG uploads and `<iframe>` embeds can carry script, so the theme only allows them for users with the `unfiltered_html` capability. By default that's administrators and editors on a single site. On multisite only super admins have it, and `DISALLOW_UNFILTERED_HTML` removes it from everyone, so site admins there can't upload icons for the Icon post type or embed iframes.

To grant them anyway, filter `devo_allow_svg_uploads` (it receives the user) and `devo_allow_iframes`, from `extensions/api/` for example:

```php
add_filter( 'devo_allow_svg_uploads', function ( $allowed, $user ) {
    return $allowed || user_can( $user, 'manage_options' );
}, 10, 2 );
add_filter( 'devo_allow_iframes', function ( $allowed ) {
    return $allowed || current_user_can( 'manage_options' );
} );
```

Only grant them to people you'd trust with unfiltered HTML. An uploaded SVG is served as-is from `uploads/`, and the front end's sanitising doesn't apply when someone opens the file directly.

### SVG icons

Icons are inlined into the page so they can take `currentColor`, and the front end sanitises each one first. That keeps only SVG elements, so an icon file needs:

- `xmlns="http://www.w3.org/2000/svg"` on the root `<svg>`, and no namespace prefix (`<svg:svg>`). A file without it isn't shown.
- Presentation attributes (`fill="..."`) or `style="..."` attributes, not a `<style>` element. `<style>` is removed, because an inline SVG's rules apply to the whole page (and its `@import` would load). In Illustrator, export with **Styling: Presentation Attributes**.

Scripts, `<foreignObject>`, comments, event handlers, `javascript:` links, and HTML elements inside the SVG are removed as well.

### Forms: spam limits and proxies

Form submissions are throttled per client (5 per 10 minutes by default; `devo_form_rate_limit_max` and `devo_form_rate_limit_window` change that). The client is identified by `REMOTE_ADDR`.

**Behind Cloudflare, a load balancer or another reverse proxy, every request arrives from the proxy's address,** so all visitors share one allowance. Filter `devo_form_rate_limit_key` to return the real client address. Only read a header your proxy sets and overwrites, or a client can forge it to dodge the limit:

```php
// Cloudflare
add_filter( 'devo_form_rate_limit_key', function ( $key ) {
    return isset( $_SERVER['HTTP_CF_CONNECTING_IP'] ) ? $_SERVER['HTTP_CF_CONNECTING_IP'] : $key;
} );
```

If a form has confirmation-email copy, the confirmation goes to whatever address the visitor enters. That can be abused to send the confirmation to someone else, so it's limited to one per address per day (`devo_form_confirmation_recipient_window`) and 50 per hour site-wide (`devo_form_confirmation_hourly_max`). Return `false` from `devo_form_send_confirmation` to stop a send, for example to require double opt-in instead.

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

`functions.php` reads the Vite manifest at `public/dist/.vite/manifest.json`, enqueues the compiled bundle, and injects PHP globals (`window.devoEnv`, `window.homeURL`, `window.relativeHomeURL`, `window.devoCookieConsentText`, `window.devoSiteName`, `window.devoLocale`, `window.devoPrivacyPolicyURL`, `window.devoRestBases`) via `devo_js_globals()`. `header.php` opens the document and `index.php` renders the `<div id="root">`. React mounts into `#root` and takes over routing.

See `CLAUDE.md` for a deeper architecture walkthrough (panel system, custom post types, REST routes, field helpers).
