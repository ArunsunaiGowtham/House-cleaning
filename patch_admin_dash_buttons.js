const fs = require('fs');

let dash = 'assets/js/dashboard.js';
let content = fs.readFileSync(dash, 'utf8');

const additionalAdminLogic = `
    // Extra Admin Operations (Assign, Edit, Delete)
    document.addEventListener("click", (e) => {
       // Assign Cleaner
       const assignBtn = e.target.closest('[data-admin-assign-cleaner]');
       if (assignBtn) {
          const bookingId = assignBtn.dataset.adminAssignCleaner;
          const allBookings = SP_AUTH.getBookings();
          const booking = allBookings.find(b => b.id === bookingId);
          if (booking) {
             const allCleaners = SP_AUTH.getCleaners ? SP_AUTH.getCleaners() : [];
             const cleanerNames = allCleaners.map(c => c.name).join(', ');
             const newCleaner = prompt(\`Assign a cleaner (Available: \${cleanerNames || 'None yet'}):\`, 'Amelia Hart');
             if (newCleaner !== null) {
                booking.cleanerAssigned = newCleaner;
                localStorage.setItem('sp_bookings', JSON.stringify(allBookings));
                renderAdminDashboard();
                showGlobalToast("Cleaner assigned successfully.");
                bootstrap.Modal.getInstance(document.getElementById('adminViewBookingModal')).hide();
             }
          }
       }

       // Edit Booking
       const editBookingBtn = e.target.closest('[data-admin-edit-booking]');
       if (editBookingBtn) {
          const bookingId = editBookingBtn.dataset.adminEditBooking;
          const allBookings = SP_AUTH.getBookings();
          const booking = allBookings.find(b => b.id === bookingId);
          if (booking) {
             const newDate = prompt('Edit Booking Date (YYYY-MM-DD or DD/MM/YYYY):', booking.date);
             if (newDate !== null) {
                const newTime = prompt('Edit Booking Time (e.g. 09:00 AM):', booking.time || '');
                if (newTime !== null) {
                   booking.date = newDate;
                   booking.time = newTime;
                   localStorage.setItem('sp_bookings', JSON.stringify(allBookings));
                   renderAdminDashboard();
                   showGlobalToast("Booking updated successfully.");
                   bootstrap.Modal.getInstance(document.getElementById('adminViewBookingModal')).hide();
                }
             }
          }
       }

       // Edit Customer
       const editCustomerBtn = e.target.closest('[data-admin-edit-customer]');
       if (editCustomerBtn) {
          const uId = editCustomerBtn.dataset.adminEditCustomer;
          let users = SP_AUTH.getUsers();
          const user = users.find(u => u.id === uId);
          if (user) {
             const newName = prompt('Edit Customer Name:', user.fullName || (user.firstName + ' ' + user.lastName) || '');
             if (newName !== null) {
                const newPhone = prompt('Edit Customer Phone:', user.phone || '');
                if (newPhone !== null) {
                   user.fullName = newName;
                   user.phone = newPhone;
                   localStorage.setItem('sparklepro_users', JSON.stringify(users));
                   renderAdminDashboard();
                   showGlobalToast("Customer updated successfully.");
                   bootstrap.Modal.getInstance(document.getElementById('adminViewCustomerModal')).hide();
                }
             }
          }
       }

       // Delete Customer
       const deleteCustomerBtn = e.target.closest('[data-admin-delete-customer]');
       if (deleteCustomerBtn) {
          const uId = deleteCustomerBtn.dataset.adminDeleteCustomer;
          if (confirm('Are you absolutely sure you want to delete this customer? This action cannot be undone.')) {
             let users = SP_AUTH.getUsers();
             users = users.filter(u => u.id !== uId);
             localStorage.setItem('sparklepro_users', JSON.stringify(users));
             
             renderAdminDashboard();
             showGlobalToast("Customer deleted successfully.");
             bootstrap.Modal.getInstance(document.getElementById('adminViewCustomerModal')).hide();
          }
       }
    });

`;

content = content.replace(
    \`<button class="btn btn-outline-brand" type="button" onclick="alert('Demo: Assign cleaner')">Assign Cleaner</button>
                <button class="btn btn-outline-brand" type="button" onclick="alert('Demo: Edit booking')">Edit Booking</button>\`,
    \`<button class="btn btn-outline-brand" type="button" data-admin-assign-cleaner="\\\${booking.id}">Assign Cleaner</button>
                <button class="btn btn-outline-brand" type="button" data-admin-edit-booking="\\\${booking.id}">Edit Booking</button>\`
);

content = content.replace(
    \`<button class="btn btn-outline-brand" type="button" onclick="alert('Demo: Edit customer')">Edit</button>
                <button class="btn btn-outline-danger" type="button" onclick="alert('Demo: Delete customer')">Delete</button>\`,
    \`<button class="btn btn-outline-brand" type="button" data-admin-edit-customer="\\\${uId}">Edit</button>
                <button class="btn btn-outline-danger" type="button" data-admin-delete-customer="\\\${uId}">Delete</button>\`
);

content = content.replace('    renderCustomerDashboard();', additionalAdminLogic + '\\n    renderCustomerDashboard();');

fs.writeFileSync(dash, content, 'utf8');
console.log('Fixed the Admin buttons to be fully functional.');
