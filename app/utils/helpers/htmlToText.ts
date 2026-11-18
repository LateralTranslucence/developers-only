/*
 * Plain text from a string that may hold markup or entities.
 *
 * Text fields are stored as kses-sanitised HTML, so "R&D" arrives as
 * "R&amp;D". Where a value is rendered as text (a heading, a data-* attribute
 * read by CSS, alt text, document.title), React would show the entity as is;
 * run it through this first. Where a value is rendered as HTML, use parse()
 * instead, and never feed this function's output to parse() or
 * dangerouslySetInnerHTML: decoding turns "&lt;img&gt;" back into a tag.
 *
 * DOMParser builds an inert document (no scripts run, nothing loads), and only
 * its textContent is read.
 */
const htmlToText = ( html: string ): string => {
    if ( ! html || ( ! html.includes( '&' ) && ! html.includes( '<' ) ) ) {
        return html ?? '';
    }
    return new DOMParser().parseFromString( html, 'text/html' ).body.textContent ?? '';
};
export default htmlToText;
