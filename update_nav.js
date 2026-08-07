const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

// This script will:
// 1. Remove <li><a class="dropdown-item" href="pricing.html">Pricing</a></li> from Services dropdown
// 2. Insert <li class="nav-item"><a class="nav-link[ active]" href="pricing.html">Pricing</a></li> after the Blog dropdown <li> block.
// 3. For pricing.html, it will also remove ' active' from Services dropdown.

const servicesRegex = /(<li class="nav-item dropdown">\s*<a class="nav-link dropdown-toggle[^>]*>Services<\/a>\s*<ul class="dropdown-menu">.*?)<li><a class="dropdown-item" href="pricing\.html">Pricing<\/a><\/li>(.*?<\/ul>\s*<\/li>)/g;
const blogRegex = /(<li class="nav-item dropdown">\s*<a class="nav-link dropdown-toggle[^>]*>Blog<\/a>\s*<ul class="dropdown-menu">.*?<\/ul>\s*<\/li>)/g;

let updatedFiles = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Remove Pricing from Services
  content = content.replace(servicesRegex, '$1$2');

  // 2. Add Pricing after Blog
  // If it's pricing.html, we also need to add ' active'
  const isPricing = file === 'pricing.html';
  const navLinkClass = isPricing ? 'nav-link active' : 'nav-link';
  const newNavItem = `\n<li class="nav-item"><a class="${navLinkClass}" href="pricing.html">Pricing</a></li>`;
  
  content = content.replace(blogRegex, `$1${newNavItem}`);
  
  // 3. If pricing.html, remove active from Services
  if (isPricing) {
    // Find Services and remove active
    content = content.replace(/(<a class="nav-link dropdown-toggle) active(" href="javascript:void\(0\);" role="button" data-bs-toggle="dropdown" aria-expanded="false">Services<\/a>)/g, '$1$2');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedFiles++;
    console.log(`Updated ${file}`);
  }
}

console.log(`Updated ${updatedFiles} files.`);
