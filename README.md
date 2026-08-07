# SparklePro - Premium Home Cleaning HTML5 Template

Version 1.0.0 | Bootstrap 5.3.3 | Pure HTML5, CSS3 and vanilla ES6 JavaScript.

## What is included

33 hand-built pages: two homepages, full company pages, a 15-service catalogue,
service details, pricing, four unique blog articles, booking flow, customer
dashboard, a nine-page admin dashboard, auth pages, 404 and coming-soon.

## Getting started

No build step and no backend. Open `index.html` in a browser, or serve the
folder with any static server:

    python3 -m http.server 8080

## Structure

    index.html                 Residential homepage
    home-cleaning.html         Commercial homepage
    about / services / pricing / blog / contact / faq ...
    admin/                     Admin dashboard pages
    assets/css/style.css       Design system + components
    assets/css/dark.css        Dark mode tokens
    assets/css/rtl.css         RTL overrides
    assets/css/responsive.css  Breakpoint refinements
    assets/js/main.js          UI behaviour
    assets/js/darkmode.js      Theme switching (localStorage)
    assets/js/rtl.js           Direction switching (localStorage)
    assets/js/dashboard.js     Dashboard widgets
    assets/images/             WebP imagery, grouped by section

## Customising

All colours, radii, shadows, gradients and spacing live as CSS custom
properties in the `:root` block of `assets/css/style.css`. Change
`--sp-brand` and `--sp-accent` to rebrand the whole template.

Dark mode overrides live only in `dark.css` under `[data-bs-theme="dark"]`,
so light and dark stay in sync automatically.

## Third-party libraries (loaded from CDN)

Bootstrap 5.3.3, Bootstrap Icons 1.11, AOS 2.3, SwiperJS 11, GLightbox,
Isotope Layout 3, PureCounter, Choices.js 10, Google Fonts (Plus Jakarta
Sans + Sora).

## Credits

Imagery generated exclusively for this template and licensed for use with it.
