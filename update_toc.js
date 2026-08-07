const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(file => file.startsWith('blog-details-') && file.endsWith('.html'));

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Find the TOC block
    const tocMatch = content.match(/<nav class="toc my-4"[^>]*>([\s\S]*?)<\/nav>/);
    if (!tocMatch) return;

    let tocContent = tocMatch[0];
    
    // Find all links in TOC: <a href="#s1">Text</a>
    const linkRegex = /<a href="#([^"]+)">([^<]+)<\/a>/g;
    let match;
    const mappings = {}; // oldId -> newId

    while ((match = linkRegex.exec(tocContent)) !== null) {
        const oldId = match[1];
        const text = match[2];
        const newId = slugify(text);
        mappings[oldId] = newId;
    }

    // Replace in TOC
    for (const [oldId, newId] of Object.entries(mappings)) {
        content = content.replace(`href="#${oldId}"`, `href="#${newId}"`);
        content = content.replace(`id="${oldId}"`, `id="${newId}"`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated IDs in ${file}`);
});
