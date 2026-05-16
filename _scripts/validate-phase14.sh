#!/usr/bin/env bash
# _scripts/validate-phase14.sh
# Smoke tests Phase 14 — Analytics Foundation + SEO Infrastructure
# Référence : .planning/phases/14-analytics-foundation-seo-infrastructure/14-VALIDATION.md
# Usage    : bash _scripts/validate-phase14.sh [--local-only|--live-only]
# Exit     : 0 si tout passe, 1 si au moins un FAIL

set -u  # erreur sur variable non définie

SITE="${SITE:-https://pandul.fr}"
MODE="${1:-all}"  # all | --local-only | --live-only

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PASS=0
FAIL=0
SKIP=0

pass() { printf "${GREEN}[PASS]${NC} %s\n" "$1"; PASS=$((PASS+1)); }
fail() { printf "${RED}[FAIL]${NC} %s\n" "$1"; FAIL=$((FAIL+1)); }
skip() { printf "${YELLOW}[SKIP]${NC} %s\n" "$1"; SKIP=$((SKIP+1)); }
section() { printf "\n${BLUE}=== %s ===${NC}\n" "$1"; }

# -------------------------------------------------------------------
# SECTION 1 : Local Config Checks (rapides, sans réseau)
# -------------------------------------------------------------------
run_local() {
  section "Local Config Checks"

  # ST-09 : aucun plugin Ruby custom
  if [ ! -d _plugins/ ] || [ -z "$(ls _plugins/*.rb 2>/dev/null)" ]; then
    pass "ST-09 — Aucun plugin Ruby custom (_plugins/ vide ou absent)"
  else
    fail "ST-09 — Plugin Ruby custom détecté dans _plugins/"
  fi

  # A-06 : analytics.cloudflare_token présent dans _config.yml (non-placeholder)
  if grep -E '^\s+cloudflare_token:\s*"[^"R][^"]+"' _config.yml > /dev/null 2>&1; then
    pass "A-06 — cloudflare_token présent (non-placeholder)"
  else
    fail "A-06 — cloudflare_token MANQUANT ou placeholder (REMPLIR_AVEC_TOKEN_CF)"
  fi

  # ST-03 : _data/seo.yml existe
  if [ -f _data/seo.yml ]; then
    pass "ST-03 — _data/seo.yml existe"
  else
    fail "ST-03 — _data/seo.yml MANQUANT"
  fi

  # ST-02 : robots.txt existe + contient Sitemap pointer absolu
  if [ -f robots.txt ] && grep -qE '^Sitemap: https://pandul\.fr/sitemap\.xml$' robots.txt; then
    pass "ST-02 — robots.txt existe + pointe vers sitemap absolu"
  else
    fail "ST-02 — robots.txt MANQUANT ou Sitemap pointer incorrect"
  fi

  # D-01 : robots.txt allow-all (pas de Disallow ciblé AI bots)
  if [ -f robots.txt ] && ! grep -qE 'Disallow.*(GPTBot|ClaudeBot|CCBot|Google-Extended|PerplexityBot|OAI-SearchBot|Applebot-Extended)' robots.txt; then
    pass "D-01 — robots.txt allow-all (pas de Disallow AI bots ciblé)"
  else
    fail "D-01 — robots.txt contient un Disallow ciblé AI bots ou est absent"
  fi

  # Détection Python (python3 prioritaire, fallback python pour Windows)
  PYTHON=$(command -v python3 || command -v python)

  # ST-04a : _config.yml description ≥150 chars (Python avec fallback grep)
  if [ -n "$PYTHON" ]; then
    if "$PYTHON" -c "import yaml; c=yaml.safe_load(open('_config.yml')); assert len(c.get('description','')) >= 150" 2>/dev/null; then
      pass "ST-04a — _config.yml description ≥150 chars"
    else
      fail "ST-04a — _config.yml description <150 chars"
    fi
  else
    # Fallback : longueur de la ligne description (grossier)
    desc=$(grep -E '^description:' _config.yml | head -1)
    if [ ${#desc} -ge 150 ]; then
      pass "ST-04a — _config.yml description ≥150 chars (fallback grep)"
    else
      fail "ST-04a — _config.yml description <150 chars (fallback grep)"
    fi
  fi

  # ST-04b : webmaster_verifications block présent (Python avec fallback grep)
  if [ -n "$PYTHON" ]; then
    if "$PYTHON" -c "import yaml; c=yaml.safe_load(open('_config.yml')); assert 'webmaster_verifications' in c" 2>/dev/null; then
      pass "ST-04b — webmaster_verifications block présent (D-02)"
    else
      fail "ST-04b — webmaster_verifications block MANQUANT (D-02)"
    fi
  else
    if grep -q '^webmaster_verifications:' _config.yml; then
      pass "ST-04b — webmaster_verifications block présent (fallback grep)"
    else
      fail "ST-04b — webmaster_verifications block MANQUANT (fallback grep)"
    fi
  fi

  # ST-04c : author + twitter blocks dans _config.yml
  if [ -n "$PYTHON" ]; then
    if "$PYTHON" -c "import yaml; c=yaml.safe_load(open('_config.yml')); assert 'author' in c and 'twitter' in c" 2>/dev/null; then
      pass "ST-04c — author + twitter blocks présents dans _config.yml"
    else
      fail "ST-04c — author ou twitter block MANQUANT"
    fi
  else
    if grep -q '^author:' _config.yml && grep -q '^twitter:' _config.yml; then
      pass "ST-04c — author + twitter blocks présents (fallback grep)"
    else
      fail "ST-04c — author ou twitter block MANQUANT (fallback grep)"
    fi
  fi

  # ST-06 / D-08 : sitemap.priority declarations — 5 niveaux D-08 (documentaire)
  # _config.yml defaults (def 0.8, cat 0.7, lettres 0.5) + index.md front-matter (1.0) + dictionnaire.md front-matter (0.9)
  # NOTE : `grep -c` exits 1 quand 0 matches → on capture la sortie puis on garde uniquement la 1re ligne
  count_cfg=$(grep -cE 'priority:\s*0\.[0-9]' _config.yml 2>/dev/null | head -1)
  count_cfg=${count_cfg:-0}
  count_idx=$(grep -cE '^\s+priority:\s*1\.0' index.md 2>/dev/null | head -1)
  count_idx=${count_idx:-0}
  count_dict=$(grep -cE '^\s+priority:\s*0\.9' dictionnaire.md 2>/dev/null | head -1)
  count_dict=${count_dict:-0}
  total=$((count_cfg + count_idx + count_dict))
  if [ "$total" -ge 5 ]; then
    pass "ST-06 — sitemap.priority déclarés ($total occurrences: $count_cfg config + $count_idx index + $count_dict dict, D-08 5 niveaux)"
  else
    fail "ST-06 — $total/5 déclarations sitemap.priority (attendu 5 : home 1.0 + dict 0.9 + def 0.8 + cat 0.7 + lettres 0.5 / D-08)"
  fi

  # TOOL-01 : claude-seo installé project-local
  if [ -d .claude/skills/claude-seo ] && { [ -f .claude/skills/claude-seo/SKILL.md ] || [ -f .claude/skills/claude-seo/README.md ]; }; then
    pass "TOOL-01 — claude-seo installé dans .claude/skills/claude-seo/"
  else
    fail "TOOL-01 — .claude/skills/claude-seo/ MANQUANT ou incomplet"
  fi

  # TOOL-03 : Health Score baseline documenté dans STATE.md
  if grep -qE 'claude-seo Health Score.*\|\s*[0-9]+' .planning/STATE.md 2>/dev/null; then
    pass "TOOL-03 — Health Score baseline documenté dans STATE.md"
  else
    fail "TOOL-03 — Health Score baseline MANQUANT dans STATE.md"
  fi
}

# -------------------------------------------------------------------
# SECTION 2 : Live Site Checks (post-deploy contre $SITE)
# -------------------------------------------------------------------
run_live() {
  section "Live Site Checks ($SITE)"

  # A-02 : beacon Cloudflare émis sur la homepage
  if curl -s "$SITE/" 2>/dev/null | grep -q 'cloudflareinsights.com/beacon'; then
    pass "A-02 — Beacon Cloudflare présent sur la homepage"
  else
    fail "A-02 — Beacon Cloudflare ABSENT de la homepage"
  fi

  # H8 : preconnect vers static.cloudflareinsights.com
  if curl -s "$SITE/" 2>/dev/null | grep -qE 'rel="preconnect"[^>]*cloudflareinsights'; then
    pass "H8 — preconnect vers static.cloudflareinsights.com présent (discipline LCP)"
  else
    fail "H8 — preconnect vers static.cloudflareinsights.com ABSENT"
  fi

  # ST-01 : un seul <title> par page sur 4 page types
  for url in "/" "/dictionnaire/" "/dictionnaire/utxo/" "/a-propos/"; do
    n=$(curl -s "$SITE$url" 2>/dev/null | grep -c '<title')
    if [ "$n" = "1" ]; then
      pass "ST-01 — Un seul <title> sur $url (count=1)"
    else
      fail "ST-01 — $n balises <title> sur $url (attendu 1)"
    fi
  done

  # ST-02 (live) : robots.txt servi avec sitemap pointer
  if curl -s "$SITE/robots.txt" 2>/dev/null | grep -qE '^Sitemap: https://pandul\.fr/sitemap\.xml$'; then
    pass "ST-02 (live) — robots.txt servi avec sitemap pointer absolu"
  else
    fail "ST-02 (live) — robots.txt absent ou sitemap pointer incorrect"
  fi

  # ST-05 : sitemap inclut ≥1453 URLs
  n=$(curl -s "$SITE/sitemap.xml" 2>/dev/null | grep -c '<loc>')
  if [ "$n" -ge 1450 ]; then
    pass "ST-05 — sitemap contient $n URLs (attendu ≥1450)"
  else
    fail "ST-05 — sitemap contient seulement $n URLs (attendu ≥1450)"
  fi

  # ST-05 : redirect_from exclus du sitemap
  if ! curl -s "$SITE/sitemap.xml" 2>/dev/null | grep -qE 'pandul\.fr/(apropos|about)/?<'; then
    pass "ST-05 — redirect_from /apropos/ et /about/ exclus du sitemap"
  else
    fail "ST-05 — redirect_from polluent le sitemap"
  fi

  # ST-08 : canonical avec trailing slash sur 4 page types
  for url in "/" "/dictionnaire/" "/dictionnaire/utxo/" "/a-propos/"; do
    expected="${SITE}${url}"
    if curl -s "$SITE$url" 2>/dev/null | grep -qE "rel=\"canonical\"[^>]*href=\"$expected\""; then
      pass "ST-08 — Canonical correct sur $url"
    else
      fail "ST-08 — Canonical incorrect ou absent sur $url"
    fi
  done

  # D-02 : meta tags GSC + Bing présents
  html=$(curl -s "$SITE/" 2>/dev/null)
  if echo "$html" | grep -q 'name="google-site-verification"'; then
    pass "D-02 — meta google-site-verification présent sur la homepage"
  else
    fail "D-02 — meta google-site-verification ABSENT (vérifier token GSC dans _config.yml)"
  fi
  if echo "$html" | grep -q 'name="msvalidate.01"'; then
    pass "D-02 — meta msvalidate.01 (Bing) présent sur la homepage"
  else
    fail "D-02 — meta msvalidate.01 (Bing) ABSENT (vérifier token Bing dans _config.yml)"
  fi
}

# -------------------------------------------------------------------
# SECTION 3 : Manual-Only Verifications (rappel à l'opérateur)
# -------------------------------------------------------------------
print_manual() {
  section "Manual-Only Verifications (à vérifier visuellement)"
  skip "A-01 — Compte Cloudflare Web Analytics + hostname pandul.fr autorisé + token obtenu (dash.cloudflare.com)"
  skip "A-04 — Dashboard CF reçoit visiteurs/pages/referrers/devices/pays (24-72h post Wave 1)"
  skip "A-05 — Core Web Vitals (LCP/INP/CLS) trackés via CF RUM (CF Web Analytics > Performance)"
  skip "ST-07 — pandul.fr vérifié dans GSC + Bing + sitemap soumis (search.google.com/search-console + bing.com/webmasters)"
  skip "TOOL-02 — Baseline /seo drift baseline capturée (output dans .planning/seo/ ou claude-seo data dir)"
  skip "A-03 — INVALIDÉ par D-07 (no analytics disclosure) — à déplacer vers Out of Scope dans REQUIREMENTS.md"
}

# -------------------------------------------------------------------
# Main
# -------------------------------------------------------------------
case "$MODE" in
  --local-only) run_local ;;
  --live-only)  run_live ;;
  all|*)        run_local; run_live ;;
esac

print_manual

section "Summary"
printf "${GREEN}%d passed${NC}, ${RED}%d failed${NC}, ${YELLOW}%d skipped (manual-only)${NC}\n" "$PASS" "$FAIL" "$SKIP"

[ "$FAIL" -eq 0 ] && exit 0 || exit 1
