const LOCALE_PATHS = {
  en: "/",
  "zh-CN": "/zh-CN/",
  "zh-TW": "/zh-TW/",
  de: "/de/",
  fr: "/fr/",
  ja: "/ja/",
  ko: "/ko/",
};

function setupLanguageSelectors() {
  document.querySelectorAll("[data-language-select]").forEach((select) => {
    select.addEventListener("change", () => {
      const nextPath = LOCALE_PATHS[select.value] || "/";
      window.location.assign(nextPath);
    });
  });
}

function setupLanguageMenus() {
  const menus = Array.from(document.querySelectorAll("[data-language-menu]"));
  if (!menus.length) return;

  const closeMenu = (menu, returnFocus = false) => {
    const button = menu.querySelector("[data-language-toggle]");
    const popover = menu.querySelector("[data-language-popover]");
    menu.classList.remove("is-open");
    button?.setAttribute("aria-expanded", "false");
    if (popover) popover.hidden = true;
    if (returnFocus) button?.focus();
  };

  const openMenu = (menu, focusOption = false) => {
    menus.forEach((candidate) => {
      if (candidate !== menu) closeMenu(candidate);
    });
    const button = menu.querySelector("[data-language-toggle]");
    const popover = menu.querySelector("[data-language-popover]");
    menu.classList.add("is-open");
    button?.setAttribute("aria-expanded", "true");
    if (popover) popover.hidden = false;
    if (focusOption) {
      const current = menu.querySelector("[aria-current='page']");
      (current || menu.querySelector("[role='menuitem']"))?.focus();
    }
  };

  menus.forEach((menu) => {
    const button = menu.querySelector("[data-language-toggle]");
    const options = Array.from(menu.querySelectorAll("[role='menuitem']"));

    button?.addEventListener("click", () => {
      if (menu.classList.contains("is-open")) {
        closeMenu(menu);
      } else {
        openMenu(menu);
      }
    });

    button?.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();
      openMenu(menu, true);
      if (event.key === "ArrowUp") options.at(-1)?.focus();
    });

    options.forEach((option, index) => {
      option.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          closeMenu(menu, true);
          return;
        }
        if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let nextIndex = index;
        if (event.key === "ArrowDown") nextIndex = (index + 1) % options.length;
        if (event.key === "ArrowUp") nextIndex = (index - 1 + options.length) % options.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = options.length - 1;
        options[nextIndex]?.focus();
      });
    });
  });

  document.addEventListener("click", (event) => {
    menus.forEach((menu) => {
      if (!menu.contains(event.target)) closeMenu(menu);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    menus.forEach((menu) => {
      if (menu.classList.contains("is-open")) closeMenu(menu, true);
    });
  });
}

function setupRevealMotion() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

function setupMobileNavigation() {
  const button = document.querySelector("[data-mobile-menu-toggle]");
  const navigation = document.querySelector("[data-mobile-nav]");
  if (!button || !navigation) return;

  const closeNavigation = (returnFocus = false) => {
    navigation.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    if (returnFocus) button.focus();
  };

  const openNavigation = () => {
    document.querySelectorAll("[data-language-menu].is-open").forEach((menu) => {
      menu.classList.remove("is-open");
      menu.querySelector("[data-language-toggle]")?.setAttribute("aria-expanded", "false");
      const popover = menu.querySelector("[data-language-popover]");
      if (popover) popover.hidden = true;
    });
    navigation.classList.add("is-open");
    button.setAttribute("aria-expanded", "true");
  };

  button.addEventListener("click", () => {
    if (navigation.classList.contains("is-open")) {
      closeNavigation();
    } else {
      openNavigation();
    }
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeNavigation());
  });

  document.addEventListener("click", (event) => {
    if (!navigation.classList.contains("is-open")) return;
    if (navigation.contains(event.target) || button.contains(event.target)) return;
    closeNavigation();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) {
      closeNavigation(true);
    }
  });

  const desktopQuery = window.matchMedia("(min-width: 721px)");
  desktopQuery.addEventListener?.("change", (event) => {
    if (event.matches) closeNavigation();
  });
}

function setupDeviceRailProgress() {
  const rails = Array.from(document.querySelectorAll("[data-device-rail]"));
  if (!rails.length) return;

  rails.forEach((rail) => {
    const cue = rail.nextElementSibling;
    const track = cue?.querySelector("[data-device-progress]");
    const thumb = cue?.querySelector("[data-device-progress-thumb]");
    if (!track || !thumb) return;

    let animationFrame = 0;

    const update = () => {
      animationFrame = 0;
      const trackWidth = track.clientWidth;
      const maximumScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
      const visibleRatio = rail.scrollWidth ? rail.clientWidth / rail.scrollWidth : 1;
      const thumbWidth = Math.min(trackWidth, Math.max(48, trackWidth * visibleRatio));
      const progress = maximumScroll ? rail.scrollLeft / maximumScroll : 0;
      const thumbOffset = Math.max(0, progress * (trackWidth - thumbWidth));

      thumb.style.width = `${thumbWidth}px`;
      thumb.style.transform = `translateX(${thumbOffset}px)`;
    };

    const requestUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(update);
    };

    rail.addEventListener("scroll", requestUpdate, { passive: true });
    rail.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if (rail.scrollWidth <= rail.clientWidth) return;
      event.preventDefault();

      const firstItem = rail.firstElementChild;
      const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
      const step = (firstItem?.getBoundingClientRect().width || rail.clientWidth * 0.8) + gap;
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      rail.scrollBy({ left: direction * step, behavior: reducedMotion ? "auto" : "smooth" });
    });
    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(requestUpdate);
      observer.observe(rail);
      observer.observe(track);
    } else {
      window.addEventListener("resize", requestUpdate);
    }
    requestUpdate();
  });
}

function setupHelpSearch() {
  const search = document.querySelector("[data-help-search]");
  if (!search) return;

  const page = document.body;
  const categories = Array.from(document.querySelectorAll("[data-faq-category]"));
  const items = Array.from(document.querySelectorAll("[data-faq-item]"));
  const status = document.querySelector("[data-search-status]");
  const empty = document.querySelector("[data-empty-results]");
  const formatCount = (template, count) =>
    (template || "").replaceAll("{count}", String(count));

  const update = () => {
    const query = search.value.trim().toLocaleLowerCase();
    let visibleCount = 0;

    items.forEach((item) => {
      const matches = !query || item.textContent.toLocaleLowerCase().includes(query);
      item.hidden = !matches;
      if (matches) {
        visibleCount += 1;
        if (query) item.open = true;
      } else {
        item.open = false;
      }
    });

    categories.forEach((category) => {
      category.hidden = !category.querySelector("[data-faq-item]:not([hidden])");
    });

    if (status) {
      if (!query) {
        status.textContent = formatCount(page.dataset.searchAvailable, items.length);
      } else if (visibleCount === 1) {
        status.textContent = page.dataset.searchOne || "1 answer found";
      } else {
        status.textContent = formatCount(page.dataset.searchMany, visibleCount);
      }
    }
    if (empty) empty.hidden = visibleCount !== 0;
  };

  search.addEventListener("input", update);
  update();
}

function openLinkedAnswer() {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (target?.tagName === "DETAILS") target.open = true;
}

document.addEventListener("DOMContentLoaded", () => {
  setupLanguageSelectors();
  setupLanguageMenus();
  setupMobileNavigation();
  setupDeviceRailProgress();
  setupRevealMotion();
  setupHelpSearch();
  openLinkedAnswer();
});

window.addEventListener("hashchange", openLinkedAnswer);
