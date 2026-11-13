// Read the page name from the address and load its Markdown file.
const allowedPages = ["page_one", "page_two", "page_three"];
const requestedPage = new URLSearchParams(window.location.search).get("page");
const pageName = allowedPages.includes(requestedPage) ? requestedPage : "page_one";
const content = document.getElementById("content");
const charCount = document.getElementById("charCount");
document.body.id = pageName;

const currentLink = document.querySelector('nav a[href="./index.html?page=' + pageName + '"]');
currentLink.setAttribute("aria-current", "page");

fetch("./pages/" + pageName + ".md")
  .then((response) => {
    if (!response.ok) throw new Error("The article file could not be found.");
    return response.text();
  })
  .then((markdown) => {
    content.innerHTML = marked.parse(markdown);
    const heading = content.querySelector("h1");
    if (heading) {
      document.querySelector("header h1").textContent = heading.textContent;
      document.title = heading.textContent;
      heading.remove();
    }

    // Count article text without the main title or reference list.
    const article = document.createElement("div");
    article.innerHTML = marked.parse(markdown.split(/^## References\s*$/m)[0]);
    const title = article.querySelector("h1");
    if (title) title.remove();
    const characters = article.textContent.replace(/\s+/g, " ").trim().length;
    charCount.textContent = characters.toLocaleString("en-GB") + " characters, excluding title and references";
  })
  .catch((error) => {
    content.textContent = window.location.protocol === "file:"
      ? "Open the published GitHub Pages website to read the articles, or use a local web server."
      : error.message;
  });
