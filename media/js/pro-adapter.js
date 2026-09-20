(() => {
  'use strict';

  const isBookLayout = () => matchMedia('(min-width: 1201px) and (min-height: 901px)').matches;
  const archiveURL = document.body.dataset.archiveUrl || '/archives/';
  const catalog = document.querySelector('#book-left [data-book-archive]');
  let pageScrollbar;
  let catalogScrollbar;
  let fullCatalogList;

  function groupArchive(container) {
    if (!container) return;
    const items = [...container.querySelectorAll(':scope > .al_mon_list > li[data-year]')];
    if (!items.length) return;
    const groups = document.createDocumentFragment();
    let currentYear = '';
    let list;
    for (const item of items) {
      const year = item.dataset.year || '未注明年份';
      if (year !== currentYear) {
        currentYear = year;
        const heading = document.createElement('div');
        heading.className = 'year';
        heading.textContent = year === '未注明年份' ? year : `${year}年`;
        list = document.createElement('ul');
        list.className = 'al_mon_list';
        groups.append(heading, list);
      }
      list.append(item);
    }
    container.replaceChildren(groups);
  }

  function groupVisibleArchives() {
    document.querySelectorAll('[data-book-archive]').forEach(groupArchive);
  }

  function sameLinks(a, b) {
    const left = [...a.querySelectorAll('li > a[href]')].map((link) => `${link.pathname}|${link.textContent.trim()}`);
    const right = [...b.querySelectorAll('li > a[href]')].map((link) => `${link.pathname}|${link.textContent.trim()}`);
    return left.length === right.length && left.every((value, index) => value === right[index]);
  }

  function syncFullCatalogViews() {
    if (!fullCatalogList) return;
    document.querySelectorAll('#book-right [data-book-full-catalog] [data-book-archive]').forEach((view) => {
      if (sameLinks(view, fullCatalogList)) return;
      view.replaceChildren(fullCatalogList.cloneNode(true));
      groupArchive(view);
      pageScrollbar?.update();
    });
  }

  async function completeCatalogFromSearch(cacheKey) {
    try {
      const response = await fetch('/api/search.json', { credentials: 'same-origin' });
      if (!response.ok) return;
      const posts = await response.json();
      if (!Array.isArray(posts)) return;
      const list = document.createElement('ul');
      list.className = 'al_mon_list';
      for (const post of posts) {
        if (!post.link || !post.title) continue;
        const item = document.createElement('li');
        item.dataset.year = String(post.date || '').slice(0, 4);
        const link = document.createElement('a');
        link.setAttribute('pajx-right', '');
        link.href = post.link;
        link.textContent = post.title;
        const date = document.createElement('span');
        date.textContent = String(post.date || '').slice(5, 10);
        item.append(link, date);
        list.append(item);
      }
      if (!list.children.length) return;
      fullCatalogList = list.cloneNode(true);
      syncFullCatalogViews();
      if (sameLinks(catalog, list)) return;
      catalog.replaceChildren(list);
      groupArchive(catalog);
      catalogScrollbar?.update();
      try { sessionStorage.setItem(cacheKey, catalog.innerHTML); } catch { /* storage can be disabled */ }
    } catch { /* archive template remains the catalog fallback */ }
  }

  async function loadCatalog() {
    if (!catalog) return;
    const cacheKey = `book-original-catalog:${new URL(archiveURL, location.href).pathname}`;
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached && !catalog.querySelector('li > a[href]')) {
        catalog.innerHTML = cached;
        groupArchive(catalog);
      }
    } catch { /* storage can be disabled */ }
    try {
      const response = await fetch(archiveURL, { credentials: 'same-origin' });
      if (!response.ok) return;
      const page = new DOMParser().parseFromString(await response.text(), 'text/html');
      const source = page.querySelector('#book-left [data-book-archive]');
      if (!source || !source.querySelector('li > a[href]')) return;
      const content = source.innerHTML;
      const sourceCount = source.querySelectorAll('li > a[href]').length;
      const currentCount = catalog.querySelectorAll('li > a[href]').length;
      if (sourceCount >= currentCount && !sameLinks(catalog, source)) {
        catalog.innerHTML = content;
        groupArchive(catalog);
        catalogScrollbar?.update();
      }
      if (sourceCount >= currentCount) {
        try { sessionStorage.setItem(cacheKey, content); } catch { /* storage can be disabled */ }
      }
    } catch { /* keep the server-rendered list */ }
    finally { void completeCatalogFromSearch(cacheKey); }
  }

  function initScrollbar() {
    if (!isBookLayout() || !window.PerfectScrollbar) return;
    const secondary = document.getElementById('secondary');
    const postbox = document.getElementById('postbox');
    if (secondary && !catalogScrollbar) catalogScrollbar = new PerfectScrollbar(secondary, { wheelSpeed: 0.5, swipeEasing: false });
    pageScrollbar?.destroy();
    if (postbox) pageScrollbar = new PerfectScrollbar(postbox, { wheelSpeed: 0.5, swipeEasing: false });
  }

  function initImages() {
    if (typeof window.imgStyle !== 'function') return;
    const images = $('.post-content img').filter(function () { return !this.closest('.img_box'); });
    if (!images.length) return;
    imgStyle(images);
    images.on('click', function () { imgbig(this); });
  }

  function initPage() {
    groupVisibleArchives();
    initScrollbar();
    syncFullCatalogViews();
    initImages();
    window.BookComments?.init(() => pageScrollbar?.update());
  }

  function initMobileNav() {
    const nav = document.getElementById('book-mobile-nav');
    if (!nav) return;
    const menu = nav.querySelector('#book-mobile-menu');
    const toggle = nav.querySelector('[data-book-menu-toggle]');
    const about = nav.querySelector('[data-book-about]');
    const links = [...document.querySelectorAll('.nav-box #nav-menu > a[href]')];
    for (const link of links) {
      if (link.textContent.trim() === '首页' || (link.origin === location.origin && link.pathname === '/')) continue;
      const item = link.cloneNode(true);
      item.querySelectorAll('span').forEach(span => span.remove());
      menu.append(item);
    }
    const aboutLink = links.find(link => /^(关于|About)$/i.test(link.textContent.trim())) || links.find(link => /\/about\/?$/.test(link.pathname));
    if (aboutLink) {
      about.href = aboutLink.href;
      if (aboutLink.target) {
        about.target = aboutLink.target;
        about.rel = aboutLink.rel;
        about.removeAttribute('pajx-right');
      }
    }
    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
      menu.setAttribute('aria-hidden', String(!open));
      menu.inert = !open;
    }
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
    document.addEventListener('click', event => { if (!nav.contains(event.target)) setOpen(false); });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
    $(document).on('pjax:end', () => setOpen(false));
  }

  $(async function () {
    initPage();
    initMobileNav();
    const catalogReady = loadCatalog();
    if (isBookLayout()) {
      if (document.body.dataset.bookPage === 'home') {
        if (document.body.dataset.autoOpen === 'true') {
          setTimeout(() => {
            const left = document.getElementById('book-left');
            if (!left.classList.contains('mainy') && !left.classList.contains('mainy2') && !left.classList.contains('mainy3')) openBook();
          }, 1000);
        }
      } else {
        await catalogReady;
        openBook('withOutAnimat');
      }
    }
  });

  $(document).on('pjax:end', initPage);
  document.querySelector('.book-left-z')?.addEventListener('click', (event) => {
    const link = event.target.closest('.al_mon_list a');
    if (link && typeof window.catalogClickList === 'function') catalogClickList(link);
  });
  function clearLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.style.opacity = '0';
      loading.style.pointerEvents = 'none';
      setTimeout(() => { loading.style.display = 'none'; }, 1000);
    }
  }
  if (document.readyState === 'complete') clearLoading();
  else window.addEventListener('load', clearLoading, { once: true });
})();
