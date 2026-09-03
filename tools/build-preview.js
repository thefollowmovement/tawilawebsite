#!/usr/bin/env node
/*
  Construit un aperçu monopage du site (preview/tawila-preview.html) :
  toutes les pages, la feuille de style et le script sont regroupés dans un
  seul fichier HTML, avec une navigation par ancre (#accueil, #le-fonds, ...).
  Utile pour partager ou publier une prévisualisation sans serveur.

  Usage : node tools/build-preview.js
*/
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = path.join(ROOT, 'site');
const OUT = path.join(ROOT, 'preview', 'tawila-preview.html');

const PAGES = [
  ['index.html', 'accueil'],
  ['le-fonds.html', 'le-fonds'],
  ['equipe.html', 'equipe'],
  ['participations.html', 'participations'],
  ['contact.html', 'contact'],
  ['mentions-legales.html', 'mentions-legales'],
  ['politique-de-confidentialite.html', 'politique-de-confidentialite'],
  ['404.html', '404'],
];
const routeOf = Object.fromEntries(PAGES);

const css = fs.readFileSync(path.join(SITE, 'assets/css/style.css'), 'utf8');
const js = fs.readFileSync(path.join(SITE, 'assets/js/main.js'), 'utf8');
const svgToDataUri = (file) => 'data:image/svg+xml;utf8,' + encodeURIComponent(fs.readFileSync(path.join(SITE, 'assets/img', file), 'utf8'));

function rewriteLinks(html) {
  // href="page.html#ancre" -> href="#route" (l'ancre interne est conservée via data-anchor)
  return html.replace(/href="([a-z0-9-]+\.html)(#[^"]*)?"/g, (m, file, anchor) => {
    const route = routeOf[file];
    if (!route) return m;
    return `href="#${route}"${anchor ? ` data-anchor="${anchor.slice(1)}"` : ''}`;
  }).replace(/href="#([a-z0-9-]+)"(?! data-anchor)/g, (m, id) => routeOf[id + '.html'] ? m : m);
}

const indexHtml = fs.readFileSync(path.join(SITE, 'index.html'), 'utf8');
const headMatch = indexHtml.match(/<head>([\s\S]*?)<\/head>/);
const title = indexHtml.match(/<title>([\s\S]*?)<\/title>/)[1];
const headerMatch = indexHtml.match(/<header class="site-header[\s\S]*?<\/header>/);
const footerMatch = indexHtml.match(/<footer class="site-footer">[\s\S]*?<\/footer>/);

let views = '';
const meta = {};
for (const [file, route] of PAGES) {
  const html = fs.readFileSync(path.join(SITE, file), 'utf8');
  const main = html.match(/<main id="contenu">[\s\S]*?<\/main>/)[0];
  const t = html.match(/<title>([\s\S]*?)<\/title>/)[1];
  const dark = /site-header site-header--dark/.test(html);
  meta[route] = { title: t, dark };
  // ids d'ancres internes : préfixer pour éviter les collisions entre pages
  const scoped = main.replace(/ id="contenu"/, ` id="contenu-${route}"`);
  views += `<div class="view" data-route="${route}" hidden>${scoped}</div>\n`;
}

const header = rewriteLinks(headerMatch[0]);
const footer = rewriteLinks(footerMatch[0]);
views = rewriteLinks(views);

const routerJs = `
(function(){
  var META = ${JSON.stringify(meta)};
  var header = document.querySelector('.site-header');
  var nav = header.querySelector('.nav');
  var routeLabels = { 'accueil': 'index.html', 'le-fonds': 'le-fonds.html', 'equipe': 'equipe.html', 'participations': 'participations.html', 'contact': 'contact.html' };
  function show(route, anchor) {
    if (!META[route]) route = 'accueil';
    document.querySelectorAll('.view').forEach(function(v){ v.hidden = v.getAttribute('data-route') !== route; });
    document.title = META[route].title;
    header.classList.toggle('site-header--dark', !!META[route].dark);
    nav.querySelectorAll('a').forEach(function(a){
      var target = (a.getAttribute('href') || '').replace('#','');
      if (target === route) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
    });
    var view = document.querySelector('.view[data-route="' + route + '"]');
    // Réinitialise les animations de la vue affichée
    view.querySelectorAll('.is-ready, .is-visible').forEach(function(el){ el.classList.remove('is-ready'); el.classList.remove('is-visible'); });
    view.querySelectorAll('[data-count]').forEach(function(el){ el.textContent = '0'; });
    window.TAWILA.initHero(view); window.TAWILA.initReveal(view); window.TAWILA.initCounters(view);
    if (anchor) { var el = view.querySelector('#' + anchor); if (el) { setTimeout(function(){ el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50); return; } }
    window.scrollTo(0, 0);
  }
  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var route = a.getAttribute('href').slice(1);
    if (META[route]) {
      e.preventDefault();
      var anchor = a.getAttribute('data-anchor');
      if (location.hash !== '#' + route) { history.pushState(null, '', '#' + route); }
      show(route, anchor);
    }
  });
  window.addEventListener('popstate', function(){ show(location.hash.slice(1) || 'accueil'); });
  window.addEventListener('hashchange', function(){ show(location.hash.slice(1) || 'accueil'); });
  // Initialisation
  var initial = location.hash.slice(1) || 'accueil';
  document.querySelectorAll('.view').forEach(function(v){ v.hidden = true; });
  window.TAWILA.init(document);
  show(initial);
})();
`;

const out = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="robots" content="noindex">
  <link rel="icon" href="${svgToDataUri('favicon.svg')}" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Manrope:wght@400;500;600;700&display=swap">
  <style>
${css}
  .preview-banner { position: fixed; left: 0; right: 0; bottom: 0; z-index: 200; background: #07130f; color: #eceee8; font: 600 12px/1.4 Manrope, sans-serif; padding: 8px 16px; text-align: center; opacity: .92; }
  .preview-banner a { color: #c9a961; }
  .view[hidden] { display: none !important; }
  </style>
</head>
<body>
${header}
${views}
${footer}
<div class="preview-banner">Aperçu de démonstration du site Tawila Capital. Navigation par ancres, formulaire non connecté. Version WordPress + Elementor à venir.</div>
<script>
${js}
</script>
<script>
${routerJs}
</script>
</body>
</html>
`;
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, out);
console.log('Aperçu écrit :', OUT, (out.length / 1024).toFixed(0) + ' Ko');
