const fs = require('fs');
const path = require('path');

const mainJsPath = path.join(__dirname, 'assets', 'js', 'main.js');
let content = fs.readFileSync(mainJsPath, 'utf8');

const regex = /\/\* Isotope filtering \+ search -+ \*\/[\s\S]*?const grid = document\.querySelector\("\[data-isotope\]"\);[\s\S]*?if \(search\) \{[\s\S]*?search\.addEventListener\("input", \(\) => \{[\s\S]*?const q = search\.value\.trim\(\)\.toLowerCase\(\);[\s\S]*?iso\.arrange\(\{ filter: \(item\) => !q \|\| item\.textContent\.toLowerCase\(\)\.includes\(q\) \}\);[\s\S]*?\}\);[\s\S]*?\}[\s\S]*?\}/;

const newBlock = `/* Isotope filtering + search ----------------------------- */
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
    }`;

content = content.replace(regex, newBlock);

fs.writeFileSync(mainJsPath, content, 'utf8');
console.log('Fixed main.js');
