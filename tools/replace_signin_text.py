from pathlib import Path

root = Path(__file__).resolve().parent.parent
html_files = list(root.glob('*.html'))
js_files = [root / 'assets' / 'js' / 'auth.js']
replacements = {
    'Sign in': 'Login',
    'Sign In': 'Login',
    'Back to sign in': 'Back to Login'
}
changed = []
for path in html_files + js_files:
    if not path.exists():
        continue
    text = path.read_text(encoding='utf-8')
    new_text = text
    if path.suffix == '.html':
        for old, new in replacements.items():
            new_text = new_text.replace(old, new)
    elif path.name == 'auth.js':
        new_text = new_text.replace('if (a.textContent.trim() === "Sign in")',
                                    'if (a.textContent.trim() === "Login")')
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        changed.append(path)
print('Updated files:')
for p in changed:
    print(p)
# Verify no remaining literal Sign in / Sign In occurrences
remaining = []
for path in html_files + js_files:
    text = path.read_text(encoding='utf-8')
    if 'Sign in' in text or 'Sign In' in text:
        remaining.append(path)
print('\nRemaining files with exact text:')
for p in remaining:
    print(p)
