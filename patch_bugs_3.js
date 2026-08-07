const fs = require('fs');

let dash = 'assets/js/dashboard.js';
let content = fs.readFileSync(dash, 'utf8');

const updatedBookingsLogic = `    /* 2. & 7. Bookings Section */
    document.addEventListener("click", (e) => {
      const button = e.target.closest("[data-view-booking]");
      if (button) {
        const bookingId = button.dataset.viewBooking;
        const modalContent = document.getElementById("bookingDetailsContent");
        const modalFooter = modalContent?.closest('.modal-content')?.querySelector('.modal-footer');
        if (!modalContent) return;

        let allBookings = [];
        let currUser = null;
        let allInvoices = [];
        if(typeof SP_AUTH !== 'undefined') {
            allBookings = SP_AUTH.getBookings();
            currUser = SP_AUTH.getCurrentUser();
            allInvoices = SP_AUTH.getInvoices();
        }

        const booking = allBookings.find(b => b.id === bookingId);
        if (!booking) {
            modalContent.innerHTML = '<p class="text-muted">No bookings found.</p>';
            if(modalFooter) modalFooter.innerHTML = '<button class="btn btn-brand" type="button" data-bs-dismiss="modal">Close</button>';
        } else {
            const customerName = currUser ? currUser.fullName : "Customer";
            const customerEmail = currUser ? currUser.email : "email@example.com";
            const address = currUser ? currUser.address : "N/A";
            const invoice = allInvoices.find(i => i.id === booking.invoiceId);
            const pStatus = invoice ? invoice.status : "Pending";
            
            modalContent.innerHTML = \`
                <div class="summary-row"><span>Booking ID</span><strong>\${booking.id}</strong></div>
                <div class="summary-row"><span>Customer Name</span><strong>\${customerName}</strong></div>
                <div class="summary-row"><span>Customer Email</span><strong>\${customerEmail}</strong></div>
                <div class="summary-row"><span>Service</span><strong>\${booking.service}</strong></div>
                <div class="summary-row"><span>Booking Date</span><strong>\${booking.date}</strong></div>
                <div class="summary-row"><span>Booking Time</span><strong>\${booking.time || 'N/A'}</strong></div>
                <div class="summary-row"><span>Property Address</span><strong>\${address}</strong></div>
                <div class="summary-row"><span>Cleaner Assigned</span><strong>Unassigned</strong></div>
                <div class="summary-row"><span>Status</span><strong>\${booking.status}</strong></div>
                <div class="summary-row"><span>Price</span><strong>$\${booking.price}</strong></div>
                <div class="summary-row"><span>Special Instructions</span><strong>None</strong></div>
                <div class="summary-row"><span>Payment Status</span><strong>\${pStatus}</strong></div>
            \`;
            
            let footerHtml = '<button class="btn btn-outline-brand" type="button" data-bs-dismiss="modal">Close</button>';
            if(invoice) {
               footerHtml += \`<button class="btn btn-brand" data-download-invoice="\${invoice.id}">Download Invoice</button>\`;
            }
            if(booking.status !== 'Cancelled') {
               footerHtml += \`
                 <button class="btn btn-outline-brand" data-bs-toggle="modal" data-bs-target="#rescheduleModal" data-booking="\${booking.id}">Reschedule</button>
                 <button class="btn btn-outline-danger" data-cancel-booking="\${booking.id}">Cancel Booking</button>
               \`;
            }
            if(modalFooter) modalFooter.innerHTML = footerHtml;
        }
        bootstrap.Modal.getOrCreateInstance(document.getElementById("bookingDetailsModal")).show();
      }
    });

    document.addEventListener("click", (e) => {
       const cancelBtn = e.target.closest("[data-cancel-booking]");
       if (cancelBtn) {
         if (confirm(\`Are you sure you want to cancel booking \${cancelBtn.dataset.cancelBooking}?\`)) {
            // Update booking in localStorage
            if(typeof SP_AUTH !== 'undefined') {
                const allBookings = SP_AUTH.getBookings();
                const booking = allBookings.find(b => b.id === cancelBtn.dataset.cancelBooking);
                if(booking) {
                    booking.status = 'Cancelled';
                    localStorage.setItem('sp_bookings', JSON.stringify(allBookings));
                    if(typeof renderCustomerDashboard !== 'undefined') renderCustomerDashboard();
                }
            }
            showAlert("bookingActionAlert", \`Booking \${cancelBtn.dataset.cancelBooking} has been cancelled in this demo.\`);
            bootstrap.Modal.getInstance(document.getElementById("bookingDetailsModal"))?.hide();
         }
       }
    });

    document.getElementById("rescheduleModal")?.addEventListener("show.bs.modal", (event) => {
      const booking = event.relatedTarget?.dataset.booking || "BK-4821";
      const idEl = document.getElementById("rescheduleBookingId");
      if (idEl) idEl.textContent = booking;
      const successEl = document.getElementById("rescheduleSuccess");
      if (successEl) successEl.hidden = true;
      document.getElementById("rescheduleForm")?.classList.remove("was-validated");
    });

    document.getElementById("rescheduleForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      form.classList.add("was-validated");
      if (!form.checkValidity()) return;
      
      const successEl = document.getElementById("rescheduleSuccess");
      if (successEl) successEl.hidden = false;
      
      const bookingId = document.getElementById("rescheduleBookingId")?.textContent;
      
      if(typeof SP_AUTH !== 'undefined') {
          const allBookings = SP_AUTH.getBookings();
          const booking = allBookings.find(b => b.id === bookingId);
          if(booking) {
              const newDateInput = document.getElementById("rescheduleDate").value;
              const newTimeInput = document.getElementById("rescheduleTime").value;
              const d = new Date(newDateInput);
              booking.date = !isNaN(d.getTime()) ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : newDateInput;
              booking.time = newTimeInput;
              localStorage.setItem('sp_bookings', JSON.stringify(allBookings));
              if(typeof renderCustomerDashboard !== 'undefined') renderCustomerDashboard();
          }
      }

      showAlert("bookingActionAlert", \`Booking \${bookingId} has been rescheduled in this demo.\`);
      
      setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(document.getElementById("rescheduleModal"));
        if (modal) modal.hide();
      }, 1000);
    });

`;

const bookingsStart = content.indexOf('/* 2. & 7. Bookings Section */');
const invoicesStart = content.indexOf('/* 3. Invoices Tab (Dynamic Event Delegation) */');

content = content.substring(0, bookingsStart) + updatedBookingsLogic + '\n' + content.substring(invoicesStart);

const invoicesLogic2 = `    /* 3. Invoices Tab (Dynamic Event Delegation) */
    const downloadInvoiceFn = (invId) => {
      const content = \`Invoice ID: \${invId}\\nThis is a static HTML demo file for \${invId}.\`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = \`Invoice-\${invId}.pdf\`;
      a.click();
      URL.revokeObjectURL(url);
    };

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-view-invoice]');
      if (btn) {
        const invId = btn.dataset.viewInvoice;
        const modalContent = document.getElementById('invoiceModalContent');
        const modalFooter = modalContent?.closest('.modal-content')?.querySelector('.modal-footer');
        if (!modalContent) return;
        
        let allInvoices = [];
        let allBookings = [];
        let currUser = null;
        if(typeof SP_AUTH !== 'undefined') {
            allInvoices = SP_AUTH.getInvoices();
            allBookings = SP_AUTH.getBookings();
            currUser = SP_AUTH.getCurrentUser();
        }
        
        const invoice = allInvoices.find(i => i.id === invId);
        if (!invoice) {
           modalContent.innerHTML = '<p class="text-muted">No invoices found.</p>';
           if(modalFooter) modalFooter.innerHTML = '<button class="btn btn-brand" type="button" data-bs-dismiss="modal">Close</button>';
        } else {
           const booking = allBookings.find(b => b.invoiceId === invoice.id) || {};
           const customerName = currUser ? currUser.fullName : "Customer";
           const customerEmail = currUser ? currUser.email : "email@example.com";
           const address = currUser ? currUser.address : "N/A";
           const pMethod = currUser && currUser.paymentMethod ? \`****\${currUser.paymentMethod.last4}\` : 'None';
           
           const amount = parseFloat(invoice.amount) || 0;
           const tax = amount * 0.08;
           const discount = 0;
           const subtotal = amount - tax;

           modalContent.innerHTML = \`
            <div class="summary-row"><span>Invoice Number</span><strong>\${invoice.id}</strong></div>
            <div class="summary-row"><span>Booking ID</span><strong>\${booking.id || 'N/A'}</strong></div>
            <div class="summary-row"><span>Customer Name</span><strong>\${customerName}</strong></div>
            <div class="summary-row"><span>Customer Email</span><strong>\${customerEmail}</strong></div>
            <div class="summary-row"><span>Service</span><strong>\${invoice.service}</strong></div>
            <div class="summary-row"><span>Booking Date</span><strong>\${invoice.date}</strong></div>
            <div class="summary-row"><span>Address</span><strong>\${address}</strong></div>
            <div class="summary-row"><span>Subtotal</span><strong>$\${subtotal.toFixed(2)}</strong></div>
            <div class="summary-row"><span>Tax</span><strong>$\${tax.toFixed(2)}</strong></div>
            <div class="summary-row"><span>Discount</span><strong>$\${discount.toFixed(2)}</strong></div>
            <div class="summary-row"><span>Total</span><strong>$\${amount.toFixed(2)}</strong></div>
            <div class="summary-row"><span>Payment Status</span><strong>\${invoice.status}</strong></div>
            <div class="summary-row"><span>Payment Method</span><strong>\${pMethod}</strong></div>
           \`;
           
           if(modalFooter) {
               modalFooter.innerHTML = \`
                 <button class="btn btn-outline-brand" type="button" onclick="window.print()">Print</button>
                 <button class="btn btn-outline-brand" type="button" data-download-invoice="\${invoice.id}">Download PDF (demo)</button>
                 <button class="btn btn-brand" type="button" data-bs-dismiss="modal">Close</button>
               \`;
           }
        }
        
        bootstrap.Modal.getOrCreateInstance(document.getElementById('invoiceModal')).show();
      }
    });

    document.addEventListener('click', (e) => {
      const dBtn = e.target.closest('[data-download-invoice]');
      if (dBtn) {
        downloadInvoiceFn(dBtn.dataset.downloadInvoice);
      }
    });

`;

const invoicesStart3 = content.indexOf('/* 3. Invoices Tab (Dynamic Event Delegation) */');
const initPaymentFormIdx = content.indexOf('/* Bug 1: Payment Modal Functionality */');

content = content.substring(0, invoicesStart3) + invoicesLogic2 + '\n    ' + content.substring(initPaymentFormIdx);

fs.writeFileSync(dash, content, 'utf8');
console.log("Updated dashboard.js with accurate footers and logic.");
