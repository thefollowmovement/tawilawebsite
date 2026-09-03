# Modifier le contenu

Tout le contenu est dans les fichiers HTML du dossier `site/`. Chaque bloc est
commenté en français dans le code (`<!-- ... -->`). Aucun outil n'est nécessaire :
un éditeur de texte suffit.

## Couleurs et polices

En tête de `site/assets/css/style.css`, deux jeux de variables :

- le bloc `:root` définit le jeu clair, utilisé par défaut sur tout le site ;
- le bloc `.site-header, .hero, .page-hero, .site-footer` redéfinit les mêmes variables
  en sombre pour la barre de navigation, le héros, les bandeaux de page et le pied de page.

| Variable | Rôle | Clair | Sombre |
| --- | --- | --- | --- |
| `--bg` | fond principal | `#f7f7f3` | `#07130f` |
| `--bg-alt` | sections alternées, panneaux | `#eef0e9` | `#0c241c` |
| `--accent` | or (libellés, traits) | `#9c7a33` | `#c9a961` |
| `--accent-light` | chiffres, liens | `#7e6128` | `#e9d9ad` |
| `--text` | texte principal | `#0b2e22` | `#eceee8` |
| `--text-muted` | texte secondaire | `#4f5f57` | `#9fb0a6` |
| `--font-display` | police des titres | Sora | |
| `--font-body` | police du texte | Manrope | |

Pour passer une section en sombre, ajoutez-lui la classe `theme-dark`.

## Textes

Chaque page est composée de sections `<section>` avec un titre `<h2>` et des
paragraphes. Modifiez le texte entre les balises, sans toucher aux attributs
`class`.

Le titre du héros de l'accueil est découpé en trois lignes pour l'animation :

```html
<span class="line"><span>Autour d'une même table,</span></span>
```

Gardez cette structure et changez seulement le texte intérieur.

## Chiffres clés

Sur l'accueil, chaque chiffre animé utilise `data-count` :

```html
<span data-count="70">0</span><small>+</small>
```

Changez la valeur de `data-count`. Pour un nombre décimal, ajoutez `data-decimals="1"`.

## Équipe

Dans `equipe.html`, chaque personne est un bloc `<article class="member">`. Les photos
sont dans `site/assets/img/equipe/` au format 800 x 1000 pixels, JPEG.

Sont en place, issus de la présentation du groupe : les six fondateurs (Wail Mokhbat,
Hafi Nizar, Yannis Ourabia, Mehdi Bella, Mohamed Bella, Ryad Yahia-Cherif), les trois
sociétés fondatrices (DPS Market, Big M, Hoxon), la direction opérationnelle et la frise
historique. Trois portraits manquent (Yannis Ourabia, Mehdi Bella, Ryad Yahia-Cherif) :
déposez le fichier dans le dossier et remplacez le bloc `member__photo` par une balise
`<img>` comme pour les autres. Vérifiez que chaque personne accepte d'apparaître.

## Participations

Dans `participations.html`, chaque enseigne est un bloc `<article class="holding">`.
L'attribut `data-tags` pilote les filtres (`distribution`, `restauration`, `finance`,
`produits`, `preparation`). Les logos sont dans `site/assets/img/marques/` (44 pixels de
haut à l'affichage). Les cartes sans logo affichent le nom en texte.

## Formulaire de contact

Le formulaire de `contact.html` est un modèle visuel. Sous WordPress il sera remplacé
par WPForms Pro (voir `docs/WORDPRESS-ELEMENTOR.md`). Il n'envoie rien pour l'instant.

## Logo

Le logo fourni en image a été redessiné en vectoriel (`assets/img/logo-mark.svg`,
`logo.svg`, `favicon.svg`). Si vous disposez du fichier source (SVG, AI ou PNG haute
définition), remplacez ces fichiers et le bloc `<svg class="brand__mark">` de l'en-tête
et du pied de page de chaque page par une balise `<img>`.

## Ce qui reste à compléter

- Domaine réel (actuellement `https://www.tawilacapital.fr` dans les balises `canonical`, Open Graph, `sitemap.xml`, `robots.txt` et les données structurées).
- Adresse postale, téléphone et e-mail (en-tête de `contact.html`, pied de page, données structurées).
- Photos de l'équipe et logos des enseignes.
- Mentions légales et politique de confidentialité (éléments entre crochets).
- Lien LinkedIn de l'entreprise.
