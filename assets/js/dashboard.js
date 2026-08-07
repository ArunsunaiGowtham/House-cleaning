/* SparklePro - dashboard.js : demo data behaviour for admin + customer panels. */
(() => {
  "use strict";
  document.addEventListener("DOMContentLoaded", () => {
    
    const showAlert = (id, message) => {
      const alert = document.getElementById(id);
      if (alert) { alert.textContent = message; alert.hidden = false; }
    };

    /* 1. Dashboard Navigation Tabs */
    const tabs = document.querySelectorAll('button[data-bs-toggle="tab"]');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const bsTab = bootstrap.Tab.getOrCreateInstance(tab);
        if (bsTab) bsTab.show();
      });
      tab.addEventListener('shown.bs.tab', (e) => {
        tabs.forEach(t => t.classList.remove('is-active'));
        e.target.classList.add('is-active');
      });
    });

            /* 2. & 7. Bookings Section */
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
            
            modalContent.innerHTML = `
                <div class="summary-row"><span>Booking ID</span><strong>${booking.id}</strong></div>
                <div class="summary-row"><span>Customer Name</span><strong>${customerName}</strong></div>
                <div class="summary-row"><span>Customer Email</span><strong>${customerEmail}</strong></div>
                <div class="summary-row"><span>Service</span><strong>${booking.service}</strong></div>
                <div class="summary-row"><span>Booking Date</span><strong>${booking.date}</strong></div>
                <div class="summary-row"><span>Booking Time</span><strong>${booking.time || 'N/A'}</strong></div>
                <div class="summary-row"><span>Property Address</span><strong>${address}</strong></div>
                <div class="summary-row"><span>Cleaner Assigned</span><strong>Unassigned</strong></div>
                <div class="summary-row"><span>Status</span><strong>${booking.status}</strong></div>
                <div class="summary-row"><span>Price</span><strong>$${booking.price}</strong></div>
                <div class="summary-row"><span>Special Instructions</span><strong>None</strong></div>
                <div class="summary-row"><span>Payment Status</span><strong>${pStatus}</strong></div>
            `;
            
            let footerHtml = '<button class="btn btn-outline-brand" type="button" data-bs-dismiss="modal">Close</button>';
            if(invoice) {
               footerHtml += `<button class="btn btn-brand" data-download-invoice="${invoice.id}">Download Invoice</button>`;
            }
            if(booking.status !== 'Cancelled') {
               footerHtml += `
                 <button class="btn btn-outline-brand" data-bs-toggle="modal" data-bs-target="#rescheduleModal" data-booking="${booking.id}">Reschedule</button>
                 <button class="btn btn-outline-danger" data-cancel-booking="${booking.id}">Cancel Booking</button>
               `;
            }
            if(modalFooter) modalFooter.innerHTML = footerHtml;
        }
        bootstrap.Modal.getOrCreateInstance(document.getElementById("bookingDetailsModal")).show();
      }
    });

    document.addEventListener("click", (e) => {
       const cancelBtn = e.target.closest("[data-cancel-booking]");
       if (cancelBtn) {
         if (confirm(`Are you sure you want to cancel booking ${cancelBtn.dataset.cancelBooking}?`)) {
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
            showAlert("bookingActionAlert", `Booking ${cancelBtn.dataset.cancelBooking} has been cancelled in this demo.`);
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

      showAlert("bookingActionAlert", `Booking ${bookingId} has been rescheduled in this demo.`);
      
      setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(document.getElementById("rescheduleModal"));
        if (modal) modal.hide();
      }, 1000);
    });


    /* 3. Invoices Tab (Dynamic Event Delegation) */
    const downloadInvoiceFn = (invId) => {
      const content = `Invoice ID: ${invId}\nThis is a static HTML demo file for ${invId}.`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Invoice-${invId}.pdf`;
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
           const pMethod = currUser && currUser.paymentMethod ? `****${currUser.paymentMethod.last4}` : 'None';
           
           const amount = parseFloat(invoice.amount) || 0;
           const tax = amount * 0.08;
           const discount = 0;
           const subtotal = amount - tax;

           modalContent.innerHTML = `
            <div class="summary-row"><span>Invoice Number</span><strong>${invoice.id}</strong></div>
            <div class="summary-row"><span>Booking ID</span><strong>${booking.id || 'N/A'}</strong></div>
            <div class="summary-row"><span>Customer Name</span><strong>${customerName}</strong></div>
            <div class="summary-row"><span>Customer Email</span><strong>${customerEmail}</strong></div>
            <div class="summary-row"><span>Service</span><strong>${invoice.service}</strong></div>
            <div class="summary-row"><span>Booking Date</span><strong>${invoice.date}</strong></div>
            <div class="summary-row"><span>Address</span><strong>${address}</strong></div>
            <div class="summary-row"><span>Subtotal</span><strong>$${subtotal.toFixed(2)}</strong></div>
            <div class="summary-row"><span>Tax</span><strong>$${tax.toFixed(2)}</strong></div>
            <div class="summary-row"><span>Discount</span><strong>$${discount.toFixed(2)}</strong></div>
            <div class="summary-row"><span>Total</span><strong>$${amount.toFixed(2)}</strong></div>
            <div class="summary-row"><span>Payment Status</span><strong>${invoice.status}</strong></div>
            <div class="summary-row"><span>Payment Method</span><strong>${pMethod}</strong></div>
           `;
           
           if(modalFooter) {
               modalFooter.innerHTML = `
                 <button class="btn btn-outline-brand" type="button" onclick="window.print()">Print</button>
                 <button class="btn btn-outline-brand" type="button" data-download-invoice="${invoice.id}">Download PDF (demo)</button>
                 <button class="btn btn-brand" type="button" data-bs-dismiss="modal">Close</button>
               `;
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
            const digitsOnly = cnVal.replace(/\D/g, '');
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
            const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
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

    /* 4. Messages Tab */
    const conversations = {
      support: { name: "Support team", text: "Your Friday slot is confirmed with Hana. Anything you would like prioritised this visit?", time: "Today, 08:51" },
      billing: { name: "Billing team", text: "Your receipt for INV-2290 is ready to download from the Invoices tab.", time: "Yesterday, 16:24" }
    };
    
    document.querySelectorAll("[data-conversation]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-conversation]").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        const message = conversations[button.dataset.conversation];
        const thread = document.getElementById("messageThread");
        if (thread && message) {
          thread.innerHTML = `<strong style="color:var(--sp-ink)">${message.name}</strong><p class="mb-1 mt-1">${message.text}</p><small style="color:var(--sp-muted)">${message.time}</small>`;
        }
        const markRead = document.getElementById("markReadButton");
        if (markRead) { markRead.disabled = false; markRead.textContent = "Mark as read"; }
      });
    });
    
    document.getElementById("replyButton")?.addEventListener("click", () => document.getElementById("custReply")?.focus());
    document.getElementById("markReadButton")?.addEventListener("click", (event) => { 
      event.currentTarget.textContent = "Marked as read"; 
      event.currentTarget.disabled = true; 
    });

    const msgForm = document.querySelector('#tabMessages form');
    if (msgForm) {
      msgForm.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        msgForm.classList.add('was-validated');
        if (msgForm.checkValidity()) {
          const input = document.getElementById('custReply');
          const thread = document.getElementById('messageThread');
          if (input && thread) {
            const text = input.value;
            const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            thread.insertAdjacentHTML('beforeend', `<div class="mt-3 pt-3 border-top"><strong style="color:var(--sp-brand)">You</strong><p class="mb-1 mt-1">${text}</p><small style="color:var(--sp-muted)">Today, ${time}</small></div>`);
            input.value = '';
            msgForm.classList.remove('was-validated');
            thread.scrollTop = thread.scrollHeight;
            
            // Show alert briefly
            const alert = msgForm.querySelector('[data-form-alert]');
            if (alert) {
              alert.hidden = false;
              alert.style.display = 'block';
              setTimeout(() => { alert.hidden = true; alert.style.display = 'none'; }, 3000);
            }
          }
        }
      });
    }

    // Manual Tab Triggers
    document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tabTrigger => {
      tabTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        const tab = new bootstrap.Tab(this);
        tab.show();
      });
    });

    
    // 9. Notifications (localStorage)
    const notifSwitches = ['nt1', 'nt2', 'nt3', 'nt4'];
    notifSwitches.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (localStorage.getItem('sparklepro_settings_' + id) !== null) {
          el.checked = localStorage.getItem('sparklepro_settings_' + id) === 'true';
        }
      }
    });

    // 10. Admin Search and Filtering
    const searchInput = document.getElementById("dashSearch");
    const statusFilter = document.getElementById("statusFilter");
    
    const applyAdminFilters = () => {
      const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
      const statusValue = statusFilter ? statusFilter.value : "all";
      const targetSelector = searchInput?.dataset.searchTarget || statusFilter?.dataset.statusFilter || "tbody tr";
      
      const rows = document.querySelectorAll(targetSelector);
      let visibleCount = 0;
      let tbody = null;
      
      rows.forEach(row => {
        if (row.id === "noResultsRow") return;
        if (!tbody) tbody = row.closest('tbody');
        
        const textMatch = row.textContent.toLowerCase().includes(searchTerm);
        const rowStatus = row.dataset.status || "confirmed"; // Default assumption if none
        const statusMatch = statusValue === "all" || rowStatus === statusValue;
        
        if (textMatch && statusMatch) {
          row.style.display = "";
          visibleCount++;
        } else {
          row.style.display = "none";
        }
      });
      
      if (tbody) {
        let noResultsRow = document.getElementById("noResultsRow");
        if (visibleCount === 0) {
          if (!noResultsRow) {
            noResultsRow = document.createElement("tr");
            noResultsRow.id = "noResultsRow";
            noResultsRow.innerHTML = '<td colspan="10" class="text-center py-4" style="color:var(--sp-muted);">No matching records found.</td>';
            tbody.appendChild(noResultsRow);
          }
          noResultsRow.style.display = "";
        } else if (noResultsRow) {
          noResultsRow.style.display = "none";
        }
      }
    };

    if (searchInput) {
      searchInput.addEventListener("input", applyAdminFilters);
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          applyAdminFilters();
        }
      });
    }
    
    if (statusFilter) {
      statusFilter.addEventListener("change", applyAdminFilters);
    }

    // --- 11. HARDCODED TOAST SYSTEM ---
    function showGlobalToast(message) {
      const toastEl = document.getElementById('globalToast');
      const msgEl = document.getElementById('globalToastMsg');
      if (toastEl && msgEl) {
        msgEl.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> ' + message;
        const bsToast = new bootstrap.Toast(toastEl, { delay: 3000 });
        bsToast.show();
      }
    }

    // --- 12. SETTINGS PAGE PERSISTENCE ---
    const settingsForm = document.getElementById("settingsForm");
    const settingsFields = ['stName', 'stMail', 'stPhone', 'stCur', 'stAddr'];
    
    if (settingsForm) {
      // Load
      settingsFields.forEach(id => {
        const el = document.getElementById(id);
        if (el && localStorage.getItem('sparklepro_settings_'+id) !== null) {
          el.value = localStorage.getItem('sparklepro_settings_'+id);
        }
      });

      // NOTE: stopImmediatePropagation() ensures no other submit listener on this
      // same form (e.g. a generic demo-form handler) can ever run alongside this
      // one and reset/rebuild anything after a save.
      settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        // Save — form fields only. No innerHTML, no DOM rebuilding, no reload.
        settingsFields.forEach(id => {
          const el = document.getElementById(id);
          if (el) localStorage.setItem('sparklepro_settings_'+id, el.value);
        });
        notifSwitches.forEach(id => {
          const el = document.getElementById(id);
          if (el) localStorage.setItem('sparklepro_settings_'+id, el.checked);
        });

        // Only DOM change allowed: show the existing toast component.
        showGlobalToast("Settings saved successfully.");
      });
    }

    // --- 13. LOCALSTORAGE DATABASE FORMS ---
    function saveToCollection(collection, data) {
      let items = JSON.parse(localStorage.getItem(collection)) || [];
      items.unshift(data); // Add to top
      localStorage.setItem(collection, JSON.stringify(items));
    }

    // Add Customer
    const addCustForm = document.getElementById('addCustomerForm');
    if (addCustForm) {
      addCustForm.addEventListener('submit', (e) => {
        e.preventDefault(); e.stopPropagation();
        addCustForm.classList.add('was-validated');
        if (addCustForm.checkValidity()) {
          const fullName = document.getElementById('cName').value.trim();
          const email = document.getElementById('cEmail').value.trim().toLowerCase();
          const phone = document.getElementById('cPhone').value.trim();
          const addressValue = document.getElementById('cAddress').value.trim();
          const city = document.getElementById('cCity').value.trim();
          const zip = document.getElementById('cZip').value.trim();
          const status = document.getElementById('cStatus').value;
          const plan = document.getElementById('cType').value || 'standard';
          const createdAt = new Date().toISOString();

          const existing = SP_AUTH ? SP_AUTH.getUsers() : [];
          if (existing.some((u) => u.email.toLowerCase() === email)) {
            showGlobalToast('A customer with that email already exists.');
            return;
          }

          const [firstName, ...rest] = fullName.split(' ');
          const newUser = {
            id: 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
            role: 'customer',
            email,
            password: 'changeme',
            firstName: firstName || fullName,
            lastName: rest.join(' ') || '',
            fullName,
            phone,
            address: `${addressValue}${city ? ', ' + city : ''}${zip ? ', ' + zip : ''}`,
            area: city || addressValue || 'N/A',
            plan,
            status,
            paymentMethod: 'Card ending in 1234',
            lifetimeValue: 0,
            createdAt
          };

          if (SP_AUTH) {
            saveAdminUsers([...existing, newUser]);
          }

          saveToCollection('sparklepro_customers', {
            name: fullName,
            email,
            phone,
            address: newUser.address,
            city,
            status,
            plan,
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
          });

          showGlobalToast('Customer added successfully.');
          setTimeout(() => { window.location.href = 'users.html'; }, 1000);
        }
      });
    }

    // Add Cleaner
    const addCleanerForm = document.getElementById('addCleanerForm');
    if (addCleanerForm) {
      addCleanerForm.addEventListener('submit', (e) => {
        e.preventDefault(); e.stopPropagation();
        addCleanerForm.classList.add('was-validated');
        if (addCleanerForm.checkValidity()) {
          const roleSel = document.getElementById('clRole');
          const data = {
            name: document.getElementById('clName').value,
            role: roleSel.options[roleSel.selectedIndex].text,
            area: document.getElementById('clArea').value,
            status: document.getElementById('clStatus').value,
            rating: '5.00', jobs: '0', hours: '0 h'
          };
          saveToCollection('sparklepro_cleaners', data);
          showGlobalToast("Cleaner added successfully.");
          setTimeout(() => { window.location.href = 'cleaners.html'; }, 1000);
        }
      });
    }

    // Add Booking
    const addBookingForm = document.getElementById('addBookingForm');
    if (addBookingForm) {
      addBookingForm.addEventListener('submit', (e) => {
        e.preventDefault(); e.stopPropagation();
        addBookingForm.classList.add('was-validated');
        if (addBookingForm.checkValidity()) {
          let items = JSON.parse(localStorage.getItem('sparklepro_bookings')) || [];
          const refId = "SP-" + (4827 + items.length);
          
          const srvSel = document.getElementById('bService');
          const custSel = document.getElementById('bCust');
          
          const data = {
            id: refId,
            service: srvSel.options[srvSel.selectedIndex].text,
            customer: custSel.options[custSel.selectedIndex].text,
            address: document.getElementById('bAddress').value,
            date: document.getElementById('bDate').value,
            status: document.getElementById('bStatus').value,
            amount: srvSel.value === 'deep' ? '$280' : '$140'
          };
          saveToCollection('sparklepro_bookings', data);
          showGlobalToast("Booking created successfully.");
          setTimeout(() => { window.location.href = 'bookings.html'; }, 1000);
        }
      });
    }

    
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
              bookingsTbody.innerHTML += `
                <tr>
                  <td>${b.date}<small class="d-block text-muted">${b.time}</small></td>
                  <td>${b.service}</td>
                  <td>Unassigned</td>
                  <td><span class="status-pill ${b.status==='Confirmed'?'ok':'pending'}">${b.status}</span></td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-outline-brand" data-view-booking="${b.id}">View</button>
                  </td>
                </tr>
              `;
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
              tbody.innerHTML += `
                <tr>
                  <td>${i.id}</td>
                  <td>${i.service}</td>
                  <td>${i.date}</td>
                  <td>$${i.amount}</td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-brand" data-view-invoice="${i.id}">View</button>
                  </td>
                </tr>
              `;
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
         upcoming.innerHTML = `
           <div class="summary-row"><span>Service</span><strong>${b.service}</strong></div>
           <div class="summary-row"><span>Date</span><strong>${b.date}</strong></div>
           <div class="summary-row"><span>Time</span><strong>${b.time}</strong></div>
           <div class="mt-4 pt-3 border-top"><button class="btn btn-brand w-100">Reschedule</button></div>
         `;
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
            recentInvoices.innerHTML += `
              <div class="summary-row"><span>${i.id} &middot; ${i.service}</span><strong>$${i.amount}</strong></div>
            `;
         });
      }
    };

    
    // --- 15. ADMIN DASHBOARD RENDERING & MODALS ---
    const getAdminCustomers = () => {
      if (typeof SP_AUTH === 'undefined') return [];
      return SP_AUTH.getUsers().filter(u => u.role !== 'admin');
    };

    const saveAdminUsers = (users) => localStorage.setItem('sp_users', JSON.stringify(users));
    const getUserById = (id) => getAdminCustomers().find((u) => u.id === id);
    const removeUserById = (id) => {
      const users = getAdminCustomers().filter((u) => u.id !== id);
      saveAdminUsers(users);
      return users;
    };

    const formatCustomerPlan = (plan) => {
      if (!plan) return 'Standard';
      return plan.charAt(0).toUpperCase() + plan.slice(1);
    };

    const formatPaymentMethod = (paymentMethod) => paymentMethod ? paymentMethod : 'None';
    const formatMoney = (value) => {
      const amount = parseFloat(value);
      return Number.isFinite(amount) ? `$${amount.toFixed(2)}` : '$0.00';
    };

    const renderCustomerStats = () => {
      const customers = getAdminCustomers();
      const activeCount = customers.filter((u) => (u.status || 'Active').toLowerCase() !== 'inactive').length;
      const newCount = customers.filter((u) => {
        if (!u.createdAt) return true;
        const created = new Date(u.createdAt);
        return Date.now() - created.getTime() <= 30 * 24 * 60 * 60 * 1000;
      }).length;
      const retention = customers.length ? Math.round((activeCount / customers.length) * 100) : 0;
      const activeEl = document.getElementById('kpiActiveCustomers');
      const newEl = document.getElementById('kpiNewCustomers');
      const retentionEl = document.getElementById('kpiRetention');
      const avgRatingEl = document.getElementById('kpiAvgRating');
      if (activeEl) activeEl.textContent = activeCount;
      if (newEl) newEl.textContent = newCount;
      if (retentionEl) retentionEl.textContent = `${retention}%`;
      if (avgRatingEl) avgRatingEl.textContent = '4.9';
    };

    const renderCustomerModal = (userId, mode = 'view') => {
      const user = getUserById(userId);
      const modal = document.getElementById('adminViewCustomerModal');
      const modalTitle = modal?.querySelector('.modal-title');
      const modalContent = document.getElementById('adminViewCustomerContent');
      const modalFooter = document.getElementById('adminViewCustomerFooter');
      if (!user || !modalContent || !modalFooter || !modal || !modalTitle) return;

      const status = user.status || 'Active';
      const plan = formatCustomerPlan(user.plan);
      const paymentMethod = formatPaymentMethod(user.paymentMethod);
      const address = user.address || 'N/A';
      const bookings = SP_AUTH.getBookingsForUser(user.id).length;
      const invoices = SP_AUTH.getInvoicesForUser(user.id).length;

      if (mode === 'edit') {
        modalTitle.textContent = 'Edit Customer';
        modalContent.innerHTML = `
          <form class="needs-validation" id="adminEditCustomerForm" novalidate data-customer-id="${user.id}">
            <div class="row g-3">
              <div class="col-12"><label class="form-label" for="customerEditName">Customer Name</label><input type="text" id="customerEditName" class="form-control" value="${user.fullName || ''}" required></div>
              <div class="col-12"><label class="form-label" for="customerEditEmail">Email</label><input type="email" id="customerEditEmail" class="form-control" value="${user.email || ''}" required></div>
              <div class="col-12"><label class="form-label" for="customerEditPhone">Phone</label><input type="tel" id="customerEditPhone" class="form-control" value="${user.phone || ''}" required></div>
              <div class="col-12"><label class="form-label" for="customerEditAddress">Address</label><input type="text" id="customerEditAddress" class="form-control" value="${address}" required></div>
              <div class="col-md-6"><label class="form-label" for="customerEditStatus">Status</label><select class="form-select" id="customerEditStatus" required><option value="Active" ${status === 'Active' ? 'selected' : ''}>Active</option><option value="Inactive" ${status === 'Inactive' ? 'selected' : ''}>Inactive</option></select></div>
              <div class="col-md-6"><label class="form-label" for="customerEditPlan">Plan</label><select class="form-select" id="customerEditPlan" required><option value="basic" ${plan === 'Basic' ? 'selected' : ''}>Basic</option><option value="standard" ${plan === 'Standard' ? 'selected' : ''}>Standard</option><option value="premium" ${plan === 'Premium' ? 'selected' : ''}>Premium</option></select></div>
              <div class="col-12"><label class="form-label" for="customerEditPayment">Payment Method</label><input type="text" id="customerEditPayment" class="form-control" value="${paymentMethod}" required></div>
            </div>
          </form>
        `;
        modalFooter.innerHTML = `
          <button class="btn btn-outline-brand" type="button" data-admin-view-customer="${user.id}">Cancel</button>
          <button class="btn btn-brand" type="button" data-admin-save-customer="${user.id}">Save</button>
        `;
      } else {
        modalTitle.textContent = 'Customer Details';
        modalContent.innerHTML = `
          <div class="summary-row"><span>Customer Name</span><strong>${user.fullName || 'N/A'}</strong></div>
          <div class="summary-row"><span>Email</span><strong>${user.email || 'N/A'}</strong></div>
          <div class="summary-row"><span>Phone</span><strong>${user.phone || 'N/A'}</strong></div>
          <div class="summary-row"><span>Address</span><strong>${address}</strong></div>
          <div class="summary-row"><span>Plan</span><strong>${plan}</strong></div>
          <div class="summary-row"><span>Payment Method</span><strong>${paymentMethod}</strong></div>
          <div class="summary-row"><span>Status</span><strong>${status}</strong></div>
          <div class="summary-row"><span>Bookings</span><strong>${bookings}</strong></div>
          <div class="summary-row"><span>Invoices</span><strong>${invoices}</strong></div>
        `;
        modalFooter.innerHTML = `
          <button class="btn btn-outline-brand" type="button" data-admin-edit-customer="${user.id}">Edit</button>
          <button class="btn btn-outline-danger" type="button" data-admin-delete-customer="${user.id}">Delete</button>
          <button class="btn btn-brand" type="button" data-bs-dismiss="modal">Close</button>
        `;
      }

      bootstrap.Modal.getOrCreateInstance(modal).show();
    };

    const renderAdminDashboard = () => {
      if(typeof SP_AUTH === 'undefined') return;
      
      const allBookings = SP_AUTH.getBookings();
      const allUsers = getAdminCustomers();
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
               tbody.innerHTML += `
                <tr>
                  <td>${b.id}</td>
                  <td>${name}</td>
                  <td>${b.service}</td>
                  <td>${b.date}</td>
                  <td>$${b.price}</td>
                  <td><span class="status-pill ${b.status==='Cancelled' ? 'danger' : 'ok'}">${b.status}</span></td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-outline-brand" data-admin-view-booking="${b.id}">View</button>
                  </td>
                </tr>
              `;
            });
         }
      };
      renderAllBookings(adminBookings);
      renderAllBookings(adminRecentBookings);

      const adminUsersList = document.getElementById('adminUsersList');
      if (adminUsersList) {
         if (allUsers.length === 0) {
            adminUsersList.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-4">No customers found.</td></tr>';
         } else {
            adminUsersList.innerHTML = '';
            allUsers.forEach(u => {
               const bookings = SP_AUTH.getBookingsForUser(u.id).length;
               const name = u.fullName || (u.firstName + ' ' + u.lastName) || 'Unknown';
               const area = u.area || u.city || (u.address ? u.address.split(',')[0] : 'N/A');
               const plan = formatCustomerPlan(u.plan);
               const status = u.status || 'Active';
               const statusClass = status.toLowerCase() === 'inactive' ? 'danger' : 'ok';
               adminUsersList.innerHTML += `
                <tr>
                  <td><input class="form-check-input" type="checkbox" aria-label="Select customer"></td>
                  <td>
                    <div class="d-flex align-items-center gap-2">
                      <div class="avatar-sm d-flex align-items-center justify-content-center rounded-circle" style="background:var(--sp-brand);color:#fff;width:36px;height:36px;">${name.charAt(0)}</div>
                      <span><strong style="color:var(--sp-ink)">${name}</strong><small class="d-block" style="color:var(--sp-muted)">${u.email}</small></span>
                    </div>
                  </td>
                  <td>${area}</td>
                  <td>${plan}</td>
                  <td>${bookings}</td>
                  <td>${formatMoney(u.lifetimeValue || 0)}</td>
                  <td class="text-end">
                    <span class="status-pill ${statusClass}">${status}</span>
                    <button class="btn btn-sm btn-outline-brand ms-2" data-admin-view-customer="${u.id}">View</button>
                  </td>
                </tr>
              `;
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
               cleanersTbody.innerHTML += `
                <tr>
                  <td>
                    <div class="d-flex align-items-center gap-2">
                       <div class="avatar-sm d-flex align-items-center justify-content-center rounded-circle" style="background:var(--sp-brand);color:#fff;width:36px;height:36px;">${c.name.charAt(0)}</div>
                       <span><strong style="color:var(--sp-ink)">${c.name}</strong><small class="d-block" style="color:var(--sp-muted)">${c.role}</small></span>
                    </div>
                  </td>
                  <td>${c.area}</td>
                  <td>${c.rating}</td>
                  <td>${c.jobs}</td>
                  <td>${c.hours}</td>
                  <td><span class="status-pill ok">${c.status}</span></td>
                </tr>
               `;
            });
         }
      }

      renderCustomerStats();
      if(typeof updateKPIs === 'function') updateKPIs();
    };

    // Inject Modals into DOM
    if(!document.getElementById('adminModalsWrapper')) {
       const wrapper = document.createElement('div');
       wrapper.id = 'adminModalsWrapper';
       wrapper.innerHTML = `
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
       `;
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
                price: "150.00" // Generic price
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
             const cleanerAssigned = booking.cleanerAssigned || "Unassigned";
             
             document.getElementById('adminViewBookingContent').innerHTML = `
                <div class="summary-row"><span>Booking ID</span><strong>${booking.id}</strong></div>
                <div class="summary-row"><span>Customer Name</span><strong>${name}</strong></div>
                <div class="summary-row"><span>Customer Email</span><strong>${email}</strong></div>
                <div class="summary-row"><span>Phone</span><strong>${phone}</strong></div>
                <div class="summary-row"><span>Service</span><strong>${booking.service}</strong></div>
                <div class="summary-row"><span>Booking Date</span><strong>${booking.date}</strong></div>
                <div class="summary-row"><span>Booking Time</span><strong>${booking.time}</strong></div>
                <div class="summary-row"><span>Address</span><strong>${user ? user.address : 'N/A'}</strong></div>
                <div class="summary-row"><span>Assigned Cleaner</span><strong>${cleanerAssigned}</strong></div>
                <div class="summary-row"><span>Status</span><strong>${booking.status}</strong></div>
                <div class="summary-row"><span>Payment Status</span><strong>Paid</strong></div>
                <div class="summary-row"><span>Price</span><strong>$${booking.price}</strong></div>
                <div class="summary-row"><span>Special Instructions</span><strong>None</strong></div>
             `;
             
             document.getElementById('adminViewBookingFooter').innerHTML = `
                <button class="btn btn-outline-brand" type="button" data-bs-dismiss="modal">Close</button>
                <button class="btn btn-outline-brand" type="button" data-admin-assign-cleaner="${booking.id}">Assign Cleaner</button>
                <button class="btn btn-outline-brand" type="button" data-admin-edit-booking="${booking.id}">Edit Booking</button>
                <button class="btn btn-brand" type="button" data-admin-cancel-booking="${booking.id}">Cancel Booking</button>
             `;
             bootstrap.Modal.getOrCreateInstance(document.getElementById('adminViewBookingModal')).show();
          }
       }

       // View Customer
       const viewCustomerBtn = e.target.closest('[data-admin-view-customer]');
       if (viewCustomerBtn) {
          const uId = viewCustomerBtn.dataset.adminViewCustomer;
          renderCustomerModal(uId, 'view');
       }

       // --- Extra Admin Operations (Assign, Edit, Delete) ---
       
       // Assign Cleaner
       const assignBtn = e.target.closest('[data-admin-assign-cleaner]');
       if (assignBtn) {
          const bookingId = assignBtn.dataset.adminAssignCleaner;
          const allBookings = SP_AUTH.getBookings();
          const booking = allBookings.find(b => b.id === bookingId);
          if (booking) {
             const allCleaners = SP_AUTH.getCleaners ? SP_AUTH.getCleaners() : [];
             const cleanerNames = allCleaners.map(c => c.name).join(', ');
             const newCleaner = prompt(`Assign a cleaner (Available: ${cleanerNames || 'None yet'}):`, 'Amelia Hart');
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

       // Cancel Booking
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

       // Edit Customer
       const editCustomerBtn = e.target.closest('[data-admin-edit-customer]');
       if (editCustomerBtn) {
          const uId = editCustomerBtn.dataset.adminEditCustomer;
          renderCustomerModal(uId, 'edit');
       }

       // Save Customer
       const saveCustomerBtn = e.target.closest('[data-admin-save-customer]');
       if (saveCustomerBtn) {
          const form = document.getElementById('adminEditCustomerForm');
          if (form) {
             form.classList.add('was-validated');
             if (!form.checkValidity()) return;
             const userId = form.dataset.customerId;
             const users = SP_AUTH.getUsers();
             const user = users.find((u) => u.id === userId);
             if (!user) return;
             const fullName = document.getElementById('customerEditName').value.trim();
             const email = document.getElementById('customerEditEmail').value.trim().toLowerCase();
             const phone = document.getElementById('customerEditPhone').value.trim();
             const address = document.getElementById('customerEditAddress').value.trim();
             const status = document.getElementById('customerEditStatus').value;
             const plan = document.getElementById('customerEditPlan').value;
             const paymentMethod = document.getElementById('customerEditPayment').value.trim();
             const [firstName, ...rest] = fullName.split(' ');
             const updated = {
               ...user,
               fullName,
               firstName: firstName || user.firstName,
               lastName: rest.join(' ') || user.lastName,
               email,
               phone,
               address,
               status,
               plan,
               paymentMethod
             };
             saveAdminUsers(users.map((u) => (u.id === userId ? updated : u)));
             renderAdminDashboard();
             renderCustomerModal(userId, 'view');
             showGlobalToast('Customer updated successfully.');
          }
       }

       // Delete Customer
       const deleteCustomerBtn = e.target.closest('[data-admin-delete-customer]');
       if (deleteCustomerBtn) {
          const uId = deleteCustomerBtn.dataset.adminDeleteCustomer;
          if (confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
             removeUserById(uId);
             renderAdminDashboard();
             showGlobalToast('Customer deleted successfully.');
             bootstrap.Modal.getInstance(document.getElementById('adminViewCustomerModal'))?.hide();
          }
       }
    });

    renderCustomerDashboard();
    renderAdminDashboard();

  });
})();
