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
    var next = docEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    if (document.startViewTransition && !reduceMotion) {
      document.startViewTransition(function () { applyTheme(next); });
    } else {
      applyTheme(next);
    }
  });

  /* ------------------------------------------------------------------
     Boot loader — "$ ayches --version" (once per session)
     ------------------------------------------------------------------ */
  var booted = false;
  try { booted = sessionStorage.getItem('booted') === '1'; } catch (e) { /* ok */ }

  function ready() { docEl.classList.add('ready'); startTypewriter(); }

  if (booted || reduceMotion) {
    ready();
  } else {
    var boot = document.createElement('div');
    boot.className = 'boot';
    boot.setAttribute('aria-hidden', 'true');
    boot.innerHTML = '<div class="boot-inner">' +
      '<div class="boot-line"><span class="boot-prompt">$ </span><span id="bootCmd"></span><span class="boot-caret"></span></div>' +
      '<div class="boot-line boot-ver" id="bootOut"></div></div>';
    document.body.appendChild(boot);
    try { sessionStorage.setItem('booted', '1'); } catch (e) { /* ok */ }

    var cmd = 'ayches --version';
    var cmdEl = document.getElementById('bootCmd');
    var i = 0;
    (function typeCmd() {
      if (i <= cmd.length) {
        cmdEl.textContent = cmd.slice(0, i);
        i++;
        setTimeout(typeCmd, 26);
      } else {
        setTimeout(function () {
          document.getElementById('bootOut').textContent = 'v2.0 · shipping desde 2025';
          setTimeout(function () {
            boot.classList.add('away');
            ready();
            setTimeout(function () { boot.remove(); }, 700);
          }, 420);
        }, 160);
      }
    })();
  }

  /* ------------------------------------------------------------------
     Code card typewriter — the hero code writes itself
     ------------------------------------------------------------------ */
  function startTypewriter() {
    if (reduceMotion) return;
    var pre = document.querySelector('.code-body');
    if (!pre) return;
    var nodes = [];
    (function walk(n) {
      n.childNodes.forEach(function (c) {
        if (c.nodeType === 3) { nodes.push([c, c.nodeValue]); c.nodeValue = ''; }
        else walk(c);
      });
    })(pre);
    var ni = 0, ci = 0;
    setTimeout(function tick() {
      if (ni >= nodes.length) return;
      var pair = nodes[ni];
      ci++;
      pair[0].nodeValue = pair[1].slice(0, ci);
      if (ci >= pair[1].length) { ni++; ci = 0; }
      setTimeout(tick, 7);
    }, 850);
  }

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
     "Seen" observer — triggers H2 char staggers & media clip reveals
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
     Section H2 — split into per-character spans (re-split on lang change)
     ------------------------------------------------------------------ */
  function splitH2(h2) {
    var text = h2.textContent;
    h2.textContent = '';
    var idx = 0;
    text.split(' ').forEach(function (word, w, arr) {
      var wEl = document.createElement('span');
      wEl.className = 'word';
      for (var k = 0; k < word.length; k++) {
        var c = document.createElement('span');
        c.className = 'ch';
        c.style.setProperty('--i', idx++);
        c.textContent = word[k];
        wEl.appendChild(c);
      }
      h2.appendChild(wEl);
      if (w < arr.length - 1) h2.appendChild(document.createTextNode(' '));
    });
  }
  function splitAllH2() {
    document.querySelectorAll('.section-head h2').forEach(splitH2);
  }

  /* ------------------------------------------------------------------
     Language toggle (ES default). Spanish copy lives in the markup;
     English lives in data-en attributes. Persisted in localStorage.
     ------------------------------------------------------------------ */
  var TITLES = {
    es: 'AyChEs — Ayman Charoui · Desarrollador Full-Stack',
    en: 'AyChEs — Ayman Charoui · Full-Stack Developer'
  };
  var langButtons = document.querySelectorAll('.lang-toggle button');

  /* Capture Spanish originals up front (scramble & splits mutate text) */
  document.querySelectorAll('[data-en]').forEach(function (el) {
    if (!el.hasAttribute('data-es')) el.setAttribute('data-es', el.textContent);
  });

  function setLang(lang) {
    document.querySelectorAll('[data-en]').forEach(function (el) {
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
    splitAllH2();
  }

  langButtons.forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });

  var savedLang = null;
  try { savedLang = localStorage.getItem('lang'); } catch (e) { /* storage unavailable */ }
  if (savedLang === 'en') setLang('en');
  else splitAllH2();

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
      }, 1000);
    });
  }

  /* ------------------------------------------------------------------
     Marquee — skew with scroll velocity ("el taller en movimiento")
     ------------------------------------------------------------------ */
  var marquee = document.querySelector('.marquee');
  if (marquee && !reduceMotion) {
    var lastY = window.scrollY, skew = 0, targetSkew = 0;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      targetSkew = Math.max(-4, Math.min(4, (y - lastY) * 0.22));
      lastY = y;
    }, { passive: true });
    (function skewLoop() {
      targetSkew *= 0.86;
      skew += (targetSkew - skew) * 0.12;
      marquee.style.setProperty('--mskew', skew.toFixed(3) + 'deg');
      requestAnimationFrame(skewLoop);
    })();
  }

  /* ------------------------------------------------------------------
     Scroll rail — vertical spine connecting every section. Fill tracks
     overall scroll progress; nodes light up for the active section
     (mirrors the Experience timeline's node language, page-wide).
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

    /* Active section = the last one whose top has crossed the reference
       line. Deterministic (unlike IO, which can fire out of order when
       several short sections intersect the same narrow band at once). */
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

  /* The signature interactions below only run on fine pointers
     without reduced motion — touch devices get the plain experience. */
  if (!finePointer || reduceMotion) return;

  /* ------------------------------------------------------------------
     Scramble/decode hover on nav links & brand ("descifrado")
     ------------------------------------------------------------------ */
  var GLYPHS = '<>-_\\/[]{}=+*^?#";:';
  function scramble(el) {
    if (el._scr) return;
    var original = el.textContent;
    var frame = 0, total = Math.max(10, original.length * 2);
    el._scr = true;
    (function step() {
      frame++;
      var out = '';
      for (var k = 0; k < original.length; k++) {
        if (original[k] === ' ') { out += ' '; continue; }
        var reveal = (frame / total) * original.length * 1.4;
        out += k < reveal ? original[k] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (frame < total) requestAnimationFrame(step);
      else { el.textContent = original; el._scr = false; }
    })();
  }
  document.querySelectorAll('.nav-links a, .brand-txt').forEach(function (el) {
    el.addEventListener('mouseenter', function () { scramble(el); });
  });

  /* ------------------------------------------------------------------
     Custom cursor — terminal caret + monospace cell (the brand gesture
     "_": always something being built). Solid while moving, blinks
     like a real insertion point once the pointer rests.
     ------------------------------------------------------------------ */
  var caret = document.createElement('div');
  var cell = document.createElement('div');
  caret.className = 'cur-caret hidden';
  cell.className = 'cur-cell hidden';
  caret.setAttribute('aria-hidden', 'true');
  cell.setAttribute('aria-hidden', 'true');
  document.body.appendChild(caret);
  document.body.appendChild(cell);
  docEl.classList.add('cc');

  var mx = -100, my = -100, rx = -100, ry = -100, cursorSeen = false, idleTimer = null;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    if (!cursorSeen) { cursorSeen = true; rx = mx; ry = my; caret.classList.remove('hidden'); cell.classList.remove('hidden'); }
    caret.classList.remove('blink');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () { caret.classList.add('blink'); }, 500);
    caret.style.transform = 'translate(' + (mx - caret.offsetWidth / 2) + 'px,' + (my - caret.offsetHeight / 2) + 'px)';
  }, { passive: true });

  document.addEventListener('mouseleave', function () {
    caret.classList.add('hidden'); cell.classList.add('hidden');
    cursorSeen = false; clearTimeout(idleTimer);
  });

  (function trail() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    cell.style.transform = 'translate(' + (rx - cell.offsetWidth / 2) + 'px,' + (ry - cell.offsetHeight / 2) + 'px)';
    requestAnimationFrame(trail);
  })();

  var HOVERABLE = 'a, button, .tech, .project-card, .lang-toggle';
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(HOVERABLE)) { cell.classList.add('hov'); caret.classList.add('hov'); }
  }, { passive: true });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(HOVERABLE)) { cell.classList.remove('hov'); caret.classList.remove('hov'); }
  }, { passive: true });

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
