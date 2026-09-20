(() => {
  'use strict';

  const scripts = new Map();
  let activeSection;
  let walineInstance;
  let contentObserver;
  let updatePage;

  function settings() {
    return document.getElementById('book-comment-settings')?.content.querySelector('[data-platform]')?.dataset;
  }

  function stylesheet(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.append(link);
  }

  function script(src) {
    if (!scripts.has(src)) {
      const pending = new Promise((resolve, reject) => {
        const element = document.createElement('script');
        element.src = src;
        element.async = true;
        element.onload = resolve;
        element.onerror = () => reject(new Error(`无法加载 ${src}`));
        document.head.append(element);
      });
      scripts.set(src, pending.catch((error) => { scripts.delete(src); throw error; }));
    }
    return scripts.get(src);
  }

  function element(parent, id) {
    const node = document.createElement('div');
    node.id = id;
    parent.append(node);
    return node;
  }

  function error(root, message) {
    if (!root.isConnected) return;
    root.replaceChildren();
    const notice = document.createElement('p');
    notice.className = 'book-comment-error';
    notice.textContent = message;
    root.append(notice);
    updatePage?.();
  }

  function active(section) {
    return section === activeSection && section.isConnected;
  }

  function cleanup() {
    contentObserver?.disconnect();
    contentObserver = undefined;
    walineInstance?.destroy?.();
    walineInstance = undefined;
  }

  function gitalkId(path) {
    let hash = 2166136261;
    for (const char of path) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
    return `${path.slice(0, 36)}-${(hash >>> 0).toString(16)}`;
  }

  async function render(section, root, config) {
    const platform = (config.platform || '').toLowerCase();
    const path = location.pathname;
    if (platform === 'twikoo') {
      if (!config.envId) throw new Error('未设置 Twikoo 环境 ID');
      element(root, 'tcomment');
      await script('https://cdn.jsdelivr.net/npm/twikoo@1.6.42/dist/twikoo.all.min.js');
      if (active(section)) await window.twikoo.init({ envId: config.envId, el: '#tcomment', path });
    } else if (platform === 'waline') {
      if (!config.serverUrl) throw new Error('未设置 Waline 服务地址');
      stylesheet('https://unpkg.com/@waline/client@v3/dist/waline.css');
      element(root, 'waline');
      const client = await import('https://unpkg.com/@waline/client@v3/dist/waline.js');
      if (active(section)) walineInstance = client.init({ el: '#waline', serverURL: config.serverUrl, path });
    } else if (platform === 'valine') {
      if (!config.appId || !config.appKey) throw new Error('未设置 Valine App ID 或 App Key');
      element(root, 'vcomments');
      await script('https://unpkg.com/valine@1/dist/Valine.min.js');
      if (active(section)) new window.Valine({ el: '#vcomments', appId: config.appId, appKey: config.appKey, serverURLs: config.serverUrl || undefined, path });
    } else if (platform === 'gitalk') {
      if (!config.clientId || !config.repo || !config.owner) throw new Error('Gitalk 配置不完整');
      stylesheet('https://unpkg.com/gitalk/dist/gitalk.css');
      element(root, 'gitalk-container');
      await script('https://unpkg.com/gitalk/dist/gitalk.min.js');
      if (active(section)) new window.Gitalk({ clientID: config.clientId, clientSecret: config.clientSecret, repo: config.repo, owner: config.owner, admin: (config.admin || config.owner).split(',').map(x => x.trim()), id: gitalkId(path) }).render('gitalk-container');
    } else if (platform === 'giscus') {
      if (!config.repo || !config.repoId) throw new Error('Giscus 仓库配置不完整');
      const embed = document.createElement('script');
      embed.src = 'https://giscus.app/client.js';
      for (const [key, value] of Object.entries({ repo: config.repo, 'repo-id': config.repoId, category: config.category || '', 'category-id': config.categoryId || '', mapping: 'pathname', strict: '0', 'reactions-enabled': '1', 'emit-metadata': '0', 'input-position': 'top', theme: 'light', lang: 'zh-CN' })) embed.setAttribute(`data-${key}`, value);
      embed.crossOrigin = 'anonymous';
      embed.async = true;
      root.append(embed);
    } else if (platform === 'disqus') {
      if (!config.shortname) throw new Error('未设置 Disqus shortname');
      element(root, 'disqus_thread');
      window.disqus_config = function () { this.page.url = location.href; this.page.identifier = location.pathname; };
      if (window.DISQUS) {
        window.DISQUS.reset({ reload: true, config: window.disqus_config });
      } else {
        const host = config.api ? `${config.api.replace(/\/$/, '')}/${encodeURIComponent(config.shortname)}/embed.js` : `https://${encodeURIComponent(config.shortname)}.disqus.com/embed.js`;
        await script(host);
      }
    } else if (platform === 'cusdis') {
      if (!config.host || !config.appId) throw new Error('Cusdis 配置不完整');
      const node = element(root, 'cusdis_thread');
      node.dataset.host = config.host;
      node.dataset.appId = config.appId;
      node.dataset.pageId = path;
      node.dataset.pageUrl = location.href;
      node.dataset.pageTitle = document.title;
      node.dataset.theme = 'light';
      const embed = document.createElement('script');
      embed.src = `${config.host.replace(/\/$/, '')}/js/cusdis.es.js`;
      embed.async = true;
      root.append(embed);
    } else {
      throw new Error('当前评论平台尚未配置');
    }
    updatePage?.();
  }

  function init(onResize) {
    updatePage = onResize;
    const section = document.querySelector('#axjx_box .book-comments');
    if (section === activeSection) return;
    cleanup();
    activeSection = section;
    if (!section) return;
    const root = section.querySelector('.book-comment-widget');
    const config = settings();
    if (!root) return;
    if (!config) { error(root, '评论尚未开启。'); return; }
    contentObserver = new MutationObserver(() => updatePage?.());
    contentObserver.observe(root, { childList: true, subtree: true });
    render(section, root, config).catch((failure) => {
      if (active(section)) error(root, failure.message || '评论暂时无法加载，请稍后重试。');
    });
  }

  window.BookComments = { init };
})();
