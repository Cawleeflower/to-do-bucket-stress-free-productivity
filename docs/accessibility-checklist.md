# Accessibility checklist

What we check to meet WCAG 2.2 AA, and who checks it. axe runs in CI and fails the build on any serious or critical issue (see [standards](standards.md#accessibility)). It catches about a third of WCAG issues. A person checks the rest before each release.

## Checked by axe (CI)

| Area             | What axe checks                                                                       |
| ---------------- | ------------------------------------------------------------------------------------- |
| Text contrast    | Text meets 4.5:1, or 3:1 for large text.                                              |
| Form labels      | Every input, select and textarea has an accessible name.                              |
| Buttons & links  | Every button and link has an accessible name (no empty or icon-only without a label). |
| Images           | `<img>` has `alt`; decorative images use `alt=""`.                                    |
| ARIA             | Roles, states and attributes are valid, allowed on the element and not misspelled.    |
| Required ARIA    | Roles have their required parents, children and attributes.                           |
| Page language    | `<html>` has a valid `lang`.                                                          |
| Page title       | The document has a non-empty `<title>`.                                               |
| Duplicate ids    | ids used by ARIA or labels are unique.                                                |
| Headings         | Headings aren't empty; levels don't skip (best practice).                             |
| Landmarks        | One `main`; content sits inside landmarks (best practice).                            |
| Lists & tables   | `li` sits in `ul`/`ol`; table headers are linked to cells.                            |
| Zoom             | The viewport meta doesn't block pinch zoom.                                           |
| Focusable hidden | Nothing focusable sits inside `aria-hidden="true"`.                                   |
| Frames           | `iframe` has a title.                                                                 |
| Tab order        | No positive `tabindex`.                                                               |

## Checked by hand (per release)

| Area                 | What to check                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| Keyboard paths       | Every action (capture, sort, complete, delegate) works with keyboard alone. No keyboard traps.      |
| Focus order          | Tab order follows the visual order and makes sense.                                                 |
| Visible focus        | Focus is always visible and not hidden behind sticky headers or footers.                            |
| Focus management     | Opening a modal moves focus into it; closing it returns focus to the trigger.                       |
| Labels make sense    | Labels, alt text and button names describe the purpose, not just exist ("Complete task", not "OK"). |
| Errors               | Form errors are announced, say what went wrong and how to fix it, and are linked to the field.      |
| Status messages      | Toasts and updates ("Task moved to Inbox") are announced by a screen reader.                        |
| Screen reader        | Main flows work with NVDA (Windows) or VoiceOver (macOS/iOS).                                       |
| Non-text contrast    | Icons, input borders and focus rings meet 3:1.                                                      |
| Colour alone         | Colour is never the only way to show state (e.g. overdue, selected).                                |
| Contrast on states   | Hover, disabled, placeholder and text over images still meet contrast (axe misses many).            |
| Zoom 200%            | At 200% zoom, nothing is cut off or overlaps, and no horizontal scroll at 320px wide (reflow).      |
| Text spacing         | Increased line, letter and word spacing doesn't break the layout.                                   |
| Reduced motion       | With `prefers-reduced-motion`, animations stop or shrink to fades.                                  |
| Target size          | Click and tap targets are at least 24×24 px (WCAG 2.2).                                             |
| Dragging             | Anything done by dragging also works with a single click or tap (WCAG 2.2).                         |
| Consistent help      | Help and contact links sit in the same place on every page (WCAG 2.2).                              |
| Redundant entry      | Users aren't asked to re-enter information they already gave in the same flow (WCAG 2.2).           |
| Authentication       | Login doesn't rely on memory or puzzles; paste and password managers work (WCAG 2.2).               |
| Timeouts             | Users are warned before a session times out and can extend it.                                      |
| Headings & structure | Headings describe their sections; page structure reads well in a screen reader's heading list.      |
| Link purpose         | Link text makes sense out of context (no lone "click here").                                        |
