---
layout: page
title: projects
permalink: /projects/
description: Ongoing and completed research efforts from CIDER Lab.
nav: false
published: false
nav_order: 1
horizontal: false
---

<div class="projects">
{% assign sorted_projects = site.projects | sort: "importance" %}
<div class="row row-cols-1 row-cols-md-3">
  {% for project in sorted_projects %}
    {% include projects.liquid %}
  {% endfor %}
</div>
</div>
