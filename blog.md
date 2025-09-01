---
title: "Blog"
permalink: /blog/
---

# Blog

{% assign posts_list = site.posts %}
<ul>
{% for post in posts_list %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <span> — {{ post.date | date: "%d %B %Y" }}</span>
  </li>
{% endfor %}
</ul>
