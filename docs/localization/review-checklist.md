# Spanish review checklist

Run `npm run qa:i18n:review` before a Spanish copy pass. Review the generated markdown file and screenshots in `docs/localization/review-pack/`.

## Copy quality

- The copy sounds natural in neutral Latin American Spanish.
- The app uses friendly `tú`, not formal `usted`.
- Buttons are short enough for mobile.
- The same concept uses the same term across landing, interview, review, export, PDF, and Markdown.
- Sensitive topics are clear without sounding alarming.
- Legal and financial terms are marked for review when they may vary by country.

## UI context

- Every unclear string has enough screenshot context to understand where it appears.
- Short words like `Review`, `Draft`, `Load`, and `Claim` are checked in context, not translated in isolation.
- Empty states, helper text, modal text, and export instructions are reviewed, not only major headings.

## Layout

- `npm run qa:i18n` passes for English, Spanish, and pseudo-locale.
- No route has horizontal scrolling at `320px`, `390px`, `1024px`, or desktop width.
- Button text is not clipped.
- Interactive controls do not overlap.
- Long Spanish section titles remain readable or intentionally truncate only in navigation.

## Export output

- Spanish PDF headings, labels, disclaimers, and table labels match the UI glossary.
- Spanish Markdown output uses the same tone as the app.
- Stored values remain compatible with old English drafts.
