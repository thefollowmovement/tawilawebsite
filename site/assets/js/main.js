/* =========================================================
   TAWILA — Script principal
   - En-tête au défilement
   - Menu mobile
   - Séquence d'ouverture du héros
   - Révélations au défilement (IntersectionObserver)
   - Compteurs des chiffres clés
   - Accordéon (FAQ)
   - Filtres du portefeuille
   - Validation du formulaire (aperçu HTML ; WPForms prend le relais sous WordPress)
   Tout est exposé via window.TAWILA.init(root) pour pouvoir
   être ré-initialisé (aperçu monopage, Elementor, etc.).
   ========================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- En-tête ---------- */
  function initHeader(root) {
    var header = root.querySelector('.site-header');
    if (!header) return;
    var toggle = header.querySelector('.nav-toggle');
    var nav = header.querySelector('.nav');

    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = toggle.getAttribute('aria-expanded') !== 'true';
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
        nav.classList.toggle('is-open', open);
        header.classList.toggle('is-open', open);
        document.body.classList.toggle('nav-locked', open);
      });
      nav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          if (nav.classList.contains('is-open')) toggle.click();
        });
      });
    }
  }

  /* ---------- Héros ---------- */
  function initHero(root) {
    root.querySelectorAll('.hero, .page-hero').forEach(function (hero) {
      // Laisse un instant au navigateur pour peindre l'état initial, puis lance la séquence.
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { hero.classList.add('is-ready'); });
      });
    });
  }

  /* ---------- Révélations ---------- */
  function initReveal(root) {
    var items = root.querySelectorAll('.reveal, .horizon');
    if (!items.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    items.forEach(function (el) {
      // Élément déjà au-dessus de la zone visible (arrivée par ancre) : affiché sans attendre.
      if (el.getBoundingClientRect().bottom < 0) { el.classList.add('is-visible'); return; }
      io.observe(el);
    });
  }

  /* ---------- Compteurs ---------- */
  function formatNumber(n, decimals) {
    return n.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }
  function initCounters(root) {
    var counters = root.querySelectorAll('[data-count]');
    if (!counters.length) return;
    function run(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      if (isNaN(target)) return;
      if (reduceMotion) { el.textContent = formatNumber(target, decimals); return; }
      var start = null, duration = 1600;
      function frame(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = formatNumber(target * eased, decimals);
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    if (!('IntersectionObserver' in window)) { counters.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Accordéon ---------- */
  function initAccordion(root) {
    root.querySelectorAll('.accordion').forEach(function (acc) {
      var triggers = acc.querySelectorAll('.accordion__trigger');
      triggers.forEach(function (btn) {
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        if (!panel) return;
        btn.addEventListener('click', function () {
          var open = btn.getAttribute('aria-expanded') === 'true';
          // Ferme les autres
          triggers.forEach(function (other) {
            if (other !== btn && other.getAttribute('aria-expanded') === 'true') {
              other.setAttribute('aria-expanded', 'false');
              var p = document.getElementById(other.getAttribute('aria-controls'));
              if (p) { p.style.height = p.scrollHeight + 'px'; requestAnimationFrame(function () { p.style.height = '0px'; }); }
            }
          });
          btn.setAttribute('aria-expanded', String(!open));
          if (open) {
            panel.style.height = panel.scrollHeight + 'px';
            requestAnimationFrame(function () { panel.style.height = '0px'; });
          } else {
            panel.style.height = panel.scrollHeight + 'px';
            panel.addEventListener('transitionend', function done() {
              if (btn.getAttribute('aria-expanded') === 'true') panel.style.height = 'auto';
              panel.removeEventListener('transitionend', done);
            });
          }
        });
      });
    });
  }

  /* ---------- Filtres portefeuille ---------- */
  function initFilters(root) {
    var bar = root.querySelector('.filters');
    if (!bar) return;
    var items = root.querySelectorAll('.holding');
    bar.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        bar.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        var f = btn.getAttribute('data-filter');
        items.forEach(function (it) {
          var match = f === 'all' || (it.getAttribute('data-tags') || '').split(' ').indexOf(f) !== -1;
          it.classList.toggle('is-hidden', !match);
        });
      });
    });
  }

  /* ---------- Formulaire (aperçu) ---------- */
  function initForm(root) {
    var form = root.querySelector('form.form');
    if (!form) return;
    var status = form.querySelector('.form__status');
    function validate(field) {
      var input = field.querySelector('input, textarea, select');
      if (!input) return true;
      var ok = input.checkValidity();
      field.classList.toggle('is-invalid', !ok);
      return ok;
    }
    form.querySelectorAll('.field').forEach(function (field) {
      var input = field.querySelector('input, textarea, select');
      if (input) input.addEventListener('blur', function () { validate(field); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allOk = true;
      form.querySelectorAll('.field').forEach(function (field) { if (!validate(field)) allOk = false; });
      var consent = form.querySelector('input[name="consentement"]');
      if (consent && !consent.checked) { allOk = false; consent.focus(); }
      if (!allOk) {
        if (status) { status.textContent = 'Merci de vérifier les champs signalés.'; status.classList.add('is-error'); }
        return;
      }
      if (status) {
        status.classList.remove('is-error');
        status.textContent = 'Message envoyé. Nous revenons vers vous sous 48 heures ouvrées.';
      }
      form.reset();
    });
  }

  /* ---------- Année du pied de page ---------- */
  function initYear(root) {
    root.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
  }

  function init(root) {
    root = root || document;
    initHeader(root);
    initHero(root);
    initReveal(root);
    initCounters(root);
    initAccordion(root);
    initFilters(root);
    initForm(root);
    initYear(root);
  }

  window.TAWILA = { init: init, initReveal: initReveal, initCounters: initCounters, initHero: initHero, initAccordion: initAccordion, initFilters: initFilters, initForm: initForm };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(document); });
  } else {
    init(document);
  }
})();
