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

            // Replace href="#" with href="javascript:void(0);"
            // but keep it if it has data-bs-toggle (bootstrap dropdowns usually need href="#" or just #)
            // Actually, replacing href="#" with href="javascript:void(0);" for dropdowns is perfectly fine for Bootstrap!
            content = content.replace(/href="#"/g, 'href="javascript:void(0);"');
            
            fs.writeFileSync(fullPath, content, 'utf8');
        }
    }
}

processDir(__dirname);
console.log('Replaced placeholder links.');
