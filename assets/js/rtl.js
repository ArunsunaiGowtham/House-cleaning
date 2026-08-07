/* SparklePro - rtl.js : LTR / RTL direction switching with persistence. */
(() => {
  "use strict";
  const KEY = "sparklepro-dir";
  const root = document.documentElement;

  const paint = (dir) => {
    root.setAttribute("dir", dir);
    root.setAttribute("lang", dir === "rtl" ? "ar" : "en");
    document.querySelectorAll("#dirToggle, [data-dir-toggle]").forEach((btn) => {
      const span = btn.querySelector("span");
      if (span) span.textContent = dir === "rtl" ? "LTR" : "RTL";
      btn.setAttribute("aria-label", dir === "rtl" ? "Switch to left to right layout" : "Switch to right to left layout");
    });
  };

  paint(localStorage.getItem(KEY) === "rtl" ? "rtl" : "ltr");

  document.addEventListener("DOMContentLoaded", () => {
    paint(root.getAttribute("dir") || "ltr");
    document.querySelectorAll("#dirToggle, [data-dir-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = root.getAttribute("dir") === "rtl" ? "ltr" : "rtl";
        localStorage.setItem(KEY, next);
        paint(next);
        if (window.Swiper) window.setTimeout(() => window.location.reload(), 60);
      });
    });
  });
})();
