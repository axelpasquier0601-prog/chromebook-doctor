# Chromebook Doctor — application Chromebook

Cette version transforme le site HTML en application web installable (PWA).

## Installation
1. Héberge tout le contenu de ce dossier sur un site HTTPS (par exemple GitHub Pages).
2. Ouvre l'adresse du site dans Chrome sur ton Chromebook.
3. Dans Chrome, utilise l'icône **Installer** dans la barre d'adresse, ou **⋮ > Installer Chromebook Doctor** / **Enregistrer et partager > Installer la page comme application** selon la version de Chrome.
4. Lance ensuite Chromebook Doctor depuis le lanceur d'applications.

## Tester avant publication
Le service worker nécessite HTTPS ou localhost. Ouvre le dossier avec un petit serveur local, pas en double-cliquant simplement sur index.html.

## Contenu
- `index.html` : ton site d'origine, adapté à l'installation.
- `manifest.webmanifest` : nom, icônes et affichage autonome.
- `service-worker.js` : mise en cache pour le fonctionnement hors connexion.
- `icons/` : icônes de l'application.

## Limites conservées du site
ChromeOS et le navigateur limitent l'accès d'une page web au système. Les fonctions de diagnostic mesurent les informations exposées par le navigateur ; elles ne peuvent pas modifier les réglages système ni nettoyer automatiquement ChromeOS.
