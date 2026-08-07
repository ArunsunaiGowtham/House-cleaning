const fs = require('fs');

let dash = 'assets/js/dashboard.js';
let content = fs.readFileSync(dash, 'utf8');

const engineCode = `
    // --- 14. CUSTOMER DASHBOARD RENDERING ---
    const renderCustomerDashboard = () => {
      if(typeof SP_AUTH === 'undefined') return;
      const currentUser = SP_AUTH.getCurrentUser();
      if(!currentUser) return;

      const cBookings = SP_AUTH.getBookingsForUser(currentUser.id);
      const cInvoices = SP_AUTH.getInvoicesForUser(currentUser.id);

      // Bookings Table
      const bookingsTbody = document.getElementById('cDashBookingsList');
      if (bookingsTbody) {
        if (cBookings.length === 0) {
           bookingsTbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-4">No bookings found.</td></tr>';
        } else {
           bookingsTbody.innerHTML = '';
           cBookings.forEach(b => {
              bookingsTbody.innerHTML += \`
                <tr>
                  <td>\${b.date}<small class="d-block text-muted">\${b.time}</small></td>
                  <td>\${b.service}</td>
                  <td>Unassigned</td>
                  <td><span class="status-pill \${b.status==='Confirmed'?'ok':'pending'}">\${b.status}</span></td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-outline-brand" data-view-booking="\${b.id}">View</button>
                  </td>
                </tr>
              \`;
           });
        }
      }

      // Invoices Table
      const invoicesTbody = document.getElementById('cDashInvoicesList');
      const invoicesPageTbody = document.getElementById('customerInvoicesPageList');
      const renderInvoices = (tbody) => {
        if (cInvoices.length === 0) {
           tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-4">No invoices found.</td></tr>';
        } else {
           tbody.innerHTML = '';
           cInvoices.forEach(i => {
              tbody.innerHTML += \`
                <tr>
                  <td>\${i.id}</td>
                  <td>\${i.service}</td>
                  <td>\${i.date}</td>
                  <td>$\${i.amount}</td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-brand" data-view-invoice="\${i.id}">View</button>
                  </td>
                </tr>
              \`;
           });
        }
      };
      if (invoicesTbody) renderInvoices(invoicesTbody);
      if (invoicesPageTbody) renderInvoices(invoicesPageTbody);

      // Overview Cards
      const nextVisit = document.getElementById('cDashNextVisit');
      if (nextVisit && cBookings.length > 0) {
         nextVisit.textContent = cBookings[0].date;
      }
      const upcoming = document.getElementById('cDashUpcomingBooking');
      if(upcoming && cBookings.length > 0) {
         const b = cBookings[0];
         upcoming.innerHTML = \`
           <div class="summary-row"><span>Service</span><strong>\${b.service}</strong></div>
           <div class="summary-row"><span>Date</span><strong>\${b.date}</strong></div>
           <div class="summary-row"><span>Time</span><strong>\${b.time}</strong></div>
           <div class="mt-4 pt-3 border-top"><button class="btn btn-brand w-100">Reschedule</button></div>
         \`;
      }
      
      const yearToDate = document.getElementById('cDashYearToDate');
      if(yearToDate) {
         let total = cInvoices.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
         yearToDate.textContent = "$" + total.toFixed(2);
      }

      const recentInvoices = document.getElementById('cDashRecentInvoices');
      if(recentInvoices && cInvoices.length > 0) {
         recentInvoices.innerHTML = '';
         cInvoices.slice(0, 3).forEach(i => {
            recentInvoices.innerHTML += \`
              <div class="summary-row"><span>\${i.id} &middot; \${i.service}</span><strong>$\${i.amount}</strong></div>
            \`;
         });
      }
    };

    // --- 15. ADMIN DASHBOARD RENDERING ---
    const renderAdminDashboard = () => {
      if(typeof SP_AUTH === 'undefined') return;
      
      const allBookings = SP_AUTH.getBookings();
      const allUsers = SP_AUTH.getUsers().filter(u => u.role !== 'admin');

      const adminBookings = document.getElementById('adminBookingsList');
      const adminRecentBookings = document.getElementById('adminRecentBookings');
      
      const renderAllBookings = (tbody) => {
         if(!tbody) return;
         if(allBookings.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-4">No bookings found.</td></tr>';
         } else {
            tbody.innerHTML = '';
            allBookings.forEach(b => {
               const user = SP_AUTH.getUsers().find(u => u.id === b.userId);
               const name = user ? user.fullName : "Unknown";
               tbody.innerHTML += \`
                <tr>
                  <td>\${b.id}</td>
                  <td>\${name}</td>
                  <td>\${b.service}</td>
                  <td>\${b.date}</td>
                  <td>$\${b.price}</td>
                  <td><span class="status-pill ok">\${b.status}</span></td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-outline-brand">View</button>
                  </td>
                </tr>
              \`;
            });
         }
      };
      renderAllBookings(adminBookings);
      renderAllBookings(adminRecentBookings);

      const adminUsersList = document.getElementById('adminUsersList');
      if (adminUsersList) {
         if (allUsers.length === 0) {
            adminUsersList.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">No customers found.</td></tr>';
         } else {
            adminUsersList.innerHTML = '';
            allUsers.forEach(u => {
               const bookings = SP_AUTH.getBookingsForUser(u.id).length;
               adminUsersList.innerHTML += \`
                <tr>
                  <td>\${u.fullName}</td>
                  <td>\${u.email}</td>
                  <td>\${u.phone || 'N/A'}</td>
                  <td>\${bookings}</td>
                  <td>Active</td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-outline-brand">View</button>
                  </td>
                </tr>
              \`;
            });
         }
      }
    };

    renderCustomerDashboard();
    renderAdminDashboard();

  });
})();
`;

const startIndex = content.indexOf('// --- 14. DYNAMIC TABLE POPULATION ---');
if (startIndex !== -1) {
    content = content.substring(0, startIndex) + engineCode;
    fs.writeFileSync(dash, content, 'utf8');
    console.log('Successfully injected dashboard rendering engine.');
} else {
    console.log('Could not find injection point.');
}

