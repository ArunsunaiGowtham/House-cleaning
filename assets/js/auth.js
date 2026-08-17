/* SparklePro - auth.js : front-end authentication (localStorage only, no backend). */
(() => {
  "use strict";

  const USERS_KEY = "sp_users";
  const SESSION_KEY = "sp_session";
  const CURRENT_USER_KEY = "currentUser";

  /* ---------------------------------------------------------- */
  /* Storage helpers                                             */
  /* ---------------------------------------------------------- */

  const genId = () => "u_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  const getUsers = () => {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
    catch (e) { return []; }
  };

  const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const seedUsers = () => {
    if (localStorage.getItem(USERS_KEY)) return;
    saveUsers([
      {
        id: "seed_customer_01",
        email: "customer@sparklepro.com", password: "customer123", role: "customer",
        firstName: "Jordan", lastName: "Blake", phone: "+1 800 555 0142",
        address: "42 Willow Lane, Riverside", schedule: "Weekly, Friday morning",
        notes: "Key safe code shared with office. Cat in the house, please keep the front door closed.",
        avatar: "assets/images/avatars/customer-01.webp"
      },
    ]);
  };

  /* ---------------------------------------------------------- */
  /* currentUser - canonical, page-agnostic snapshot of whoever  */
  /* is signed in. Every page reads this instead of hard-coded   */
  /* demo values. Mirrors whichever storage the session lives in */
  /* (localStorage when "remember me" was checked, otherwise     */
  /* sessionStorage) so a refresh always keeps it in sync.       */
  /* ---------------------------------------------------------- */

  const buildCurrentUser = (user) => ({
    id: user.id,
    role: user.role,
    fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    email: user.email,
    phone: user.phone || "",
    avatar: user.avatar || "",
    address: user.address || ""
  });

  const persistCurrentUser = (user, remember) => {
    const currentUser = buildCurrentUser(user);
    localStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(CURRENT_USER_KEY);
    (remember ? localStorage : sessionStorage).setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    return currentUser;
  };

  const getCurrentUser = () => {
    try {
      return JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) ||
        JSON.parse(sessionStorage.getItem(CURRENT_USER_KEY)) || null;
    } catch (e) { return null; }
  };

  const getSession = () => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY)) ||
        JSON.parse(sessionStorage.getItem(SESSION_KEY)) || null;
    } catch (e) { return null; }
  };

  const setSession = (user, remember) => {
    const session = {
      loggedIn: true, id: user.id, role: user.role, email: user.email,
      firstName: user.firstName, lastName: user.lastName, avatar: user.avatar,
      phone: user.phone || "", address: user.address || "",
      schedule: user.schedule || "", notes: user.notes || ""
    };
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, JSON.stringify(session));
    persistCurrentUser(user, remember);
    return session;
  };

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(CURRENT_USER_KEY);
  };

  /* ---------------------------------------------------------- */
  /* Path helpers - template pages live at root or in /admin/    */
  /* ---------------------------------------------------------- */

  const isAdminPage = () => /\/admin\//.test(window.location.pathname);
  const rootPrefix = () => (isAdminPage() ? "../" : "");
  const CUSTOMER_PROTECTED = ["customer-dashboard.html"];

  const currentFile = () => {
    const parts = window.location.pathname.split("/");
    return parts[parts.length - 1] || "index.html";
  };

  /* ---------------------------------------------------------- */
  /* Core auth actions                                           */
  /* ---------------------------------------------------------- */

  const login = (email, password, role, remember) => {
    const user = getUsers().find((u) =>
      u.email.toLowerCase() === String(email).toLowerCase() &&
      u.password === password && u.role === role);
    if (!user) return { ok: false };
    setSession(user, remember);
    return { ok: true, user };
  };

  const registerCustomer = (data) => {
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { ok: false, message: "An account with this email already exists." };
    }
    const user = {
      id: genId(),
      email: data.email, password: data.password, role: "customer",
      firstName: data.firstName, lastName: data.lastName, fullName: data.firstName + " " + data.lastName, phone: data.phone,
      address: "", schedule: "", notes: "",
      avatar: "assets/images/avatars/customer-02.webp"
    };
    users.push(user);
    saveUsers(users);
    setSession(user, true);
    return { ok: true, user };
  };

  const registerAdmin = (data) => {
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { ok: false, message: "An account with this email already exists." };
    }
    const [firstName, ...lastName] = data.fullName.trim().split(/\s+/);
    const user = {
      id: genId(), email: data.email, password: data.password, role: "admin",
      firstName, lastName: lastName.join(" "), phone: "",
      avatar: "assets/images/avatars/team-01.webp"
    };
    users.push(user);
    saveUsers(users);
    return { ok: true, user };
  };

  const logout = () => {
    clearSession();
    window.location.href = rootPrefix() + "login.html";
  };

  const updateProfile = (email, changes) => {
    const users = getUsers();
    const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
    if (idx === -1) return null;
    users[idx] = Object.assign({}, users[idx], changes);
    saveUsers(users);
    const session = getSession();
    if (session) {
      const remembered = !!localStorage.getItem(SESSION_KEY);
      setSession(users[idx], remembered);
    }
    return users[idx];
  };

  /* ---------------------------------------------------------- */
  /* Route guard - runs immediately (script is deferred, so the  */
  /* DOM already exists, minimising any flash of protected UI).  */
  /* ---------------------------------------------------------- */

  const requireAuth = () => {
    const session = getSession();
    const file = currentFile();

    if (isAdminPage()) {
      if (!session || !session.loggedIn) { window.location.replace("../login.html"); return; }
      if (session.role !== "admin") { window.location.replace("../customer-dashboard.html"); return; }
      return;
    }

    if (CUSTOMER_PROTECTED.includes(file)) {
      if (!session || !session.loggedIn) { window.location.replace("login.html"); return; }
      /* Both customer and admin roles may view the customer dashboard. */
    }
  };

  /* ---------------------------------------------------------- */
  /* Navbar - swap "Login" for an avatar + role dropdown       */
  /* ---------------------------------------------------------- */

  const dropdownItems = (role, prefix) => {
    if (role === "admin") {
      return [
        ["Dashboard", prefix + "admin/dashboard.html"],
        ["Bookings", prefix + "admin/bookings.html"],
        ["Customers", prefix + "admin/users.html"],
        ["Cleaners", prefix + "admin/cleaners.html"],
        ["Payments", prefix + "admin/payments.html"],
        ["Messages", prefix + "admin/messages.html"],
        ["Reviews", prefix + "admin/reviews.html"],
        ["Settings", prefix + "admin/settings.html"]
      ];
    }
    return [
      ["Dashboard", prefix + "customer-dashboard.html"],
      ["My Bookings", prefix + "customer-dashboard.html#tabBookings"],
      ["Invoices", prefix + "customer-dashboard.html#tabInvoices"],
      ["Profile", prefix + "customer-dashboard.html#tabProfile"],
      ["Settings", prefix + "customer-dashboard.html#tabProfile"]
    ];
  };

  const buildDropdownMenu = (session, prefix, menuId) => {
    const items = dropdownItems(session.role, prefix)
      .map(([label, href]) => `<li><a class="dropdown-item" href="${href}">${label}</a></li>`)
      .join("");
    return `<ul class="dropdown-menu dropdown-menu-end" id="${menuId}">${items}
      <li><hr class="dropdown-divider"></li>
      <li><button class="dropdown-item" type="button" data-auth-logout>Logout</button></li>
    </ul>`;
  };

  const swapSignInButton = (anchor, session, prefix) => {
    const wrap = document.createElement("div");
    wrap.className = "dropdown";
    wrap.setAttribute("data-auth-nav", "");
    const name = `${session.firstName || ""}`.trim() || session.email;
    wrap.innerHTML = `<button class="btn btn-outline-brand dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <img class="avatar-sm" src="${prefix}${session.avatar || "assets/images/avatars/customer-01.webp"}" width="28" height="28" alt="" style="border-radius:50%">
        <span data-auth-name>${name}</span>
      </button>
      ${buildDropdownMenu(session, prefix, "")}`;
    anchor.replaceWith(wrap);
    const logoutBtn = wrap.querySelector("[data-auth-logout]");
    if (logoutBtn) logoutBtn.addEventListener("click", logout);
  };

  const updateNavbar = () => {
    const session = getSession();
    if (!session || !session.loggedIn) return;
    const prefix = rootPrefix();
    document.querySelectorAll('.site-header a.btn.btn-brand[href="register.html"]').forEach((a) => a.remove());
    document.querySelectorAll("a.btn-outline-brand").forEach((a) => {
      if (a.textContent.trim() === "Login") swapSignInButton(a, session, prefix);
    });
    document.querySelectorAll("[data-auth-nav] [data-auth-name]").forEach((span) => {
      span.textContent = `${session.firstName || ""}`.trim() || session.email;
    });
    document.querySelectorAll("[data-auth-nav] img").forEach((img) => {
      img.src = `${prefix}${session.avatar || "assets/images/avatars/customer-01.webp"}`;
    });
  };

  /* ---------------------------------------------------------- */
  /* Existing admin dashboard chrome (sidebar + topbar dropdown) */
  /* already ships in the template - wire it to the real session */
  /* instead of duplicating the markup.                          */
  /* ---------------------------------------------------------- */

  const initAdminChrome = () => {
    if (!isAdminPage()) return;
    const session = getSession();
    if (!session) return;

    const topbarToggle = document.querySelector(".dash-topbar .dropdown .dropdown-toggle");
    if (topbarToggle) {
      const img = topbarToggle.querySelector("img");
      const nameSpan = topbarToggle.querySelector("span");
      if (img) { img.src = "../" + (session.avatar || "assets/images/avatars/team-01.webp"); img.alt = session.firstName || session.email; }
      if (nameSpan) nameSpan.textContent = `${session.firstName || ""} ${(session.lastName || "").charAt(0)}.`.trim();
    }

    document.querySelectorAll(".dash-topbar .dropdown-item, .dash-nav a").forEach((el) => {
      const label = el.textContent.trim().toLowerCase();
      if (label === "sign out" || label === "logout") {
        el.addEventListener("click", (e) => { e.preventDefault(); logout(); });
      }
    });
  };

  const DASH_TAB_KEY = "sp_dashboard_tab";
  const DASH_TAB_IDS = ["#tabOverview", "#tabBookings", "#tabInvoices", "#tabMessages", "#tabProfile"];

  const activateDashTab = (hash) => {
    const trigger = document.querySelector(`.nav-pills[role="tablist"] [data-bs-target="${hash}"]`);
    if (trigger && window.bootstrap) {
      bootstrap.Tab.getOrCreateInstance(trigger).show();
      return true;
    }
    return false;
  };

  const initCustomerDashboardChrome = () => {
    if (isAdminPage() || currentFile() !== "customer-dashboard.html") return;

    const tabButtons = document.querySelectorAll('.nav-pills[role="tablist"] [data-bs-toggle="tab"]');
    if (!tabButtons.length) return;

    /* Reopen whichever tab was last active: the URL hash wins if it   */
    /* names a real tab, otherwise fall back to the tab remembered for */
    /* this browser session (so a plain refresh still lands correctly).*/
    const hashIsValidTab = DASH_TAB_IDS.includes(window.location.hash);
    const storedHash = sessionStorage.getItem(DASH_TAB_KEY);
    const targetHash = hashIsValidTab ? window.location.hash
      : (storedHash && DASH_TAB_IDS.includes(storedHash) ? storedHash : "");

    if (targetHash && targetHash !== "#tabOverview") {
      activateDashTab(targetHash);
    }
    if (targetHash && window.location.hash !== targetHash) {
      window.history.replaceState(null, "", targetHash);
    }
    sessionStorage.setItem(DASH_TAB_KEY, targetHash || "#tabOverview");

    /* Keep the URL hash + session memory in sync with the visible tab, */
    /* without ever reloading the page or jumping the scroll position.  */
    tabButtons.forEach((btn) => {
      btn.addEventListener("shown.bs.tab", (e) => {
        const hash = e.target.getAttribute("data-bs-target");
        if (!hash) return;
        if (window.location.hash !== hash) window.history.replaceState(null, "", hash);
        sessionStorage.setItem(DASH_TAB_KEY, hash);
      });
    });

    window.addEventListener("hashchange", () => {
      const hash = window.location.hash;
      if (DASH_TAB_IDS.includes(hash)) {
        activateDashTab(hash);
      }
    });
  };

  /* ---------------------------------------------------------- */
  /* Login page                                                   */
  /* ---------------------------------------------------------- */

  const initLoginPage = () => {
    const heading = document.getElementById("authHeading");
    const sub = document.getElementById("authSub");
    const customerTab = document.getElementById("customerTabBtn");
    const adminTab = document.getElementById("adminTabBtn");
    if (customerTab && heading) {
      customerTab.addEventListener("shown.bs.tab", () => {
        heading.textContent = "Welcome back";
        sub.textContent = "Login to manage your bookings, invoices and preferences.";
      });
    }
    if (adminTab && heading) {
      adminTab.addEventListener("shown.bs.tab", () => {
        heading.textContent = "Admin sign in";
        sub.textContent = "Restricted area for SparklePro administrators only.";
      });
    }
    if (window.location.hash === "#admin-login" && adminTab && window.bootstrap) {
      bootstrap.Tab.getOrCreateInstance(adminTab).show();
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!loginForm.checkValidity()) { loginForm.classList.add("was-validated"); return; }
        const email = document.getElementById("loginEmail").value;
        const pass = document.getElementById("loginPass").value;
        const remember = document.getElementById("remember").checked;
        const errorBox = document.getElementById("loginError");
        const result = login(email, pass, "customer", remember);
        if (!result.ok) { errorBox.hidden = false; return; }
        errorBox.hidden = true;
        const successBox = document.getElementById("successMessage");
        if (successBox) successBox.hidden = false;
        window.setTimeout(() => { window.location.href = "customer-dashboard.html"; }, 500);
      });
    }

    const adminLoginForm = document.getElementById("adminLoginForm");
    if (adminLoginForm) {
      adminLoginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!adminLoginForm.checkValidity()) { adminLoginForm.classList.add("was-validated"); return; }
        const email = document.getElementById("adminEmail").value;
        const pass = document.getElementById("adminPass").value;
        const remember = document.getElementById("adminRemember").checked;
        const errorBox = document.getElementById("adminLoginError");
        const result = login(email, pass, "admin", remember);
        if (!result.ok) { errorBox.hidden = false; return; }
        errorBox.hidden = true;
        const successBox = document.getElementById("adminSuccessMessage");
        if (successBox) successBox.hidden = false;
        window.setTimeout(() => { window.location.href = "admin/dashboard.html"; }, 500);
      });
    }
  };

  /* ---------------------------------------------------------- */
  /* Register page                                                */
  /* ---------------------------------------------------------- */

  const initRegisterPage = () => {
    const form = document.getElementById("registerForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const pass = document.getElementById("regPass");
      const pass2 = document.getElementById("regPass2");
      pass2.setCustomValidity(pass.value !== pass2.value ? "mismatch" : "");
      if (!form.checkValidity()) { form.classList.add("was-validated"); return; }

      const errorBox = document.getElementById("registerError");
      const result = registerCustomer({
        firstName: document.getElementById("regFirstName").value.trim(),
        lastName: document.getElementById("regLastName").value.trim(),
        email: document.getElementById("regEmail").value.trim(),
        phone: document.getElementById("regPhone").value.trim(),
        password: pass.value
      });
      if (!result.ok) {
        errorBox.textContent = result.message;
        errorBox.hidden = false;
        return;
      }
      errorBox.hidden = true;
      const successBox = document.getElementById("successMessage");
      if (successBox) successBox.hidden = false;
      window.setTimeout(() => { window.location.href = "customer-dashboard.html"; }, 500);
    });

    document.getElementById("regPass2")?.addEventListener("input", function () { this.setCustomValidity(""); });
  };

  const initAdminRegisterPage = () => {
    const form = document.getElementById("adminRegisterForm");
    if (!form) return;
    const email = document.getElementById("adminRegEmail");
    const pass = document.getElementById("adminRegPass");
    const pass2 = document.getElementById("adminRegPass2");
    const emailFeedback = email?.closest(".mb-3")?.querySelector(".invalid-feedback");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      pass2.setCustomValidity(pass.value !== pass2.value ? "Passwords do not match." : "");
      if (!form.checkValidity()) { form.classList.add("was-validated"); return; }

      const result = registerAdmin({
        fullName: document.getElementById("adminRegName").value.trim(),
        email: email.value.trim(),
        password: pass.value
      });
      if (!result.ok) {
        email.setCustomValidity(result.message);
        if (emailFeedback) emailFeedback.textContent = result.message;
        form.classList.add("was-validated");
        return;
      }
      const successBox = document.getElementById("adminRegisterSuccess");
      if (successBox) { successBox.hidden = false; successBox.focus?.(); }
      window.setTimeout(() => { window.location.href = "login.html#admin-login"; }, 750);
    });

    email?.addEventListener("input", () => {
      email.setCustomValidity("");
      if (emailFeedback) emailFeedback.textContent = "Enter a valid email address.";
    });
    pass2?.addEventListener("input", () => pass2.setCustomValidity(""));
  };

  /* ---------------------------------------------------------- */
  /* Customer profile form (customer-dashboard.html)              */
  /* ---------------------------------------------------------- */

  const initProfileForm = () => {
    const form = document.getElementById("profileForm");
    if (!form) return;
    const session = getSession();
    if (!session) return;
    const currentUser = getCurrentUser() || buildCurrentUser(session);

    const nameField = document.getElementById("pfName");
    const mailField = document.getElementById("pfMail");
    const phoneField = document.getElementById("pfPhone");
    const addrField = document.getElementById("pfAddr");
    const scheduleField = document.getElementById("pfSchedule");
    const notesField = document.getElementById("pfNotes");
    const alertBox = form.querySelector("[data-form-alert]");

    /* Always load the signed-in user's own data - never a template  */
    /* placeholder - regardless of what the static markup shipped.   */
    if (nameField) nameField.value = currentUser.fullName || "";
    if (mailField) mailField.value = currentUser.email || "";
    if (phoneField) phoneField.value = currentUser.phone || "";
    if (addrField) addrField.value = currentUser.address || "";
    if (scheduleField && session.schedule) scheduleField.value = session.schedule;
    if (notesField) notesField.value = session.notes || "";

    /* Card holder name on the payment modal should also reflect the  */
    /* real user, not the template's demo name.                       */
    const cardHolder = document.getElementById("cardHolder");
    if (cardHolder && !cardHolder.value) cardHolder.value = currentUser.fullName || "";

    let currentEmail = session.email;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!form.checkValidity()) { form.classList.add("was-validated"); return; }
      const [firstName, ...rest] = (nameField.value || "").trim().split(" ");
      updateProfile(currentEmail, {
        firstName: firstName || session.firstName,
        lastName: rest.join(" ") || session.lastName,
        email: mailField ? mailField.value.trim() || currentEmail : currentEmail,
        phone: phoneField ? phoneField.value : session.phone,
        address: addrField ? addrField.value : session.address,
        schedule: scheduleField ? scheduleField.value : session.schedule,
        notes: notesField ? notesField.value : session.notes
      });
      currentEmail = mailField ? (mailField.value.trim() || currentEmail) : currentEmail;
      updateNavbar();
      if (cardHolder) cardHolder.value = nameField ? nameField.value : cardHolder.value;
      if (alertBox) {
        alertBox.hidden = false;
        alertBox.focus?.();
        window.clearTimeout(alertBox._spHideTimer);
        alertBox._spHideTimer = window.setTimeout(() => { alertBox.hidden = true; }, 3500);
      }
    });
  };

  /* ---------------------------------------------------------- */
  /* Boot                                                         */
  /* ---------------------------------------------------------- */

  seedUsers();
  requireAuth();
  updateNavbar();
  initAdminChrome();

  const onReady = (fn) => document.readyState !== "loading"
    ? fn() : document.addEventListener("DOMContentLoaded", fn);

  onReady(() => {
    initLoginPage();
    initRegisterPage();
    initAdminRegisterPage();
    initProfileForm();
    initCustomerDashboardChrome();
  });

  document.getElementById("paymentModal")?.addEventListener("show.bs.modal", () => {
    const cardHolder = document.getElementById("cardHolder");
    if (!cardHolder || cardHolder.value) return;
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.fullName) cardHolder.value = currentUser.fullName;
  });

  
  /* ---------------------------------------------------------- */
  /* Data Management (Bookings, Invoices, Messages)              */
  /* ---------------------------------------------------------- */
  
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
  

  window.SP_AUTH = { getCleaners, addCleaner, createBooking, getBookings, getInvoices, getBookingsForUser, getInvoicesForUser, getUsers, login, logout, registerCustomer, getSession, updateProfile, getCurrentUser };
})();
