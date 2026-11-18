# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Vite build in watch mode, with source maps (development)
npm run build      # TypeScript check + Vite build + verify:layers (production)
npm run lint       # ESLint
npm run package    # build, then write an installable theme zip to release/
```

Node `^20.19.0 || >=22.12.0` is required (Vite 8 and ESLint 10); `.nvmrc` pins
24 LTS, so run `nvm use` first. On older Node, `npm install` fails with
EBADENGINE (`.npmrc` sets `engine-strict`).

The theme itself needs WordPress 6.4+ and PHP 8.1+ (the `Requires` headers in
`style.css`). The PHP uses 8.1 features such as `new` in parameter defaults and
`array_is_list()`, so don't lower that floor without removing them.

There are no test commands. The static checks are TypeScript (`tsc -b`, run by
`npm run build`) and ESLint (`npm run lint`).

Production builds emit no source maps; `npm run dev` passes `--sourcemap`, and
those maps are gitignored. `build/package.cjs` (behind `npm run package`)
decides what goes in the release zip: no `app/` source, dev configs, dotfiles
or `.map` files, but `public/dist` and the `extensions/` source are kept.
`release/` is gitignored.

## Architecture

This is a **hybrid-headless WordPress theme**. PHP handles the CMS and a custom REST API; a React/TypeScript SPA (built with Vite) consumes that API and renders all front-end pages.

### How it fits together

`functions.php` reads the Vite manifest at `public/dist/.vite/manifest.json` and enqueues the compiled bundle into every WordPress page (with `$ver = null` — a `?ver=` query on the module script would double-evaluate the entry and mount a second React root). `header.php` opens the document (including `<body>`, `body_class()` and `wp_body_open()`) and `index.php` renders the `<div id="root">`; `devo_js_globals()` injects PHP globals (`window.devoEnv`, `window.homeURL`, `window.relativeHomeURL`, `window.devoCookieConsentText`). React mounts into `#root` and takes over all routing.

The theme ships no analytics. `CookieConsent.tsx` records the visitor's choice in the `devo_cookie_consent` cookie and dispatches a `devo:cookie-consent` DOM event, so an extension can gate its own tags either server-side (read the cookie on `wp_head`) or client-side (listen for the event). Copy for the banner comes from the `devo_cookie_consent_text` filter.

Vite entry points:
- `app/index.tsx` — React app
- `app/styles/devo-global.scss` — Front-end global styles
- `extensions/app/styles/extensions-global.scss` — Extension global styles (loaded after devo-global)
- `app/styles/admin.scss` — WP admin styles (deliberately unlayered)
- `app/styles/login.scss` — WP login styles (deliberately unlayered)

The `@` path alias resolves to `app/`.

### React routing & rendering chain

```
index.tsx (BrowserRouter)
  └── SiteShell.tsx                 — Header; stays mounted across navigation
        └── Layout.tsx              — one page view per route: <main>, loading state, Footer
              └── TemplateLoader    — fetches post from REST API, picks template component
                    ├── LandingPage — flexible panel-based pages
                    ├── SimplePage / Form — single-purpose templates
                    ├── extension templates (extensions/app/components/templates/single/)
                    └── Page404
```

`/iframe/...` routes render `Layout` without `SiteShell` (no header or footer), for content shown inside modals.

`TemplateLoader` calls `getPost(postType, slug)` → `GET /wp-json/wp/v2/{postType}?slug={slug}`. All templates receive the full `Post` object (see `app/utils/types/Post.ts`).

`LandingPage` reads `{meta_prefix}_panel_count` from `post.fields`, then renders that many `<Panel>` components numbered 1–N. `Panel` reads `{meta_prefix}_panel_type_{N}` to decide which panel component to render via `PanelLoader`.

Available panel types (in `PanelLoader.tsx`): `accordion`, `blocks`, `cta`, `decision-tree`, `featured-media`, `featured-post`, `form`, `gallery`, `posts`, `quotes`, `search`, `stats`, `tabs`, `text`, `text-media`.

`PartialTemplateLoader` handles individual post cards rendered inside panels. It selects a sub-template by view type (`block`, `list`, `simple`) and post type.

### PHP custom post type system

**No ACF.** All custom fields go through `DO_Custom_Post_Type` in `api/classes/`.

`DO_Custom_Post_Type` is an abstract singleton base class. Every post type subclasses it and implements four methods:

```php
protected function post_type(): string       // e.g. 'devo_landing_page'
protected function post_type_args(): array   // WP register_post_type() args
protected function settings(): array         // meta prefix, SEO config, panel config, etc.
protected function meta_fields(): array      // [ 'Box Name' => [ 'Field Label' => 'field_type' ] ]
protected function admin_fields(): array     // fields shown in WP admin list columns
```

Instantiate with `DO_POST_TYPE::get_instance()` (see `NEW_POST_TYPE_TEMPLATE.php` for the boilerplate).

Post types live in `api/classes/post-types/`. They are loaded in `functions.php` via `devo_load_classes()`.

**Meta field key convention:** keys are `{meta_prefix}_{snake_case_label}`. The prefix is the last segment of the post type slug (e.g. `devo_landing_page` → prefix `page`). Panel fields append a number: `page_panel_type_1`, `page_title_1`, etc.

`DO_Form_Field_API_Display` serializes stored meta into typed REST API output (handles `media`, `date`, `binary`, `ctas`, `address`, etc.). `DO_Form_Field_Display` renders the admin edit form. `DO_Form_Field_Validate` sanitizes form submissions.

### Extensions (`extensions/`)

A drop-in folder for site-specific customization, kept separate from the core
theme (`api/`, `app/`) so core files never need to be edited to add a custom
post type, panel, template, or style. Everything in it is auto-discovered —
see `extensions/README.md` for the full guide. Summary:

- `extensions/api/classes/post-types/class-*.php` — `DO_Custom_Post_Type`
  subclasses, `require_once`'d on `after_setup_theme` (priority 0) right
  after core post types load. No `$post_types` array to edit.
- `extensions/api/*.php` — flat include files (routes, helpers), loaded
  immediately alongside the core `api/functions.*.php` includes.
- `extensions/app/components/panels/PascalCaseName.tsx` — panel components,
  auto-discovered by `PanelLoader.tsx` via `import.meta.glob()`; filename is
  converted to a kebab-case panel type key (`CustomStats` → `custom-stats`).
  Register the matching key in wp-admin via the `devo_panel_types` filter
  hook in `set_panel_types()` (`class-landing-page.php`).
- `extensions/app/components/templates/single/PascalCaseName.tsx` —
  single-post templates, auto-discovered by `TemplateLoader.tsx` the same
  way; the key must match the post type's REST slug.
- `extensions/app/styles/extensions-global.scss` — its own Vite entry,
  enqueued on every page immediately after `devo-global.css`.

In all cases, a core panel/template with the same key wins on collision —
extensions can only add new types, not override built-in ones.

### Custom REST API routes (`api/functions.routes.php`)

| Route | Purpose |
|---|---|
| `GET /wp-json/wp/v2/menu/` | All nav menu locations |
| `GET /wp-json/wp/v2/archive/` | Filterable post archive (post_type, subject, region, orderby, featured) |
| `GET /wp-json/wp/v2/devo-form/?formID=` | Form field definitions |
| `POST /wp-json/wp/v2/devo-form-submit/` | Form submission handler (urlencoded body) |
| `GET /wp-json/wp/v2/devo-search/` | Search panel results + resolved filter UI |

Do not add a `get_option()` proxy route: options can contain secrets. Site options
needed by the frontend are injected as `window.*` globals in `devo_js_globals()`
(`functions.php`) instead.

Standard WP REST routes for each post type are registered automatically by `DO_Custom_Post_Type`.

All post REST responses are enriched by `devo_api_custom_data()` in `api/functions.helpers.php`, which adds `fields`, `post_thumbnail`, `permalink`, `seo_*`, `schema`, and `post_type_details`.

### Frontend field helpers (`app/utils/helpers/`)

All helpers are re-exported from `@/utils/helpers`. Use these to read from `post.fields`:

```ts
getStringField(fields, key, fallback?)   // → string
getArrayField<T>(fields, key)            // → T[]
getBooleanField(fields, key)             // → boolean
getNumberField(fields, key)              // → number
getMediaField(fields, key)               // → Media
getBackgroundField(fields, key)          // → BackgroundProps
panelClasses(BackgroundProps)            // → string[] of CSS class names
```

`metaFieldKey(fieldLabel, metaPrefix)` mirrors PHP's `devo_meta_field_key()` and converts a human-readable field label to its storage key.

### Styling

SCSS with `@use` module system. Abstracts (`app/styles/abstracts/`): `_breakpoint.scss`, `_color.scss`, `_font.scss`, `_function.scss`, `_size.scss`, `_mixin.scss`. Component styles are imported directly inside their React component files.

The colour abstracts are now only consumed by `admin.scss` and `login.scss` — the front-end framework references no colour variables at all. Those two stylesheets are also deliberately excluded from the cascade layer (see below), because they load alongside unlayered WordPress core admin CSS.

Class naming is BEM (`.block__element--modifier`), and every selector carries its
element (`ul.blocks`, `li.blocks__item`) unless a class is deliberately open-ended
(e.g. `.blocks__link`, which may render as `<a>`, `<span>`, or a router `<Link>`).

Framework styles are structural/layout only - no brand colors, backgrounds, or
shadows. The test for whether a rule belongs in the framework is whether the
built-in functionality stops working without it: layout and grid structure,
open/closed and hidden state, UA chrome resets on `<button>`/`<dialog>`, icon
glyphs, aspect-ratio boxes, focus visibility, and the `.screenReader` utility all
stay. Type scale, colour, spacing values, borders, shadows and motion do not -
they belong to the theming layer.

#### Cascade layers

The framework's compiled CSS is wrapped in `@layer framework` by
`build/postcss-layer-framework.cjs`; the extensions layer is deliberately left
unlayered, and unlayered CSS outranks every layer. That is what lets a theme
override the framework with plain selectors, regardless of specificity or of when
Vite injects a code-split component stylesheet at runtime.

Two constraints follow:

- `.browserslistrc` must only list targets that support cascade layers. Lightning
  CSS silently strips `@layer` and hoists its contents otherwise, which inverts
  the cascade with no build error. `npm run build` runs `verify:layers` to catch
  this.
- `!important` reverses layer order, so a framework rule marked `!important`
  beats an unlayered one in the theme. The framework avoids `!important` for
  anything a theme is expected to override.

### Environment

`window.devoEnv` (and `DO_ENVIRONMENT` in PHP) is one of `local`, `dev`, `stg`, `prod`. A site can pin it with `define( 'DO_ENVIRONMENT', 'prod' );` in `wp-config.php`; when it's undefined, `functions.php` derives it from `wp_get_environment_type()` (`local` → `local`, `development` → `dev`, `staging` → `stg`, `production` → `prod`; anything else → `prod`). API calls log the endpoint URL in non-prod environments, `dev` and `stg` are noindexed, and the WP admin color scheme varies by environment.
