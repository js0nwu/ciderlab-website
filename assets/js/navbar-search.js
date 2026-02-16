(() => {
  const input = document.querySelector("#nav-search-input");
  const results = document.querySelector("#nav-search-results");
  const searchWrap = input ? input.closest(".nav-search-wrap") : null;
  if (!input || !results || !searchWrap) return;

  const MAX_RESULTS = 6;
  const EXCLUDED_SECTIONS = new Set(["Theme", "Socials"]);
  let entries = [];
  let navigationEntries = [];
  let visibleEntries = [];
  let activeIndex = -1;

  const normalize = (value) => (typeof value === "string" ? value.trim().toLowerCase() : "");

  const escapeHtml = (value) =>
    value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");

  const isUsableEntry = (item) => {
    return (
      item &&
      typeof item.title === "string" &&
      item.title.trim().length > 0 &&
      typeof item.handler === "function" &&
      !EXCLUDED_SECTIONS.has(item.section)
    );
  };

  const closeResults = () => {
    results.hidden = true;
    results.innerHTML = "";
    visibleEntries = [];
    activeIndex = -1;
  };

  const setActive = (nextIndex) => {
    const options = results.querySelectorAll(".nav-search-option");
    options.forEach((option) => option.classList.remove("nav-search-option--active"));

    if (nextIndex < 0 || nextIndex >= options.length) {
      activeIndex = -1;
      return;
    }

    activeIndex = nextIndex;
    const nextOption = options[nextIndex];
    nextOption.classList.add("nav-search-option--active");
    nextOption.scrollIntoView({ block: "nearest" });
  };

  const renderResults = (matches) => {
    if (!matches.length) {
      closeResults();
      return;
    }

    visibleEntries = matches;
    activeIndex = -1;

    results.innerHTML = matches
      .map((entry, index) => {
        const title = escapeHtml(entry.title);
        const section = entry.section ? `<span class="nav-search-option-meta">${escapeHtml(entry.section)}</span>` : "";
        return `
          <button type="button" class="nav-search-option" data-index="${index}">
            <span class="nav-search-option-title">${title}</span>
            ${section}
          </button>
        `;
      })
      .join("");

    results.hidden = false;
  };

  const filterEntries = (query) => {
    const q = normalize(query);
    if (!q) {
      if (navigationEntries.length) return navigationEntries.slice(0, MAX_RESULTS);
      return entries.slice(0, MAX_RESULTS);
    }

    const exact = [];
    const startsWith = [];
    const includesTitle = [];
    const includesMeta = [];

    for (const entry of entries) {
      const title = normalize(entry.title);
      const description = normalize(entry.description);
      const section = normalize(entry.section);

      if (title === q) {
        exact.push(entry);
      } else if (title.startsWith(q)) {
        startsWith.push(entry);
      } else if (title.includes(q)) {
        includesTitle.push(entry);
      } else if (description.includes(q) || section.includes(q)) {
        includesMeta.push(entry);
      }
    }

    return exact.concat(startsWith, includesTitle, includesMeta).slice(0, MAX_RESULTS);
  };

  const navigateToEntry = (entry) => {
    if (!entry || typeof entry.handler !== "function") return;
    input.value = entry.title;
    closeResults();
    entry.handler();
  };

  const refreshEntries = () => {
    const ninja = document.querySelector("ninja-keys");
    if (!ninja || !Array.isArray(ninja.data)) return false;
    const seen = new Set();
    const normalizedEntries = ninja.data
      .filter(isUsableEntry)
      .filter((item) => {
        const key = `${normalize(item.title)}::${normalize(item.section)}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((item) => ({
        title: item.title.trim(),
        section: item.section || "",
        description: typeof item.description === "string" ? item.description : "",
        handler: item.handler,
      }));

    // Keep top-level navigation suggestions in their original source order.
    navigationEntries = normalizedEntries.filter((entry) => entry.section === "Navigation");
    entries = [...normalizedEntries].sort((a, b) => a.title.localeCompare(b.title));
    return entries.length > 0;
  };

  const openWithCurrentQuery = () => {
    if (!entries.length && !refreshEntries()) return;
    renderResults(filterEntries(input.value));
  };

  input.addEventListener("focus", () => {
    openWithCurrentQuery();
  });

  input.addEventListener("input", () => {
    openWithCurrentQuery();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      if (results.hidden) openWithCurrentQuery();
      if (!visibleEntries.length) return;
      event.preventDefault();
      const next = activeIndex < visibleEntries.length - 1 ? activeIndex + 1 : 0;
      setActive(next);
      return;
    }

    if (event.key === "ArrowUp") {
      if (results.hidden) openWithCurrentQuery();
      if (!visibleEntries.length) return;
      event.preventDefault();
      const next = activeIndex > 0 ? activeIndex - 1 : visibleEntries.length - 1;
      setActive(next);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const fallback = filterEntries(input.value)[0];
      const selected = activeIndex >= 0 ? visibleEntries[activeIndex] : fallback;
      if (selected) {
        navigateToEntry(selected);
      }
      return;
    }

    if (event.key === "Escape") {
      closeResults();
    }
  });

  results.addEventListener("mousedown", (event) => {
    const button = event.target.closest(".nav-search-option");
    if (!button) return;
    event.preventDefault();
    const index = Number.parseInt(button.dataset.index || "-1", 10);
    if (Number.isNaN(index) || index < 0 || index >= visibleEntries.length) return;
    navigateToEntry(visibleEntries[index]);
  });

  document.addEventListener("click", (event) => {
    if (!searchWrap.contains(event.target)) {
      closeResults();
    }
  });

  let bootstrapTries = 0;
  const bootstrap = () => {
    if (refreshEntries()) return;

    const timer = setInterval(() => {
      bootstrapTries += 1;
      if (refreshEntries() || bootstrapTries > 40) {
        clearInterval(timer);
      }
    }, 100);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();
