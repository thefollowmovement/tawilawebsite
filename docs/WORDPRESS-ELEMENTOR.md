# Conversion WordPress + Elementor

Cette version HTML sert de maquette de référence. Voici le plan pour la
reconstruire sous WordPress avec Elementor, en gardant tout modifiable.

## Extensions recommandées

| Besoin | Extension |
| --- | --- |
| Constructeur de pages | Elementor Pro (en-tête, pied de page, modèles, animations, formulaires exclus) |
| Formulaire de contact | WPForms Pro (page Contact dédiée) |
| SEO | Rank Math SEO ou Yoast SEO |
| Conversion HTML vers Elementor | HTML to Elementor (addon, exporte les sections en widgets natifs) ou reconstruction manuelle section par section avec les widgets Elementor |
| Animations avancées | Elementor Pro (Motion Effects, entrances) ou Premium Addons / Element Pack pour la ligne animée et les compteurs |
| Performances | WP Rocket ou LiteSpeed Cache, Imagify ou ShortPixel |
| Sécurité et RGPD | Complianz (bandeau cookies), Wordfence |

## Correspondance des sections

| Section HTML | Widget Elementor |
| --- | --- |
| En-tête `.site-header` | Theme Builder > Header : logo (Site Logo), menu (Nav Menu), bouton |
| Héros `.hero` | Section pleine hauteur, Heading avec animation « Fade In Up » par ligne, SVG de la ligne d'horizon en widget HTML |
| Chiffres `.stats` | Widget Counter (Elementor Pro) avec suffixe |
| Piliers `.pillars` | Icon Box x 3, séparateur en haut (Border Top) |
| Bande verte `.section--dark` | Section avec fond `#0c241c`, Heading (police Sora) |
| Secteurs `.sectors` | Icon List ou colonnes Heading + Text |
| Participations `.portfolio` | Posts (Elementor Pro) sur un type de contenu personnalisé « Participations » avec taxonomie « Secteur », ou Loop Grid avec filtres (Taxonomy Filter) |
| Étapes `.steps` | Widget Numbered List ou Flip Box, ou colonnes avec Heading numérotées |
| Feuille de route `.roadmap` | Timeline (addon) ou trois colonnes Heading + Text |
| Principes `.principles` | Colonnes Heading + Text avec séparateurs |
| Équipe `.team` | Widget Image Box, ou type de contenu « Équipe » affiché en Loop Grid |
| Accordéon FAQ | Widget Accordion (ajouter le schéma FAQ dans Rank Math) |
| Appel à l'action `.cta` | Section dégradée `#0c241c` vers `#07130f` avec Heading + 2 Buttons |
| Pied de page | Theme Builder > Footer |

## Réglages globaux Elementor (Site Settings)

- Couleurs globales : Primaire `#c9a961` (or), Secondaire `#0c241c`, Accent `#e9d9ad`, Texte `#eceee8`, Fond `#07130f`.
- Polices globales : Titres Sora 400, Texte Manrope 400/600.
- Largeur du contenu : 1180 px. Espacement des sections : 90 à 130 px.
- Boutons : rayon 2 px, bordure 1 px, majuscules désactivées.

## Formulaire WPForms Pro (page Contact)

Créer un formulaire « Contact » avec les champs :

1. Prénom (Nom, format prénom et nom, obligatoire) ou deux champs texte.
2. E-mail (obligatoire).
3. Téléphone.
4. Société ou enseigne.
5. Vous êtes (liste déroulante) : Entrepreneur ou porteur de concept, Franchisé ou futur franchisé, Investisseur, Conseil ou intermédiaire, Bailleur ou foncière, Candidat, Presse, Autre.
6. Votre message (paragraphe, obligatoire).
7. Case RGPD (WPForms > champ « GDPR Agreement »).

Réglages : notification vers l'adresse de contact, confirmation « Message envoyé.
Nous revenons vers vous sous 48 heures ouvrées. », anti-spam WPForms activé
(honeypot et reCAPTCHA v3 ou hCaptcha). Insérer le formulaire dans la page Contact
avec le widget WPForms d'Elementor ou le shortcode `[wpforms id="ID" title="false"]`.

## SEO sous WordPress

- Reporter le `<title>` et la `<meta name="description">` de chaque page HTML dans Rank Math / Yoast.
- Activer le fil d'Ariane du plugin et le sitemap XML, désactiver ceux en doublon.
- Renseigner l'organisation (nom, logo, réseaux sociaux) dans les réglages du plugin pour générer le schéma Organization.
- Ajouter le schéma FAQ sur la page Le fonds (bloc FAQ de Rank Math).
- Permaliens : « Nom de l'article ». Slugs : `/le-fonds/`, `/equipe/`, `/participations/`, `/contact/`, `/mentions-legales/`, `/politique-de-confidentialite/`.

## Animations à reproduire

- Séquence d'ouverture du héros : titre ligne par ligne (Fade In Up, délais 0, 90, 180 ms), texte latéral en fondu (délai 500 ms), ligne d'horizon dessinée (SVG avec `stroke-dashoffset`, via widget HTML ou addon « SVG Draw »).
- Révélations au défilement : Entrance Animation « Fade In Up », durée 0,9 s, sur les sections.
- Compteurs : widget Counter, durée 1,6 s.
- Traits dorés qui se dessinent : Border Top animé (Custom CSS sur la colonne) ou addon.
- Respecter « prefers-reduced-motion » : Elementor le gère avec le réglage « Réduire les animations » ou via le CSS fourni.

## Étapes de migration

1. Installer WordPress, le thème Hello Elementor, Elementor Pro, WPForms Pro, Rank Math.
2. Importer les couleurs et polices globales.
3. Construire l'en-tête et le pied de page dans le Theme Builder.
4. Créer les types de contenu « Participations » et « Équipe » (avec ACF ou JetEngine) pour que ces listes restent modifiables sans toucher au design.
5. Reconstruire chaque page section par section en suivant la maquette HTML (ou importer via l'addon HTML to Elementor puis nettoyer).
6. Créer le formulaire WPForms et la page Contact.
7. Reporter le SEO, tester les données structurées, soumettre le sitemap.

## Projecteur du héros (signature du site)

Le héros de l'accueil superpose deux couches : un motif discret (base) et le même
motif en or (révélation), découpé par un masque circulaire doux qui suit le curseur
(`mask-image: radial-gradient(...)` piloté par les variables `--mx` et `--my`).
Sur mobile, le projecteur dérive lentement de lui-même. Sous Elementor, deux options :
un widget HTML reprenant le bloc `.hero` et le script `initSpotlight` de `main.js`, ou
un addon d'effet « spotlight / image reveal » (Premium Addons, Element Pack).
