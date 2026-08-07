const fs = require('fs');
const path = require('path');

// Fix root HTML files
const rootDir = __dirname;
const rootFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

for (const file of rootFiles) {
    let content = fs.readFileSync(path.join(rootDir, file), 'utf8');
    
    // Replace ../ inside the dropdown (and anywhere else it might have incorrectly been added)
    content = content.replace(/href="\.\.\/faq\.html"/g, 'href="faq.html"');
    content = content.replace(/href="\.\.\/customer-dashboard\.html"/g, 'href="customer-dashboard.html"');
    content = content.replace(/href="\.\.\/admin\/dashboard\.html"/g, 'href="admin/dashboard.html"');
    content = content.replace(/href="\.\.\/login\.html"/g, 'href="login.html"');
    content = content.replace(/href="\.\.\/register\.html"/g, 'href="register.html"');
    content = content.replace(/href="\.\.\/coming-soon\.html"/g, 'href="coming-soon.html"');
    content = content.replace(/href="\.\.\/maintenance\.html"/g, 'href="coming-soon.html"');
    
    fs.writeFileSync(path.join(rootDir, file), content, 'utf8');
}

// Fix admin HTML files
const adminDir = path.join(__dirname, 'admin');
const adminFiles = fs.readdirSync(adminDir).filter(f => f.endsWith('.html'));

for (const file of adminFiles) {
    let content = fs.readFileSync(path.join(adminDir, file), 'utf8');
    
    // In admin directory, links to root files should be ../file.html
    content = content.replace(/href="faq\.html"/g, 'href="../faq.html"');
    content = content.replace(/href="customer-dashboard\.html"/g, 'href="../customer-dashboard.html"');
    // Admin dashboard link from inside admin/ should just be dashboard.html
    content = content.replace(/href="\.\.\/admin\/dashboard\.html"/g, 'href="dashboard.html"');
    content = content.replace(/href="admin\/dashboard\.html"/g, 'href="dashboard.html"');
    
    // login/register might already have ../ from previous scripts, or they might not
    // We want to ensure they are ../login.html
    content = content.replace(/href="login\.html"/g, 'href="../login.html"');
    content = content.replace(/href="register\.html"/g, 'href="../register.html"');
    content = content.replace(/href="coming-soon\.html"/g, 'href="../coming-soon.html"');
    content = content.replace(/href="maintenance\.html"/g, 'href="../coming-soon.html"');
    
    fs.writeFileSync(path.join(adminDir, file), content, 'utf8');
}

console.log("Links fixed.");
