# {DevelopersOnly}

A hybrid-headless WordPress theme. PHP handles the CMS and a custom REST API; a React/TypeScript SPA (built with Vite) consumes that API and renders all front-end pages.

## Commands

```bash
npm run dev        # Vite build in watch mode (development)
npm run build      # TypeScript check + Vite build (production)
npm run lint       # ESLint
```

## Structure

```
developers-only/
├── api/                     # PHP: custom post types, REST routes, helpers
│   ├── classes/             # DO_* classes (post types in classes/post-types/)
│   ├── fields/              # PHP field definitions
│   └── libs/                # PHP libraries (SendGrid, etc.)
├── app/                     # React/TypeScript SPA source
│   ├── components/
│   │   ├── forms/           # Form field components
│   │   ├── layout/          # Header, Footer, PanelWrapper, SearchForm
│   │   ├── panels/          # Landing-page panel components
│   │   ├── shared/          # Reusable components (CTA, Heading, Modal, ...)
│   │   └── templates/       # Page templates (LandingPage, Blog, Legal, ...)
│   ├── loaders/             # Dynamic component loaders (Template/Panel/Partial)
│   ├── styles/              # SCSS (abstracts, base, components, pages)
│   ├── utils/               # API calls, helpers, hooks, stores, types
│   └── index.tsx            # SPA entry point
├── public/
│   ├── dist/                # Vite build output (enqueued via manifest)
│   ├── images/              # Static images
│   └── js/                  # Static JavaScript
├── functions.php            # Theme setup, class loading, asset enqueueing
└── header.php / footer.php  # Document shell; React mounts into #root
```

## How it fits together

`functions.php` reads the Vite manifest at `public/dist/.vite/manifest.json` and enqueues the compiled bundle. `header.php` renders a `<div id="root">` and injects PHP globals (`window.devoEnv`, `window.homeURL`, `window.relativeHomeURL`, `window.devoLogo`). React mounts into `#root` and takes over routing.

See `CLAUDE.md` for a deeper architecture walkthrough (panel system, custom post types, REST routes, field helpers).
