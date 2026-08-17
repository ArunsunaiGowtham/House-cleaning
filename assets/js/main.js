/* SparklePro - main.js : UI behaviour (ES6, no dependencies beyond CDN libs). */
(() => {
  "use strict";

  const onReady = (fn) => document.readyState !== "loading"
    ? fn() : document.addEventListener("DOMContentLoaded", fn);

  /* Preloader ------------------------------------------------ */
  window.addEventListener("load", () => {
    const pre = document.getElementById("preloader");
    if (pre) window.setTimeout(() => pre.classList.add("is-hidden"), 250);
  });

  onReady(() => {
    /* Primary navigation current-page state ----------------- */
    const getPageKey = (url) => {
      const pathname = new URL(url, window.location.href).pathname
        .replace(/\/+$/, "")
        .toLowerCase();
      const filename = pathname.split("/").pop();

      return !filename || filename === "index.html" || filename === "index"
        ? "index"
        : filename.replace(/\.html$/, "");
    };

    const setActiveNavLink = () => {
      const currentPage = getPageKey(window.location.href);
      const parentPage = currentPage.startsWith("blog-details-")
        ? "blog"
        : currentPage === "service-details"
          ? "services"
          : currentPage;

      document.querySelectorAll("#siteHeader .navbar-nav").forEach((nav) => {
        const links = nav.querySelectorAll(":scope > .nav-item > .nav-link");

        links.forEach((link) => {
          link.classList.remove("active");
          link.removeAttribute("aria-current");
        });

        const activeLink = Array.from(links).find((link) => {
          const href = link.getAttribute("href");
          const dropdownPages = Array.from(
            link.parentElement.querySelectorAll(":scope > .dropdown-menu .dropdown-item[href]")
          ).map((item) => getPageKey(item.href));

          return dropdownPages.includes(parentPage) ||
            (href && !href.startsWith("#") && getPageKey(link.href) === parentPage);
        });

        if (activeLink) {
          activeLink.classList.add("active");
          activeLink.setAttribute("aria-current", "page");
        }
      });
    };

    setActiveNavLink();
    window.addEventListener("pageshow", setActiveNavLink);

    /* Use a home-and-sparkle mark everywhere the compact brand mark appears. */
    const cleanMark = '<path d="M6 24 24 8l18 16v14a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V24Z" fill="#12b7a6"/><path d="M18 42V30h12v12M14 25h7m6 0h7" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="m39 6 1.5 4.5L45 12l-4.5 1.5L39 18l-1.5-4.5L33 12l4.5-1.5L39 6Z" fill="#f4b740"/>';
    document.querySelectorAll(".brand-mark").forEach((mark) => { mark.innerHTML = cleanMark; });

    document.querySelectorAll('.dropdown-item[href="index.html"]').forEach((link) => { link.textContent = "Home 1"; });
    document.querySelectorAll('.dropdown-item[href="home-cleaning.html"]').forEach((link) => { link.textContent = "Home 2"; });

    document.querySelectorAll(".auth-social-google, .auth-social-apple").forEach((button) => {
      const provider = button.classList.contains("auth-social-google") ? "Google" : "Apple";
      button.dataset.provider = provider;
      button.setAttribute("aria-label", `Continue with ${provider} (demo)`);
      button.lastChild.textContent = ` Continue with ${provider}`;
    });

    /* Keep statistics meaningful after their number animation finishes. */
    const statSuffixes = { "Homes cleaned": "+", "Vetted cleaners": "+", "Average rating": "/5", "Years of service": "+" };
    document.querySelectorAll(".stats-band .stat-card").forEach((card) => {
      const label = card.querySelector("p")?.textContent.trim();
      const number = card.querySelector(".stat-num");
      if (!number || !statSuffixes[label] || number.parentElement.classList.contains("stat-number-wrap") || number.textContent.includes(statSuffixes[label]) || number.querySelector("span")) return;
      const wrap = document.createElement("div"); wrap.className = "stat-number-wrap";
      number.before(wrap); wrap.append(number);
      const suffix = document.createElement("span"); suffix.className = "stat-suffix"; suffix.textContent = statSuffixes[label]; wrap.append(suffix);
    });

    /* Homepage cards retain their detail route; the services catalogue uses its
       explicit booking controls supplied in its markup. */
    document.querySelectorAll("[data-service-name] .service-foot").forEach((foot) => {
      const key = foot.closest("[data-service-name]")?.dataset.serviceName;
      const detail = foot.querySelector(".more");
      if (!key || !detail) return;
      const action = document.createElement("a");
      action.className = "btn btn-outline-brand service-cta";
      action.href = `booking.html?service=${encodeURIComponent(key)}`;
      action.textContent = "Book service";
      detail.replaceWith(action);
    });

    /* Animations --------------------------------------------- */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.AOS) AOS.init({ duration: 700, once: true, offset: 60, disable: reduced });
    if (window.GLightbox) GLightbox({ selector: ".glightbox", touchNavigation: true, loop: true });
    if (window.PureCounter) new PureCounter({ selector: ".purecounter" });

    /* PureCounter 1.5 drops the decimal for this fractional statistic in some
       browsers. Keep the same viewport-triggered animation, but format this
       one value directly so it remains 4.9 throughout and after the count. */
    document.querySelectorAll(".purecounter-rating").forEach((counter) => {
      const end = Number(counter.dataset.purecounterEnd);
      const decimals = Number(counter.dataset.purecounterDecimals || 1);
      const duration = Number(counter.dataset.purecounterDuration || 2) * 1000;
      const render = (value) => { counter.textContent = value.toFixed(decimals); };
      const animate = () => {
        if (reduced || !Number.isFinite(end)) { render(end); return; }
        const startTime = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          render(end * progress);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };
      render(end);
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer.disconnect();
          animate();
        }, { threshold: .15 });
        observer.observe(counter);
      } else {
        animate();
      }
    });

    /* Sticky header ------------------------------------------ */
    const header = document.getElementById("siteHeader");
    const toTop = document.getElementById("backToTop");
    const onScroll = () => {
      const y = window.scrollY;
      if (header) header.classList.toggle("is-stuck", y > 40);
      if (toTop) toTop.classList.toggle("is-visible", y > 480);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (toTop) toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }));

    /* Swiper sliders ----------------------------------------- */
    if (window.Swiper) {
      const rtl = document.documentElement.dir === "rtl";
      if (document.querySelector(".testimonial-swiper")) {
        new Swiper(".testimonial-swiper", {
          slidesPerView: 1, spaceBetween: 24, loop: true, rtl,
          autoplay: reduced ? false : { delay: 6000, disableOnInteraction: false },
          pagination: { el: ".testimonial-swiper .swiper-pagination", clickable: true },
          navigation: { nextEl: ".testimonial-swiper .swiper-button-next", prevEl: ".testimonial-swiper .swiper-button-prev" },
          breakpoints: { 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }
        });
      }
      if (document.querySelector(".logo-swiper")) {
        new Swiper(".logo-swiper", {
          slidesPerView: 2, spaceBetween: 24, loop: true, rtl,
          autoplay: reduced ? false : { delay: 2600 },
          breakpoints: { 576: { slidesPerView: 3 }, 992: { slidesPerView: 5 } }
        });
      }
    }

    /* Pre-select service plan if provided in URL (contact page) */
    const urlParams = new URLSearchParams(window.location.search);
    const planParam = urlParams.get('plan');
    if (planParam) {
      const serviceSelect = document.getElementById('ctService');
      if (serviceSelect) {
        const optionToSelect = serviceSelect.querySelector(`option[value="${planParam}"]`);
        if (optionToSelect) {
          serviceSelect.value = planParam;
        }
      }
    }

    /* Choices.js selects ------------------------------------- */
    if (window.Choices) {
      document.querySelectorAll("[data-choices]").forEach((el) => {
        new Choices(el, { searchEnabled: el.dataset.choices === "search", itemSelectText: "", shouldSort: false });
      });
    }

    /* Isotope filtering + search ----------------------------- */
    const grid = document.querySelector("[data-isotope]");
    if (grid && window.Isotope) {
      const iso = new Isotope(grid, { itemSelector: ".iso-item", layoutMode: "fitRows", percentPosition: true });
      let currentFilter = "*";
      let currentSearch = "";
      
      const emptyState = document.getElementById("servicesEmptyState");
      const clearSearchBtn = document.getElementById("clearSearchBtn");
      const clearEmptySearchBtn = document.getElementById("clearEmptySearchBtn");
      
      const applyFilters = () => {
        iso.arrange({
          filter: function(itemElem) {
            let matchFilter = currentFilter === "*" ? true : itemElem.matches(currentFilter);
            let matchSearch = true;
            if (currentSearch) {
              const textContent = (itemElem.textContent + " " + itemElem.className + " " + (itemElem.dataset.serviceName || "") + " " + (itemElem.dataset.serviceLabel || "")).toLowerCase();
              matchSearch = textContent.includes(currentSearch);
            }
            return matchFilter && matchSearch;
          }
        });
      };

      iso.on('arrangeComplete', function(filteredItems) {
        if (emptyState) {
          if (filteredItems.length === 0) {
            emptyState.classList.remove("d-none");
          } else {
            emptyState.classList.add("d-none");
          }
        }
      });

      document.querySelectorAll("[data-filter]").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll("[data-filter]").forEach((b) => b.classList.remove("is-active"));
          btn.classList.add("is-active");
          currentFilter = btn.dataset.filter;
          applyFilters();
        });
      });
      
      const searchInput = document.querySelector("[data-iso-search]");
      
      const clearSearch = () => {
        if (searchInput) searchInput.value = "";
        currentSearch = "";
        if (clearSearchBtn) clearSearchBtn.classList.add("d-none");
        applyFilters();
      };
      
      if (searchInput) {
        searchInput.addEventListener("input", () => {
          currentSearch = searchInput.value.trim().toLowerCase();
          if (clearSearchBtn) {
            if (searchInput.value.length > 0) {
              clearSearchBtn.classList.remove("d-none");
            } else {
              clearSearchBtn.classList.add("d-none");
            }
          }
          applyFilters();
        });
      }
      
      if (clearSearchBtn) {
        clearSearchBtn.addEventListener("click", clearSearch);
      }
      
      if (clearEmptySearchBtn) {
        clearEmptySearchBtn.addEventListener("click", clearSearch);
      }
    }

    /* Simple card search (blog / tables) --------------------- */
    document.querySelectorAll("[data-search-target]").forEach((input) => {
      input.addEventListener("input", () => {
        const q = input.value.trim().toLowerCase();
        document.querySelectorAll(input.dataset.searchTarget).forEach((row) => {
          row.style.display = !q || row.textContent.toLowerCase().includes(q) ? "" : "none";
        });
      });
    });

    /* Blog category and tag links --------------------------- */
    const blogCards = document.querySelectorAll(".post-card[data-category]");
    if (blogCards.length) {
      const params = new URLSearchParams(window.location.search);
      const category = params.get("category");
      const tag = params.get("tag");
      
      let visibleCount = blogCards.length;

      if (category || tag) {
        visibleCount = 0;
        blogCards.forEach((card) => {
          const matchesCategory = !category || card.dataset.category === category;
          const tags = (card.dataset.tags || "").split(" ");
          const matchesTag = !tag || tags.includes(tag);
          const col = card.closest(".col-md-6");
          
          if (matchesCategory && matchesTag) {
            col?.classList.remove("d-none");
            visibleCount++;
          } else {
            col?.classList.add("d-none");
          }
        });
      }
      
      // Empty state handling
      const container = document.querySelector('.post-card')?.closest('.row.g-4');
      if (container) {
        let emptyState = document.getElementById('noPostsFound');
        if (visibleCount === 0) {
          if (!emptyState) {
            emptyState = document.createElement('div');
            emptyState.id = 'noPostsFound';
            emptyState.className = 'col-12 py-5 text-center';
            emptyState.innerHTML = '<h3 class="h5" style="color:var(--sp-muted);">No blog posts found for this tag.</h3><a href="blog.html" class="btn btn-brand mt-3">View all posts</a>';
            container.appendChild(emptyState);
          }
          emptyState.style.display = 'block';
        } else if (emptyState) {
          emptyState.style.display = 'none';
        }
      }


    }

    /* Pricing billing toggle --------------------------------- */
    const billing = document.getElementById("billingSwitch");
    if (billing) {
      billing.addEventListener("change", () => {
        const yearly = billing.checked;
        document.querySelectorAll("[data-monthly]").forEach((el) => {
          el.textContent = yearly ? el.dataset.yearly : el.dataset.monthly;
        });
        document.querySelectorAll("[data-period]").forEach((el) => {
          el.textContent = yearly ? "/year" : "/visit";
        });
      });
    }

    /* Booking estimator -------------------------------------- */
    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
      const fmt = (n) => "$" + n.toFixed(2);
      const recalc = () => {
        const base = Number(bookingForm.querySelector("#bookingService")?.selectedOptions[0]?.dataset.price || 0);
        const rooms = Number(bookingForm.querySelector("#bookingRooms")?.value || 1);
        const roomFee = Math.max(0, rooms - 1) * 18;
        let addons = 0;
        bookingForm.querySelectorAll("[data-addon]:checked").forEach((a) => { addons += Number(a.dataset.addon); });
        const coupon = bookingForm.querySelector("#couponCode")?.value.trim().toUpperCase() === "SPARKLE10";
        const subtotal = base + roomFee + addons;
        const discount = coupon ? subtotal * 0.1 : 0;
        const tax = (subtotal - discount) * 0.08;
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = fmt(val); };
        set("sumBase", base); set("sumRooms", roomFee); set("sumAddons", addons);
        set("sumDiscount", -discount); set("sumTax", tax); set("sumTotal", subtotal - discount + tax);
        const note = document.getElementById("couponNote");
        if (note) note.textContent = coupon ? "SPARKLE10 applied - 10% off." : "";
      };
      bookingForm.addEventListener("input", recalc);
      bookingForm.addEventListener("change", recalc);
      recalc();
    }

    /* Form validation + demo submit state -------------------- */
    document.querySelectorAll(".needs-validation:not(#loginForm):not(#registerForm):not(#profileForm):not(#settingsForm):not(#bookingForm):not(.footer-newsletter)").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add("was-validated");
        if (!form.checkValidity()) {
          form.querySelector(":invalid")?.focus();
          return;
        }
        const btn = form.querySelector('[type="submit"]');
        const alertBox = form.querySelector("[data-form-alert]");
        if (btn) {
          const label = btn.innerHTML;
          btn.classList.add("is-loading");
          btn.disabled = true;
          window.setTimeout(() => {
            btn.classList.remove("is-loading");
            btn.disabled = false;
            btn.innerHTML = label;
            form.classList.remove("was-validated");
            form.reset();
            if (alertBox) {
              alertBox.hidden = false;
              alertBox.focus?.();
            }
          }, 1200);
        }
      });
    });

    document.querySelectorAll(".footer-newsletter").forEach((form) => {
      const input = form.querySelector('input[type="email"]');
      const message = form.querySelector(".footer-newsletter-message");
      if (!input || !message) return;
      const show = (text, type) => {
        message.textContent = text;
        message.hidden = false;
        message.className = `footer-newsletter-message is-visible is-${type}`;
        input.setAttribute("aria-invalid", String(type === "error"));
      };
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = input.value.trim();
        if (!email) { show("Please enter your email address.", "error"); input.focus(); return; }
        if (!input.validity.valid) { show("Please enter a valid email address.", "error"); input.focus(); return; }
        form.reset();
        show("✓ You are subscribed!", "success");
      });
      input.addEventListener("input", () => {
        if (message.classList.contains("is-error")) { message.hidden = true; message.className = "footer-newsletter-message"; input.removeAttribute("aria-invalid"); }
      });
    });

    const bookingFormEl = document.getElementById("bookingForm");
    if (bookingFormEl) {
      bookingFormEl.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();
        bookingFormEl.classList.add("was-validated");
        if (!bookingFormEl.checkValidity()) {
           bookingFormEl.querySelector(":invalid")?.focus();
           return;
        }
        const btn = bookingFormEl.querySelector('[type="submit"]');
        if(btn) {
           btn.classList.add("is-loading");
           btn.disabled = true;
        }
        
        const service = bookingFormEl.querySelector("#bookingService")?.selectedOptions[0]?.text || "Cleaning Service";
        const date = bookingFormEl.querySelector("#bookingDate")?.value || new Date().toLocaleDateString();
        const time = bookingFormEl.querySelector("#bookingTime")?.value || "09:00 AM";
        const totalText = document.getElementById("sumTotal")?.textContent || "$140.00";
        
        if (typeof SP_AUTH !== 'undefined') {
            const user = SP_AUTH.getCurrentUser();
            if(user) {
               SP_AUTH.createBooking({
                  userId: user.id,
                  service: service,
                  date: date,
                  time: time,
                  price: totalText.replace('$', '')
               });
            }
        }
        
        setTimeout(() => {
           window.location.href = "customer-dashboard.html#tabBookings";
        }, 1200);
      });
    }

    const handleAuthForm = function (event) {
      event.preventDefault();
      if (!this.checkValidity()) {
        event.stopPropagation();
        this.classList.add("was-validated");
      } else {
        this.classList.add("was-validated");
        const successMessage = document.getElementById("successMessage");
        if (successMessage) {
          successMessage.style.display = "block";
          successMessage.hidden = false;
        }
        const btn = this.querySelector('[type="submit"]');
        if (btn) {
          btn.classList.add("is-loading");
          btn.disabled = true;
        }
        setTimeout(function () {
          window.location.href = "customer-dashboard.html";
        }, 1000);
      }
    };

    const loginForm = document.getElementById("loginForm");
    if (loginForm) loginForm.addEventListener("submit", handleAuthForm);

    const registerForm = document.getElementById("registerForm");
    if (registerForm) registerForm.addEventListener("submit", handleAuthForm);

    /* Dashboard sidebar toggle ------------------------------- */
    const sidebar = document.querySelector(".dash-sidebar");
    const sbToggle = document.querySelector("[data-sidebar-toggle]");
    if (sidebar && sbToggle) {
      let backdrop = null;
      const close = () => {
        sidebar.classList.remove("is-open");
        sbToggle.setAttribute("aria-expanded", "false");
        backdrop?.remove();
        backdrop = null;
      };
      sbToggle.addEventListener("click", () => {
        const open = sidebar.classList.toggle("is-open");
        sbToggle.setAttribute("aria-expanded", String(open));
        if (open) {
          backdrop = document.createElement("div");
          backdrop.className = "dash-backdrop";
          backdrop.addEventListener("click", close);
          document.body.appendChild(backdrop);
        } else { close(); }
      });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    }

    /* Service details deep link ------------------------------ */
    const svcTitle = document.querySelector("[data-service-title]");
    if (svcTitle) {
      const slug = new URLSearchParams(window.location.search).get("service");
      if (slug) {
        const source = document.querySelector(`[data-service-name="${slug}"]`);
        if (source) {
          document.querySelectorAll("[data-service-title]").forEach((n) => { n.textContent = source.dataset.serviceLabel; });
        }
      }
    }

    /* Countdown ---------------------------------------------- */
    const cd = document.getElementById("countdown");
    if (cd) {
      const target = new Date(cd.dataset.target).getTime();
      const tick = () => {
        const diff = Math.max(0, target - Date.now());
        const d = Math.floor(diff / 86400000);
        const h = Math.floor(diff / 3600000) % 24;
        const m = Math.floor(diff / 60000) % 60;
        const s = Math.floor(diff / 1000) % 60;
        cd.querySelector("[data-d]").textContent = String(d).padStart(2, "0");
        cd.querySelector("[data-h]").textContent = String(h).padStart(2, "0");
        cd.querySelector("[data-m]").textContent = String(m).padStart(2, "0");
        cd.querySelector("[data-s]").textContent = String(s).padStart(2, "0");
      };
      tick();
      window.setInterval(tick, 1000);
    }
    /* Social auth demo behavior ------------------------------ */
    document.querySelectorAll(".js-social-demo").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const provider = btn.dataset.provider || "Social";
        const message = `${provider} Sign-In requires backend OAuth integration. This HTML template demonstrates the UI only.`;
        
        let toastContainer = document.querySelector(".toast-container");
        if (!toastContainer) {
          toastContainer = document.createElement("div");
          toastContainer.className = "toast-container position-fixed bottom-0 end-0 p-3";
          toastContainer.style.zIndex = "1055";
          document.body.appendChild(toastContainer);
        }
        
        const toastEl = document.createElement("div");
        toastEl.className = "toast align-items-center text-bg-primary border-0 mb-2";
        toastEl.setAttribute("role", "alert");
        toastEl.setAttribute("aria-live", "assertive");
        toastEl.setAttribute("aria-atomic", "true");
        toastEl.innerHTML = `
          <div class="d-flex">
            <div class="toast-body">
              <i class="bi bi-info-circle-fill me-2" aria-hidden="true"></i> ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        `;
        toastContainer.appendChild(toastEl);
        
        if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
          const toast = new bootstrap.Toast(toastEl, { delay: 4500 });
          toast.show();
        } else {
          alert(message);
        }
        
        toastEl.addEventListener("hidden.bs.toast", () => {
          toastEl.remove();
        });
      });
    });

    /* Messages search ---------------------------------------- */
    const msgSearch = document.getElementById("msgSearch");
    const conversationList = document.getElementById("conversationList");
    const msgEmptyState = document.getElementById("msgEmptyState");

    if (msgSearch && conversationList) {
      const convItems = Array.from(conversationList.querySelectorAll("li"));

      msgSearch.addEventListener("input", function() {
        const query = this.value.toLowerCase().trim();
        let matchCount = 0;

        convItems.forEach(item => {
          const textContent = item.textContent.toLowerCase();
          if (textContent.includes(query)) {
            item.style.display = "";
            matchCount++;
          } else {
            item.style.display = "none";
          }
        });

        if (msgEmptyState) {
          if (matchCount === 0 && query !== "") {
            msgEmptyState.style.display = "block";
            conversationList.style.display = "none";
          } else {
            msgEmptyState.style.display = "none";
            conversationList.style.display = "";
          }
        }
      });
    }

  });
})();
