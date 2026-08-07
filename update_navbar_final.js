const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let depth = (fullPath.match(/\\/g) || []).length - (process.cwd().match(/\\/g) || []).length;
            let prefix = depth > 0 ? '../' : '';

            // The Pages dropdown has an identifying block of links.
            // We want to replace the `ul` block under the "Pages" dropdown.
            const pagesRegex = /<a class="nav-link dropdown-toggle[^>]*>Pages<\/a>\s*<ul class="dropdown-menu">[\s\S]*?<\/ul>/g;

            content = content.replace(pagesRegex, (match) => {
                // Determine if it's the active one
                const isActive = match.includes('active') ? ' active' : '';
                return `<a class="nav-link dropdown-toggle${isActive}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Pages</a>
              <ul class="dropdown-menu"><li><a class="dropdown-item" href="${prefix}faq.html">FAQ</a></li><li><a class="dropdown-item" href="${prefix}customer-dashboard.html">Customer Dashboard</a></li><li><a class="dropdown-item" href="${prefix}admin/dashboard.html">Admin Dashboard</a></li><li><a class="dropdown-item" href="${prefix}login.html">Login</a></li><li><a class="dropdown-item" href="${prefix}register.html">Register</a></li><li><a class="dropdown-item" href="${prefix}maintenance.html">Coming Soon</a></li></ul>`;
            });

            fs.writeFileSync(fullPath, content, 'utf8');
        }
    }
}

processDir(__dirname);
console.log('Navigation updated.');
