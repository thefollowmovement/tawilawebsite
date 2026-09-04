# SEO : ce qui est en place

## Sur chaque page

- `<title>` unique, 50 à 65 caractères, mot-clé principal en tête, marque en fin.
- `<meta name="description">` unique, 140 à 160 caractères, avec un appel à l'action.
- `<link rel="canonical">` et `hreflang` (fr et x-default).
- `<meta name="robots">` : index, follow (noindex sur la 404).
- Open Graph complet : type, site_name, locale, title, description, url, image 1200 x 630 avec alt.
- Twitter Card `summary_large_image`.
- `lang="fr"`, `theme-color`, favicon SVG, icône Apple, manifeste.
- Un seul `<h1>` par page, hiérarchie `h2` / `h3` respectée, sections avec `aria-labelledby`.
- Fil d'Ariane visible et balisé (BreadcrumbList).
- Liens internes descriptifs entre les pages (fonds, critères, processus, équipe, participations, contact).
- Images en SVG inline ou avec `alt`, `width` et `height`.
- Polices en `preconnect` et `display=swap`.

## Données structurées (JSON-LD)

| Page | Schémas |
| --- | --- |
| Toutes | Organization + FinancialService (`@id` partagé), WebSite |
| Pages intérieures | BreadcrumbList |
| Le fonds | FAQPage (4 questions) |
| Équipe | AboutPage |
| Participations | CollectionPage + ItemList des enseignes |
| Contact | ContactPage |

Tester avec https://search.google.com/test/rich-results après mise en ligne.

## Fichiers techniques

- `robots.txt` avec lien vers le sitemap.
- `sitemap.xml` avec `lastmod`, `changefreq`, `priority`.

## Mots-clés visés

Capital-investissement éthique, fonds d'investissement halal, investir dans la
restauration halal, franchise halal, financement sans dette, capital-risque et
capital-développement, écosystème halal en France.

Les titres et descriptions les intègrent naturellement. Le contenu éditorial
(thèse, critères, FAQ, principes) donne de la profondeur sémantique aux pages.

## Liste de contrôle avant mise en ligne

1. Remplacer le domaine supposé `www.tawilacapital.fr` partout.
2. Vérifier adresse, téléphone, e-mail dans les données structurées Organization.
3. Ajouter le vrai lien LinkedIn dans `sameAs`.
4. Générer et déclarer le sitemap dans Google Search Console et Bing Webmaster Tools.
5. Créer la fiche Google Business Profile et la lier à l'adresse du site.
6. Sous WordPress : installer Rank Math ou Yoast, reporter titres et descriptions, activer le fil d'Ariane et le sitemap du plugin, désactiver celui du thème pour éviter les doublons.
7. Compresser les photos (WebP, moins de 200 Ko), renseigner les `alt`.
8. Activer HTTPS, la mise en cache et un CDN. Objectif Core Web Vitals : LCP inférieur à 2,5 s.
9. Vérifier qu'aucune page de démonstration (`preview/`) n'est indexée.
