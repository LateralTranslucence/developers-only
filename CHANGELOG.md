# Changelog

## 1.0.0 (unreleased)

The first public release. These notes cover what changed for sites and
integrations built on earlier, pre-release copies of the theme.

### REST API: scalar fields are now strings

Meta used to be JSON-decoded on every read, so any stored value that happened
to be valid JSON changed type on its way out: `"2024"` came back as the number
`2024`, `"1.50"` as `1.5`, `"true"` as `true` and `"null"` as `null`. Values
are now read back exactly as stored, and only JSON arrays, objects and strings
(values starting with `[`, `{` or `"`) are decoded.

So in the `fields` object of a post's REST response, a scalar field without
its own API-display method in `DO_Form_Field_API_Display` now comes back as a
**string**, not a number or boolean. That covers `int`, `number`, `select`,
`varchar` and `form` fields. The same goes for the `_menu_*` fields on
`nav_menu_item` REST objects: `_menu_mega_menu` is now `"1"`, not `1`.
Field types with a display method (`binary`, `date`, `media`, `ctas`,
`post_browser` and the rest) are unchanged.

Not everything without a display method is a string, though:

- `checkbox` and `select_multiple` fields are stored as JSON arrays, so they
  still come back as **arrays**.
- A value whose whole text is JSON-shaped is still decoded, whatever its field
  type. A `varchar` holding `["a","b"]` comes back as an array, and one
  holding `"quoted"` (quotes included) comes back as the string `quoted`.

If you consume the REST API outside this theme's front end:

- Parse numbers yourself (`Number( value )`, or `getNumberField()` from
  `@/utils/helpers`).
- **`"0"` is truthy in JavaScript.** A check like `if ( fields.some_count )`
  that relied on getting the number `0` now passes. Compare explicitly
  (`value === '1'`, `Number( value ) > 0`), or use `getNumberField()`, or
  `getBooleanField()`, which reads `"0"`, `"false"` and `""` as false.
- Values like `"2.10"` and `"1e3"` now keep the form they were typed in
  instead of turning into `2.1` and `1000`.

### Stored meta is unslashed once, on upgrade

Values used to be saved from wp-admin still slashed (`O\'Brien`) and unslashed
on every read. They are now stored as typed. A one-time upgrade rewrites the
old slashed values. It runs in wp-admin, the first time an administrator loads
a screen after the update, in batches, resuming on later admin requests if the
site has a lot of meta. Until it finishes, unconverted values show their
backslashes. The `devo_meta_unslashed` option is set once it's done.

### Form markup changes that can affect theme CSS

Forms were reworked for accessibility. If your theme styles forms, check these
selectors:

- **A field's error message is a `<span>`, not a `<label>`.** It is
  `span.form-field__error`, inside `ul.form-field__error-list`, and the
  field's input points at it with `aria-describedby`. A rule like
  `div.form-field > label` no longer matches the error, and one written for
  `label.form-field__error` matches nothing.
- **Checkbox groups are a `<fieldset>` with a `<legend>`.** The group's title
  used to be a `<label>`. It is now
  `div.form-field > fieldset.form-field__group > legend`, so
  `div.form-field > label` no longer styles it. Radio Buttons and Button
  Select (below) use the same structure. The framework removes the fieldset's
  browser border, padding and min-width.
- **The required asterisk is hidden from screen readers.**
  `span.form-field__required` now has `aria-hidden="true"`, and the field's
  input carries `aria-required` instead. A required checkbox group's legend
  also gets a visually hidden `span.screenReader` reading "required" after the
  asterisk, because a fieldset can't carry `aria-required`. A rule like
  `legend span` or `legend > span:last-child` now matches that span too.
- **The thank-you message is a focusable status container.** After a
  successful submission the form is replaced by
  `span.form__thank-you[role="status"][tabindex="-1"]`, which takes focus so
  it is read out. Browsers may draw a focus outline around it; style its
  `:focus-visible` if you want something else.

### Form fields: four new types, and new per-field settings

The form builder has always offered **Radio Buttons**, **Button Select**,
**Range Slider** and **Toggle**, but the front end rendered nothing for them.
A required radio field was invisible, so every submission failed. They now
render, and the submit route only accepts values they can produce.

| Field type (`field_type`) | Markup and BEM classes |
|---|---|
| Radio Buttons (`radio`) | `fieldset.form-field__group[role="radiogroup"]` with a `legend`; each option is `label.form-field__radio-label > input.form-field__radio[type="radio"]` |
| Button Select (`button_select`) | The same fieldset plus `.form-field__button-select`; each option is `li.form-field__button-select-option` holding `input.form-field__button-select-input[type="radio"]`, then `label.form-field__button-select-label`, then an optional `span.form-field__button-select-description` |
| Range Slider (`range_slider`) | `input.form-field__range[type="range"]`, then `output.form-field__range-value` |
| Toggle (`toggle`) | `span.form-field__toggle-control` holding `input.form-field__toggle[type="checkbox"][role="switch"]`, with its option labels on either side in `span.form-field__toggle-state--off` and `--on` |

- **Button Select** is single choice. The framework visually hides each radio
  but keeps it focusable, shows focus as an outline on its label, and
  underlines the checked label. Style
  `input.form-field__button-select-input:checked + label` and
  `:focus-visible + label` to make the labels look like buttons.
- **Range Slider** uses the field's Min, Max and Increment (whole numbers,
  defaulting to 0, 100 and 1) and starts at the minimum. In `/devo-form`
  responses these are now `settings.min`, `settings.max` and `settings.step`.
  They used to be sent as `options.settings`.
- **Toggle**: the first option is "off" and the default, and the second is
  "on". Off is sent as the first option's value. With a single option, that
  option is "on" and off sends nothing, so a required toggle has to be
  switched on, as for a consent switch. In `/devo-form` responses these are
  `settings.off` and `settings.on`.
- The submit route treats a radio, button select, select or toggle value
  that isn't one of the field's options, or a range value off its scale, as
  not sent.

New settings on each form field:

- **Hide Field** was already in the builder but ignored. A hidden field is
  not rendered and is never required. A value it does have is still
  submitted, as a hidden input.
- **Hide Label** is new. The label (or legend) stays in the markup for
  screen readers but gets the `.screenReader` class. It is sent as
  `hide_label`.
- **Autocomplete** (Text fields only) sets the input's `autocomplete` token
  (`name`, `given-name`, `organization`, `postal-code` and so on), for WCAG
  1.3.5. It is sent as `settings.autocomplete`. Email and Phone fields keep
  their built-in `email` and `tel`.

### Form submissions: alert routing and a reserved field ID

- **Unrouted submissions now send an alert.** With Email Submissions Logic
  set, a submission whose routing field was empty, or held a value with no
  mapping, used to send no alert email at all. It now goes to the form's
  Email Submissions To addresses. If a form has routing logic and an
  Email Submissions To left over from before, check that address still
  wants the mail. Leave it empty to keep the old behaviour.
- **A form field can't use the honeypot's ID.** The spam honeypot input is
  named `devo-form-website` (or whatever the `devo_form_honeypot_field`
  filter returns). A real field given that ID shared the honeypot's name, so
  every submission that filled it in was answered with a fake success and
  discarded. Such a field is now renamed `devo-form-website-2`, as
  `devo-privacy-policy` and `devo-form-submit` already were. If anything
  refers to the old ID (a routing logic Field ID, or a `devo_form_submit`
  callback reading `$form_values[ 'devo-form-website' ]`), change it, or
  better, give the field another ID.

### Post content: `<title>` is removed

HTML from the REST API is rendered through `parse()`, which already drops
`script`, `object`, `embed`, `base`, `frame`, `frameset`, `meta` and `link`.
It now drops `<title>` too, because React 19 moves a rendered `<title>` into
`<head>`, where it replaced the page's title. A `<title>` inside an inline
`<svg>` is kept, as the graphic's accessible name.

### Sorting is limited in `/archive/` and search

Sorting by an arbitrary meta key reveals the order of its values, which can
leak private meta one comparison at a time. Both public sort parameters are
now limited:

- **`/wp-json/wp/v2/archive/`**: `orderby` is still a comma-separated list
  of `field_asc` / `field_desc` (or `anything_random`), but the field must be
  a core post field (`date` or `post_date`, `modified` or `post_modified`,
  `title` or `post_title`, `name` or `post_name`, `menu_order`, `id`,
  `post_type`) or a meta key allowed by the `devo_archive_sortable_meta_keys`
  filter. The filter allows none by default. Anything else is skipped, and
  with nothing left the order is newest first. To allow a meta key:

  ```php
  add_filter( 'devo_archive_sortable_meta_keys', function ( $keys, $post_types ) {
      $keys[] = 'event_start_date';
      return $keys;
  }, 10, 2 );
  ```

- **`/wp-json/wp/v2/devo-search/`**: `sort` only accepts the search panel's
  own sort options (its Custom Sort By rows, or the defaults). Any other
  value falls back to the panel's first option.
