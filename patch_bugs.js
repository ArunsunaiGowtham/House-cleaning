const fs = require('fs');

let dash = 'assets/js/dashboard.js';
let content = fs.readFileSync(dash, 'utf8');

const invoiceLogicStr = `    /* 3. Invoices Tab (Dynamic Event Delegation) */
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
           const pMethod = currUser && currUser.paymentMethod ? \`Card ending in \${currUser.paymentMethod.last4}\` : 'None';
           
           modalContent.innerHTML = \`
            <div class="summary-row"><span>Invoice Number</span><strong>\${invoice.id}</strong></div>
            <div class="summary-row"><span>Customer Name</span><strong>\${customerName}</strong></div>
            <div class="summary-row"><span>Customer Email</span><strong>\${customerEmail}</strong></div>
            <div class="summary-row"><span>Booking ID</span><strong>\${booking.id || 'N/A'}</strong></div>
            <div class="summary-row"><span>Service</span><strong>\${invoice.service}</strong></div>
            <div class="summary-row"><span>Date</span><strong>\${invoice.date}</strong></div>
            <div class="summary-row"><span>Time</span><strong>\${booking.time || 'N/A'}</strong></div>
            <div class="summary-row"><span>Amount</span><strong>$\${invoice.amount}</strong></div>
            <div class="summary-row"><span>Status</span><strong>\${invoice.status}</strong></div>
            <div class="summary-row"><span>Payment Method</span><strong>\${pMethod}</strong></div>
            <div class="summary-row"><span>Booking Notes</span><strong>None</strong></div>
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
               if(ch) ch.value = user.paymentMethod.cardHolder || '';
               if(cn) cn.value = '**** **** **** ' + (user.paymentMethod.last4 || '');
               if(ce) ce.value = user.paymentMethod.expiry || '';
            }
         }

         pForm.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();
            pForm.classList.add('was-validated');
            
            if (!pForm.checkValidity()) return;
            
            // Validate specific fields roughly
            const cardNum = document.getElementById('cardNumber').value.replace(/\\D/g, '');
            if(cardNum.length < 4 && document.getElementById('cardNumber').value.indexOf('*') === -1) {
               document.getElementById('cardNumber').setCustomValidity('Invalid card number');
               pForm.reportValidity();
               return;
            } else {
               document.getElementById('cardNumber').setCustomValidity('');
            }

            if(typeof SP_AUTH !== 'undefined') {
               const user = SP_AUTH.getCurrentUser();
               if(user) {
                  const ch = document.getElementById('cardHolder').value;
                  const ce = document.getElementById('cardExpiry').value;
                  const cnRaw = document.getElementById('cardNumber').value;
                  const last4 = cnRaw.indexOf('*') !== -1 ? cnRaw.slice(-4) : cardNum.slice(-4);
                  
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
            const alertSuccess = document.getElementById('paymentSuccessAlert');
            if(alertSuccess) {
                alertSuccess.hidden = false;
                setTimeout(()=> alertSuccess.hidden = true, 2000);
            }
            showGlobalToast("Payment method updated successfully.");
            
            setTimeout(() => {
               const modal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
               if(modal) modal.hide();
            }, 500);
         });
      }
    };
    initPaymentForm();
`;

// Now replace the old "3. Invoices Tab" section up to "4. Messages Tab" with the new logic, plus the new payment logic.
// Find the boundaries
const startIdx = content.indexOf('/* 3. Invoices Tab */');
const endIdx = content.indexOf('/* 4. Messages Tab */');

if (startIdx !== -1 && endIdx !== -1) {
    content = content.substring(0, startIdx) + invoiceLogicStr + '\n    ' + content.substring(endIdx);
    fs.writeFileSync(dash, content, 'utf8');
    console.log("Updated dashboard.js with Payment and Invoice features.");
} else {
    console.log("Could not find boundaries.");
}
