# extensions/

A drop-in folder for site-specific customization - custom post types, panel
components, single-post templates, and styles - that's kept separate from the
core theme (`api/`, `app/`) so core files never need to be touched to add one.

Everything in here is **auto-discovered**. Drop a correctly-named/located file
in and it's picked up automatically, with one exception: a new panel type also
has to be added to the panel type list in wp-admin with the `devo_panel_types`
filter, or editors can't choose it (see "Panel components" below).

This folder is part of the theme, so updating the theme from a zip replaces it
along with everything else. Keep it under your own version control (a fork of
the theme repository is simplest), and build TSX/SCSS changes from a git
checkout: the release zip has no build setup. See "Customising" in the main
README.

## Structure

```
extensions/
├── api/
│   ├── classes/post-types/  # Custom post type classes: class-{slug}.php
│   └── *.php                 # Flat include files (routes, helpers, ...)
└── app/
    ├── components/
    │   ├── panels/            # Panel components: PascalCaseName.tsx
    │   └── templates/single/  # Single-post templates: PascalCaseName.tsx
    └── styles/
        └── extensions-global.scss  # Global styles, loaded on every page
```

## Post type classes (`api/classes/post-types/`)

Same base class and conventions as core post types - see
`api/classes/post-types/NEW_POST_TYPE_TEMPLATE.php` for the full guide to
writing a `DO_Custom_Post_Type` subclass (it's the same mechanism; only the
folder differs).

File naming is load-bearing: `class-{whatever}.php`, e.g. `class-case-study.php`.
Every matching file in this folder is `require_once`'d on `after_setup_theme`
(priority 0), right after the core post types load - so `DO_Custom_Post_Type`
is always available to extend, and there's no `$post_types` array to edit.

If a post type has panel-style content, register its panel types with the
`devo_panel_types` filter (see `api/classes/post-types/class-landing-page.php`'s
`set_panel_types()`) instead of editing that file directly:

```php
add_filter( 'devo_panel_types', function ( $panel_types ) {
    $panel_types['custom-stats'] = [ 'label' => 'Custom Stats', 'value' => 'custom-stats' ];
    return $panel_types;
} );
```

## Flat includes (`api/*.php`)

Anything placed directly in `extensions/api/` (not its `classes/` subfolder)
is `require_once`'d immediately, in the same place the core theme includes
`api/functions.routes.php` etc. Use this for custom REST routes, shortcodes,
or standalone helper functions - anything that isn't a post type class.

## Panel components (`app/components/panels/`)

A `.tsx` file exporting a default `React.FC<PanelProps>` component, e.g.
`CustomStats.tsx`. Its PascalCase filename is converted to a kebab-case panel
type key (`CustomStats` -> `custom-stats`) and lazy-loaded by
`app/loaders/PanelLoader.tsx`. That key must match the `value` registered via
the `devo_panel_types` filter above so it's selectable in wp-admin.

A core panel with the same key always wins - extension panels can't override
a built-in panel type, only add new ones.

## Single-post templates (`app/components/templates/single/`)

Same pattern as panels: a `.tsx` file exporting a default
`React.FC<TemplateProps>`, e.g. `CaseStudy.tsx` -> key `case-study`, picked
up by `app/loaders/TemplateLoader.tsx`. The key must match the post type's
REST base: its `rest_slug` setting, or its `slug` when `rest_slug` isn't set.

URLs use the `slug` (`/{slug}/{post-name}/`). When `rest_slug` differs (say
`'slug' => 'work'` and `'rest_slug' => 'case-study'`), `TemplateLoader` looks
the REST base up in `window.devoRestBases`, which `devo_js_globals()` builds
from every public post type, so `/work/acme/` loads `/wp/v2/case-study` and
renders `CaseStudy.tsx`. Nothing needs registering.

Media items have no core template. `/media/{slug}/` maps to the theme's
`/wp/v2/media-library/` route, so a `MediaLibrary.tsx` template (key
`media-library`) is what renders them; until one exists those URLs show the
404 page.

Extension TSX is type-checked with the rest of the app, so `npm run build`
fails on a type error in a panel or template.

## Styles (`app/styles/extensions-global.scss`)

A real Vite entry point (see `vite.config.ts`), enqueued on every front-end
page immediately after `devo-global.css` so extension styles can build on
core abstracts/utilities and override them if needed. `@use` the core
abstracts the same way core component styles do, e.g.
`@use '@/styles/abstracts/color' as *;`.
