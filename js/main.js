(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Scroll progress bar
     ------------------------------------------------------------------ */
  var bar = document.querySelector('.progress');
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? ((h.scrollTop || document.body.scrollTop) / max) * 100 : 0;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------
     Scroll reveals — IntersectionObserver fallback when the browser
     lacks CSS scroll-driven animations (animation-timeline: view()).
     ------------------------------------------------------------------ */
  var nativeSDA = window.CSS && CSS.supports && CSS.supports('animation-timeline: view()');
  if (!nativeSDA && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('io');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
    document.querySelectorAll('.rv, .rvx, .rvs').forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------
     Tech logo fallback — swap to the monogram if an SVG fails to load
     ------------------------------------------------------------------ */
  document.querySelectorAll('img[data-fb]').forEach(function (img) {
    function fallback() {
      img.hidden = true;
      var mono = img.parentNode.querySelector('.tech-mono');
      if (mono) mono.hidden = false;
    }
    if (img.complete && img.naturalWidth === 0) fallback();
    else img.addEventListener('error', fallback);
  });

  /* ------------------------------------------------------------------
     Language toggle (ES default). Spanish copy lives in the markup;
     English lives in data-en attributes. Persisted in localStorage.
     ------------------------------------------------------------------ */
  var TITLES = {
    es: 'AyChEs — Ayman Charoui · Desarrollador Full-Stack',
    en: 'AyChEs — Ayman Charoui · Full-Stack Developer'
  };
  var buttons = document.querySelectorAll('.lang-toggle button');

  function setLang(lang) {
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (!el.hasAttribute('data-es')) el.setAttribute('data-es', el.textContent);
      el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
    });
    document.documentElement.lang = lang;
    document.title = TITLES[lang];
    buttons.forEach(function (b) {
      var active = b.getAttribute('data-lang') === lang;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    try { localStorage.setItem('lang', lang); } catch (e) { /* storage unavailable */ }
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });

  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) { /* storage unavailable */ }
  if (saved === 'en') setLang('en');
})();
