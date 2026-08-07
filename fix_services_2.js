const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'services.html');
let content = fs.readFileSync(filePath, 'utf8');

// The exact string in the file right now
const currentMarkup = `<nav class="page-crumb" aria-label="Breadcrumb">
  <ol class="breadcrumb container mb-0">
    <span class="service-icon"><i class="bi bi-house-heart" aria-hidden="true"></i></span>
    <h3 class="h5">Residential Cleaning</h3>`;

// What it should be
const fixedMarkup = `<nav class="page-crumb" aria-label="Breadcrumb">
  <ol class="breadcrumb container mb-0">
    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
    <li class="breadcrumb-item active" aria-current="page">Cleaning services</li>
  </ol>
</nav>
<section class="section">
  <div class="container">
    <div class="row g-3 align-items-center mb-4">
      <div class="col-lg-5">
        <label class="visually-hidden" for="serviceSearch">Search services</label>
        <div class="input-group position-relative">
          <span class="input-group-text bg-transparent border-end-0"><i class="bi bi-search" aria-hidden="true"></i></span>
          <input class="form-control border-start-0 pe-5" type="text" id="serviceSearch" placeholder="Search services, e.g. carpet" data-iso-search autocomplete="off">
          <button type="button" class="btn-close position-absolute end-0 top-50 translate-middle-y me-2 d-none" aria-label="Clear search" id="clearSearchBtn" style="z-index: 10;"></button>
        </div>
      </div>
      <div class="col-lg-7"><div class="filter-bar justify-content-lg-end mb-0"><button class="filter-btn is-active" type="button" data-filter="*">All services</button><button class="filter-btn" type="button" data-filter=".home">Home</button><button class="filter-btn" type="button" data-filter=".deep">Deep Clean</button><button class="filter-btn" type="button" data-filter=".move">Move In / Out</button><button class="filter-btn" type="button" data-filter=".commercial">Commercial</button><button class="filter-btn" type="button" data-filter=".specialty">Specialty</button></div></div>
    </div>
    
    <div id="servicesEmptyState" class="text-center py-5 d-none">
      <h3 class="h4" style="color:var(--sp-muted);">No services found.</h3>
      <button class="btn btn-brand mt-3" type="button" id="clearEmptySearchBtn">Clear Search</button>
    </div>

    <div class="row g-4 g-xl-5" data-isotope><div class="col-md-6 col-xl-4 iso-item home" data-service-name="residential-cleaning" data-service-label="Residential Cleaning"><article class="service-card h-100" data-aos="fade-up" data-aos-delay="0">
  <a class="stretched-link" href="service-details.html?service=residential-cleaning" aria-label="Residential Cleaning details"></a>
  <div class="service-media"><img src="assets/images/services/living-room-cleaning.webp" width="600" height="400" loading="lazy" alt="Residential Cleaning in progress"></div>
  <div class="service-body">
    <span class="service-icon"><i class="bi bi-house-heart" aria-hidden="true"></i></span>
    <h3 class="h5">Residential Cleaning</h3>`;

if (content.includes('<span class="service-icon"><i class="bi bi-house-heart" aria-hidden="true"></i></span>')) {
  // We can just use string replace with substring matching
  const index = content.indexOf('<nav class="page-crumb" aria-label="Breadcrumb">');
  const indexEnd = content.indexOf('<h3 class="h5">Residential Cleaning</h3>') + '<h3 class="h5">Residential Cleaning</h3>'.length;
  
  const extracted = content.substring(index, indexEnd);
  content = content.replace(extracted, fixedMarkup);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed services.html properly');
} else {
  console.log('Could not find the target string');
}
