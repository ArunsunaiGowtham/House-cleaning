const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

// Remove Popular tags widget from all HTML files
for (const file of htmlFiles) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Regex to remove the entire Popular Tags sidebar widget
  // It starts with <div class="sidebar-widget"><h2 class="h6">Popular tags</h2>
  // and ends with </div></div>
  const regex = /<div class="sidebar-widget">\s*<h2 class="h6">Popular tags<\/h2>\s*<div class="tag-list">[\s\S]*?<\/div>\s*<\/div>/g;
  
  content = content.replace(regex, '');

  // Remove any leftover blank lines caused by the removal, if necessary (optional)
  content = content.replace(/\n\s*\n\s*<div class="sidebar-widget">\s*<h2 class="h6">Monthly newsletter<\/h2>/g, '\n<div class="sidebar-widget">\n  <h2 class="h6">Monthly newsletter</h2>');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Removed Popular Tags from ${file}`);
  }
}

// Clean up blog.js
const blogJsPath = path.join(dir, 'assets', 'js', 'blog.js');
if (fs.existsSync(blogJsPath)) {
  let jsContent = fs.readFileSync(blogJsPath, 'utf8');
  
  // Remove the tag click interceptor
  jsContent = jsContent.replace(/\/\/ Intercept tag clicks[\s\S]*?const clearTagsBtn = document\.getElementById\('clearTagsBtn'\);/g, "const clearTagsBtn = document.getElementById('clearTagsBtn');");
  
  // Remove the updateActiveTag function
  jsContent = jsContent.replace(/function updateActiveTag\(\) \{[\s\S]*?\}\s*\n\s*\/\/ Call on initial load\s*\n\s*updateActiveTag\(\);/g, "");
  
  // Remove updateActiveTag() calls from clearTagsBtn handler and input handler
  jsContent = jsContent.replace(/updateActiveTag\(\);/g, '');
  
  // Note: we can keep currentTag logic in applyFilters just in case someone lands on ?tag=xxx from an old link. The prompt only says "Remove any unused JavaScript or CSS related to Popular Tags". The active tag highlighting and tag click interceptors are the main unused parts now.

  fs.writeFileSync(blogJsPath, jsContent, 'utf8');
  console.log('Cleaned up blog.js');
}

console.log('Done.');
