(() => {
  'use strict';

  // Keep section links usable while allowing their subheadings to collapse.
  function slugify(value) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section';
  }

  // A few short pages have no headings beyond their title.  Material still
  // renders the secondary rail in that case, which leaves an empty panel and
  // an unnecessary content gap.  Keep the rail only when it has real entries.
  function syncSidebarState() {
    if (typeof document === 'undefined') return;

    document.querySelectorAll('.md-sidebar--secondary').forEach((sidebar) => {
      const toc = sidebar.querySelector('[data-md-component="toc"]');
      const hasEntries = Boolean(toc && toc.querySelector('.md-nav__item'));
      sidebar.classList.toggle('md-sidebar--empty', !hasEntries);
      sidebar.hidden = !hasEntries;
    });
  }

  function setupTocDropdowns() {
    if (typeof document === 'undefined') return;

    document.querySelectorAll('.md-nav--secondary .md-nav__item').forEach((item, index) => {
      const children = Array.from(item.children);
      const list = children.find((child) => child.matches('nav'));
      const link = children.find((child) => child.matches('a.md-nav__link'));
      if (!list || !link || item.querySelector(':scope > .toc-toggle')) return;

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'toc-toggle';
      button.textContent = '›';
      button.setAttribute('aria-label', `Show subheadings for ${link.textContent.trim()}`);
      button.setAttribute('aria-expanded', 'false');
      list.id = list.id || `toc-group-${slugify(link.textContent)}-${index}`;
      button.setAttribute('aria-controls', list.id);
      item.classList.add('toc-dropdown');
      item.insertBefore(button, list);
      const initiallyExpanded =
        link.classList.contains('md-nav__link--active') ||
        list.querySelector('.md-nav__link--active') !== null;

      const setExpanded = (expanded) => {
        button.setAttribute('aria-expanded', String(expanded));
        button.setAttribute('aria-label', `${expanded ? 'Hide' : 'Show'} subheadings for ${link.textContent.trim()}`);
        list.classList.toggle('toc-collapsed', !expanded);
        list.setAttribute('aria-hidden', String(!expanded));
      };

      setExpanded(initiallyExpanded);
      button.addEventListener('click', () => {
        setExpanded(button.getAttribute('aria-expanded') !== 'true');
      });
    });
  }

  function refreshToc() {
    syncSidebarState();
    setupTocDropdowns();
  }

  if (typeof document$ !== 'undefined') {
    document$.subscribe(refreshToc);
  } else {
    refreshToc();
  }
})();
