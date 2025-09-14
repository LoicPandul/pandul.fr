---
title: "Blog"
permalink: /blog/
---

# Blog

{% comment %}
On prend toutes les pages dont l’URL contient /post/,
on les trie par date décroissante (assure une date en front-matter).
{% endcomment %}
{% assign articles = site.pages | where_exp: "p", "p.url contains '/post/'" | sort: "date" | reverse %}

<ul>
{% for a in articles %}
  <li>
    <a href="{{ a.url | relative_url }}">{{ a.title }}</a>
    {%- if a.date %}<span> — {{ a.date | date: "%d %B %Y" }}</span>{% endif -%}
  </li>
{% endfor %}
</ul>
