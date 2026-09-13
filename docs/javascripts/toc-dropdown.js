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

  if (typeof document$ !== 'undefined') {
    document$.subscribe(setupTocDropdowns);
  } else {
    setupTocDropdowns();
  }
})();
