---
title: "Loïc Morel - Contenus pédagogiques sur Bitcoin"
description: "Formations, tutoriels, articles et podcasts sur Bitcoin par Loïc Morel. Dictionnaire de 1408 définitions techniques."
image: /assets/img/social-card.png
---

<section class="hero-section">
  <div class="hero-content">
    <div class="hero-text">
      <h1 class="hero-quote"><span class="hero-quote-mark" aria-hidden="true">></span> J'écris des contenus pédagogiques sur Bitcoin.</h1>
    </div>
    <img src="{{ '/assets/img/profile.png' | relative_url }}" alt="Loïc Morel" class="hero-photo" loading="eager">
  </div>
</section>

<nav class="category-nav" aria-label="Sections de contenu">
  <a href="#dictionnaire" class="category-nav-item">
    <span class="category-nav-label">Dictionnaire</span>
    <span class="category-nav-count">1408 définitions</span>
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

<section id="dictionnaire" class="portfolio-section dict-section">
  <div class="dict-section-inner">
    <div class="dict-section-left">
      <h2>Dictionnaire de Bitcoin</h2>
      <p class="dict-section-stats"><span class="dict-section-number">1408</span> définitions</p>
    </div>
    <div class="dict-section-right">
      <p class="dict-section-desc">Le Dictionnaire de Bitcoin est un ouvrage open source qui recense l'ensemble des définitions couvrant le vocabulaire technique de Bitcoin et de son écosystème. Il est disponible gratuitement en ligne ou bien à la vente en version imprimée.</p>
    </div>
  </div>
  <div class="dict-section-buttons">
    <a href="https://www.amazon.fr/dp/B0GV1N6S1W" class="btn-primary btn-sm" target="_blank" rel="noopener">Acheter sur Amazon</a>
    <a href="https://bitcoinbazar.fr/" class="btn-primary btn-sm" target="_blank" rel="noopener">Acheter sur Bitcoin Bazar</a>
    <a href="{{ '/dictionnaire/' | relative_url }}" class="btn-secondary btn-sm">Explorer le dictionnaire</a>
  </div>
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
    {% for item in site.data.formations %}
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
    {% for item in site.data.ecrits %}
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
    {% for item in site.data.audio-video %}
    <a href="{{ item.url }}" class="content-list-item" target="_blank" rel="noopener">
      <span class="content-list-title">{{ item.title }}</span>
      <span class="platform-badge platform-badge--{{ item.platform | downcase | replace: ' ', '-' }}">{{ item.platform }}</span>
    </a>
    {% endfor %}
  </div>
</section>
