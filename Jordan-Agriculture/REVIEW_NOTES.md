# Jordan Agriculture — Maintenance notes

## Fixed
- Corrected the case-sensitive vegetables page link in `Fruit.html`.
- Corrected the case-sensitive image filename in `vertical2.html`.
- Shortened the initial splash-screen wait on `index.html` from 6.5 to 1.2 seconds (fade remains).
- Prevented zero-duration smooth-scroll calculations and invalid scroll progress when the page has no scrollable height.
- Updated the suggestions form to accept Unicode letters (including Arabic) and clearly report that submissions are **not** sent. Removed the misleading redirect to the home page.
- Added an error message if statistics JSON cannot be loaded.

## Important limitations
- The suggestions form needs a backend or hosted form provider before it can actually send data. It intentionally does not claim to submit or save anything.
- Statistics are read from the supplied `statistic/data.json`; their accuracy and provenance were not independently verified.
- The charts need a web server (e.g. VS Code Live Server or GitHub Pages), not direct `file://` opening, because `fetch()` is used.
- Third-party CDN assets require an internet connection.

## Checks completed
- All relative `href` and `src` targets in HTML exist with the exact filename case.
- All inline JavaScript blocks pass Node.js syntax checking.
- Statistics JSON parses successfully.

Browser-level visual and interactive regression testing is still recommended before publishing.
