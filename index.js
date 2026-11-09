(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme toggle ---------- */
  var themeToggle = document.getElementById("theme-toggle");
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var THEME_COLORS = { light: "#f3eee4", dark: "#0e1411" };

  function applyTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (themeMeta) themeMeta.setAttribute("content", THEME_COLORS[theme]);
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
    if (persist) {
      try { localStorage.setItem("theme", theme); } catch (e) { /* storage unavailable */ }
    }
  }

  applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light", false);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
    });
  }

  /* ---------- Mobile navigation ---------- */
  var nav = document.getElementById("site-nav");
  var navToggle = document.getElementById("nav-toggle");

  function setNav(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (nav && navToggle) {
    navToggle.addEventListener("click", function () {
      setNav(navToggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        navToggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 880) setNav(false);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Highlight the current section in the nav ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  function setCurrent(id) {
    navLinks.forEach(function (link) {
      if (link.getAttribute("href") === "#" + id) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setCurrent(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  window.addEventListener("scroll", function () {
    if (window.scrollY < 200) setCurrent("");
  }, { passive: true });

  /* ---------- Back to top ---------- */
  var backToTop = document.getElementById("back-to-top");

  function updateBackToTop() {
    if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 700);
  }

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
