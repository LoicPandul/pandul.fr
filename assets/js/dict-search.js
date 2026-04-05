// Recherche autocomplete — filtrage temps reel sur search-index.json
document.addEventListener('DOMContentLoaded', () => {
  const searchContainer = document.querySelector('.dict-search');
  if (!searchContainer) return;

  const input = searchContainer.querySelector('.dict-search-input');
  const resultsList = searchContainer.querySelector('.dict-search-results');
  if (!input || !resultsList) return;

  let index = [];
  let activeIndex = -1;
  let hideTimeout = null;

  // Chargement de l'index JSON
  fetch('/assets/data/search-index.json')
    .then(r => r.json())
    .then(data => { index = data; })
    .catch(err => console.warn('Erreur chargement search-index.json:', err));

  // Normalisation accent-insensitive
  function normalize(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  // Filtrage prefix
  function search(query) {
    if (!query || query.length === 0) return [];
    const q = normalize(query);
    return index.filter(entry => normalize(entry.title).startsWith(q)).slice(0, 10);
  }

  // Rendu des resultats (textContent pour securite XSS)
  function renderResults(results) {
    resultsList.innerHTML = '';
    if (results.length === 0 && input.value.length > 0) {
      const li = document.createElement('li');
      li.className = 'dict-search-empty';
      li.setAttribute('role', 'option');
      li.textContent = 'Aucun resultat pour cette recherche.';
      resultsList.appendChild(li);
      input.setAttribute('aria-expanded', 'true');
      return;
    }
    results.forEach((r, i) => {
      const li = document.createElement('li');
      li.className = 'dict-search-result';
      li.setAttribute('role', 'option');
      li.setAttribute('id', 'search-result-' + i);
      li.dataset.href = '/dictionnaire/' + r.slug + '/';

      const titleSpan = document.createElement('span');
      titleSpan.className = 'dict-search-result-title';
      titleSpan.textContent = r.title;

      const catSpan = document.createElement('span');
      catSpan.className = 'dict-search-result-cat';
      catSpan.textContent = r.category;

      li.appendChild(titleSpan);
      li.appendChild(catSpan);
      resultsList.appendChild(li);
    });
    input.setAttribute('aria-expanded', results.length > 0 ? 'true' : 'false');
    activeIndex = -1;
  }

  function showResults() {
    clearTimeout(hideTimeout);
    resultsList.style.display = '';
  }

  function hideResults() {
    hideTimeout = setTimeout(() => {
      resultsList.style.display = 'none';
      input.setAttribute('aria-expanded', 'false');
      activeIndex = -1;
    }, 150); // Delai 150ms pour permettre le clic (race condition blur/click)
  }

  function setActive(idx) {
    const items = resultsList.querySelectorAll('.dict-search-result');
    items.forEach(item => item.classList.remove('active'));
    if (idx >= 0 && idx < items.length) {
      items[idx].classList.add('active');
      input.setAttribute('aria-activedescendant', items[idx].id);
      items[idx].scrollIntoView({ block: 'nearest' });
    } else {
      input.removeAttribute('aria-activedescendant');
    }
    activeIndex = idx;
  }

  // Evenements
  input.addEventListener('input', () => {
    const results = search(input.value);
    renderResults(results);
    showResults();
  });

  input.addEventListener('focus', () => {
    if (input.value.length > 0) {
      renderResults(search(input.value));
      showResults();
    }
  });

  input.addEventListener('blur', hideResults);

  input.addEventListener('keydown', (e) => {
    const items = resultsList.querySelectorAll('.dict-search-result');
    const count = items.length;
    if (count === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(activeIndex < count - 1 ? activeIndex + 1 : 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(activeIndex > 0 ? activeIndex - 1 : count - 1);
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const href = items[activeIndex].dataset.href;
      if (href) window.location.href = href;
    } else if (e.key === 'Escape') {
      hideResults();
      input.blur();
    }
  });

  // Navigation par mousedown (pas click) pour eviter race condition blur
  resultsList.addEventListener('mousedown', (e) => {
    const item = e.target.closest('.dict-search-result');
    if (item && item.dataset.href) {
      window.location.href = item.dataset.href;
    }
  });
});
