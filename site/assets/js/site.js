/* soc-doc-loc marketing site — shared behaviour for all three pages.
   Icons: Lucide (open source, ISC) loaded from a CDN in each page; this file only calls createIcons().
   Everything here degrades gracefully: without JS the content is fully readable (.no-js shows .reveal items). */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  // Icons — Lucide swaps every <i data-lucide="name"> for an inline SVG.
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  var header = document.querySelector('.site-header');
  var toTop = document.querySelector('.to-top');

  // Header border + back-to-top button appear once the page scrolls.
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 12);
    if (toTop) toTop.classList.toggle('is-shown', y > 900);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // Mobile menu.
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  // Scroll reveal — elements with .reveal fade up once; children of a [data-stagger] parent get a staggered delay.
  document.querySelectorAll('[data-stagger]').forEach(function (group) {
    Array.prototype.forEach.call(group.querySelectorAll('.reveal'), function (el, i) {
      el.style.setProperty('--d', (i * 0.08).toFixed(2) + 's');
    });
  });
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Sticky index (feature pages): highlight the pane in view, fill the progress bar,
  // and on mobile keep the active chip scrolled into the horizontal strip.
  var toc = document.querySelector('.toc');
  if (toc) {
    var links = Array.prototype.slice.call(toc.querySelectorAll('ol a[href^="#"]'));
    var panes = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
    var bar = toc.querySelector('.toc-progress span');
    var strip = toc.querySelector('ol');
    var current = null;

    function setActive(id) {
      if (id === current) return;
      current = id;
      links.forEach(function (a) {
        var on = a.getAttribute('href') === '#' + id;
        a.classList.toggle('is-active', on);
        if (on) {
          a.setAttribute('aria-current', 'true');
          // Only scroll the chip strip horizontally (mobile layout) — never the page.
          if (strip && strip.scrollWidth > strip.clientWidth + 4) {
            var left = a.offsetLeft - strip.clientWidth / 2 + a.offsetWidth / 2;
            strip.scrollTo({ left: left, behavior: 'smooth' });
          }
        } else {
          a.removeAttribute('aria-current');
        }
      });
    }

    function spy() {
      var line = window.innerHeight * 0.35;
      var active = panes[0];
      for (var i = 0; i < panes.length; i++) {
        if (panes[i].getBoundingClientRect().top - line <= 0) active = panes[i];
      }
      if (active) setActive(active.id);
      if (bar && panes.length) {
        var first = panes[0].getBoundingClientRect().top + window.scrollY;
        var last = panes[panes.length - 1];
        var end = last.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
        var pct = Math.min(1, Math.max(0, (window.scrollY - first + line) / Math.max(1, end - first + line)));
        bar.style.width = (pct * 100).toFixed(1) + '%';
      }
    }
    window.addEventListener('scroll', spy, { passive: true });
    window.addEventListener('resize', spy);
    spy();
  }

  // Pricing calculator (home page): ₹200 per flat per year.
  var range = document.getElementById('flats');
  if (range) {
    var RATE = 200;
    var outFlats = document.getElementById('flats-out');
    var outYear = document.getElementById('year-out');
    var outMonth = document.getElementById('month-out');
    var fmt = new Intl.NumberFormat('en-IN');
    function calc() {
      var n = parseInt(range.value, 10) || 0;
      outFlats.textContent = fmt.format(n);
      outYear.textContent = '₹' + fmt.format(n * RATE);
      outMonth.textContent = '₹' + fmt.format(Math.round((n * RATE) / 12));
    }
    range.addEventListener('input', calc);
    calc();
  }

  // Count-up numbers: <b data-count="28">0</b>
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        co.unobserve(el);
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        if (reduce) { el.textContent = target + suffix; return; }
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min(1, (ts - start) / 1200);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
