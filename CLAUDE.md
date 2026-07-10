# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Vite build in watch mode (development)
npm run build      # TypeScript check + Vite build (production)
```

There are no test commands. TypeScript (`tsc -b`) is the only static check; run it as part of `npm run build`.

## Architecture

This is a **hybrid-headless WordPress theme** for Astraea Foundation. PHP handles the CMS and a custom REST API; a React/TypeScript SPA (built with Vite) consumes that API and renders all front-end pages.

### How it fits together

`functions.php` reads the Vite manifest at `public/dist/.vite/manifest.json` and enqueues the compiled bundle into every WordPress page. `header.php` renders a `<div id="root">` and injects PHP globals (`window.devoEnv`, `window.homeURL`, `window.relativeHomeURL`) into the page. React mounts into `#root` and takes over all routing.

Vite entry points:
- `app/index.tsx` — React app
- `app/styles/devo-global.scss` — Front-end global styles
- `app/styles/devo-admin.scss` — WP admin styles
- `app/styles/devo-login.scss` — WP login styles

The `@` path alias resolves to `app/`.

### React routing & rendering chain

```
index.tsx (BrowserRouter)
  └── Layout.tsx              — Header + Footer wrapper
        └── TemplateLoader    — fetches post from REST API, picks template component
              ├── LandingPage — flexible panel-based pages
              ├── Blog / SimplePage / Form — single-purpose templates
              └── Page404
```

`TemplateLoader` calls `getPost(postType, slug)` → `GET /wp-json/wp/v2/{postType}?slug={slug}`. All templates receive the full `Post` object (see `app/utils/types/Post.ts`).

`LandingPage` reads `{meta_prefix}_panel_count` from `post.fields`, then renders that many `<Panel>` components numbered 1–N. `Panel` reads `{meta_prefix}_panel_type_{N}` to decide which panel component to render via `PanelLoader`.

Available panel types (in `PanelLoader.tsx`): `accordion`, `blocks`, `cta`, `form`, `gallery`, `posts`, `quotes`, `search`, `stats`, `tabs`, `text`, `text-media`.

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

### Custom REST API routes (`api/functions.routes.php`)

| Route | Purpose |
|---|---|
| `GET /wp-json/wp/v2/menu/` | All nav menu locations |
| `GET /wp-json/wp/v2/archive/` | Filterable post archive (post_type, subject, region, orderby, featured) |
| `GET /wp-json/wp/v2/devo-form/?formID=` | Form field definitions |
| `GET /wp-json/wp/v2/devo-form-submit/` | Form submission handler |
| `GET /wp-json/wp/v2/get-option/?name=` | `get_option()` proxy |

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

SCSS with `@use` module system. Abstracts (`app/styles/abstracts/`): `_color.scss` (all HSL values), `_breakpoint.scss`, `_font.scss`, `_size.scss`, `_block.scss` (grid mixins), `_mixin.scss`. Component styles are imported directly inside their React component files.

Dark/light theme is toggled via `document.documentElement.dataset.theme = 'dark' | 'light'` and styled with `html[data-theme="dark"]` / `html[data-theme="light"]` CSS selectors (see `app/styles/base/_theme.scss`).

### Environment

`window.devoEnv` (and `DO_ENVIRONMENT` in PHP) is one of `local`, `dev`, `stg`, `prod`. API calls log the endpoint URL in non-prod environments. WP admin color scheme varies by environment.
