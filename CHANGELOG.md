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

So in the `fields` object of a post's REST response, every field type without
its own API-display method in `DO_Form_Field_API_Display` now comes back as a
**string**, not a number or boolean. That covers `int`, `number`, `select`,
`varchar` and `form` fields. The same goes for the `_menu_*` fields on
`nav_menu_item` REST objects: `_menu_mega_menu` is now `"1"`, not `1`.
Field types with a display method (`binary`, `date`, `media`, `ctas`,
`post_browser` and the rest) are unchanged.

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
