# Jordan Agriculture — Project Structure

This is a structure-only refactor of the existing static website. The original page markup, styling rules, JavaScript logic, images, and data are preserved.

## Structure

- `index.html` and other `.html` files: website pages (original locations retained).
- `statistic/sta.html`: statistics page (original location retained).
- `assets/css/`: one stylesheet per page, extracted from each HTML `<style>` block.
- `assets/js/`: one JavaScript file per page, extracted from inline `<script>` blocks.
- `images/`: existing images (original location retained to avoid breaking paths).
- `statistic/data.json`: existing statistics data (unchanged).

## How to run

Open `index.html` in a browser, or use VS Code Live Server. All local CSS and JavaScript files use relative paths, including the nested statistics page.

## Important notes

- Page-specific styles were **not** merged into a global stylesheet: doing so without a full visual regression pass could change layout or theme behavior. Shared styles can be consolidated later with browser testing.
- Small inline `style` attributes and inline HTML event handlers remain in their original markup to preserve behavior.
- The external Chart.js CDN reference in `index.html` is unchanged; this refactor does not make external dependencies work offline.
- This refactor does not add or modify functionality or fix existing product issues.
- Test each page and both themes in a browser before publishing.
