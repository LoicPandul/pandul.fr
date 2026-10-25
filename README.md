# pandul.fr

Site personnel de Loïc Morel, rédacteur technique spécialisé sur Bitcoin et développeur : ce que je fais, mes clients et mes projets.

Site statique Jekyll, hébergé sur GitHub Pages. HTML, CSS et JavaScript sans framework ni étape de build :

- `_includes/site.css` : la feuille de style, insérée dans le `<head>` de chaque page.
- `assets/js/site.js` : les comportements de la page ; `assets/js/lines.js` : le moteur WebGL qui dessine le portrait, la lettre du dictionnaire et le nom du pied de page en lignes.
- `assets/js/vendor/lenis.min.js` : défilement doux (Lenis, licence MIT).
- `assets/fonts/` : Mona Sans et Literata, réduites aux caractères utiles (licence SIL OFL, fichiers `OFL-*.txt`).
- `design/` : inspirations, direction artistique et revue (non publiés).

Le Dictionnaire de Bitcoin a quitté ce site pour son propre domaine, défini par la clé `dictionnaire_url` de `_config.yml`. Chaque ancienne adresse `/dictionnaire/...` reste en ligne sous forme de page de redirection (`_redirections/`), vers le même chemin sur le nouveau domaine.

## Licence

Mes contenus publiés sur les sites de mes clients présentés ici ont leur propre licence et appartiennent à mes clients. Veuillez consulter leurs sites respectifs pour connaître la licence de ces contenus.
