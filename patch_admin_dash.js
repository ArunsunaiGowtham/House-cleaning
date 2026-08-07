const fs = require('fs');

let dash = 'assets/js/dashboard.js';
let content = fs.readFileSync(dash, 'utf8');

const adminLogic = `
    // --- 15. ADMIN DASHBOARD RENDERING & MODALS ---
    const renderAdminDashboard = () => {
      if(typeof SP_AUTH === 'undefined') return;
      
      const allBookings = SP_AUTH.getBookings();
      const allUsers = SP_AUTH.getUsers().filter(u => u.role !== 'admin');
      const allCleaners = SP_AUTH.getCleaners ? SP_AUTH.getCleaners() : [];

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
               const name = user ? (user.fullName || (user.firstName + ' ' + user.lastName) || 'Unknown') : "Unknown";
               tbody.innerHTML += \`
                <tr>
                  <td>\${b.id}</td>
                  <td>\${name}</td>
                  <td>\${b.service}</td>
                  <td>\${b.date}</td>
                  <td>$\${b.price}</td>
                  <td><span class="status-pill ok">\${b.status}</span></td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-outline-brand" data-admin-view-booking="\${b.id}">View</button>
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
               const name = u.fullName || (u.firstName + ' ' + u.lastName) || 'Unknown';
               adminUsersList.innerHTML += \`
                <tr>
                  <td>\${name}</td>
                  <td>\${u.email}</td>
                  <td>\${u.phone || 'N/A'}</td>
                  <td>\${bookings}</td>
                  <td>Active</td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-outline-brand" data-admin-view-customer="\${u.id}">View</button>
                  </td>
                </tr>
              \`;
            });
         }
      }

      const cleanersTbody = document.querySelector('a[href="add-cleaner.html"]') ? document.querySelector('.table tbody') : null;
      if (cleanersTbody) {
         if (allCleaners.length === 0) {
            cleanersTbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">No cleaners found.</td></tr>';
         } else {
            cleanersTbody.innerHTML = '';
            allCleaners.forEach(c => {
               cleanersTbody.innerHTML += \`
                <tr>
                  <td>
                    <div class="d-flex align-items-center gap-2">
                       <div class="avatar-sm d-flex align-items-center justify-content-center rounded-circle" style="background:var(--sp-brand);color:#fff;width:36px;height:36px;">\${c.name.charAt(0)}</div>
                       <span><strong style="color:var(--sp-ink)">\${c.name}</strong><small class="d-block" style="color:var(--sp-muted)">\${c.role}</small></span>
                    </div>
                  </td>
                  <td>\${c.area}</td>
                  <td>\${c.rating}</td>
                  <td>\${c.jobs}</td>
                  <td>\${c.hours}</td>
                  <td><span class="status-pill ok">\${c.status}</span></td>
                </tr>
               \`;
            });
         }
      }

      if(typeof updateKPIs === 'function') updateKPIs();
    };

    // Inject Modals into DOM
    if(!document.getElementById('adminModalsWrapper')) {
       const wrapper = document.createElement('div');
       wrapper.id = 'adminModalsWrapper';
       wrapper.innerHTML = \`
         <!-- Admin New Booking Modal -->
         <div class="modal fade" id="adminNewBookingModal" tabindex="-1" aria-hidden="true">
           <div class="modal-dialog">
             <form class="modal-content needs-validation" id="adminNewBookingForm" novalidate>
               <div class="modal-header">
                 <h2 class="modal-title fs-5">New Booking</h2>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body">
                 <div class="row g-3">
                   <div class="col-12">
                     <label class="form-label">Customer Email</label>
                     <input type="email" class="form-control" id="nbCustomer" required>
                   </div>
                   <div class="col-12">
                     <label class="form-label">Service</label>
                     <select class="form-select" id="nbService" required>
                        <option value="Regular Cleaning">Regular Cleaning</option>
                        <option value="Deep Cleaning">Deep Cleaning</option>
                        <option value="Move In/Out Cleaning">Move In/Out Cleaning</option>
                     </select>
                   </div>
                   <div class="col-sm-6">
                     <label class="form-label">Date</label>
                     <input type="date" class="form-control" id="nbDate" required>
                   </div>
                   <div class="col-sm-6">
                     <label class="form-label">Time</label>
                     <input type="time" class="form-control" id="nbTime" required>
                   </div>
                   <div class="col-12">
                     <label class="form-label">Address</label>
                     <input type="text" class="form-control" id="nbAddress" required>
                   </div>
                   <div class="col-12">
                     <label class="form-label">Notes</label>
                     <textarea class="form-control" id="nbNotes"></textarea>
                   </div>
                 </div>
               </div>
               <div class="modal-footer">
                 <button class="btn btn-outline-brand" type="button" data-bs-dismiss="modal">Cancel</button>
                 <button class="btn btn-brand" type="submit">Save Booking</button>
               </div>
             </form>
           </div>
         </div>

         <!-- Admin Add Cleaner Modal -->
         <div class="modal fade" id="adminAddCleanerModal" tabindex="-1" aria-hidden="true">
           <div class="modal-dialog">
             <form class="modal-content needs-validation" id="adminAddCleanerForm" novalidate>
               <div class="modal-header">
                 <h2 class="modal-title fs-5">Add Cleaner</h2>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body">
                 <div class="row g-3">
                   <div class="col-12">
                     <label class="form-label">Full Name</label>
                     <input type="text" class="form-control" id="ncName" required>
                   </div>
                   <div class="col-12">
                     <label class="form-label">Email</label>
                     <input type="email" class="form-control" id="ncEmail" required>
                   </div>
                   <div class="col-12">
                     <label class="form-label">Phone</label>
                     <input type="tel" class="form-control" id="ncPhone" required>
                   </div>
                   <div class="col-12">
                     <label class="form-label">Area</label>
                     <input type="text" class="form-control" id="ncArea" required>
                   </div>
                   <div class="col-sm-6">
                     <label class="form-label">Role</label>
                     <select class="form-select" id="ncRole" required>
                        <option value="Cleaner">Cleaner</option>
                        <option value="Supervisor">Supervisor</option>
                     </select>
                   </div>
                   <div class="col-sm-6">
                     <label class="form-label">Status</label>
                     <select class="form-select" id="ncStatus" required>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                     </select>
                   </div>
                 </div>
               </div>
               <div class="modal-footer">
                 <button class="btn btn-outline-brand" type="button" data-bs-dismiss="modal">Cancel</button>
                 <button class="btn btn-brand" type="submit">Add Cleaner</button>
               </div>
             </form>
           </div>
         </div>

         <!-- Admin View Booking Modal -->
         <div class="modal fade" id="adminViewBookingModal" tabindex="-1" aria-hidden="true">
           <div class="modal-dialog">
             <div class="modal-content">
               <div class="modal-header">
                 <h2 class="modal-title fs-5">Booking Details</h2>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body" id="adminViewBookingContent"></div>
               <div class="modal-footer" id="adminViewBookingFooter"></div>
             </div>
           </div>
         </div>

         <!-- Admin View Customer Modal -->
         <div class="modal fade" id="adminViewCustomerModal" tabindex="-1" aria-hidden="true">
           <div class="modal-dialog">
             <div class="modal-content">
               <div class="modal-header">
                 <h2 class="modal-title fs-5">Customer Details</h2>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body" id="adminViewCustomerContent"></div>
               <div class="modal-footer" id="adminViewCustomerFooter"></div>
             </div>
           </div>
         </div>
       \`;
       document.body.appendChild(wrapper);
    }

    // Modal Form Submits
    document.addEventListener("submit", (e) => {
       if (e.target.id === 'adminNewBookingForm') {
          e.preventDefault();
          const form = e.target;
          form.classList.add('was-validated');
          if(!form.checkValidity()) return;
          
          if(typeof SP_AUTH !== 'undefined') {
             const email = document.getElementById('nbCustomer').value;
             let user = SP_AUTH.getUsers().find(u => u.email === email);
             // If user doesn't exist, create a temporary one for the booking (real system would require full registration or handle this gracefully)
             if(!user) {
                user = {id: "U-"+Math.random().toString(36).substr(2,9), email: email, fullName: "New Customer", role: "customer"};
                let users = SP_AUTH.getUsers();
                users.push(user);
                localStorage.setItem('sparklepro_users', JSON.stringify(users));
             }
             
             SP_AUTH.createBooking({
                userId: user.id,
                service: document.getElementById('nbService').value,
                date: document.getElementById('nbDate').value,
                time: document.getElementById('nbTime').value,
                price: "150.00" // Hardcoded generic price for admin side
             });
             
             renderAdminDashboard();
             showGlobalToast("Booking created successfully.");
             bootstrap.Modal.getInstance(document.getElementById('adminNewBookingModal')).hide();
             form.reset();
             form.classList.remove('was-validated');
          }
       }
       else if (e.target.id === 'adminAddCleanerForm') {
          e.preventDefault();
          const form = e.target;
          form.classList.add('was-validated');
          if(!form.checkValidity()) return;
          
          if(typeof SP_AUTH !== 'undefined' && SP_AUTH.addCleaner) {
             SP_AUTH.addCleaner({
                name: document.getElementById('ncName').value,
                email: document.getElementById('ncEmail').value,
                phone: document.getElementById('ncPhone').value,
                area: document.getElementById('ncArea').value,
                role: document.getElementById('ncRole').value,
                status: document.getElementById('ncStatus').value
             });
             
             renderAdminDashboard();
             showGlobalToast("Cleaner added successfully.");
             bootstrap.Modal.getInstance(document.getElementById('adminAddCleanerModal')).hide();
             form.reset();
             form.classList.remove('was-validated');
          }
       }
    });

    // Intercept Links & View Buttons
    document.addEventListener("click", (e) => {
       const newBookingLink = e.target.closest('a[href="add-booking.html"]');
       if (newBookingLink) {
          e.preventDefault();
          bootstrap.Modal.getOrCreateInstance(document.getElementById('adminNewBookingModal')).show();
       }
       
       const addCleanerLink = e.target.closest('a[href="add-cleaner.html"]');
       if (addCleanerLink) {
          e.preventDefault();
          bootstrap.Modal.getOrCreateInstance(document.getElementById('adminAddCleanerModal')).show();
       }

       // View Booking
       const viewBookingBtn = e.target.closest('[data-admin-view-booking]');
       if (viewBookingBtn) {
          const bookingId = viewBookingBtn.dataset.adminViewBooking;
          const allBookings = SP_AUTH.getBookings();
          const booking = allBookings.find(b => b.id === bookingId);
          if (booking) {
             const user = SP_AUTH.getUsers().find(u => u.id === booking.userId);
             const name = user ? (user.fullName || (user.firstName + ' ' + user.lastName) || 'Unknown') : "Unknown";
             const email = user ? user.email : "N/A";
             const phone = user ? (user.phone || "N/A") : "N/A";
             
             document.getElementById('adminViewBookingContent').innerHTML = \`
                <div class="summary-row"><span>Booking ID</span><strong>\${booking.id}</strong></div>
                <div class="summary-row"><span>Customer Name</span><strong>\${name}</strong></div>
                <div class="summary-row"><span>Customer Email</span><strong>\${email}</strong></div>
                <div class="summary-row"><span>Phone</span><strong>\${phone}</strong></div>
                <div class="summary-row"><span>Service</span><strong>\${booking.service}</strong></div>
                <div class="summary-row"><span>Booking Date</span><strong>\${booking.date}</strong></div>
                <div class="summary-row"><span>Booking Time</span><strong>\${booking.time}</strong></div>
                <div class="summary-row"><span>Address</span><strong>\${user ? user.address : 'N/A'}</strong></div>
                <div class="summary-row"><span>Assigned Cleaner</span><strong>Unassigned</strong></div>
                <div class="summary-row"><span>Status</span><strong>\${booking.status}</strong></div>
                <div class="summary-row"><span>Payment Status</span><strong>Pending</strong></div>
                <div class="summary-row"><span>Price</span><strong>$\${booking.price}</strong></div>
                <div class="summary-row"><span>Special Instructions</span><strong>None</strong></div>
             \`;
             
             document.getElementById('adminViewBookingFooter').innerHTML = \`
                <button class="btn btn-outline-brand" type="button" data-bs-dismiss="modal">Close</button>
                <button class="btn btn-outline-brand" type="button" onclick="alert('Demo: Assign cleaner')">Assign Cleaner</button>
                <button class="btn btn-outline-brand" type="button" onclick="alert('Demo: Edit booking')">Edit Booking</button>
                <button class="btn btn-brand" type="button" data-admin-cancel-booking="\${booking.id}">Cancel Booking</button>
             \`;
             bootstrap.Modal.getOrCreateInstance(document.getElementById('adminViewBookingModal')).show();
          }
       }

       // Cancel Booking inside Admin Modal
       const cancelBtn = e.target.closest('[data-admin-cancel-booking]');
       if (cancelBtn) {
          if (confirm('Are you sure you want to cancel this booking?')) {
             const bookingId = cancelBtn.dataset.adminCancelBooking;
             const allBookings = SP_AUTH.getBookings();
             const booking = allBookings.find(b => b.id === bookingId);
             if(booking) {
                booking.status = 'Cancelled';
                localStorage.setItem('sp_bookings', JSON.stringify(allBookings));
                renderAdminDashboard();
                showGlobalToast("Booking cancelled successfully.");
                bootstrap.Modal.getInstance(document.getElementById('adminViewBookingModal')).hide();
             }
          }
       }

       // View Customer
       const viewCustomerBtn = e.target.closest('[data-admin-view-customer]');
       if (viewCustomerBtn) {
          const uId = viewCustomerBtn.dataset.adminViewCustomer;
          const user = SP_AUTH.getUsers().find(u => u.id === uId);
          if (user) {
             const name = user.fullName || (user.firstName + ' ' + user.lastName) || 'Unknown';
             const cBookings = SP_AUTH.getBookingsForUser(uId).length;
             const cInvoices = SP_AUTH.getInvoicesForUser(uId).length;
             const pMethod = user.paymentMethod ? \`Card ending in \${user.paymentMethod.last4}\` : 'None';
             
             document.getElementById('adminViewCustomerContent').innerHTML = \`
                <div class="summary-row"><span>Customer Name</span><strong>\${name}</strong></div>
                <div class="summary-row"><span>Email</span><strong>\${user.email}</strong></div>
                <div class="summary-row"><span>Phone</span><strong>\${user.phone || 'N/A'}</strong></div>
                <div class="summary-row"><span>Address</span><strong>\${user.address || 'N/A'}</strong></div>
                <div class="summary-row"><span>Registration Date</span><strong>N/A</strong></div>
                <div class="summary-row"><span>Bookings</span><strong>\${cBookings}</strong></div>
                <div class="summary-row"><span>Invoices</span><strong>\${cInvoices}</strong></div>
                <div class="summary-row"><span>Payment Method</span><strong>\${pMethod}</strong></div>
                <div class="summary-row"><span>Total Spending</span><strong>$0.00</strong></div>
                <div class="summary-row"><span>Status</span><strong>Active</strong></div>
             \`;
             
             document.getElementById('adminViewCustomerFooter').innerHTML = \`
                <button class="btn btn-outline-brand" type="button" onclick="alert('Demo: Edit customer')">Edit</button>
                <button class="btn btn-outline-danger" type="button" onclick="alert('Demo: Delete customer')">Delete</button>
                <button class="btn btn-brand" type="button" data-bs-dismiss="modal">Close</button>
             \`;
             bootstrap.Modal.getOrCreateInstance(document.getElementById('adminViewCustomerModal')).show();
          }
       }
    });

    renderCustomerDashboard();
    renderAdminDashboard();

  });
})();
`;

const startIndex = content.indexOf('// --- 15. ADMIN DASHBOARD RENDERING ---');
if (startIndex !== -1) {
    content = content.substring(0, startIndex) + adminLogic;
    fs.writeFileSync(dash, content, 'utf8');
    console.log('Successfully injected complete Admin Dashboard synchronization logic.');
} else {
    console.log('Could not find injection point.');
}
