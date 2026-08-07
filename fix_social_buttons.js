const fs = require('fs');
const path = require('path');

const dir = __dirname;

const filesToFix = ['login.html', 'register.html'];

for (const file of filesToFix) {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix Google button
    content = content.replace(/<a href="blog\.html\?tag=<i class="bi bi-google"[^>]*> (Continue|Sign up) with Google"><i class="bi bi-google"[^>]*> (Continue|Sign up) with Google<\/a>/g, 
    '<a class="btn btn-outline-dark w-100 js-social-demo" data-provider="google"><i class="bi bi-google" aria-hidden="true"></i> $1 with Google</a>');

    // Fix Apple button
    content = content.replace(/<a href="blog\.html\?tag=<i class="bi bi-apple"[^>]*> (Continue|Sign up) with Apple"><i class="bi bi-apple"[^>]*> (Continue|Sign up) with Apple<\/a>/g, 
    '<a class="btn btn-outline-dark w-100 js-social-demo" data-provider="apple"><i class="bi bi-apple" aria-hidden="true"></i> $1 with Apple</a>');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed social buttons in ${file}`);
  }
}
