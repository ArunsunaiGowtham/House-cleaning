/*!
 * SparklePro — Service Details renderer
 * Reads ?service=<slug> from the URL, looks it up in window.SP_SERVICES
 * (assets/js/services-data.js) and renders unique content into the page.
 */
(function () {
  "use strict";

  var DATA = window.SP_SERVICES || {};
  var DEFAULT_SLUG = "residential-cleaning";

  function getSlug() {
    var params = new URLSearchParams(window.location.search);
    return params.get("service") || DEFAULT_SLUG;
  }

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function setMeta(name, content, attr) {
    attr = attr || "name";
    var el = document.querySelector('meta[' + attr + '="' + name + '"]');
    if (el) el.setAttribute("content", content);
  }

  function starIcons() {
    return '<i class="bi bi-star-fill"></i>'.repeat(5);
  }

  function renderStars() {
    var s = "";
    for (var i = 0; i < 5; i++) s += '<i class="bi bi-star-fill"></i>';
    return s;
  }

  function buildFaqHtml(faq, prefix) {
    return faq.map(function (item, i) {
      var open = i === 0;
      return (
        '<div class="accordion-item">' +
        '<h3 class="accordion-header" id="' + prefix + 'h' + i + '">' +
        '<button class="accordion-button' + (open ? "" : " collapsed") + '" type="button" data-bs-toggle="collapse" data-bs-target="#' + prefix + 'c' + i + '" aria-expanded="' + (open ? "true" : "false") + '" aria-controls="' + prefix + 'c' + i + '">' + esc(item.q) + '</button>' +
        '</h3>' +
        '<div id="' + prefix + 'c' + i + '" class="accordion-collapse collapse' + (open ? " show" : "") + '" aria-labelledby="' + prefix + 'h' + i + '">' +
        '<div class="accordion-body">' + item.a + '</div>' +
        '</div></div>'
      );
    }).join("");
  }

  function buildReviewsHtml(reviews) {
    return reviews.map(function (r) {
      return (
        '<div class="review-item"><img src="' + esc(r.avatar) + '" width="54" height="54" loading="lazy" alt="' + esc(r.name) + '">' +
        '<div><div class="d-flex flex-wrap gap-2 align-items-center"><strong>' + esc(r.name) + '</strong>' +
        '<span class="stars" aria-label="5 out of 5 stars">' + renderStars() + '</span></div>' +
        '<small class="d-block mb-1" style="color:var(--sp-muted)">' + esc(r.role) + '</small>' +
        '<p class="mb-0">' + esc(r.quote) + '</p></div></div>'
      );
    }).join("");
  }

  function buildBenefitsHtml(benefits) {
    return benefits.map(function (b) {
      return (
        '<div class="col-sm-6"><div class="dash-panel h-100">' +
        '<h3 class="h6"><i class="bi ' + esc(b.icon) + ' text-brand" aria-hidden="true"></i> ' + esc(b.title) + '</h3>' +
        '<p class="mb-0" style="font-size:.93rem">' + b.text + '</p></div></div>'
      );
    }).join("");
  }

  function buildChecklistHtml(items) {
    return items.map(function (t) {
      return '<li><i class="bi bi-check-circle-fill" aria-hidden="true"></i> ' + t + '</li>';
    }).join("");
  }

  function buildSidebarBulletsHtml(bullets) {
    return bullets.map(function (t) {
      return '<li><i class="bi bi-check2" aria-hidden="true"></i> ' + t + '</li>';
    }).join("");
  }

  function buildRelatedHtml(relatedSlugs) {
    return relatedSlugs.map(function (slug, i) {
      var svc = DATA[slug];
      if (!svc) return "";
      var delay = i * 70;
      return (
        '<div class="col-md-6 col-xl-3"><article class="service-card h-100" data-aos="fade-up" data-aos-delay="' + delay + '">' +
        '<a class="stretched-link" href="service-details.html?service=' + encodeURIComponent(slug) + '" aria-label="' + esc(svc.label) + ' details"></a>' +
        '<div class="service-media"><img src="' + esc(svc.heroImage) + '" width="600" height="400" loading="lazy" alt="' + esc(svc.label) + ' in progress"></div>' +
        '<div class="service-body">' +
        '<span class="service-icon"><i class="bi bi-stars" aria-hidden="true"></i></span>' +
        '<h3 class="h5">' + esc(svc.label) + '</h3>' +
        '<p>' + esc(svc.heroTagline) + '</p>' +
        '<div class="service-foot"><span class="price">from $' + svc.price + '</span><span class="more">Details <i class="bi bi-arrow-right" aria-hidden="true"></i></span></div>' +
        '</div></article></div>'
      );
    }).join("");
  }

  function renderNotFound(slug) {
    var main = document.getElementById("serviceMain");
    if (main) {
      main.innerHTML =
        '<div class="container py-5 text-center">' +
        '<h2>We couldn&rsquo;t find that service</h2>' +
        '<p class="text-muted">&ldquo;' + esc(slug) + '&rdquo; doesn&rsquo;t match one of our current services.</p>' +
        '<a class="btn btn-brand mt-2" href="services.html">View all services</a>' +
        '</div>';
    }
    document.title = "Service Not Found | SparklePro";
  }

  function render() {
    var slug = getSlug();
    var svc = DATA[slug];

    if (!svc) {
      renderNotFound(slug);
      return;
    }

    // --- Title / meta / SEO ---
    document.title = svc.metaTitle;
    setMeta("description", svc.metaDescription);
    setMeta("og:title", svc.metaTitle, "property");
    setMeta("og:description", svc.metaDescription, "property");
    setMeta("og:image", svc.heroImage, "property");
    setMeta("og:url", "service-details.html?service=" + slug, "property");
    setMeta("twitter:title", svc.metaTitle);
    setMeta("twitter:description", svc.metaDescription);
    setMeta("twitter:image", svc.heroImage);
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "service-details.html?service=" + slug);

    // --- Hero ---
    var titleEl = document.querySelector("[data-service-title]");
    if (titleEl) titleEl.textContent = svc.label;
    var subtitleEl = document.getElementById("heroSubtitle");
    if (subtitleEl) subtitleEl.textContent = svc.heroTagline;

    // --- Breadcrumb ---
    var crumbEl = document.getElementById("breadcrumbCurrent");
    if (crumbEl) crumbEl.textContent = svc.label;

    // --- Main image ---
    var heroImgEl = document.getElementById("mainServiceImage");
    if (heroImgEl) {
      heroImgEl.setAttribute("src", svc.heroImage);
      heroImgEl.setAttribute("alt", svc.heroAlt);
    }

    // --- Overview ---
    var overviewEl = document.getElementById("overviewText");
    if (overviewEl) {
      overviewEl.innerHTML = svc.overview.map(function (p) { return "<p>" + p + "</p>"; }).join("");
    }

    // --- Benefits ---
    var benefitsEl = document.getElementById("benefitsGrid");
    if (benefitsEl) benefitsEl.innerHTML = buildBenefitsHtml(svc.benefits);

    // --- Checklist ---
    var checklistEl = document.getElementById("checklistList");
    if (checklistEl) checklistEl.innerHTML = buildChecklistHtml(svc.checklist);

    // --- Before / after ---
    var beforeImgEl = document.getElementById("beforeImg");
    var afterImgEl = document.getElementById("afterImg");
    if (beforeImgEl) {
      beforeImgEl.setAttribute("src", svc.gallery.beforeImg);
      beforeImgEl.setAttribute("alt", svc.gallery.beforeAlt);
    }
    if (afterImgEl) {
      afterImgEl.setAttribute("src", svc.gallery.afterImg);
      afterImgEl.setAttribute("alt", svc.gallery.afterAlt);
    }

    // --- FAQ ---
    var faqEl = document.getElementById("sdfaq");
    if (faqEl) faqEl.innerHTML = buildFaqHtml(svc.faq, "sdfaq");

    // --- Reviews ---
    var reviewsEl = document.getElementById("reviewsContainer");
    if (reviewsEl) reviewsEl.innerHTML = buildReviewsHtml(svc.reviews);

    // --- Sidebar / booking card ---
    var priceEl = document.getElementById("sidebarPrice");
    if (priceEl) priceEl.textContent = svc.price;
    var priceNoteEl = document.getElementById("sidebarPriceNote");
    if (priceNoteEl) priceNoteEl.innerHTML = svc.priceNote;
    var sidebarBulletsEl = document.getElementById("sidebarBullets");
    if (sidebarBulletsEl) {
      var bullets = svc.sidebarBullets.slice(0, 2).concat([svc.crew]);
      sidebarBulletsEl.innerHTML = buildSidebarBulletsHtml(bullets);
    }

    // Highlight the current service in the "All services" sidebar list
    document.querySelectorAll("#allServicesList a").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (href.indexOf("service=" + slug) !== -1) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
    });

    // --- Related services ---
    var relatedEl = document.getElementById("relatedGrid");
    if (relatedEl) relatedEl.innerHTML = buildRelatedHtml(svc.related);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
