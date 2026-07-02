(function () {
  'use strict';

  var docEl = document.documentElement;
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ------------------------------------------------------------------
     Theme toggle (initial theme set inline in <head> to avoid FOUC)
     ------------------------------------------------------------------ */
  var THEME_COLORS = { light: '#fafafa', dark: '#080d16' };
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    docEl.setAttribute('data-theme', theme);
    if (themeMeta) themeMeta.setAttribute('content', THEME_COLORS[theme]);
    try { localStorage.setItem('theme', theme); } catch (e) { /* storage unavailable */ }
  }
  if (themeMeta) themeMeta.setAttribute('content', THEME_COLORS[docEl.getAttribute('data-theme')] || THEME_COLORS.light);

  document.getElementById('themeToggle').addEventListener('click', function () {
    applyTheme(docEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ------------------------------------------------------------------
     Scroll progress bar
     ------------------------------------------------------------------ */
  var bar = document.querySelector('.progress');
  function onScroll() {
    var h = docEl;
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
    docEl.classList.add('io');
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
  var langButtons = document.querySelectorAll('.lang-toggle button');

  function setLang(lang) {
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (!el.hasAttribute('data-es')) el.setAttribute('data-es', el.textContent);
      el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
    });
    docEl.lang = lang;
    document.title = TITLES[lang];
    langButtons.forEach(function (b) {
      var active = b.getAttribute('data-lang') === lang;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    try { localStorage.setItem('lang', lang); } catch (e) { /* storage unavailable */ }
  }

  langButtons.forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });

  var savedLang = null;
  try { savedLang = localStorage.getItem('lang'); } catch (e) { /* storage unavailable */ }
  if (savedLang === 'en') setLang('en');

  /* ------------------------------------------------------------------
     Hero stats count-up (brand: growth made visible)
     ------------------------------------------------------------------ */
  if (!reduceMotion) {
    document.querySelectorAll('.stat-n[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var start = null, dur = 1100;
      el.textContent = '0';
      setTimeout(function () {
        requestAnimationFrame(function step(t) {
          if (start === null) start = t;
          var p = Math.min(1, (t - start) / dur);
          p = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(target * p));
          if (p < 1) requestAnimationFrame(step);
        });
      }, 650);
    });
  }

  /* The signature interactions below only run on fine pointers
     without reduced motion — touch devices get the plain experience. */
  if (!finePointer || reduceMotion) return;

  /* ------------------------------------------------------------------
     Custom cursor — dot + trailing ring ("cometa")
     ------------------------------------------------------------------ */
  var dot = document.createElement('div');
  var ringEl = document.createElement('div');
  dot.className = 'cur-dot hidden';
  ringEl.className = 'cur-ring hidden';
  dot.setAttribute('aria-hidden', 'true');
  ringEl.setAttribute('aria-hidden', 'true');
  document.body.appendChild(dot);
  document.body.appendChild(ringEl);
  docEl.classList.add('cc');

  var mx = -100, my = -100, rx = -100, ry = -100, cursorSeen = false;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    if (!cursorSeen) { cursorSeen = true; rx = mx; ry = my; dot.classList.remove('hidden'); ringEl.classList.remove('hidden'); }
    dot.style.transform = 'translate(' + (mx - 3.5) + 'px,' + (my - 3.5) + 'px)';
  }, { passive: true });

  document.addEventListener('mouseleave', function () { dot.classList.add('hidden'); ringEl.classList.add('hidden'); cursorSeen = false; });
  document.addEventListener('mouseenter', function () { if (cursorSeen) return; });

  (function trail() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    var half = ringEl.offsetWidth / 2;
    ringEl.style.transform = 'translate(' + (rx - half) + 'px,' + (ry - half) + 'px)';
    requestAnimationFrame(trail);
  })();

  var HOVERABLE = 'a, button, .tech, .project-card, .lang-toggle';
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(HOVERABLE)) ringEl.classList.add('hov');
  }, { passive: true });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(HOVERABLE)) ringEl.classList.remove('hov');
  }, { passive: true });

  /* Note: .cur-dot uses transform for position; CSS translate(-50%,-50%)
     is replaced by the -3.5px offset above, so drop the CSS one. */
  dot.style.top = '0'; dot.style.left = '0';
  ringEl.style.top = '0'; ringEl.style.left = '0';

  /* ------------------------------------------------------------------
     Magnetic buttons ("imán") — subtle pull toward the cursor
     ------------------------------------------------------------------ */
  document.querySelectorAll('[data-mag], .theme-toggle').forEach(function (el) {
    var strength = 0.22, max = 6;
    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width / 2)) * strength;
      var dy = (e.clientY - (r.top + r.height / 2)) * strength;
      dx = Math.max(-max, Math.min(max, dx));
      dy = Math.max(-max, Math.min(max, dy));
      el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      el.style.transition = 'transform .08s linear, box-shadow .22s cubic-bezier(.23,1,.32,1), border-color .22s ease, background-color .2s ease, color .2s ease';
    });
    el.addEventListener('mouseleave', function () {
      el.style.transition = 'transform .35s cubic-bezier(.23,1,.32,1), box-shadow .22s cubic-bezier(.23,1,.32,1), border-color .22s ease, background-color .2s ease, color .2s ease';
      el.style.transform = '';
    });
  });

  /* ------------------------------------------------------------------
     3D tilt on the hero code card — precise, contained
     ------------------------------------------------------------------ */
  var heroCard = document.querySelector('.hero-card');
  var tiltEl = document.querySelector('.tilt');
  if (heroCard && tiltEl) {
    var MAXDEG = 5;
    heroCard.addEventListener('mousemove', function (e) {
      var r = tiltEl.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      tiltEl.style.transition = 'transform .12s linear';
      tiltEl.style.transform = 'rotateY(' + (px * MAXDEG * 2) + 'deg) rotateX(' + (-py * MAXDEG * 2) + 'deg)';
    });
    heroCard.addEventListener('mouseleave', function () {
      tiltEl.style.transition = 'transform .5s cubic-bezier(.23,1,.32,1)';
      tiltEl.style.transform = '';
    });
  }
})();
