// Optional: regenerate the local double-click preview after editing Markdown.
// GitHub Pages reads pages/*.md directly and does not require a build.
const fs = require('fs');
const pages = Object.fromEntries(['one','two','three'].map(x => [`page_${x}`, fs.readFileSync(`pages/page_${x}.md`, 'utf8')]));
fs.writeFileSync('assets/content-data.js', 'window.localArticles = ' + JSON.stringify(pages) + ';\n');
console.log('Local preview refreshed.');
