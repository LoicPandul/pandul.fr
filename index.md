---
title: "Loïc Morel - Contenus pédagogiques sur Bitcoin"
description: "Formations, tutoriels, articles et podcasts sur Bitcoin par Loïc Morel. Dictionnaire de définitions techniques sur Bitcoin."
image: /assets/img/social-card.png
---

<section class="hero-section">
  <h1 class="hero-quote"><span class="hero-quote-mark" aria-hidden="true">></span> J'écris des contenus pédagogiques sur Bitcoin.</h1>
</section>

<nav class="category-nav" aria-label="Sections de contenu">
  <a href="#dictionnaire" class="category-nav-item">
    <span class="category-nav-label">Dictionnaire</span>
    <span class="category-nav-count">{{ site.dictionnaire | size }} définitions</span>
  </a>
  <a href="#formations" class="category-nav-item">
    <span class="category-nav-label">Formations</span>
    <span class="category-nav-count">{{ site.data.formations | size }} cours</span>
  </a>
  <a href="#ecrits" class="category-nav-item">
    <span class="category-nav-label">Tutoriels et articles</span>
    <span class="category-nav-count">{{ site.data.ecrits | size }} contenus</span>
  </a>
  <a href="#podcasts" class="category-nav-item">
    <span class="category-nav-label">Podcasts</span>
    <span class="category-nav-count">{{ site.data.audio-video | size }} épisodes</span>
  </a>
</nav>

<section id="dictionnaire" class="portfolio-section">
  <div class="dict-hero">
    <div class="dict-hero-left">
      <h2 style="font-size:clamp(22px, 3.5vw, 26px); margin:0 0 var(--space-xs);">Dictionnaire de Bitcoin</h2>
      <p class="dict-stats"><span class="dict-stats-number">{{ site.dictionnaire | size }}</span> définitions</p>
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
      <p class="definition-cta-text">Explorez les définitions en ligne</p>
      <div class="definition-cta-buttons">
        <a href="{{ '/dictionnaire/' | relative_url }}" class="btn btn-secondary btn-sm">Explorer le dictionnaire</a>
      </div>
    </div>
  </aside>
</section>

<section id="formations" class="portfolio-section">
  <div class="section-header">
    <div class="section-header-left">
      <h2>Formations</h2>
    </div>
    <span class="section-count">{{ site.data.formations | size }} formations</span>
  </div>

  <div class="content-grid content-grid--featured">
    {% assign featured_formations = site.data.formations | where: "featured", true %}
    {% for item in featured_formations limit:3 %}
    <a href="{{ item.url }}" class="content-card{% if item.thumbnail %} content-card--thumbnail{% endif %}" target="_blank" rel="noopener">
      {% if item.thumbnail %}
      <div class="content-card-thumb">
        <img src="{{ item.thumbnail | relative_url }}" alt="{{ item.title }}" loading="lazy">
      </div>
      {% endif %}
      <div class="content-card-body">
        <span class="platform-badge platform-badge--{{ item.platform | downcase | replace: ' ', '-' }}">{{ item.platform }}</span>
        {% if item.code %}<span class="content-card-code">{{ item.code }}</span>{% endif %}
        <h3 class="content-card-title">{{ item.title }}</h3>
        <p class="content-card-desc">{{ item.description }}</p>
      </div>
    </a>
    {% endfor %}
  </div>

  <div class="content-list">
    <h3 class="content-list-heading">Toutes les formations</h3>
    {% assign sorted_formations = site.data.formations | sort: "title" %}
    {% for item in sorted_formations %}
    <a href="{{ item.url }}" class="content-list-item" target="_blank" rel="noopener">
      <span class="content-list-title">{% if item.code %}{{ item.code }} — {% endif %}{{ item.title }}</span>
      <span class="platform-badge platform-badge--{{ item.platform | downcase | replace: ' ', '-' }}">{{ item.platform }}</span>
    </a>
    {% endfor %}
  </div>
</section>

<section id="ecrits" class="portfolio-section">
  <div class="section-header">
    <div class="section-header-left">
      <h2>Tutoriels et articles</h2>
    </div>
    <span class="section-count">{{ site.data.ecrits | size }} contenus</span>
  </div>

  <div class="content-grid content-grid--featured">
    {% assign featured_ecrits = site.data.ecrits | where: "featured", true %}
    {% for item in featured_ecrits limit:3 %}
    <a href="{{ item.url }}" class="content-card" target="_blank" rel="noopener">
      <div class="content-card-body">
        <span class="platform-badge platform-badge--{{ item.platform | downcase | replace: ' ', '-' }}">{{ item.platform }}</span>
        <h3 class="content-card-title">{{ item.title }}</h3>
        <p class="content-card-desc">{{ item.description }}</p>
      </div>
    </a>
    {% endfor %}
  </div>

  <div class="content-list">
    <h3 class="content-list-heading">Tous les tutoriels et articles</h3>
    {% assign sorted_ecrits = site.data.ecrits | sort: "title" %}
    {% for item in sorted_ecrits %}
    <a href="{{ item.url }}" class="content-list-item" target="_blank" rel="noopener">
      <span class="content-list-title">{{ item.title }}</span>
      <span class="platform-badge platform-badge--{{ item.platform | downcase | replace: ' ', '-' }}">{{ item.platform }}</span>
    </a>
    {% endfor %}
  </div>
</section>

<section id="podcasts" class="portfolio-section">
  <div class="section-header">
    <div class="section-header-left">
      <h2>Podcasts</h2>
    </div>
    <span class="section-count">{{ site.data.audio-video | size }} épisodes</span>
  </div>

  <div class="content-grid content-grid--featured">
    {% assign featured_av = site.data.audio-video | where: "featured", true %}
    {% for item in featured_av limit:3 %}
    <a href="{{ item.url }}" class="content-card" target="_blank" rel="noopener">
      <div class="content-card-body">
        <span class="platform-badge platform-badge--{{ item.platform | downcase | replace: ' ', '-' }}">{{ item.platform }}</span>
        <h3 class="content-card-title">{{ item.title }}</h3>
        <p class="content-card-desc">{{ item.description }}</p>
      </div>
    </a>
    {% endfor %}
  </div>

  <div class="content-list">
    <h3 class="content-list-heading">Tous les podcasts</h3>
    {% assign sorted_av = site.data.audio-video | sort: "title" %}
    {% for item in sorted_av %}
    <a href="{{ item.url }}" class="content-list-item" target="_blank" rel="noopener">
      <span class="content-list-title">{{ item.title }}</span>
      <span class="platform-badge platform-badge--{{ item.platform | downcase | replace: ' ', '-' }}">{{ item.platform }}</span>
    </a>
    {% endfor %}
  </div>
</section>
