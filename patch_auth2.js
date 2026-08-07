const fs = require('fs');

let authFile = 'assets/js/auth.js';
let content = fs.readFileSync(authFile, 'utf8');

// 1. Fix user.fullName bug in registerCustomer
content = content.replace('lastName: data.lastName, phone: data.phone,', 'lastName: data.lastName, fullName: data.firstName + " " + data.lastName, phone: data.phone,');

// 2. Add cleaners to SP_AUTH
const getCleanersLogic = `
  const CLEANERS_KEY = "sp_cleaners";
  const getCleaners = () => {
    try { return JSON.parse(localStorage.getItem(CLEANERS_KEY)) || []; }
    catch(e) { return []; }
  };
  const saveCleaners = (data) => localStorage.setItem(CLEANERS_KEY, JSON.stringify(data));
  const addCleaner = (cleanerData) => {
     const cleaners = getCleaners();
     const cleaner = {
        id: "CL-" + Math.floor(Math.random() * 9000 + 1000),
        rating: '5.0',
        jobs: 0,
        hours: 0,
        ...cleanerData
     };
     cleaners.push(cleaner);
     saveCleaners(cleaners);
     return cleaner;
  };
`;

if (!content.includes('CLEANERS_KEY')) {
    content = content.replace('const BOOKINGS_KEY', getCleanersLogic + '\n  const BOOKINGS_KEY');
    content = content.replace('window.SP_AUTH = { createBooking', 'window.SP_AUTH = { getCleaners, addCleaner, createBooking');
    fs.writeFileSync(authFile, content, 'utf8');
    console.log("Updated auth.js with fullName and cleaners.");
} else {
    console.log("auth.js already has cleaners.");
}
