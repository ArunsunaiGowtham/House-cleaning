const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

// 1. Fix HTML files
for (const file of htmlFiles) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace any tag=sparklepro with tag=cleaning-tips
  content = content.replace(/tag=sparklepro/g, 'tag=cleaning-tips');
  content = content.replace(/>sparklepro<\/a>/g, '>cleaning tips</a>');

  // Add Clear Filters button to blog.html Popular tags
  if (file === 'blog.html') {
    if (!content.includes('id="clearTagsBtn"')) {
      content = content.replace(
        /<\/div>\s*<\/div>\s*<\/aside>/g,
        '</div><button id="clearTagsBtn" class="btn btn-sm btn-outline-brand w-100 mt-3" style="display:none;">Clear Filters</button></div></aside>'
      );
    }
  }

  // Remove any href="#" or href="javascript:void(0)" in tag-list
  content = content.replace(/<a[^>]*href=["'](?:#|javascript:void\(0\);?)["'][^>]*>(.*?)<\/a>/gi, '<a href="blog.html?tag=$1">$1</a>');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}

// 2. Fix blog.js
const blogJsPath = path.join(dir, 'assets', 'js', 'blog.js');
if (fs.existsSync(blogJsPath)) {
  let jsContent = fs.readFileSync(blogJsPath, 'utf8');
  
  // Replace wrapper.style.display logic with classList.add('d-none')
  jsContent = jsContent.replace(/wrapper\.style\.display = '';/g, 'wrapper.classList.remove("d-none");');
  jsContent = jsContent.replace(/wrapper\.style\.display = 'none';/g, 'wrapper.classList.add("d-none");');
  
  // Fix the split to properly match exact tags (e.g. split by space)
  // Actually blog.js uses cardTags.includes(currentTag) which is buggy if "deep-cleaning" matches "cleaning".
  // Let's replace the includes logic
  jsContent = jsContent.replace(/if \(currentTag && !cardTags\.includes\(currentTag\)\)/g, 'if (currentTag && !cardTags.split(" ").includes(currentTag))');

  // Add click interceptor for tag-list
  if (!jsContent.includes('tagLink.addEventListener')) {
    const interceptorCode = `
    // Intercept tag clicks
    document.querySelectorAll('.tag-list a').forEach(tagLink => {
        tagLink.addEventListener('click', function(e) {
            if (window.location.pathname.endsWith('blog.html') || window.location.pathname === '/') {
                e.preventDefault();
                const url = new URL(this.href, window.location.origin);
                currentTag = url.searchParams.get('tag');
                if (url.searchParams.get('category')) {
                    currentCategory = url.searchParams.get('category');
                }
                applyFilters();
                updateURL();
                updateActiveTag();
            }
        });
    });

    const clearTagsBtn = document.getElementById('clearTagsBtn');
    if (clearTagsBtn) {
        clearTagsBtn.addEventListener('click', function() {
            currentTag = null;
            currentCategory = null;
            currentSearch = '';
            if (searchInput) searchInput.value = '';
            applyFilters();
            updateURL();
            updateActiveTag();
        });
    }

    function updateActiveTag() {
        document.querySelectorAll('.tag-list a').forEach(a => {
            a.classList.remove('active');
            a.style.backgroundColor = '';
            a.style.color = '';
            a.style.borderColor = '';
            
            const href = a.getAttribute('href');
            if (currentTag && href && href.includes('tag=' + currentTag)) {
                a.classList.add('active');
                a.style.backgroundColor = 'var(--sp-brand)';
                a.style.color = '#fff';
                a.style.borderColor = 'var(--sp-brand)';
            }
        });
        
        if (clearTagsBtn) {
            clearTagsBtn.style.display = (currentTag || currentCategory || currentSearch) ? 'block' : 'none';
        }
    }
    
    // Call on initial load
    updateActiveTag();
`;
    // Insert before "function applyFilters()"
    jsContent = jsContent.replace('function applyFilters() {', interceptorCode + '\n    function applyFilters() {');
  }

  fs.writeFileSync(blogJsPath, jsContent, 'utf8');
  console.log('Updated blog.js');
}

console.log('Done.');
