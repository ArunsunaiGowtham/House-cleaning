const fs = require('fs');

let cDash = 'customer-dashboard.html';
let cDashContent = fs.readFileSync(cDash, 'utf8');

cDashContent = cDashContent.replace(/<table class="table">\s*<caption class="visually-hidden">Booking history<\/caption>[\s\S]*?<tbody>[\s\S]*?<\/tbody>/, `<table class="table">\n                  <caption class="visually-hidden">Booking history</caption>\n                  <thead>\n                    <tr>\n                      <th scope="col">Date</th>\n                      <th scope="col">Service</th>\n                      <th scope="col">Team</th>\n                      <th scope="col">Status</th>\n                      <th scope="col" class="text-end">Actions</th>\n                    </tr>\n                  </thead>\n                  <tbody id="cDashBookingsList">\n                    <tr id="cDashNoBookings"><td colspan="5" class="text-center text-muted py-4">No bookings found.</td></tr>\n                  </tbody>`);

cDashContent = cDashContent.replace(/<table class="table">\s*<caption class="visually-hidden">Invoices<\/caption>[\s\S]*?<tbody>[\s\S]*?<\/tbody>/, `<table class="table">\n                  <caption class="visually-hidden">Invoices</caption>\n                  <thead>\n                    <tr>\n                      <th scope="col">Invoice</th>\n                      <th scope="col">Service</th>\n                      <th scope="col">Date</th>\n                      <th scope="col">Amount</th>\n                      <th scope="col" class="text-end">Actions</th>\n                    </tr>\n                  </thead>\n                  <tbody id="cDashInvoicesList">\n                    <tr id="cDashNoInvoices"><td colspan="5" class="text-center text-muted py-4">No invoices found.</td></tr>\n                  </tbody>`);

fs.writeFileSync(cDash, cDashContent, 'utf8');
console.log('Fixed customer dashboard tables.');
