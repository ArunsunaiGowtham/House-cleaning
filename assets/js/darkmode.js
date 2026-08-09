/* SparklePro - darkmode.js : persistent light/dark switching. */
(() => {
  "use strict";
  const KEY = "sparklepro-theme";
  const root = document.documentElement;

  const preferred = () => {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const paint = (theme) => {
    root.setAttribute("data-bs-theme", theme);
    document.querySelectorAll(".site-footer .footer-brand img").forEach((logo) => {
      const lightSrc = logo.dataset.lightLogo || logo.getAttribute("src");
      const darkSrc = logo.dataset.darkLogo || lightSrc.replace(
        /sparklepro-logo\.svg([?#].*)?$/,
        "sparklepro-logo-dark.svg$1"
      );

      if (darkSrc !== lightSrc) {
        logo.dataset.lightLogo = lightSrc;
        logo.dataset.darkLogo = darkSrc;
        logo.setAttribute("src", theme === "dark" ? darkSrc : lightSrc);
      }
    });
    document.querySelectorAll("#themeToggle, [data-theme-toggle]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(theme === "dark"));
      const icon = btn.querySelector("i");
      if (icon) icon.className = theme === "dark" ? "bi bi-brightness-high" : "bi bi-moon-stars";
    });
  };

  paint(preferred());

  document.addEventListener("DOMContentLoaded", () => {
    paint(root.getAttribute("data-bs-theme"));
    document.querySelectorAll("#themeToggle, [data-theme-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
        localStorage.setItem(KEY, next);
        paint(next);
      });
    });
  });
})();
