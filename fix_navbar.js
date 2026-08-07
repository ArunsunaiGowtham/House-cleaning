const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      if(file.endsWith('.html')) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

const dir = __dirname;
const htmlFiles = walkSync(dir);

for (const filePath of htmlFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Restore the dropdown toggles in the navbar
  content = content.replace(/<a href="blog\.html\?tag=Home">Home<\/a>/g, '<a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Home</a>');
  content = content.replace(/<a href="blog\.html\?tag=About">About<\/a>/g, '<a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">About</a>');
  content = content.replace(/<a href="blog\.html\?tag=Services">Services<\/a>/g, '<a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Services</a>');
  content = content.replace(/<a href="blog\.html\?tag=Blog">Blog<\/a>/g, '<a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Blog</a>');
  content = content.replace(/<a href="blog\.html\?tag=Pages">Pages<\/a>/g, '<a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Pages</a>');

  // Admin dashboard sidebars or others might have been affected, let's just make sure the primary navigation is fixed.
  // The user specifically pointed out "HomeAboutServicesBlogPricingPagesContact".
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${path.basename(filePath)}`);
  }
}
