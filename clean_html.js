const fs = require('fs');
const path = require('path');

function replaceBetween(file, startMark, endMark, replacement) {
    let content = fs.readFileSync(file, 'utf8');
    const startIdx = content.indexOf(startMark);
    if (startIdx === -1) {
       console.log(`Failed to find start mark in ${file}`);
       return;
    }
    const endIdx = content.indexOf(endMark, startIdx + startMark.length);
    if (endIdx === -1) {
       console.log(`Failed to find end mark in ${file}`);
       return;
    }
    const newContent = content.substring(0, startIdx + startMark.length) + replacement + content.substring(endIdx);
    fs.writeFileSync(file, newContent, 'utf8');
}

// 1. customer-dashboard.html
let cDash = 'customer-dashboard.html';
// Bookings Table
replaceBetween(cDash, '<table class="table">\n                  <caption class="visually-hidden">Booking history</caption>\n                  <thead>\n                    <tr>\n                      <th>Date</th>\n                      <th>Service</th>\n                      <th>Team</th>\n                      <th>Status</th>\n                      <th class="text-end">Actions</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n', '                  </tbody>\n                </table>', '                    <tr id="cDashNoBookings"><td colspan="5" class="text-center text-muted py-4">No bookings found.</td></tr>\n');

// Invoices Table
replaceBetween(cDash, '<table class="table">\n                  <caption class="visually-hidden">Invoices</caption>\n                  <thead>\n                    <tr>\n                      <th>Invoice</th>\n                      <th>Service</th>\n                      <th>Date</th>\n                      <th>Amount</th>\n                      <th class="text-end">Actions</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n', '                  </tbody>\n                </table>', '                    <tr id="cDashNoInvoices"><td colspan="5" class="text-center text-muted py-4">No invoices found.</td></tr>\n');

// Overview Cards - Upcoming booking
let cDashContent = fs.readFileSync(cDash, 'utf8');
cDashContent = cDashContent.replace(/<div class="dash-panel">\s*<h2 class="mb-3">Upcoming booking<\/h2>[\s\S]*?<div class="mt-4 pt-3 border-top">[\s\S]*?<\/div>\s*<\/div>/, `<div class="dash-panel">
                  <h2 class="mb-3">Upcoming booking</h2>
                  <div id="cDashUpcomingBooking">
                    <p class="text-muted mb-0">No upcoming bookings.</p>
                  </div>
                </div>`);

// Quick stats
cDashContent = cDashContent.replace(/<h2 class="h6 mb-3">Next visit<\/h2>\s*<p class="kpi-value mb-0">\d+ Aug<\/p>/, `<h2 class="h6 mb-3">Next visit</h2>\n                    <p class="kpi-value mb-0" id="cDashNextVisit">-</p>`);
cDashContent = cDashContent.replace(/<h2 class="h6 mb-3">Unread messages<\/h2>\s*<p class="kpi-value mb-0">\d+<\/p>/, `<h2 class="h6 mb-3">Unread messages</h2>\n                    <p class="kpi-value mb-0" id="cDashUnreadMessages">0</p>`);
cDashContent = cDashContent.replace(/<h2 class="h6 mb-3">Year to date<\/h2>\s*<p class="kpi-value mb-0">\$[\d,]+<\/p>/, `<h2 class="h6 mb-3">Year to date</h2>\n                    <p class="kpi-value mb-0" id="cDashYearToDate">$0.00</p>`);

// Recent Invoices
cDashContent = cDashContent.replace(/<div class="dash-panel h-100">\s*<div class="d-flex align-items-center justify-content-between mb-4">\s*<h2 class="mb-0">Recent invoices<\/h2>[\s\S]*?<\/div>[\s\S]*?<\/div>\s*<\/div>/, `<div class="dash-panel h-100">
                  <div class="d-flex align-items-center justify-content-between mb-4">
                    <h2 class="mb-0">Recent invoices</h2><a class="btn btn-sm btn-outline-brand"
                      href="customer-invoices.html">View all invoices</a>
                  </div>
                  <div id="cDashRecentInvoices">
                    <p class="text-muted">No invoices found.</p>
                  </div>
                </div>
              </div>`);

// Messages List
cDashContent = cDashContent.replace(/<div class="col-lg-4">\s*<div class="dash-panel h-100 p-0">\s*<div class="list-group list-group-flush border-0">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<div class="col-lg-8">\s*<div class="dash-panel h-100 d-flex flex-column">[\s\S]*?<\/div>\s*<\/div>/, `<div class="col-lg-4">
                <div class="dash-panel h-100 p-0">
                  <div class="list-group list-group-flush border-0" id="cDashMessageList">
                     <div class="p-4 text-muted">No messages found.</div>
                  </div>
                </div>
              </div>
              <div class="col-lg-8">
                <div class="dash-panel h-100 d-flex flex-column" id="cDashMessageThread">
                   <div class="p-4 text-muted">Select a message to read.</div>
                </div>
              </div>`);

fs.writeFileSync(cDash, cDashContent, 'utf8');

// 2. admin/dashboard.html
let aDash = 'admin/dashboard.html';
let aDashContent = fs.readFileSync(aDash, 'utf8');
aDashContent = aDashContent.replace(/<tbody>[\s\S]*?<\/tbody>/, `<tbody id="adminRecentBookings">\n                    <tr><td colspan="6" class="text-center text-muted py-4">No recent bookings.</td></tr>\n                  </tbody>`);
fs.writeFileSync(aDash, aDashContent, 'utf8');

// 3. admin/bookings.html
let aBookings = 'admin/bookings.html';
let aBookingsContent = fs.readFileSync(aBookings, 'utf8');
aBookingsContent = aBookingsContent.replace(/<tbody>[\s\S]*?<\/tbody>/, `<tbody id="adminBookingsList">\n                    <tr><td colspan="7" class="text-center text-muted py-4">No bookings found.</td></tr>\n                  </tbody>`);
fs.writeFileSync(aBookings, aBookingsContent, 'utf8');

// 4. admin/users.html
let aUsers = 'admin/users.html';
let aUsersContent = fs.readFileSync(aUsers, 'utf8');
aUsersContent = aUsersContent.replace(/<tbody>[\s\S]*?<\/tbody>/, `<tbody id="adminUsersList">\n                    <tr><td colspan="6" class="text-center text-muted py-4">No users found.</td></tr>\n                  </tbody>`);
fs.writeFileSync(aUsers, aUsersContent, 'utf8');

// 5. customer-invoices.html
let cInvoices = 'customer-invoices.html';
let cInvoicesContent = fs.readFileSync(cInvoices, 'utf8');
cInvoicesContent = cInvoicesContent.replace(/<tbody>[\s\S]*?<\/tbody>/, `<tbody id="customerInvoicesPageList">\n                    <tr><td colspan="6" class="text-center text-muted py-4">No invoices found.</td></tr>\n                  </tbody>`);
fs.writeFileSync(cInvoices, cInvoicesContent, 'utf8');

console.log("HTML patches applied.");
