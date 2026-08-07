const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of htmlFiles) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Fix duplicated cleaning tips in blog-details tag lists if they exist back-to-back
  content = content.replace(/<a href="blog\.html\?tag=cleaning-tips">cleaning tips<\/a><a href="blog\.html\?tag=cleaning-tips">cleaning tips<\/a>/g, '<a href="blog.html?tag=cleaning-tips">cleaning tips</a><a href="blog.html?tag=eco-products">eco products</a>');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
