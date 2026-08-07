document.addEventListener('DOMContentLoaded', function() {
    let params = new URLSearchParams(window.location.search);
    let currentCategory = params.get('category');
    let currentTag = params.get('tag');
    let currentSearch = params.get('search') || '';
    
    const postCards = document.querySelectorAll('.post-card');
    
    // Search Input Init
    const searchInput = document.getElementById('blogSearch');
    const searchBtn = searchInput ? searchInput.nextElementSibling : null;

    if (searchInput) {
        if (currentSearch) searchInput.value = currentSearch;
        
        const allBlogs = [
            {
                url: 'blog-details-1.html',
                title: '10 Home Cleaning Tips for Busy Families',
                category: 'Home Tips',
                tags: 'cleaning-tips pets small-spaces eco-products',
                excerpt: 'Small routines beat marathon weekend cleans. These ten habits keep a family home presentable with under fifteen minutes a day.'
            },
            {
                url: 'blog-details-2.html',
                title: 'How Deep Cleaning Improves Indoor Air Quality',
                category: 'Healthy Home',
                tags: 'deep-cleaning allergies eco-products',
                excerpt: 'Indoor air is often more polluted than the street outside. Here is what settles in your home and how a deep clean removes it.'
            },
            {
                url: 'blog-details-3.html',
                title: 'Kitchen Cleaning Checklist for Every Home',
                category: 'Checklists',
                tags: 'kitchen bathroom cleaning-tips',
                excerpt: 'The exact daily, weekly and monthly kitchen checklist our technicians follow on every residential visit.'
            },
            {
                url: 'blog-details-4.html',
                title: 'Move-Out Cleaning Guide Before Handing Over Your Keys',
                category: 'Moving',
                tags: 'move-out cleaning-tips',
                excerpt: 'A room-by-room plan that matches what letting agents actually inspect, so your deposit comes back in full.'
            }
        ];

        function performSearch() {
            const query = searchInput.value.trim().toLowerCase();
            if (!query) return; // Do nothing on empty input
            
            const matches = allBlogs.filter(blog => {
                const searchableText = `${blog.title} ${blog.category} ${blog.excerpt} ${blog.tags}`.toLowerCase();
                return searchableText.includes(query);
            });
            
            if (matches.length === 1) {
                window.location.href = matches[0].url;
            } else if (matches.length > 1) {
                window.location.href = 'blog.html?search=' + encodeURIComponent(query);
            } else {
                alert('No matching articles found.');
            }
        }

        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });

        if (searchBtn && searchBtn.tagName === 'BUTTON') {
            searchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                performSearch();
            });
        }
    }

    
    const clearTagsBtn = document.getElementById('clearTagsBtn');
    if (clearTagsBtn) {
        clearTagsBtn.addEventListener('click', function() {
            currentTag = null;
            currentCategory = null;
            currentSearch = '';
            if (searchInput) searchInput.value = '';
            applyFilters();
            updateURL();
        });
    }

    // Function to handle global clear search from empty state
    function clearSearchGlobal(e) {
        if (e) e.preventDefault();
        currentSearch = '';
        if (searchInput) searchInput.value = '';
        applyFilters();
        updateURL();
    }

    

    function applyFilters() {
        let visibleCount = 0;
        const searchLower = currentSearch.toLowerCase();
        
        postCards.forEach(card => {
            const wrapper = card.closest('.col-md-6'); // The grid column
            const cardCategory = card.getAttribute('data-category') || '';
            const cardTags = card.getAttribute('data-tags') || '';
            const cardTitle = card.querySelector('.h5, h3')?.textContent.toLowerCase() || '';
            const cardExcerpt = card.querySelector('p')?.textContent.toLowerCase() || '';
            
            // "Search blog titles, categories, excerpts and tags."
            const searchableText = `${cardTitle} ${cardCategory} ${cardExcerpt} ${cardTags}`.toLowerCase();
            
            let show = true;
            
            if (currentCategory && cardCategory !== currentCategory) {
                show = false;
            }
            
            if (currentTag && !cardTags.split(" ").includes(currentTag)) {
                show = false;
            }
            
            if (currentSearch && !searchableText.includes(searchLower)) {
                show = false;
            }
            
            if (show) {
                if (wrapper) wrapper.classList.remove("d-none");
                visibleCount++;
            } else {
                if (wrapper) wrapper.classList.add("d-none");
            }
        });

        handleEmptyState(visibleCount);
    }
    
    function updateURL() {
        const newParams = new URLSearchParams();
        if (currentCategory) newParams.set('category', currentCategory);
        if (currentTag) newParams.set('tag', currentTag);
        if (currentSearch) newParams.set('search', currentSearch);
        
        const newUrl = window.location.pathname + (newParams.toString() ? '?' + newParams.toString() : '');
        window.history.replaceState({}, '', newUrl);
        updatePaginationLinks();
    }

    function handleEmptyState(visibleCount) {
        if (postCards.length > 0) {
            const gridRow = postCards[0].closest('.row');
            if (gridRow) {
                let emptyState = document.getElementById('blogEmptyState');
                if (visibleCount === 0) {
                    if (!emptyState) {
                        emptyState = document.createElement('div');
                        emptyState.id = 'blogEmptyState';
                        emptyState.className = 'col-12 text-center py-5';
                        emptyState.innerHTML = '<h3 class="h4" style="color:var(--sp-muted);">No articles found.</h3><button class="btn btn-brand mt-3" type="button" id="clearBlogEmptyBtn">Clear Search</button>';
                        gridRow.appendChild(emptyState);
                        document.getElementById('clearBlogEmptyBtn').addEventListener('click', clearSearchGlobal);
                    }
                    emptyState.style.display = '';
                } else if (emptyState) {
                    emptyState.style.display = 'none';
                }
            }
        }
    }

    function updatePaginationLinks() {
        const paginationLinks = document.querySelectorAll('.pagination a.page-link');
        paginationLinks.forEach(link => {
            const href = link.getAttribute('href');
            // If it's a real link, don't break it, but we can append current search params
            if (href && href !== '#' && href !== 'javascript:void(0);') {
                try {
                    const linkUrl = new URL(link.href, window.location.origin);
                    const linkParams = new URLSearchParams(linkUrl.search);
                    
                    if (currentCategory) linkParams.set('category', currentCategory);
                    if (currentTag) linkParams.set('tag', currentTag);
                    if (currentSearch) linkParams.set('search', currentSearch);
                    
                    linkUrl.search = linkParams.toString();
                    link.href = linkUrl.toString();
                } catch (e) {
                    // Ignore invalid URLs
                }
            }
        });
    }

    // Initial run
    applyFilters();
    updatePaginationLinks();
});

