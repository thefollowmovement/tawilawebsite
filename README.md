# Site Tawila Capital

Site vitrine de Tawila Capital, fonds de capital-investissement éthique.
Version 1 en HTML, CSS et JavaScript, prête à être visualisée et à servir de
maquette de référence pour la version WordPress + Elementor.

## Structure

```
site/                        Le site statique (à ouvrir dans un navigateur)
  index.html                 Accueil
  le-fonds.html              Le fonds : thèse, critères, processus, feuille de route, investisseurs, FAQ
  equipe.html                Équipe : actionnaires fondateurs, personnes clés, principes
  participations.html        Participations avec filtres
  contact.html               Contact (formulaire modèle, à remplacer par WPForms Pro)
  mentions-legales.html      Mentions légales
  politique-de-confidentialite.html
  404.html
  robots.txt, sitemap.xml, site.webmanifest
  assets/css/style.css       Toute la mise en forme (couleurs et polices en tête de fichier)
  assets/js/main.js          Animations, menu, accordéon, filtres, formulaire
  assets/img/                Logo (SVG et PNG), favicon, image de partage (Open Graph)
preview/tawila-preview.html  Aperçu monopage autonome (généré, ne pas modifier à la main)
tools/build-preview.js       Génère l'aperçu monopage à partir de site/
docs/CONTENU.md              Comment modifier textes, couleurs, équipe, participations
docs/SEO.md                  Ce qui est en place et la liste de contrôle avant mise en ligne
docs/WORDPRESS-ELEMENTOR.md  Plan de conversion WordPress + Elementor + WPForms Pro
```

## Visualiser le site

Ouvrir `site/index.html` dans un navigateur, ou lancer un petit serveur local :

```
npx http-server site -p 8080
```

Pour regénérer l'aperçu monopage après une modification :

```
node tools/build-preview.js
```

## Éléments à compléter avant mise en ligne

Voir `docs/CONTENU.md`. En résumé : le domaine (supposé `www.tawilacapital.fr`),
l'adresse, le téléphone, l'e-mail, les photos de l'équipe, les logos des enseignes,
les mentions légales et le fichier logo officiel en haute définition.
