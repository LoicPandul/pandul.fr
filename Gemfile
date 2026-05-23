# frozen_string_literal: true
# Gemfile minimal pour build Jekyll local (Phase 18 V-03 D-Verif-03).
# Resout tech debt CONCERNS.md "No Gemfile" en passant.
# github-pages meta-gem v232 = Jekyll 3.10.0 + tous les plugins approuves GH Pages
# (jekyll-seo-tag, jekyll-sitemap, jekyll-redirect-from) cf. _config.yml.
# Reference : https://pages.github.com/versions/ (snapshot 2025-08-13).

source "https://rubygems.org"

gem "github-pages", "~> 232", group: :jekyll_plugins

# Windows ne fournit pas les donnees IANA timezone : tzinfo-data requis pour Jekyll
# (Phase 18 V-03 — Rule 3 blocking fix, sinon Jekyll.set_timezone fail avec
# TZInfo::DataSourceNotFound). Gating :windows pour ne pas affecter GH Pages Linux.
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
