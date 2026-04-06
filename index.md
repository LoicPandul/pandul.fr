---
title: "Loic Morel - Contenus pedagogiques sur Bitcoin"
description: "Formations, tutoriels, articles et podcasts sur Bitcoin par Loic Morel. Dictionnaire de 1408 definitions techniques."
image: /assets/img/social-card.png
---

<section class="hero-section">
  <div class="hero-content">
    <img src="{{ '/assets/img/profile.png' | relative_url }}" alt="Loic Morel" class="hero-photo" loading="eager">
    <h1>J'ecris des contenus pedagogiques sur Bitcoin.</h1>
  </div>
</section>

<nav class="section-nav" aria-label="Sections de contenu">
  <a href="#dictionnaire">Dictionnaire</a>
  <a href="#formations">Formations</a>
  <a href="#ecrits">Ecrits</a>
  <a href="#audio-video">Audio / Video</a>
</nav>

<section id="dictionnaire" class="portfolio-section">
  <div class="dict-promo-card">
    <div class="dict-promo-content">
      <h2>Dictionnaire de Bitcoin</h2>
      <p class="dict-promo-stats">1408 definitions dans 19 categories</p>
      <p class="dict-promo-desc">Le vocabulaire technique complet de Bitcoin, explique simplement.</p>
      <a href="{{ '/dictionnaire/' | relative_url }}" class="btn-primary">Explorer le dictionnaire</a>
    </div>
  </div>
</section>

<section id="formations" class="portfolio-section">
  <div class="section-header">
    <div class="section-header-left">
      <span class="section-header-icon" aria-hidden="true">&#x1F393;</span>
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
        <span class="platform-badge platform-badge--{{ item.platform | downcase }}">{{ item.platform }}</span>
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
      <span class="platform-badge platform-badge--{{ item.platform | downcase }}">{{ item.platform }}</span>
    </a>
    {% endfor %}
  </div>
</section>

<section id="ecrits" class="portfolio-section">
  <div class="section-header">
    <div class="section-header-left">
      <span class="section-header-icon" aria-hidden="true">&#x270D;</span>
      <h2>Ecrits</h2>
    </div>
    <span class="section-count">{{ site.data.ecrits | size }} contenus</span>
  </div>

  <div class="content-grid content-grid--featured">
    {% assign featured_ecrits = site.data.ecrits | where: "featured", true %}
    {% for item in featured_ecrits limit:3 %}
    <a href="{{ item.url }}" class="content-card" target="_blank" rel="noopener">
      <div class="content-card-body">
        <span class="platform-badge platform-badge--{{ item.platform | downcase }}">{{ item.platform }}</span>
        <h3 class="content-card-title">{{ item.title }}</h3>
        <p class="content-card-desc">{{ item.description }}</p>
      </div>
    </a>
    {% endfor %}
  </div>

  <div class="content-list">
    <h3 class="content-list-heading">Tous les ecrits</h3>
    {% for item in site.data.ecrits %}
    <a href="{{ item.url }}" class="content-list-item" target="_blank" rel="noopener">
      <span class="content-list-title">{{ item.title }}</span>
      <span class="platform-badge platform-badge--{{ item.platform | downcase }}">{{ item.platform }}</span>
    </a>
    {% endfor %}
  </div>
</section>

<section id="audio-video" class="portfolio-section">
  <div class="section-header">
    <div class="section-header-left">
      <span class="section-header-icon" aria-hidden="true">&#x1F3A4;</span>
      <h2>Audio / Video</h2>
    </div>
    <span class="section-count">{{ site.data.audio-video | size }} contenus</span>
  </div>

  <div class="content-grid content-grid--featured">
    {% assign featured_av = site.data.audio-video | where: "featured", true %}
    {% for item in featured_av limit:3 %}
    <a href="{{ item.url }}" class="content-card" target="_blank" rel="noopener">
      <div class="content-card-body">
        <span class="platform-badge platform-badge--{{ item.platform | downcase }}">{{ item.platform }}</span>
        <h3 class="content-card-title">{{ item.title }}</h3>
        <p class="content-card-desc">{{ item.description }}</p>
      </div>
    </a>
    {% endfor %}
  </div>

  <div class="content-list">
    <h3 class="content-list-heading">Tous les contenus audio et video</h3>
    {% for item in site.data.audio-video %}
    <a href="{{ item.url }}" class="content-list-item" target="_blank" rel="noopener">
      <span class="content-list-title">{{ item.title }}</span>
      <span class="platform-badge platform-badge--{{ item.platform | downcase }}">{{ item.platform }}</span>
    </a>
    {% endfor %}
  </div>
</section>
