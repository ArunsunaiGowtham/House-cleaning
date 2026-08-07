const fs = require('fs');

let dash = 'assets/js/dashboard.js';
let content = fs.readFileSync(dash, 'utf8');

// Replace the old booking view logic (lines 25-47) with dynamic event delegation logic.
// Find /* 2. & 7. Bookings Section */ and /* 3. Invoices Tab (Dynamic Event Delegation) */
const bookingsStart = content.indexOf('/* 2. & 7. Bookings Section */');
const invoicesStart = content.indexOf('/* 3. Invoices Tab (Dynamic Event Delegation) */');

const newBookingsLogic = `    /* 2. & 7. Bookings Section */
    document.addEventListener("click", (e) => {
      const button = e.target.closest("[data-view-booking]");
      if (button) {
        const bookingId = button.dataset.viewBooking;
        const modalContent = document.getElementById("bookingDetailsContent");
        if (!modalContent) return;

        let allBookings = [];
        let currUser = null;
        if(typeof SP_AUTH !== 'undefined') {
            allBookings = SP_AUTH.getBookings();
            currUser = SP_AUTH.getCurrentUser();
        }

        const booking = allBookings.find(b => b.id === bookingId);
        if (!booking) {
            modalContent.innerHTML = '<p class="text-muted">No booking found.</p>';
        } else {
            const customerName = currUser ? currUser.fullName : "Customer";
            const customerEmail = currUser ? currUser.email : "email@example.com";
            const address = currUser ? currUser.address : "N/A";
            const pStatus = "Paid"; // Defaulting to Paid since there is no explicit tracking in the prompt
            
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
        }
        bootstrap.Modal.getOrCreateInstance(document.getElementById("bookingDetailsModal")).show();
      }
    });

    document.querySelectorAll("[data-cancel-booking]").forEach((button) => {
      button.addEventListener("click", () => {
        if (confirm(\`Are you sure you want to cancel booking \${button.dataset.cancelBooking}?\`)) {
          const row = button.closest("tr");
          const status = row?.querySelector(".status-pill");
          if (status) {
            status.className = "status-pill danger";
            status.textContent = "Cancelled";
          }
          button.disabled = true;
          const reschedBtn = row?.querySelector('[data-bs-target="#rescheduleModal"]');
          if (reschedBtn) reschedBtn.disabled = true;
          showAlert("bookingActionAlert", \`Booking \${button.dataset.cancelBooking} has been cancelled in this demo.\`);
        }
      });
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
      showAlert("bookingActionAlert", \`Booking \${bookingId} has been rescheduled in this demo.\`);
      
      setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(document.getElementById("rescheduleModal"));
        if (modal) modal.hide();
      }, 1000);
    });

`;

content = content.substring(0, bookingsStart) + newBookingsLogic + '\n' + content.substring(invoicesStart);


// Replace Invoice and Payment Logics
const invoicesStart2 = content.indexOf('/* 3. Invoices Tab (Dynamic Event Delegation) */');
const endIdx = content.indexOf('/* 4. Messages Tab */');

const invoiceAndPaymentLogicStr = `    /* 3. Invoices Tab (Dynamic Event Delegation) */
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
           modalContent.innerHTML = '<p class="text-muted">No invoice found.</p>';
        } else {
           const booking = allBookings.find(b => b.invoiceId === invoice.id) || {};
           const customerName = currUser ? currUser.fullName : "Customer";
           const customerEmail = currUser ? currUser.email : "email@example.com";
           const address = currUser ? currUser.address : "N/A";
           const pMethod = currUser && currUser.paymentMethod ? \`Card ending in \${currUser.paymentMethod.last4}\` : 'None';
           
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
        }
        
        const downloadBtn = document.getElementById('invoiceModalDownloadBtn');
        if (downloadBtn) downloadBtn.dataset.downloadInvoice = invId;
        bootstrap.Modal.getOrCreateInstance(document.getElementById('invoiceModal')).show();
      }
    });

    document.getElementById('invoiceModalDownloadBtn')?.addEventListener('click', (e) => {
      const invId = e.currentTarget.dataset.downloadInvoice;
      if (invId) downloadInvoiceFn(invId);
    });

    /* Bug 1: Payment Modal Functionality */
    const initPaymentForm = () => {
      const pForm = document.getElementById('paymentForm');
      if(pForm) {
         // Load existing if possible
         if(typeof SP_AUTH !== 'undefined') {
            const user = SP_AUTH.getCurrentUser();
            if(user && user.paymentMethod) {
               const ch = document.getElementById('cardHolder');
               const cn = document.getElementById('cardNumber');
               const ce = document.getElementById('cardExpiry');
               const cv = document.getElementById('cardCvv');
               if(ch) ch.value = user.paymentMethod.cardHolder || '';
               if(cn) cn.value = '**** **** **** ' + (user.paymentMethod.last4 || '');
               if(ce) ce.value = user.paymentMethod.expiry || '';
               if(cv) cv.value = '***';
            }
         }

         pForm.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            let isValid = true;
            
            const cardHolderEl = document.getElementById('cardHolder');
            const cardNumEl = document.getElementById('cardNumber');
            const cardExpiryEl = document.getElementById('cardExpiry');
            const cardCvvEl = document.getElementById('cardCvv');

            // Card Holder Validation
            if(!cardHolderEl.value.trim()) {
                cardHolderEl.setCustomValidity('Invalid');
                isValid = false;
            } else { cardHolderEl.setCustomValidity(''); }

            // Card Number Validation (16 digits or masked)
            const cnVal = cardNumEl.value;
            const digitsOnly = cnVal.replace(/\\D/g, '');
            if (cnVal.indexOf('*') === -1 && digitsOnly.length !== 16) {
                cardNumEl.setCustomValidity('Invalid');
                isValid = false;
            } else if (cnVal.indexOf('*') !== -1 && digitsOnly.length < 4) {
                cardNumEl.setCustomValidity('Invalid');
                isValid = false;
            } else {
                cardNumEl.setCustomValidity('');
            }

            // Expiry Validation (MM/YY)
            const expiryRegex = /^(0[1-9]|1[0-2])\\/([0-9]{2})$/;
            if(!expiryRegex.test(cardExpiryEl.value.trim())) {
                cardExpiryEl.setCustomValidity('Invalid');
                isValid = false;
            } else { cardExpiryEl.setCustomValidity(''); }

            // CVV Validation (3 or 4 digits or masked)
            const cvvVal = cardCvvEl.value.trim();
            if (cvvVal.indexOf('*') === -1 && (cvvVal.length < 3 || cvvVal.length > 4 || /[^0-9]/.test(cvvVal))) {
                cardCvvEl.setCustomValidity('Invalid');
                isValid = false;
            } else { cardCvvEl.setCustomValidity(''); }

            pForm.classList.add('was-validated');

            if (!pForm.checkValidity() || !isValid) {
               pForm.reportValidity();
               return;
            }

            if(typeof SP_AUTH !== 'undefined') {
               const user = SP_AUTH.getCurrentUser();
               if(user) {
                  const ch = cardHolderEl.value.trim();
                  const ce = cardExpiryEl.value.trim();
                  const cnRaw = cardNumEl.value.trim();
                  const last4 = cnRaw.indexOf('*') !== -1 ? cnRaw.slice(-4) : digitsOnly.slice(-4);
                  
                  SP_AUTH.updateProfile(user.email, {
                     paymentMethod: {
                        cardHolder: ch,
                        last4: last4,
                        expiry: ce
                     }
                  });
               }
            }
            
            pForm.classList.remove('was-validated');
            showGlobalToast("Payment method updated successfully.");
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
            if(modal) modal.hide();
            
            // Re-render UI to update last 4 digits if shown
            if(typeof renderCustomerDashboard !== 'undefined') renderCustomerDashboard();
         });
      }
    };
    initPaymentForm();
`;

content = content.substring(0, invoicesStart2) + invoiceAndPaymentLogicStr + '\n    ' + content.substring(endIdx);
fs.writeFileSync(dash, content, 'utf8');
console.log("Updated dashboard.js with final fixes.");
