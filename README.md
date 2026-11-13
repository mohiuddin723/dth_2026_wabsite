# Open source software

Assignment 2 for Digital Technologies in the Humanities, autumn 2026.

This website extends the original class template with a third Markdown page, updated article text and a simple navigation menu. The sample image carousel is no longer used.

## Pages

- `pages/page_one.md`: advantages of open source software
- `pages/page_two.md`: disadvantages of open source software
- `pages/page_three.md`: Zotero for European Studies

## Files

`index.html` provides the page layout. `assets/style.css` sets the appearance. `assets/content_load.js` loads the selected article. `assets/marked.js` converts Markdown into HTML.

## Editing and preview

Edit the articles in the `pages` folder. The website reads those files directly. No build step is required. View the published site or serve the folder with a local web server; opening index.html directly from a file manager will not load Markdown in most browsers.

## Publication

GitHub Pages publishes the master branch from the repository root. Keep `index.html`, `assets` and `pages` at the root, with `.nojekyll` alongside them.

Website: https://mohiuddin723.github.io/dth_2026_wabsite/

Repository: https://github.com/mohiuddin723/dth_2026_wabsite
