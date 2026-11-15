(() => {
  'use strict';

  // This key is deliberately committed and stable.  The reset script changes
  // it only when the site owner explicitly asks for a reset.  Do not generate
  // a new key during a build: the remote counter is the durable data store.
  const COUNTER_KEY = "cyberwithcj-visitors-9e7f9ae7a0414c2a9f6f70b31246d784";
  const COUNTER_API_BASE = "https://countapi.mileshilliard.com/api/v1";
  const COUNT_WINDOW_MS = 24 * 60 * 60 * 1000;
  const STORAGE_KEY = `cj-visitor-counter:${COUNTER_KEY}`;
  const WIDGET_SELECTOR = '[data-visitor-counter]';
  const VALUE_SELECTOR = '[data-visitor-count]';
  const STATUS_SELECTOR = '[data-visitor-status]';
  const PRODUCTION_HOSTS = new Set([
    'cyberwithcj.com',
    'www.cyberwithcj.com',
    'chiragmenariyacj.github.io',
  ]);

  function getStorage() {
    try {
      return window.localStorage;
    } catch (_error) {
      try {
        return window.sessionStorage;
      } catch (_fallbackError) {
        return null;
      }
    }
  }

  function isProductionHost() {
    return PRODUCTION_HOSTS.has(window.location.hostname.toLowerCase());
  }

  function endpoint(action) {
    return `${COUNTER_API_BASE}/${action}/${encodeURIComponent(COUNTER_KEY)}`;
  }

  function readLastVisit(storage) {
    if (!storage) return NaN;
    try {
      return Number(storage.getItem(STORAGE_KEY));
    } catch (_error) {
      return NaN;
    }
  }

  function rememberVisit(storage, timestamp) {
    if (!storage) return;
    try {
      storage.setItem(STORAGE_KEY, String(timestamp));
    } catch (_error) {
      // Storage can be disabled by a privacy setting; the counter still works.
    }
  }

  async function request(action) {
    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    const timeout = window.setTimeout(() => {
      if (controller) controller.abort();
    }, 8000);
    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
    };

    if (controller) options.signal = controller.signal;

    try {
      const response = await fetch(endpoint(action), options);
      if (!response.ok) throw new Error(`Counter request failed (${response.status})`);

      const payload = await response.json();
      const value = Number(payload && payload.value);
      if (!Number.isFinite(value) || value < 0) throw new Error('Counter response was invalid');
      return value;
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function setStatus(message, state) {
    const status = document.querySelector(STATUS_SELECTOR);
    if (!status) return;
    status.textContent = message;
    if (state) status.dataset.state = state;
  }

  function render(value) {
    const valueNode = document.querySelector(VALUE_SELECTOR);
    if (valueNode) {
      valueNode.textContent = typeof Intl !== 'undefined' && Intl.NumberFormat
        ? new Intl.NumberFormat().format(value)
        : String(value);
    }
    setStatus('Approximate visits - one count per browser every 24 hours', 'ready');
  }

  function renderError() {
    const valueNode = document.querySelector(VALUE_SELECTOR);
    if (valueNode) valueNode.textContent = '-';
    setStatus('The counter is temporarily unavailable.', 'error');
  }

  function renderLocalPreview() {
    setStatus('The live counter appears on cyberwithcj.com.', 'preview');
  }

  async function updateCounter() {
    const storage = getStorage();
    const now = Date.now();
    const previousVisit = readLastVisit(storage);
    const shouldCount = !Number.isFinite(previousVisit) || now - previousVisit >= COUNT_WINDOW_MS;
    const hasWidget = Boolean(document.querySelector(WIDGET_SELECTOR));

    // A returning visitor only needs a fresh value when the visible widget is
    // on this page.  This keeps deep-page navigation light while still making
    // sure the first page of a new counting window is recorded.
    if (!shouldCount && !hasWidget) return;

    try {
      // /hit increments once for a new browser time window; /get only reads
      // the durable value when this browser was already counted recently.
      const value = await request(shouldCount ? 'hit' : 'get');
      if (shouldCount) rememberVisit(storage, now);
      render(value);
    } catch (_error) {
      // A network failure after /hit may still have committed the increment.
      // Reading once avoids showing an error when only the first response was
      // interrupted, while never retrying /hit in a loop.
      if (shouldCount) {
        try {
          const value = await request('get');
          rememberVisit(storage, now);
          render(value);
          return;
        } catch (_fallbackError) {
          // Fall through to the small, non-blocking error state below.
        }
      }
      renderError();
    }
  }

  function boot() {
    if (!isProductionHost()) {
      if (document.querySelector(WIDGET_SELECTOR)) renderLocalPreview();
      return;
    }

    // The script is loaded on every page so a visitor who lands on a deep link
    // is counted too.  Only the homepage contains the visible widget.
    updateCounter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();

