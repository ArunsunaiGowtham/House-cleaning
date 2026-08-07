const fs = require('fs');

let authFile = 'assets/js/auth.js';
let content = fs.readFileSync(authFile, 'utf8');

const dataLogic = `
  /* ---------------------------------------------------------- */
  /* Data Management (Bookings, Invoices, Messages)              */
  /* ---------------------------------------------------------- */
  const BOOKINGS_KEY = "sp_bookings";
  const INVOICES_KEY = "sp_invoices";
  
  const getBookings = () => {
    try { return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || []; }
    catch(e) { return []; }
  };
  const saveBookings = (data) => localStorage.setItem(BOOKINGS_KEY, JSON.stringify(data));

  const getInvoices = () => {
    try { return JSON.parse(localStorage.getItem(INVOICES_KEY)) || []; }
    catch(e) { return []; }
  };
  const saveInvoices = (data) => localStorage.setItem(INVOICES_KEY, JSON.stringify(data));

  const createBooking = (bookingData) => {
    const bookings = getBookings();
    const invoices = getInvoices();
    
    // Create Invoice
    const invoiceId = "INV-" + Math.floor(Math.random() * 9000 + 1000);
    const invoice = {
       id: invoiceId,
       userId: bookingData.userId,
       service: bookingData.service,
       date: bookingData.date,
       amount: bookingData.price,
       status: 'Unpaid'
    };
    invoices.push(invoice);
    saveInvoices(invoices);
    
    // Create Booking
    const booking = {
       id: "SP-" + Math.floor(Math.random() * 9000 + 1000),
       userId: bookingData.userId,
       service: bookingData.service,
       date: bookingData.date,
       time: bookingData.time,
       status: 'Confirmed',
       price: bookingData.price,
       invoiceId: invoiceId
    };
    bookings.push(booking);
    saveBookings(bookings);
    
    return { booking, invoice };
  };

  const getBookingsForUser = (userId) => getBookings().filter(b => b.userId === userId);
  const getInvoicesForUser = (userId) => getInvoices().filter(i => i.userId === userId);
  
`;

if(!content.includes('BOOKINGS_KEY')) {
    content = content.replace('window.SP_AUTH = {', dataLogic + '\n  window.SP_AUTH = { createBooking, getBookings, getInvoices, getBookingsForUser, getInvoicesForUser, getUsers,');
    fs.writeFileSync(authFile, content, 'utf8');
    console.log("Updated auth.js");
} else {
    console.log("auth.js already updated");
}
