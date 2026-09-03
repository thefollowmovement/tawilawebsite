# Modifier le contenu

Tout le contenu est dans les fichiers HTML du dossier `site/`. Chaque bloc est
commenté en français dans le code (`<!-- ... -->`). Aucun outil n'est nécessaire :
un éditeur de texte suffit.

## Couleurs et polices

En tête de `site/assets/css/style.css`, le bloc `:root` contient toutes les variables :

| Variable | Rôle | Valeur actuelle |
| --- | --- | --- |
| `--encre` | vert profond, fonds sombres, titres | `#0b2e22` |
| `--abysse` | vert Tawila (logo), bandes vertes | `#0f4a35` |
| `--laiton` | or Tawila (logo), accents, traits | `#c4a24e` |
| `--brume` | fond clair principal | `#f4f5f1` |
| `--font-display` | police des titres | Instrument Serif |
| `--font-body` | police du texte | Manrope |

Changer une valeur ici met à jour le site entier.

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

Dans `equipe.html`, chaque personne est un bloc `<article class="member">`.
Pour ajouter une photo, remplacez le `<div class="member__photo">` par :

```html
<img class="member__photo" src="assets/img/equipe/prenom-nom.jpg" alt="Portrait de Prénom Nom" width="800" height="1000" loading="lazy">
```

Format recommandé : 800 x 1000 pixels, JPEG.

Les personnes affichées viennent de la présentation fournie : les trois
actionnaires fondateurs (DPS Market, Big M, Ryad Yahia Cherif) et cinq personnes
clés. Vérifiez que chaque personne accepte d'apparaître sur le site.

## Participations

Dans `participations.html`, chaque enseigne est un bloc `<article class="holding">`.
L'attribut `data-tags` pilote les filtres (`restauration`, `foodcourt`, `services`,
`ecosysteme`). Pour un logo, remplacez le texte de `<div class="holding__logo">` par
une image de 44 pixels de haut.

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
