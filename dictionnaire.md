---
title: "Dictionnaire"
permalink: /dictionnaire/
---

<div class="dict-hero">
  <div class="dict-hero-left">
    <h1>Dictionnaire de Bitcoin</h1>
    <p class="dict-stats"><span class="dict-stats-number">{{ site.data.dictionnaire-stats.total }}</span> définitions</p>
  </div>
  <div class="dict-hero-right">
    <p class="dict-intro">Le Dictionnaire de Bitcoin est un ouvrage open source qui recense l'ensemble des définitions couvrant le vocabulaire technique de Bitcoin et de son écosystème. Le projet est collaboratif et ouvert aux contributions, sous licence CC BY-NC-SA 4.0. Il est disponible gratuitement en ligne ou bien à la vente en version imprimée sur Amazon et Bitcoin Bazar.</p>
  </div>
</div>

<aside class="definition-cta definition-cta--landing">
  <div class="definition-cta-row">
    <p class="definition-cta-heading">Ce dictionnaire existe en version imprimée</p>
    <div class="definition-cta-buttons">
      <a href="https://bitcoinbazar.fr/products/le-dictionnaire-de-bitcoin" class="btn btn-primary btn-sm" target="_blank" rel="noopener">Acheter sur Bitcoin Bazar</a>
      <a href="https://www.amazon.fr/dp/B0GV1N6S1W" class="btn btn-primary btn-sm" target="_blank" rel="noopener">Acheter sur Amazon</a>
    </div>
  </div>
  <div class="definition-cta-row">
    <p class="definition-cta-text">Une erreur ? Une amélioration ?</p>
    <div class="definition-cta-buttons">
      <a href="https://github.com/LoicPandul/Dictionnaire-de-Bitcoin" class="btn btn-secondary btn-sm" target="_blank" rel="noopener">Contribuer sur GitHub</a>
    </div>
  </div>
</aside>

<div class="dict-search dict-search--landing" role="search">
  <div class="dict-search-inner">
    <svg class="dict-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    <input type="search" class="dict-search-input" placeholder="Rechercher une définition..." autocomplete="off" role="combobox" aria-expanded="false" aria-controls="searchResults" aria-activedescendant="" aria-label="Rechercher une definition">
    <ul id="searchResults" class="dict-search-results" role="listbox" aria-label="Résultats de recherche"></ul>
  </div>
</div>

<nav class="az-bar az-bar--landing" aria-label="Navigation alphabétique">
  <a href="/dictionnaire/lettre/a/" class="az-letter">A</a>
  <a href="/dictionnaire/lettre/b/" class="az-letter">B</a>
  <a href="/dictionnaire/lettre/c/" class="az-letter">C</a>
  <a href="/dictionnaire/lettre/d/" class="az-letter">D</a>
  <a href="/dictionnaire/lettre/e/" class="az-letter">E</a>
  <a href="/dictionnaire/lettre/f/" class="az-letter">F</a>
  <a href="/dictionnaire/lettre/g/" class="az-letter">G</a>
  <a href="/dictionnaire/lettre/h/" class="az-letter">H</a>
  <a href="/dictionnaire/lettre/i/" class="az-letter">I</a>
  <a href="/dictionnaire/lettre/j/" class="az-letter">J</a>
  <a href="/dictionnaire/lettre/k/" class="az-letter">K</a>
  <a href="/dictionnaire/lettre/l/" class="az-letter">L</a>
  <a href="/dictionnaire/lettre/m/" class="az-letter">M</a>
  <a href="/dictionnaire/lettre/n/" class="az-letter">N</a>
  <a href="/dictionnaire/lettre/o/" class="az-letter">O</a>
  <a href="/dictionnaire/lettre/p/" class="az-letter">P</a>
  <a href="/dictionnaire/lettre/q/" class="az-letter">Q</a>
  <a href="/dictionnaire/lettre/r/" class="az-letter">R</a>
  <a href="/dictionnaire/lettre/s/" class="az-letter">S</a>
  <a href="/dictionnaire/lettre/t/" class="az-letter">T</a>
  <a href="/dictionnaire/lettre/u/" class="az-letter">U</a>
  <a href="/dictionnaire/lettre/v/" class="az-letter">V</a>
  <a href="/dictionnaire/lettre/w/" class="az-letter">W</a>
  <a href="/dictionnaire/lettre/x/" class="az-letter">X</a>
  <a href="/dictionnaire/lettre/y/" class="az-letter">Y</a>
  <a href="/dictionnaire/lettre/z/" class="az-letter">Z</a>
</nav>

<section class="category-grid-section">
  <div class="category-grid">
    <a href="/dictionnaire/lettre/a/" class="category-card category-card--all">
      <span class="category-card-name">Toutes les définitions</span>
      <span class="category-card-count">{{ site.data.dictionnaire-stats.total }} définitions</span>
    </a>
    {% for cat in site.data.dictionnaire-stats.categories %}
    <a href="/dictionnaire/categorie/{{ cat.slug }}/" class="category-card">
      <span class="category-card-name">{{ cat.name }}</span>
      <span class="category-card-count">{{ cat.count }} définitions</span>
    </a>
    {% endfor %}
  </div>
</section>
