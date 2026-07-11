(function () {
  'use strict';

  var docEl = document.documentElement;
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ------------------------------------------------------------------
     i18n — auto-detect the visitor's language and apply the matching
     copy. The markup ships in Spanish (the page's primary language);
     each translatable element carries an English alternate in
     `data-en`. The Spanish original is captured from the live text on
     first run, so it survives subsequent swaps.

     Decision rule: any navigator.language starting with "es" or "ca"
     gets the Spanish version; everything else gets English. Catalan
     is treated as Spanish because we don't ship a Catalan version
     and a CA-ES user is fully bilingual in ES.
     ------------------------------------------------------------------ */
  var detected = (navigator.languages && navigator.languages[0]) || navigator.language || 'es';
  var lang = /^(es|ca)\b/i.test(detected) ? 'es' : 'en';

  var TITLES = {
    es: 'AyChEs — Ayman Charoui · Desarrollador Full-Stack',
    en: 'AyChEs — Ayman Charoui · Full-Stack Developer'
  };

  function setLang(target) {
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (!el.hasAttribute('data-es')) el.setAttribute('data-es', el.textContent);
      el.textContent = target === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
    });
    docEl.lang = target;
    document.title = TITLES[target];
  }

  docEl.lang = lang;
  if (lang === 'en') setLang('en');

  /* ------------------------------------------------------------------
     Mark page ready immediately — the hero animation is driven by CSS.
     ------------------------------------------------------------------ */
  docEl.classList.add('ready');

  /* ------------------------------------------------------------------
     Section H2 — split into per-word spans (after language is set,
     so the splits work on the active copy). One span per word, each
     animates as a block — gentler than the per-character stagger of
     the previous build.
     ------------------------------------------------------------------ */
  function splitH2(h2) {
    var text = h2.textContent;
    h2.textContent = '';
    var idx = 0;
    text.split(' ').forEach(function (word, w, arr) {
      var wEl = document.createElement('span');
      wEl.className = 'word';
      var inner = document.createElement('span');
      inner.style.setProperty('--i', idx++);
      inner.textContent = word;
      wEl.appendChild(inner);
      h2.appendChild(wEl);
      if (w < arr.length - 1) h2.appendChild(document.createTextNode(' '));
    });
  }
  document.querySelectorAll('.section-head h2').forEach(splitH2);

  /* ------------------------------------------------------------------
     Scroll progress bar
     ------------------------------------------------------------------ */
  var bar = document.querySelector('.progress');
  function onScrollBar() {
    var h = docEl;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? ((h.scrollTop || document.body.scrollTop) / max) * 100 : 0;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', onScrollBar, { passive: true });
  onScrollBar();

  /* ------------------------------------------------------------------
     Scroll reveals. Two paths; the CSS keyframes start invisible, so
     a wrong path could trap content at opacity:0. Both are gated to
     desktop/fine pointers — on touch/mobile we just show everything.

     - Native CSS scroll timeline (`.sda`) when supported and on fine
       pointers.
     - IntersectionObserver (`.io`) as fallback.
     - If neither: no class added, content stays visible.
     ------------------------------------------------------------------ */
  var nativeSDA = window.CSS && CSS.supports && CSS.supports('animation-timeline: view()');
  var hasIO = 'IntersectionObserver' in window;
  var useNative = nativeSDA && finePointer;

  if (useNative) {
    docEl.classList.add('sda');
  } else if (hasIO && finePointer) {
    docEl.classList.add('io');
    var revealEls = [].slice.call(document.querySelectorAll('.rv, .rvx, .rvs, .dl'));
    var vh = window.innerHeight;
    revealEls.forEach(function (el) {
      if (el.getBoundingClientRect().top > vh * 0.9) el.classList.add('pre');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('pre');
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------
     "Seen" observer — H2 word reveal & media clip reveal
     ------------------------------------------------------------------ */
  if ('IntersectionObserver' in window) {
    var seenIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('seen');
          seenIO.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.2 });
    document.querySelectorAll('.section-head, .project-media').forEach(function (el) { seenIO.observe(el); });
  } else {
    document.querySelectorAll('.section-head, .project-media').forEach(function (el) { el.classList.add('seen'); });
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
     Scroll rail — vertical spine connecting every section. Fill tracks
     overall scroll progress; nodes light up for the active section.
     ------------------------------------------------------------------ */
  var rail = document.querySelector('.rail');
  if (rail) {
    var railFill = rail.querySelector('.rail-fill');
    function onRailFill() {
      var max = docEl.scrollHeight - docEl.clientHeight;
      var p = max > 0 ? (docEl.scrollTop || document.body.scrollTop) / max : 0;
      railFill.style.setProperty('--rail-p', Math.max(0, Math.min(1, p)).toFixed(3));
    }
    window.addEventListener('scroll', onRailFill, { passive: true });
    onRailFill();

    var railTargets = { top: document.querySelector('.hero') };
    ['stack', 'projects', 'experience', 'formation', 'contact'].forEach(function (id) {
      railTargets[id] = document.getElementById(id);
    });
    var railDots = {};
    rail.querySelectorAll('.rail-dots li').forEach(function (li) {
      railDots[li.getAttribute('data-target')] = li;
      li.addEventListener('click', function () {
        var el = railTargets[li.getAttribute('data-target')];
        if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
    });

    var navSpy = {};
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      navSpy[a.getAttribute('href').replace('#', '')] = a;
    });

    var order = ['top', 'stack', 'projects', 'experience', 'formation', 'contact'].filter(function (k) { return railTargets[k]; });
    var lastActive = null;
    function updateActiveSection() {
      var refY = 170;
      var current = order[0];
      for (var i = 0; i < order.length; i++) {
        if (railTargets[order[i]].getBoundingClientRect().top <= refY) current = order[i];
      }
      if (current === lastActive) return;
      lastActive = current;
      Object.keys(railDots).forEach(function (k) { railDots[k].classList.toggle('active', k === current); });
      document.querySelectorAll('.nav-links a').forEach(function (a) { a.classList.remove('active'); });
      var link = navSpy[current === 'top' ? '' : current];
      if (link) link.classList.add('active');
    }
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();
  }

  /* ------------------------------------------------------------------
     Footer wordmark — fills with cyan as it scrolls into view
     ------------------------------------------------------------------ */
  var wm = document.querySelector('.footer-wordmark');
  if (wm && !reduceMotion) {
    function wmFill() {
      var r = wm.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = (vh - r.top) / (vh * 0.6);
      p = Math.max(0, Math.min(1, p));
      wm.style.setProperty('--wm', (p * 100).toFixed(1) + '%');
    }
    window.addEventListener('scroll', wmFill, { passive: true });
    wmFill();
  }
})();
