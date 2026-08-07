const fs = require('fs');
const dashboard = fs.readFileSync('customer-dashboard.html', 'utf8');

const headAndHeader = dashboard.substring(0, dashboard.indexOf('<main id="main">'));
const footerAndScripts = dashboard.substring(dashboard.indexOf('<footer class="site-footer">'));

const newMain = `
<main id="main">
<section class="page-hero">
  <div class="container">
    <p class="eyebrow" data-aos="fade-up">SparklePro</p>
    <h1 data-aos="fade-up" data-aos-delay="60">My Invoices</h1>
    <p class="lead" data-aos="fade-up" data-aos-delay="120">View and manage your past and upcoming invoices.</p>
  </div>
  <div class="hero-blob" aria-hidden="true"></div>
</section>
<nav class="page-crumb" aria-label="Breadcrumb">
  <ol class="breadcrumb container mb-0">
    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
    <li class="breadcrumb-item"><a href="customer-dashboard.html">Dashboard</a></li>
    <li class="breadcrumb-item active" aria-current="page">My Invoices</li>
  </ol>
</nav>

<section class="section">
  <div class="container">
    <div class="dash-panel">
      <div class="row g-3 mb-4 align-items-center">
        <div class="col-md-6 col-lg-4">
          <label class="visually-hidden" for="invoiceSearch">Search invoices</label>
          <div class="input-group">
            <span class="input-group-text bg-transparent"><i class="bi bi-search"></i></span>
            <input type="search" class="form-control" id="invoiceSearch" placeholder="Search invoice or service...">
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <label class="visually-hidden" for="invoiceFilter">Filter by status</label>
          <select class="form-select" id="invoiceFilter">
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      <div class="table-responsive">
        <table class="table table-hover" id="invoicesTable">
          <thead>
            <tr>
              <th scope="col">Invoice Number</th>
              <th scope="col">Booking ID</th>
              <th scope="col">Service</th>
              <th scope="col">Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Payment Status</th>
              <th scope="col">Invoice Status</th>
              <th scope="col"><span class="visually-hidden">Actions</span></th>
            </tr>
          </thead>
          <tbody id="invoiceTableBody">
            <!-- Invoices will be injected here -->
          </tbody>
        </table>
        <div id="invoiceEmptyState" class="text-center py-5 d-none">
          <p class="mb-0" style="color:var(--sp-muted);">No invoices found matching your criteria.</p>
        </div>
      </div>

      <nav class="mt-4" aria-label="Invoices pagination" id="invoicePaginationNav">
        <ul class="pagination justify-content-center mb-0" id="invoicePagination">
          <!-- Pagination will be injected here -->
        </ul>
      </nav>
      
    </div>
  </div>
</section>

<!-- Reusing Invoice View Modal -->
<div class="modal fade" id="invoiceModal" tabindex="-1" aria-labelledby="invoiceModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title fs-5" id="invoiceModalLabel">Invoice details</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="invoiceModalContent">
        <!-- Will be populated by JS -->
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline-brand" type="button" data-bs-dismiss="modal">Close</button>
        <button class="btn btn-brand" type="button" id="invoiceModalDownloadBtn" onclick="alert('Downloading PDF!')">Download PDF</button>
      </div>
    </div>
  </div>
</div>
</main>
`;

let newHtml = headAndHeader + newMain + footerAndScripts;

// Update title and description
newHtml = newHtml.replace('<title>Customer Dashboard | SparklePro</title>', '<title>My Invoices | SparklePro</title>');
newHtml = newHtml.replace('<meta name="description" content="Manage your SparklePro bookings, invoices, crew tracking, messages and account preferences in one place.">', '<meta name="description" content="View all your SparklePro cleaning service invoices in one place.">');
newHtml = newHtml.replace('content="Customer Dashboard | SparklePro"', 'content="My Invoices | SparklePro"');

// Add the customer-invoices.js script before closing body
newHtml = newHtml.replace('</body>', '<script src="assets/js/customer-invoices.js" defer></script>\n</body>');

fs.writeFileSync('customer-invoices.html', newHtml);
console.log('Successfully created customer-invoices.html');
