const fs = require('fs');
const path = require('path');

// 1. Update contact.html
const contactPath = path.join(__dirname, 'contact.html');
let contactContent = fs.readFileSync(contactPath, 'utf8');

// Remove the unused map container block (col-lg-5)
const mapColRegex = /<div class="col-lg-5" data-aos="fade-left">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/;
// Let's use a more precise replacement.
// We want to remove the entire <div class="col-lg-5" ...> up to its closing </div>, which is right before the closing </div> of row g-5.
contactContent = contactContent.replace(
    /<div class="col-lg-5"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/,
    '</div></div></section>' // Close the row, container, and section
);

// Center the form
contactContent = contactContent.replace(/<div class="col-lg-7"/, '<div class="col-lg-8 mx-auto"');
fs.writeFileSync(contactPath, contactContent, 'utf8');


// 2. Update blog.html for pagination and categories
const blogPath = path.join(__dirname, 'blog.html');
let blogContent = fs.readFileSync(blogPath, 'utf8');

// Commercial category redirect
blogContent = blogContent.replace(
    /href="blog\.html\?category=commercial"/g,
    'href="coming-soon.html"'
);

// Pagination redirects
// Replace href="javascript:void(0);" with href="coming-soon.html" for page 2, 3 and Next
// Let's use Regex to find the pagination block
blogContent = blogContent.replace(
    /<li class="page-item"><a class="page-link" href="javascript:void\(0\);(?:")>2<\/a><\/li>/,
    '<li class="page-item"><a class="page-link" href="coming-soon.html">2</a></li>'
);
blogContent = blogContent.replace(
    /<li class="page-item"><a class="page-link" href="javascript:void\(0\);(?:")>3<\/a><\/li>/,
    '<li class="page-item"><a class="page-link" href="coming-soon.html">3</a></li>'
);
// For Next page
blogContent = blogContent.replace(
    /<li class="page-item"><a class="page-link" href="javascript:void\(0\);(?:") aria-label="Next page">/,
    '<li class="page-item"><a class="page-link" href="coming-soon.html" aria-label="Next page">'
);

fs.writeFileSync(blogPath, blogContent, 'utf8');


// 3. Remove 'office' tag from all blog files (blog.html, blog-details-*.html)
const files = fs.readdirSync(__dirname);
for (const file of files) {
    if (file.startsWith('blog') && file.endsWith('.html')) {
        let content = fs.readFileSync(path.join(__dirname, file), 'utf8');
        content = content.replace(/<a href="blog\.html\?tag=office">office<\/a>/g, '');
        fs.writeFileSync(path.join(__dirname, file), content, 'utf8');
    }
}

// 4. Update coming-soon.html with Contact button
const csPath = path.join(__dirname, 'coming-soon.html');
let csContent = fs.readFileSync(csPath, 'utf8');
csContent = csContent.replace(
    /<p class="mt-4 mb-0"><a href="index\.html"><i class="bi bi-arrow-left" aria-hidden="true"><\/i> Back to the current site<\/a><\/p>/,
    '<div class="mt-4 d-flex justify-content-center gap-3"><a class="btn btn-outline-brand" href="index.html"><i class="bi bi-arrow-left" aria-hidden="true"></i> Home</a><a class="btn btn-brand" href="contact.html">Contact Us</a></div>'
);
fs.writeFileSync(csPath, csContent, 'utf8');

console.log('HTML updates completed.');
