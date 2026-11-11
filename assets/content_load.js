(() => {
  const pages = ['page_one', 'page_two', 'page_three'];
  const names = ['Advantages', 'Disadvantages', 'Project evaluation'];
  const requested = new URLSearchParams(location.search).get('page');
  const page = pages.includes(requested) ? requested : 'page_one';
  const index = pages.indexOf(page);
  const content = document.getElementById('content');
  const count = text => text.replace(/\s+/g, ' ').trim().length;
  function parse(md) {
    const box = document.createElement('div');
    box.innerHTML = marked.parse(md);
    return box;
  }
  function chars(md) {
    const box = parse(md.split(/^## References\s*$/m)[0]); box.querySelector('h1')?.remove();
    return count(box.textContent);
  }
  async function read(name) {
    if (location.protocol === 'file:') return window.localArticles[name];
    const response = await fetch('./pages/' + name + '.md');
    if (!response.ok) throw new Error('The article could not be loaded. Please try again.');
    return response.text();
  }
  document.body.id = page;
  document.querySelector(`[data-page="${page}"]`).setAttribute('aria-current', 'page');
  document.getElementById('pageNumber').textContent = `0${index + 1} / 03`;
  read(page).then(md => {
    const box = parse(md);
    document.title = (box.querySelector('h1')?.textContent || names[index]) + ' | Open Source';
    const ref = [...box.querySelectorAll('h2')].find(el => el.textContent === 'References');
    if (ref) {
      const section = document.createElement('section'); section.className = 'references';
      section.setAttribute('aria-label', 'References');
      box.insertBefore(section, ref);
      let next = ref;
      while (next) { const after = next.nextSibling; section.appendChild(next); next = after; }
    }
    content.replaceChildren(...box.childNodes); content.setAttribute('aria-busy', 'false');
    document.getElementById('charCount').textContent = `${chars(md).toLocaleString('en-GB')} article characters`;
  }).catch(error => {content.textContent = error.message;content.setAttribute('aria-busy','false');});
  Promise.all(pages.map(read)).then(texts => {
    document.getElementById('totalCount').textContent = `${texts.reduce((n, md) => n + chars(md), 0).toLocaleString('en-GB')} article characters in total · references excluded`;
  }).catch(() => {});
  const steps = document.getElementById('pageSteps');
  if (index > 0) steps.innerHTML += `<a href="./index.html?page=${pages[index-1]}">← ${names[index-1]}</a>`;
  if (index < 2) steps.innerHTML += `<a href="./index.html?page=${pages[index+1]}">${names[index+1]} →</a>`;
  else steps.innerHTML += '<a href="#main">Back to top ↑</a>';
})();
