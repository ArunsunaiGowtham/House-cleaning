const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(path.join(rootDir, file), 'utf8');
    let original = content;

    content = content.replace(
        /src="assets\/images\/testimonials\/customer-01\.webp"([^>]+alt="Elena Rossi")/g,
        'src="assets/images/testimonials/customer-04.png"$1'
    );
    
    content = content.replace(
        /src="assets\/images\/testimonials\/customer-02\.webp"([^>]+alt="Tom Whitfield")/g,
        'src="assets/images/testimonials/customer-05.png"$1'
    );
    
    content = content.replace(
        /src="assets\/images\/testimonials\/customer-03\.webp"([^>]+alt="Aisha Karim")/g,
        'src="assets/images/testimonials/customer-06.png"$1'
    );
    
    if (original !== content) {
        fs.writeFileSync(path.join(rootDir, file), content, 'utf8');
    }
}
console.log("Images updated.");
