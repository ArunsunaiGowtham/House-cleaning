/**
 * admin-search.js
 * Global live search for SparklePro Admin Dashboard.
 */
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('dashSearch');
  if (!searchInput) return;

  // Container to inject empty state
  const mainContent = document.getElementById('main') || document.querySelector('.dash-content');
  if (!mainContent) return;

  // Create empty state element
  const emptyStateId = 'globalSearchEmptyState';
  let emptyStateEl = document.getElementById(emptyStateId);
  if (!emptyStateEl) {
    emptyStateEl = document.createElement('div');
    emptyStateEl.id = emptyStateId;
    emptyStateEl.className = 'text-center py-5 my-5 w-100';
    emptyStateEl.style.display = 'none';
    emptyStateEl.innerHTML = `
      <div class="mb-3"><i class="bi bi-search text-muted" style="font-size: 2.5rem;" aria-hidden="true"></i></div>
      <h2 class="h4 mb-2">No matching results found</h2>
      <p class="text-muted mb-0">Try another keyword.</p>
    `;
    mainContent.appendChild(emptyStateEl);
  }

  // Helper to get the actual DOM element to hide/show
  function getHideableParent(el) {
    if (el.classList.contains('kpi-card') || el.classList.contains('dash-panel')) {
      const colParent = el.closest('[class*="col-"]');
      if (colParent && colParent.parentElement && colParent.parentElement.classList.contains('row')) {
        return colParent;
      }
    }
    return el;
  }

  searchInput.addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();
    
    // Select targets carefully so we don't break charts, calendars or structural UI
    // Prioritize table rows, list items, and metric cards
    const allSearchables = Array.from(document.querySelectorAll(
      'table tbody tr, ' +
      '.activity-list li, ' +
      '.list-unstyled:not(.dropdown-menu):not(.dash-nav):not(#conversationList) > li, ' +
      '.kpi-card'
    ));

    let matchCount = 0;

    // Reset all highlights and visibility if query is empty
    if (!query) {
      allSearchables.forEach(el => {
        const hideable = getHideableParent(el);
        hideable.style.display = '';
        removeHighlight(el);
      });
      emptyStateEl.style.display = 'none';
      return;
    }

    allSearchables.forEach(el => {
      const hideable = getHideableParent(el);
      removeHighlight(el);
      
      const textContent = el.textContent.toLowerCase();
      if (textContent.includes(query)) {
        hideable.style.display = '';
        highlightText(el, query);
        matchCount++;
      } else {
        hideable.style.display = 'none';
      }
    });

    if (matchCount === 0) {
      emptyStateEl.style.display = 'block';
    } else {
      emptyStateEl.style.display = 'none';
    }
  });

  function removeHighlight(element) {
    const marks = Array.from(element.querySelectorAll('mark.search-highlight'));
    marks.forEach(mark => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      }
    });
  }

  function highlightText(element, query) {
    // Escape regex specials
    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${safeQuery})`, 'gi');

    const treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    const nodesToHighlight = [];
    
    let currentNode;
    while (currentNode = treeWalker.nextNode()) {
      if (currentNode.parentNode && 
          currentNode.parentNode.nodeName !== 'MARK' && 
          currentNode.parentNode.nodeName !== 'SCRIPT' && 
          currentNode.parentNode.nodeName !== 'STYLE') {
        const text = currentNode.nodeValue;
        if (text.toLowerCase().includes(query)) {
          nodesToHighlight.push(currentNode);
        }
      }
    }

    nodesToHighlight.forEach(node => {
      const text = node.nodeValue;
      if (!text.trim()) return;

      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let match;
      
      // Reset regex index
      regex.lastIndex = 0;
      
      while ((match = regex.exec(text)) !== null) {
        const before = text.substring(lastIndex, match.index);
        if (before) fragment.appendChild(document.createTextNode(before));
        
        const mark = document.createElement('mark');
        mark.className = 'search-highlight';
        mark.style.backgroundColor = 'rgba(18, 183, 166, 0.3)';
        mark.style.color = 'inherit';
        mark.style.padding = '0';
        mark.style.borderRadius = '2px';
        mark.textContent = match[0];
        fragment.appendChild(mark);
        
        lastIndex = regex.lastIndex;
      }
      
      const after = text.substring(lastIndex);
      if (after) fragment.appendChild(document.createTextNode(after));

      if (node.parentNode) {
        node.parentNode.replaceChild(fragment, node);
      }
    });
  }
});
