/*!
 * SparklePro — Service Details data
 * One entry per service. service-details.html reads ?service=<slug> and
 * renders this object into the page (details.js). Add a new service by
 * adding a new key here — no HTML edits required.
 */
window.SP_SERVICES = {

  /* ================= 1. RESIDENTIAL CLEANING ================= */
  "residential-cleaning": {
    label: "Residential Cleaning",
    heroTagline: "Regular home cleaning that keeps up with real family life.",
    price: 89,
    priceNote: "Fixed price for homes up to 3 bedrooms. Weekly, fortnightly or monthly plans available.",
    heroImage: "assets/images/services/living-room-cleaning.webp",
    heroAlt: "Professional cleaner tidying and cleaning a bright family living room",
    metaTitle: "Residential Cleaning Service | SparklePro",
    metaDescription: "Trusted weekly and fortnightly residential cleaning for houses, apartments and villas. Fixed pricing, vetted cleaners, free re-clean guarantee.",
    crew: "1&ndash;2 person crew, 1.5&ndash;3 hours",
    overview: [
      "Our residential cleaning plan is built for households that want a consistently tidy home without adding another chore to the calendar. The same cleaner or crew is assigned to your property so they learn your layout, your products and your preferences visit after visit.",
      "Every room in daily use is covered &mdash; living areas, bedrooms, kitchen and bathrooms &mdash; with dusting, vacuuming, mopping and surface sanitising as standard. It slots in on a weekly, fortnightly or monthly rhythm around your schedule."
    ],
    benefits: [
      { icon: "bi-house-heart", title: "A healthier home", text: "Regular dusting and vacuuming cuts allergens and keeps indoor air noticeably fresher." },
      { icon: "bi-calendar2-week", title: "Flexible plans", text: "Weekly, fortnightly or monthly visits &mdash; pause or reschedule anytime from your dashboard." },
      { icon: "bi-person-check", title: "Consistent cleaner", text: "You get the same trusted, background-checked technician on every visit whenever possible." },
      { icon: "bi-leaf", title: "Eco-friendly products", text: "Plant-based, fragrance-light cleaning products that are safe around kids and pets." }
    ],
    checklist: [
      "Living and dining areas dusted, vacuumed and mopped",
      "All bedrooms tidied, dusted and floors cleaned",
      "Kitchen counters, sink, stovetop and outside of appliances wiped",
      "Bathrooms cleaned, disinfected and mirrors polished",
      "Skirting boards, door handles and light switches wiped",
      "Beds made and cushions straightened",
      "Bins emptied and relined throughout",
      "Final walkthrough photographed for your account"
    ],
    gallery: {
      beforeImg: "assets/images/hero/hero-cleaning.webp",
      beforeAlt: "Living room before the SparklePro residential clean",
      afterImg: "assets/images/services/living-room-cleaning.webp",
      afterAlt: "Same living room refreshed after a SparklePro residential clean"
    },
    faq: [
      { q: "How often can I book a residential clean?", a: "Weekly, fortnightly or monthly &mdash; whichever fits your household. Most families start fortnightly and adjust after the first two visits." },
      { q: "Do I need to provide cleaning supplies?", a: "No. Your cleaner brings professional-grade, eco-friendly products and equipment. If you prefer we use a specific product you already own, just leave a note in your dashboard." },
      { q: "Can I get the same cleaner every time?", a: "Yes, we assign a regular technician wherever possible so they get to know your home and preferences." },
      { q: "What if I need to skip a visit?", a: "Pause, reschedule or cancel any upcoming visit from your account up to 24 hours in advance at no charge." }
    ],
    reviews: [
      { name: "Marta Delgado", role: "Homeowner, Riverside", avatar: "assets/images/testimonials/customer-01.webp", quote: "Same cleaner every fortnight, and my house genuinely feels lighter. Booking takes thirty seconds in the app." },
      { name: "Ben Okafor", role: "Parent of three, Northgate", avatar: "assets/images/testimonials/customer-02.webp", quote: "With three kids the house never stays tidy for long, but this keeps the baseline high enough that I stopped stressing about it." },
      { name: "Hana Suzuki", role: "Apartment owner, Elmwood", avatar: "assets/images/testimonials/customer-03.webp", quote: "Reliable, polite, and the bathroom shines every single visit. Worth every dollar." }
    ],
    related: ["apartment-cleaning", "deep-cleaning", "kitchen-cleaning", "bathroom-cleaning"],
    sidebarBullets: ["Products and equipment included", "Same cleaner on repeat visits", "Free re-clean guarantee"]
  },

  /* ================= 2. APARTMENT CLEANING ================= */
  "apartment-cleaning": {
    label: "Apartment Cleaning",
    heroTagline: "Fast, thorough cleaning built for compact city living.",
    price: 79,
    priceNote: "Fixed price for studios and 1&ndash;2 bedroom apartments. Larger units quoted at checkout.",
    heroImage: "assets/images/services/gallery-01.webp",
    heroAlt: "Cleaner mopping the polished hallway floor of a modern apartment",
    metaTitle: "Apartment Cleaning Service | SparklePro",
    metaDescription: "Efficient apartment and condo cleaning for studios and flats. Building-access friendly scheduling, fixed pricing and a free re-clean guarantee.",
    crew: "1 person crew, 1&ndash;2 hours",
    overview: [
      "Apartments have their own rhythm &mdash; smaller footprints, shared entrances, building access windows and, often, less storage for cleaning supplies. Our apartment plan is scoped and priced for exactly that, so you're never paying for a house-sized visit you don't need.",
      "One technician works quickly and quietly through every room, coordinating around concierge hours, elevator bookings or door codes so nothing slows down your day."
    ],
    benefits: [
      { icon: "bi-building", title: "Compact-space specialists", text: "Efficient routines designed around studios, flats and condos rather than scaled-down house plans." },
      { icon: "bi-clock-history", title: "In and out fast", text: "Most apartments are fully cleaned in under two hours with zero disruption to neighbours." },
      { icon: "bi-key", title: "Building-friendly access", text: "We work with concierge sign-in, key lockers or door codes &mdash; just tell us the process at booking." },
      { icon: "bi-tag", title: "Right-sized pricing", text: "You pay for the square footage you actually have, not a generic house rate." }
    ],
    checklist: [
      "Living area and bedroom dusted and vacuumed",
      "Hard floors mopped edge to edge, including entryway",
      "Kitchenette counters, sink and stovetop degreased",
      "Bathroom disinfected, mirror and fixtures polished",
      "Balcony or entry mat swept if accessible",
      "Interior windows and glass doors wiped",
      "Rubbish and recycling taken to the chute or bin room",
      "Final photo check-in sent to your dashboard"
    ],
    gallery: {
      beforeImg: "assets/images/hero/commercial-hero.webp",
      beforeAlt: "Apartment entryway before the visit",
      afterImg: "assets/images/services/gallery-01.webp",
      afterAlt: "Apartment hallway with a freshly mopped, shining floor"
    },
    faq: [
      { q: "Can you get into my building?", a: "Yes. Tell us your access method &mdash; concierge, key locker, smart lock or door code &mdash; when you book and we'll follow it exactly." },
      { q: "Is this different from residential cleaning?", a: "It's the same quality standard scaled and priced for smaller apartments, with routines optimised for compact layouts." },
      { q: "How long will the cleaner be there?", a: "Typically one to two hours depending on size, so it's easy to book around a lunch break or work-from-home morning." },
      { q: "Do you clean balconies?", a: "Small balconies and terraces are swept and wiped down as part of the standard visit at no extra cost." }
    ],
    reviews: [
      { name: "Leo Fischer", role: "Renter, Midtown Lofts", avatar: "assets/images/testimonials/customer-02.webp", quote: "They coordinated with my building's key locker without a single hiccup and left the place spotless in under two hours." },
      { name: "Aisha Rahman", role: "Studio owner, Harbor View", avatar: "assets/images/testimonials/customer-03.webp", quote: "Finally a service that doesn't charge me house-sized prices for a 500 square foot studio." },
      { name: "Tom Bricker", role: "Condo owner, The Regent", avatar: "assets/images/testimonials/customer-01.webp", quote: "Quiet, quick and considerate of the neighbours. Exactly what apartment living needs." }
    ],
    related: ["residential-cleaning", "move-in-cleaning", "move-out-cleaning", "window-cleaning"],
    sidebarBullets: ["Concierge & key-locker friendly", "One-hour arrival window", "Free re-clean guarantee"]
  },

  /* ================= 3. DEEP CLEANING ================= */
  "deep-cleaning": {
    label: "Deep Cleaning",
    heroTagline: "A full-property reset that reaches the places a weekly clean never gets to.",
    price: 179,
    priceNote: "Fixed price for homes up to three bedrooms. Larger properties quoted instantly at checkout.",
    heroImage: "assets/images/services/deep-cleaning.webp",
    heroAlt: "Technician steam cleaning a bedroom carpet during a deep clean",
    metaTitle: "Deep Cleaning Service Details | SparklePro",
    metaDescription: "See exactly what a SparklePro deep clean includes: full checklist, before and after results, pricing, FAQs and verified customer reviews.",
    crew: "2 person crew, 5&ndash;7 hours",
    overview: [
      "Our deep clean is a scheduled, methodical reset of the entire property. Two technicians work room by room against a written specification, starting high and finishing at floor level so nothing is re-soiled. Expect between five and seven hours on site for a typical three-bedroom home.",
      "It is the right choice before guests arrive, after building work, at the start of a tenancy, or once or twice a year alongside a regular fortnightly clean."
    ],
    benefits: [
      { icon: "bi-wind", title: "Cleaner indoor air", text: "HEPA filtration removes settled dust, dander and pollen rather than redistributing it." },
      { icon: "bi-hourglass-split", title: "Longer-lasting finish", text: "Descaling and degreasing at the source means surfaces stay clean for weeks, not days." },
      { icon: "bi-house-heart", title: "Protects your home", text: "Limescale, mould and grease all shorten the life of fittings. Removing them saves repairs." },
      { icon: "bi-emoji-smile", title: "A genuine reset", text: "Maintenance cleaning is far easier once a property has been brought back to baseline." }
    ],
    checklist: [
      "All floors vacuumed and mopped with colour-coded microfibre",
      "Skirting boards, door frames and switch plates wiped",
      "Kitchen worktops degreased and appliance exteriors polished",
      "Bathroom descaled, grout treated and glass buffed streak-free",
      "Interior windows, sills and reachable ledges cleaned",
      "Beds made, cushions dressed and bins emptied and relined",
      "Air vents and extractor grilles dusted",
      "Final walkthrough photographed for your account"
    ],
    gallery: {
      beforeImg: "assets/images/services/post-construction-cleaning.webp",
      beforeAlt: "Dusty room before the deep cleaning visit",
      afterImg: "assets/images/services/living-room-cleaning.webp",
      afterAlt: "The same style of room after a SparklePro deep clean"
    },
    faq: [
      { q: "Do I need to be home during the clean?", a: "No. Around 70% of our clients give us secure key access or a smart-lock code. You will get an arrival notification, a completion photo report and a summary in your dashboard." },
      { q: "Are your cleaning products safe for children and pets?", a: "Yes. Our standard kit is fragrance-light and plant-based. If anyone in the home has asthma or an allergy, flag it at booking and we will switch to our hypoallergenic range at no charge." },
      { q: "What happens if I am not happy with the result?", a: "Tell us within 24 hours and we return to re-clean the affected areas free of charge. If you are still unhappy, that visit is refunded in full." },
      { q: "Are your cleaners insured and background checked?", a: "Every technician is employed directly, right-to-work verified, criminal-record checked and covered by our public liability and accidental damage policy." }
    ],
    reviews: [
      { name: "Sofia Mendes", role: "Homeowner, Riverside", avatar: "assets/images/testimonials/customer-01.webp", quote: "They rebuilt my weekends. The same two cleaners arrive every fortnight, they know exactly how I like the kitchen left, and the app reminder means I never think about it again." },
      { name: "Daniel Okafor", role: "Landlord, 6 properties", avatar: "assets/images/testimonials/customer-02.webp", quote: "Move-out cleans used to cost me deposit arguments. Since switching to SparklePro I have had zero deductions disputed in eighteen months." },
      { name: "Priya Raman", role: "Office Manager, Northgate", avatar: "assets/images/testimonials/customer-03.webp", quote: "Forty desks, two kitchens and a client floor cleaned before 8am every day. Invoices are clear and the supervisor answers the phone. That is rarer than it should be." }
    ],
    related: ["residential-cleaning", "post-construction-cleaning", "carpet-cleaning", "disinfection"],
    sidebarBullets: ["Products and equipment included", "2-person crew, 5&ndash;7 hours", "Free re-clean guarantee"]
  },

  /* ================= 4. MOVE IN CLEANING ================= */
  "move-in-cleaning": {
    label: "Move In Cleaning",
    heroTagline: "Start life in your new home on a genuinely clean surface.",
    price: 159,
    priceNote: "Fixed price for empty properties up to three bedrooms. Furnished moves quoted at checkout.",
    heroImage: "assets/images/services/move-in-cleaning.webp",
    heroAlt: "Cleaner wiping down kitchen cabinets in an empty apartment before move in",
    metaTitle: "Move In Cleaning Service | SparklePro",
    metaDescription: "Move into a genuinely clean home. Cabinets, appliances, floors and bathrooms fully sanitised before your furniture arrives.",
    crew: "2 person crew, 3&ndash;5 hours",
    overview: [
      "You never really know how clean a property is until it's empty. Our move-in clean is timed for exactly that window &mdash; after the previous occupant has moved out and before your furniture arrives &mdash; so every cabinet, drawer and corner can be reached.",
      "We treat it as a blank-slate deep clean: cupboards are emptied and wiped inside and out, appliances are degreased, and every surface is sanitised so your first night is spent settling in, not scrubbing."
    ],
    benefits: [
      { icon: "bi-house-check", title: "Truly empty-property access", text: "No furniture to work around means every inch of cabinets, closets and floors gets attention." },
      { icon: "bi-shield-check", title: "Sanitised from day one", text: "Kitchens and bathrooms are disinfected before anything you own touches them." },
      { icon: "bi-box-seam", title: "Ready for the movers", text: "Book it the day before your move so floors are dry and surfaces are clear when boxes arrive." },
      { icon: "bi-cash-coin", title: "Fixed, upfront pricing", text: "One quote for the whole property, confirmed before the crew arrives &mdash; no surprises." }
    ],
    checklist: [
      "Interior and exterior of all kitchen cabinets and drawers wiped",
      "Oven, hob, extractor and refrigerator interior degreased",
      "Bathrooms fully disinfected, grout treated and mirrors polished",
      "All floors vacuumed and mopped, including closets",
      "Light fixtures, switch plates and door handles wiped",
      "Interior windows and window tracks cleaned",
      "Skirting boards and vents dusted throughout",
      "Final photo walkthrough shared before handover"
    ],
    gallery: {
      beforeImg: "assets/images/services/post-construction-cleaning.webp",
      beforeAlt: "Empty room with dust still visible before a move-in clean",
      afterImg: "assets/images/services/move-in-cleaning.webp",
      afterAlt: "Same empty room sanitised and ready for move-in day"
    },
    faq: [
      { q: "Should I book this before or after the movers?", a: "Always before. We recommend scheduling it for the day or morning before your furniture is delivered so nothing is in the way." },
      { q: "Do you clean inside cabinets and closets?", a: "Yes, that's the core of this service. Every drawer, cupboard and closet is opened, wiped inside and out, and left ready to use." },
      { q: "Can you match my move-in inspection checklist?", a: "Upload your property manager's checklist at booking and we'll work through it item by item." },
      { q: "What if the previous tenant left items behind?", a: "Let us know at booking. Light rubbish removal can be added; larger clearances are quoted separately." }
    ],
    reviews: [
      { name: "Grace Lin", role: "First-time buyer, Elmwood", avatar: "assets/images/testimonials/customer-03.webp", quote: "Opened every cabinet expecting to clean it myself and every single one was already spotless. Best money I spent on the move." },
      { name: "Marcus Webb", role: "Relocating tenant", avatar: "assets/images/testimonials/customer-02.webp", quote: "Booked it for the morning before the moving truck arrived and the timing worked perfectly." },
      { name: "Noor Haddad", role: "New homeowner, Brookfield", avatar: "assets/images/testimonials/customer-01.webp", quote: "The oven and fridge looked brand new. I didn't think that was possible in a resale home." }
    ],
    related: ["deep-cleaning", "disinfection", "window-cleaning", "kitchen-cleaning"],
    sidebarBullets: ["Empty-property specialists", "2-person crew, 3&ndash;5 hours", "Free re-clean guarantee"]
  },

  /* ================= 5. MOVE OUT CLEANING ================= */
  "move-out-cleaning": {
    label: "Move Out Cleaning",
    heroTagline: "Deposit-back standard cleaning, checked against landlord inventories.",
    price: 165,
    priceNote: "Fixed price for empty properties up to three bedrooms. Inventory-matched checklists on request.",
    heroImage: "assets/images/services/blog-move-out-guide.webp",
    heroAlt: "Cleaner completing a final inspection-ready clean of an empty apartment",
    metaTitle: "Move Out Cleaning Service | SparklePro",
    metaDescription: "End-of-tenancy cleaning built around landlord inspections and deposit returns, with photo evidence for every room.",
    crew: "2 person crew, 4&ndash;6 hours",
    overview: [
      "Move-out cleaning is judged by someone else's checklist, not yours &mdash; a landlord, letting agent or inventory clerk. We clean to that standard, working from your tenancy agreement or inventory report wherever one is provided.",
      "Every visit ends with a dated photo record of each room, so you have evidence of condition on the day you handed the keys back, ready to share if a deduction is ever disputed."
    ],
    benefits: [
      { icon: "bi-clipboard-check", title: "Inventory-matched", text: "Send us the move-out checklist and we clean and photograph against it item by item." },
      { icon: "bi-camera", title: "Photo evidence included", text: "A dated photo report of every room is added to your account for deposit disputes." },
      { icon: "bi-cash-stack", title: "Protects your deposit", text: "Landlords consistently rate SparklePro move-out cleans as inspection-ready." },
      { icon: "bi-truck", title: "Timed around your move", text: "Book for after the removal van leaves so the whole property can be reached." }
    ],
    checklist: [
      "All rooms vacuumed, mopped and dusted top to bottom",
      "Kitchen degreased including oven, hob and extractor",
      "Bathrooms descaled, disinfected and grout treated",
      "Inside of all cabinets, wardrobes and drawers wiped",
      "Skirting boards, doors and switch plates cleaned",
      "Interior windows and sills cleaned",
      "Carpets vacuumed edge to edge, marks spot-treated",
      "Dated photo report generated for every room"
    ],
    gallery: {
      beforeImg: "assets/images/services/blog-move-out-guide.webp",
      beforeAlt: "Empty apartment ready for a final move-out inspection",
      afterImg: "assets/images/services/window-cleaning.webp",
      afterAlt: "Streak-free windows as part of the move-out standard"
    },
    faq: [
      { q: "Will this satisfy my landlord's inspection?", a: "We clean to standard end-of-tenancy specifications and provide a photo report. Send us your inventory or checklist in advance and we'll follow it exactly." },
      { q: "What if my landlord still deducts from my deposit?", a: "Share the deduction note within 7 days of your visit and, if it relates to an area we covered, we'll return to re-clean it free of charge." },
      { q: "Do you remove rubbish left behind?", a: "Small amounts of rubbish are cleared as standard. Larger clearances can be added as an extra at booking." },
      { q: "Can this be booked on short notice?", a: "Next-day slots are usually available; same-day slots depend on your area and time of booking." }
    ],
    reviews: [
      { name: "Owen Castillo", role: "Outgoing tenant, Brookfield", avatar: "assets/images/testimonials/customer-02.webp", quote: "Got my full deposit back for the first time in three moves. The photo report made the whole handover painless." },
      { name: "Ines Torres", role: "Letting agent", avatar: "assets/images/testimonials/customer-03.webp", quote: "I recommend SparklePro to every outgoing tenant now. Inspections pass first time far more often." },
      { name: "Kwame Boateng", role: "Landlord, 3 units", avatar: "assets/images/testimonials/customer-01.webp", quote: "Consistent, inspection-ready results without me having to be on site to check." }
    ],
    related: ["deep-cleaning", "carpet-cleaning", "window-cleaning", "disinfection"],
    sidebarBullets: ["Inventory-checklist matching", "Dated photo report included", "Free re-clean guarantee"]
  },

  /* ================= 6. OFFICE CLEANING ================= */
  "office-cleaning": {
    label: "Office Cleaning",
    heroTagline: "Out-of-hours commercial cleaning for teams of 5 to 500.",
    price: 129,
    priceNote: "From $129 per visit for small offices. Larger floors and nightly contracts quoted on request.",
    heroImage: "assets/images/services/office-cleaning.webp",
    heroAlt: "Cleaner wiping down desks and workstations in a modern open-plan office",
    metaTitle: "Office Cleaning Service | SparklePro",
    metaDescription: "Commercial office cleaning scheduled around your business hours, with desks, kitchens, washrooms and client areas covered.",
    crew: "Team sized to your floor plan, scheduled out of hours",
    overview: [
      "Commercial cleaning has different priorities to a home: shared kitchens, washrooms used by dozens of people, meeting rooms that need to look client-ready every morning, and a schedule that can't interrupt the working day.",
      "We build a nightly, weekly or custom rota around your business hours, with a dedicated supervisor for accounts of any size and a consistent crew who become familiar with your floor."
    ],
    benefits: [
      { icon: "bi-briefcase", title: "Zero disruption", text: "Cleaning happens before opening or after close, never during core business hours." },
      { icon: "bi-person-badge", title: "Dedicated supervisor", text: "One point of contact who manages your rota, invoicing and any special requests." },
      { icon: "bi-graph-up", title: "Scales with your team", text: "From a 5-desk studio to a 500-seat floor, crew size and visit frequency flex with you." },
      { icon: "bi-file-earmark-text", title: "Clear invoicing", text: "One monthly invoice covering every visit, with usage reports available on request." }
    ],
    checklist: [
      "Desks, phones and shared surfaces wiped and sanitised",
      "Meeting rooms cleaned and reset between bookings",
      "Kitchen and breakout areas cleaned, dishes and surfaces sanitised",
      "Washrooms fully cleaned, restocked and disinfected",
      "Floors vacuumed and hard floors mopped or buffed",
      "Bins emptied and recycling sorted",
      "Glass partitions and entrance doors polished",
      "Reception and client-facing areas prioritised first"
    ],
    gallery: {
      beforeImg: "assets/images/hero/commercial-hero.webp",
      beforeAlt: "Open-plan office before the evening clean",
      afterImg: "assets/images/services/office-cleaning.webp",
      afterAlt: "Same office floor cleaned and reset for the next working day"
    },
    faq: [
      { q: "Can cleaning happen outside business hours?", a: "Yes, most commercial contracts are scheduled before opening or after close specifically to avoid disrupting your team." },
      { q: "How is pricing worked out for offices?", a: "Based on floor size, visit frequency and specific areas like washrooms or kitchens. You'll get a fixed quote before signing." },
      { q: "Do you provide a dedicated account manager?", a: "Every commercial contract gets a supervisor who manages scheduling, quality checks and any change requests." },
      { q: "Can we adjust the schedule seasonally?", a: "Yes, rotas can flex around headcount changes, events or seasonal occupancy with notice." }
    ],
    reviews: [
      { name: "Priya Raman", role: "Office Manager, Northgate", avatar: "assets/images/testimonials/customer-03.webp", quote: "Forty desks, two kitchens and a client floor cleaned before 8am every day. Invoices are clear and the supervisor answers the phone." },
      { name: "Jonas Weber", role: "Facilities Lead, tech startup", avatar: "assets/images/testimonials/customer-02.webp", quote: "Scaled from a 12-desk office to 80 seats and the transition to a bigger crew was seamless." },
      { name: "Chidi Nwosu", role: "Operations Director", avatar: "assets/images/testimonials/customer-01.webp", quote: "Washrooms are the real test for any office cleaner and this team never lets standards slip." }
    ],
    related: ["disinfection", "window-cleaning", "carpet-cleaning", "eco-friendly-cleaning"],
    sidebarBullets: ["Out-of-hours scheduling", "Dedicated account supervisor", "Free re-clean guarantee"]
  },

  /* ================= 7. KITCHEN CLEANING ================= */
  "kitchen-cleaning": {
    label: "Kitchen Cleaning",
    heroTagline: "Grease, grime and built-up residue removed from every surface.",
    price: 99,
    priceNote: "Fixed price for a standard kitchen. Larger commercial kitchens quoted separately.",
    heroImage: "assets/images/services/kitchen-cleaning.webp",
    heroAlt: "Cleaner degreasing a kitchen countertop and stovetop",
    metaTitle: "Kitchen Cleaning Service | SparklePro",
    metaDescription: "Deep kitchen cleaning covering cabinets, countertops, appliances and grout, with grease removal that regular wiping can't achieve.",
    crew: "1 person crew, 2&ndash;3 hours",
    overview: [
      "Kitchens accumulate the kind of grease and residue that a quick wipe-down never fully removes &mdash; on cabinet fronts, behind appliances, and in the grout lines around the hob. This service is a focused, room-specific deep clean rather than a whole-house visit.",
      "We degrease every surface, clean inside the oven and refrigerator on request, and treat grout and tile so the room doesn't just look clean, it stays that way longer."
    ],
    benefits: [
      { icon: "bi-droplet", title: "Real grease removal", text: "Purpose-made degreasers cut through baked-on residue that everyday sprays can't touch." },
      { icon: "bi-fire", title: "Oven & hob detailing", text: "Interior oven and hob cleaning available as an add-on for a true deep reset." },
      { icon: "bi-grid-3x3", title: "Grout and tile care", text: "Splashback and floor grout is scrubbed and treated, not just surface-wiped." },
      { icon: "bi-heart-pulse", title: "Food-safe products", text: "Everything used is safe for surfaces where food is prepared." }
    ],
    checklist: [
      "Countertops, backsplash and cabinet fronts degreased",
      "Sink descaled and taps polished",
      "Stovetop, hob and range hood filters cleaned",
      "Exterior of refrigerator, dishwasher and microwave wiped",
      "Floor mopped including under reachable appliances",
      "Grout and tile spot-treated",
      "Bins emptied and area sanitised",
      "Oven interior available as an add-on"
    ],
    gallery: {
      beforeImg: "assets/images/services/deep-cleaning.webp",
      beforeAlt: "Kitchen with built-up grease before the visit",
      afterImg: "assets/images/services/kitchen-cleaning.webp",
      afterAlt: "Same kitchen with countertops and stovetop fully degreased"
    },
    faq: [
      { q: "Do you clean inside the oven?", a: "Interior oven cleaning is available as an add-on at booking so you only pay for it when you need it." },
      { q: "Can this be added to a residential clean?", a: "Yes, kitchen cleaning can be booked as its own visit or bundled with a residential or deep clean at a discount." },
      { q: "Are your degreasers safe on all surfaces?", a: "We match products to your surface type &mdash; stainless steel, laminate, stone or tile &mdash; flag any delicate finishes at booking." },
      { q: "How long does a kitchen clean take?", a: "Most standard kitchens are completed in two to three hours depending on size and add-ons selected." }
    ],
    reviews: [
      { name: "Elena Kowalski", role: "Homeowner, Brookfield", avatar: "assets/images/testimonials/customer-01.webp", quote: "The range hood filter hadn't been properly cleaned in years and it looked new afterward." },
      { name: "Ravi Chandran", role: "Café owner", avatar: "assets/images/testimonials/customer-02.webp", quote: "Booked this before a health inspection and passed with the best score we've had." },
      { name: "Julia Bennett", role: "Homeowner, Elmwood", avatar: "assets/images/testimonials/customer-03.webp", quote: "Grout around the hob finally looks white again instead of grey." }
    ],
    related: ["residential-cleaning", "bathroom-cleaning", "deep-cleaning", "eco-friendly-cleaning"],
    sidebarBullets: ["Grease and grout specialists", "Oven detailing add-on available", "Free re-clean guarantee"]
  },

  /* ================= 8. BATHROOM CLEANING ================= */
  "bathroom-cleaning": {
    label: "Bathroom Cleaning",
    heroTagline: "Tile, grout, glass and fixtures brought back to a hygienic shine.",
    price: 89,
    priceNote: "Fixed price per bathroom. Multiple bathrooms discounted when booked together.",
    heroImage: "assets/images/services/bathroom-cleaning.webp",
    heroAlt: "Cleaner scrubbing bathroom tiles and polishing shower glass",
    metaTitle: "Bathroom Cleaning Service | SparklePro",
    metaDescription: "Focused bathroom cleaning covering tile scrubbing, shower glass, sinks, toilets and grout, with hygienic, streak-free results.",
    crew: "1 person crew, 1&ndash;2 hours per bathroom",
    overview: [
      "Bathrooms need a different approach to the rest of the house &mdash; limescale, soap scum and grout staining all require dwell time and the right products, not just a fast wipe. This service is a dedicated, room-by-room bathroom detail.",
      "Every fixture is descaled, tile and grout are treated, and shower glass is left genuinely streak-free rather than smeared clean."
    ],
    benefits: [
      { icon: "bi-droplet-half", title: "Limescale removed", text: "Descaling treatment on taps, showerheads and glass, not just a surface polish." },
      { icon: "bi-grid-3x3-gap", title: "Grout restoration", text: "Discoloured grout lines are scrubbed and treated to lift built-up staining." },
      { icon: "bi-brightness-high", title: "Streak-free glass", text: "Shower screens and mirrors finished with a professional glass technique." },
      { icon: "bi-shield-check", title: "Hygienic finish", text: "Toilets, sinks and high-touch fixtures fully disinfected on every visit." }
    ],
    checklist: [
      "Toilet cleaned and disinfected inside and out",
      "Shower, tub and tile descaled and scrubbed",
      "Shower glass and mirrors polished streak-free",
      "Sink, taps and fixtures descaled and shined",
      "Grout lines treated to lift staining",
      "Floor mopped and sanitised",
      "Towels folded and toiletries tidied",
      "Bin emptied and relined"
    ],
    gallery: {
      beforeImg: "assets/images/services/deep-cleaning.webp",
      beforeAlt: "Bathroom tile with limescale build-up before treatment",
      afterImg: "assets/images/services/bathroom-cleaning.webp",
      afterAlt: "Same bathroom with tile and glass restored to a hygienic shine"
    },
    faq: [
      { q: "Can you remove old limescale stains?", a: "In most cases yes, though very old or etched staining on certain stone finishes may only partially lift &mdash; we'll advise honestly on site." },
      { q: "Do you disinfect the toilet and high-touch areas?", a: "Every visit includes full disinfection of the toilet, taps, flush handle and door handles." },
      { q: "Can I book multiple bathrooms in one visit?", a: "Yes, additional bathrooms are discounted when booked together in the same visit." },
      { q: "Is this suitable for ensuite bathrooms?", a: "Yes, ensuites are cleaned to the same standard as full bathrooms, just scaled to size." }
    ],
    reviews: [
      { name: "Camille Rousseau", role: "Homeowner, Riverside", avatar: "assets/images/testimonials/customer-03.webp", quote: "The shower glass has never looked this clear, even right after we moved in." },
      { name: "Derek Osei", role: "Landlord, 4 units", avatar: "assets/images/testimonials/customer-02.webp", quote: "Grout that I thought was permanently stained came back almost white." },
      { name: "Ana Popescu", role: "Homeowner, Northgate", avatar: "assets/images/testimonials/customer-01.webp", quote: "Genuinely hygienic feeling, not just a quick wipe-round. Booking two bathrooms together was great value." }
    ],
    related: ["kitchen-cleaning", "residential-cleaning", "disinfection", "deep-cleaning"],
    sidebarBullets: ["Limescale & grout specialists", "Streak-free glass technique", "Free re-clean guarantee"]
  },

  /* ================= 9. WINDOW CLEANING ================= */
  "window-cleaning": {
    label: "Window Cleaning",
    heroTagline: "Streak-free glass, inside and out, using a pure-water finish.",
    price: 69,
    priceNote: "Fixed price for up to 10 standard windows. Larger properties and exteriors quoted at checkout.",
    heroImage: "assets/images/services/window-cleaning.webp",
    heroAlt: "Cleaner using a squeegee for a streak-free finish on a large window",
    metaTitle: "Window Cleaning Service | SparklePro",
    metaDescription: "Professional interior and exterior window cleaning with a streak-free, pure-water finish for homes and offices.",
    crew: "1&ndash;2 person crew, 1&ndash;2 hours",
    overview: [
      "Streaky glass usually comes down to hard water residue and the wrong technique, not dirt. We use a squeegee finish for interior glass and a pure-water fed-pole system for exterior and upper-floor windows, leaving no spotting once the water dries.",
      "Frames, sills and tracks are wiped as part of the same visit, so the whole window &mdash; not just the pane &mdash; looks finished."
    ],
    benefits: [
      { icon: "bi-brightness-alt-high", title: "True streak-free finish", text: "Squeegee and pure-water techniques leave no smears or spotting once dry." },
      { icon: "bi-building-up", title: "Interior and exterior", text: "Ground-floor and upper-story exteriors are both covered with the right equipment for each." },
      { icon: "bi-columns-gap", title: "Frames and tracks included", text: "Sills, tracks and frames are wiped down, not just the glass itself." },
      { icon: "bi-sun", title: "More natural light", text: "Clean glass noticeably brightens a room, especially in low winter light." }
    ],
    checklist: [
      "Interior glass cleaned and squeegee-finished",
      "Exterior glass cleaned with pure-water fed-pole system",
      "Window frames and sills wiped down",
      "Tracks vacuumed of dust and debris",
      "Screens spot-cleaned where fitted",
      "Skylights cleaned where safely accessible",
      "Mirrors and glass doors polished as part of the visit",
      "Final check for streaking in natural light"
    ],
    gallery: {
      beforeImg: "assets/images/blog/blog-home-cleaning-tips.webp",
      beforeAlt: "Window with visible smudges before cleaning",
      afterImg: "assets/images/services/window-cleaning.webp",
      afterAlt: "Same window with a streak-free squeegee finish"
    },
    faq: [
      { q: "Do you clean windows on upper floors?", a: "Yes, using a pure-water fed-pole system that safely reaches upper-story exterior glass without ladders in most cases." },
      { q: "Will the finish actually be streak-free?", a: "Pure water carries no minerals to leave spots as it dries, and our squeegee technique on interior glass is finished dry with a lint-free cloth." },
      { q: "Do you clean window screens?", a: "Screens are spot-cleaned as standard; a full screen wash can be added at booking." },
      { q: "How often should windows be professionally cleaned?", a: "Most clients book quarterly for homes and monthly for street-facing commercial glass." }
    ],
    reviews: [
      { name: "Felix Grant", role: "Homeowner, Elmwood", avatar: "assets/images/testimonials/customer-01.webp", quote: "First time in years the windows have been properly streak-free, even in direct afternoon sun." },
      { name: "Simone Laurent", role: "Retail store manager", avatar: "assets/images/testimonials/customer-03.webp", quote: "Our storefront glass gets grimy fast on the main road and monthly visits keep it looking sharp." },
      { name: "Andre Kim", role: "Homeowner, two-story house", avatar: "assets/images/testimonials/customer-02.webp", quote: "Relieved not to need a ladder myself for the upstairs windows anymore." }
    ],
    related: ["residential-cleaning", "office-cleaning", "apartment-cleaning", "deep-cleaning"],
    sidebarBullets: ["Pure-water streak-free finish", "Interior and exterior coverage", "Free re-clean guarantee"]
  },

  /* ================= 10. CARPET CLEANING ================= */
  "carpet-cleaning": {
    label: "Carpet Cleaning",
    heroTagline: "Deep hot-water extraction that lifts embedded dirt and stains.",
    price: 119,
    priceNote: "Fixed price for up to 3 rooms of carpet. Stairs and hallways quoted per run.",
    heroImage: "assets/images/services/gallery-02.webp",
    heroAlt: "Carpet extraction machine removing a red stain from carpet fibres",
    metaTitle: "Carpet Cleaning Service | SparklePro",
    metaDescription: "Professional hot-water carpet extraction and stain treatment that removes embedded dirt regular vacuuming can't reach.",
    crew: "1&ndash;2 person crew, 1.5&ndash;3 hours",
    overview: [
      "Regular vacuuming only lifts surface dust &mdash; the dirt, allergens and stains that build up deep in carpet fibres need hot-water extraction to actually come out. We pre-treat, agitate and extract each carpet, then apply targeted stain treatment where needed.",
      "Carpets are left damp rather than soaked, with typical dry times of four to six hours depending on ventilation and carpet thickness."
    ],
    benefits: [
      { icon: "bi-droplet-fill", title: "Deep hot-water extraction", text: "Lifts embedded dirt and allergens that vacuuming alone leaves behind." },
      { icon: "bi-exclamation-triangle", title: "Targeted stain treatment", text: "Wine, pet and food stains are pre-treated with the right solution before extraction." },
      { icon: "bi-wind", title: "Fresher indoor air", text: "Removing trapped dust and allergens improves air quality noticeably after treatment." },
      { icon: "bi-clock", title: "Fast, low-moisture drying", text: "Professional extraction leaves carpets ready to walk on the same day." }
    ],
    checklist: [
      "Carpets vacuumed thoroughly before treatment",
      "Stains and high-traffic areas pre-treated",
      "Hot-water extraction across the full carpet",
      "Edges and corners hand-agitated where machines can't reach",
      "Deodorising treatment applied on request",
      "Furniture legs protected with foam blocks during drying",
      "Fans positioned to speed up drying time",
      "Follow-up spot check offered within 48 hours"
    ],
    gallery: {
      beforeImg: "assets/images/services/gallery-02.webp",
      beforeAlt: "Carpet stain being treated with an extraction machine",
      afterImg: "assets/images/services/living-room-cleaning.webp",
      afterAlt: "Clean, refreshed carpet in a living room after extraction"
    },
    faq: [
      { q: "How long does the carpet take to dry?", a: "Typically four to six hours with good ventilation. We can position fans and advise on airflow to speed this up." },
      { q: "Can you remove old, set-in stains?", a: "Most stains lift significantly with pre-treatment and extraction, though very old set-in stains on certain fibres may only partially fade &mdash; we'll assess honestly on site." },
      { q: "Is the process safe for pets and children?", a: "Yes, our carpet solutions are non-toxic once dry. We recommend keeping pets and young children off damp carpet until fully dry." },
      { q: "Do you move furniture?", a: "Light furniture is moved and replaced on protective blocks. Heavy items like wardrobes are cleaned around unless pre-arranged." }
    ],
    reviews: [
      { name: "Rachel Nguyen", role: "Pet owner, Northgate", avatar: "assets/images/testimonials/customer-02.webp", quote: "A red wine stain I'd given up on came out almost completely. Genuinely impressed." },
      { name: "Victor Alaba", role: "Landlord, rental turnover", avatar: "assets/images/testimonials/customer-01.webp", quote: "Use this between every tenant now &mdash; carpets look refreshed rather than just vacuumed." },
      { name: "Beatriz Silva", role: "Homeowner, Elmwood", avatar: "assets/images/testimonials/customer-03.webp", quote: "Dried faster than I expected and the whole living room smells noticeably fresher." }
    ],
    related: ["sofa-cleaning", "mattress-cleaning", "deep-cleaning", "move-out-cleaning"],
    sidebarBullets: ["Hot-water extraction method", "Targeted stain pre-treatment", "48-hour follow-up check"]
  },

  /* ================= 11. SOFA CLEANING ================= */
  "sofa-cleaning": {
    label: "Sofa Cleaning",
    heroTagline: "Upholstery shampooing that lifts stains without soaking the fabric.",
    price: 109,
    priceNote: "Fixed price for a standard 3-seat sofa. Sectionals and additional chairs quoted per piece.",
    heroImage: "assets/images/services/gallery-03.webp",
    heroAlt: "Cleaner steaming and shampooing an upholstered armchair cushion",
    metaTitle: "Sofa & Upholstery Cleaning Service | SparklePro",
    metaDescription: "Professional sofa and upholstery shampooing for fabric and leather furniture, removing stains, odours and everyday grime.",
    crew: "1 person crew, 1&ndash;2 hours",
    overview: [
      "Sofas absorb everything from spilled drinks to pet hair and everyday body oils, but most fabrics can't handle a full soak. We use a low-moisture shampoo and extraction method matched to your upholstery type, so cushions come out refreshed, not damp for days.",
      "Leather pieces are treated differently &mdash; cleaned and conditioned rather than shampooed &mdash; to protect the material rather than dry it out."
    ],
    benefits: [
      { icon: "bi-droplet", title: "Fabric-matched cleaning", text: "Solutions and methods are chosen based on your specific upholstery type." },
      { icon: "bi-emoji-neutral", title: "Odour removal", text: "Pet, smoke and general household odours are treated at the source, not just masked." },
      { icon: "bi-cup-straw", title: "Stain lifting", text: "Food, drink and ink stains are pre-treated before shampooing for the best result." },
      { icon: "bi-clock", title: "Low-moisture drying", text: "Cushions are usable again in a few hours rather than a full day." }
    ],
    checklist: [
      "Cushions vacuumed and crevices cleared of debris",
      "Fabric tested for colourfastness before treatment",
      "Low-moisture shampoo applied and agitated",
      "Stains pre-treated individually before extraction",
      "Leather pieces cleaned and conditioned instead of shampooed",
      "Cushion covers removed and cleaned where zips allow",
      "Deodorising treatment applied on request",
      "Cushions arranged to dry evenly"
    ],
    gallery: {
      beforeImg: "assets/images/services/gallery-03.webp",
      beforeAlt: "Sofa cushion being deep cleaned with an upholstery tool",
      afterImg: "assets/images/services/living-room-cleaning.webp",
      afterAlt: "Freshly cleaned sofa in a tidy living room"
    },
    faq: [
      { q: "Is this safe for all fabric types?", a: "We test an inconspicuous area first and select a method suited to your specific fabric, including delicate weaves." },
      { q: "Do you clean leather sofas?", a: "Yes, leather is cleaned and conditioned using a leather-specific process rather than the fabric shampoo method." },
      { q: "How long before I can sit on it again?", a: "Most fabric sofas are dry to the touch within a few hours; full cure can take up to 24 hours for heavier fills." },
      { q: "Can you remove pet odours?", a: "In most cases yes &mdash; our deodorising treatment targets the source of pet and smoke odours rather than covering them." }
    ],
    reviews: [
      { name: "Yara Haddad", role: "Pet owner, Riverside", avatar: "assets/images/testimonials/customer-03.webp", quote: "The pet smell that had built up over two years is genuinely gone, not just covered up." },
      { name: "Connor Blake", role: "Homeowner, new sofa", avatar: "assets/images/testimonials/customer-01.webp", quote: "Coffee stain from move-in day finally lifted after regular cleaning failed twice." },
      { name: "Mei Lin Tan", role: "Leather sofa owner", avatar: "assets/images/testimonials/customer-02.webp", quote: "Conditioned leather looks and feels noticeably better, not just cleaner." }
    ],
    related: ["carpet-cleaning", "mattress-cleaning", "residential-cleaning", "deep-cleaning"],
    sidebarBullets: ["Fabric & leather specialists", "Colourfastness tested first", "Odour source treatment"]
  },

  /* ================= 12. MATTRESS CLEANING ================= */
  "mattress-cleaning": {
    label: "Mattress Cleaning",
    heroTagline: "Dust mite, allergen and stain removal for a healthier night's sleep.",
    price: 95,
    priceNote: "Fixed price per mattress, any size. Multiple mattresses discounted when booked together.",
    heroImage: "assets/images/services/mattress-cleaning.webp",
    heroAlt: "Cleaner treating a mattress with a handheld steam and vacuum tool",
    metaTitle: "Mattress Cleaning Service | SparklePro",
    metaDescription: "Deep mattress cleaning that removes dust mites, allergens, sweat residue and stains using a low-moisture steam and extraction method.",
    crew: "1 person crew, 45&ndash;90 minutes",
    overview: [
      "Mattresses trap dust mites, dead skin cells and sweat residue that a fitted sheet hides but never removes. We use a combination of steam treatment, agitation and HEPA extraction to lift allergens from deep in the fill, not just the surface.",
      "Visible stains are treated individually first, and the whole mattress is deodorised and left dry enough to be re-made the same day."
    ],
    benefits: [
      { icon: "bi-shield-plus", title: "Allergen reduction", text: "Steam and extraction significantly reduce dust mites and trapped allergens." },
      { icon: "bi-moon-stars", title: "Better sleep hygiene", text: "A genuinely clean mattress makes a measurable difference to sleep environment quality." },
      { icon: "bi-droplet-half", title: "Stain and odour treatment", text: "Sweat, spill and pet stains are targeted individually before the full treatment." },
      { icon: "bi-clock", title: "Same-day re-use", text: "Low-moisture method means most mattresses are dry enough to re-make within a few hours." }
    ],
    checklist: [
      "Mattress vacuumed with a HEPA filtration tool",
      "Visible stains pre-treated individually",
      "Steam treatment applied to kill dust mites and bacteria",
      "Deep extraction to lift allergens from the fill",
      "Deodorising treatment applied",
      "Seams and edges treated where dust mites concentrate",
      "Mattress protector recommendation provided",
      "Final inspection under bright light for missed spots"
    ],
    gallery: {
      beforeImg: "assets/images/services/mattress-cleaning.webp",
      beforeAlt: "Mattress being steam treated before extraction",
      afterImg: "assets/images/hero/hero-cleaning.webp",
      afterAlt: "Freshly made bed after mattress cleaning is complete"
    },
    faq: [
      { q: "Can this help with allergies?", a: "Many clients with dust allergies notice a difference. We can't make medical claims, but steam and HEPA extraction meaningfully reduce dust mites and trapped allergens." },
      { q: "How long until the mattress can be used again?", a: "Our low-moisture method typically leaves mattresses dry enough to re-make within a few hours, though full internal drying can take up to 24 hours." },
      { q: "Can you remove old stains?", a: "Most stains lighten significantly; very old, set-in stains on certain fabrics may only partially fade." },
      { q: "Do you clean box springs too?", a: "Yes, box springs and bases can be vacuumed and treated as part of the same visit at no extra charge." }
    ],
    reviews: [
      { name: "Sana Malik", role: "New parent, Brookfield", avatar: "assets/images/testimonials/customer-03.webp", quote: "Wanted the nursery mattress properly sanitised before the baby arrived and the process felt thorough, not rushed." },
      { name: "Peter Hollis", role: "Homeowner with allergies", avatar: "assets/images/testimonials/customer-01.webp", quote: "Noticed less morning congestion within a week of having the mattress treated." },
      { name: "Dana Kruger", role: "Homeowner, guest room refresh", avatar: "assets/images/testimonials/customer-02.webp", quote: "Old stain from a spill years ago finally faded almost completely." }
    ],
    related: ["sofa-cleaning", "carpet-cleaning", "disinfection", "eco-friendly-cleaning"],
    sidebarBullets: ["HEPA extraction & steam", "Allergen-focused process", "Same-day re-use in most cases"]
  },

  /* ================= 13. POST CONSTRUCTION CLEANING ================= */
  "post-construction-cleaning": {
    label: "Post Construction Cleaning",
    heroTagline: "Cement dust, paint residue and construction debris removed on handover.",
    price: 249,
    priceNote: "Fixed price for properties up to three bedrooms after light renovation. Full builds quoted on site.",
    heroImage: "assets/images/services/post-construction-cleaning.webp",
    heroAlt: "Cleaner in protective gear removing construction dust from a room",
    metaTitle: "Post Construction Cleaning Service | SparklePro",
    metaDescription: "Specialist post-construction cleaning that removes cement dust, paint splatter, adhesive residue and fine debris after a renovation or build.",
    crew: "2&ndash;3 person crew, 5&ndash;8 hours",
    overview: [
      "Construction and renovation dust behaves differently to household dirt &mdash; it's fine, it settles into every gap, and it resettles for days if it isn't removed with the right vacuum filtration and sequence. This service is built specifically for that job, not adapted from a standard clean.",
      "We work top to bottom in stages: rough debris removal, fine dust extraction with HEPA vacuums, then a detailed wipe-down and floor finish so the space is genuinely move-in ready, not just tidied."
    ],
    benefits: [
      { icon: "bi-wind", title: "HEPA dust extraction", text: "Fine construction dust is captured rather than stirred back into the air." },
      { icon: "bi-droplet", title: "Paint & adhesive removal", text: "Overspray, tape residue and adhesive marks are removed from glass, tile and fixtures." },
      { icon: "bi-house-check", title: "Handover ready", text: "The result is inspection-ready, not just visibly tidy." },
      { icon: "bi-people", title: "Right-sized crew", text: "Two to three technicians work in stages so the job is completed in a single visit for most properties." }
    ],
    checklist: [
      "Rough debris and packaging cleared first",
      "Fine dust extracted with HEPA-filtered vacuums throughout",
      "Paint splatter and overspray removed from glass and fixtures",
      "Adhesive and tape residue removed from surfaces",
      "All cabinets, drawers and closets wiped inside and out",
      "Floors vacuumed, mopped or buffed depending on finish",
      "Light fixtures, vents and switch plates dusted",
      "Final detailed inspection under bright light"
    ],
    gallery: {
      beforeImg: "assets/images/services/post-construction-cleaning.webp",
      beforeAlt: "Room still covered in fine construction dust before cleaning",
      afterImg: "assets/images/services/deep-cleaning.webp",
      afterAlt: "Same room cleared of dust and ready for handover"
    },
    faq: [
      { q: "Can you handle heavy dust from drywall sanding?", a: "Yes, this is exactly what our HEPA extraction process is built for &mdash; fine sanding dust is the most common job we handle in this category." },
      { q: "Do you remove paint splatter from floors and glass?", a: "Light to moderate paint splatter is removed from glass, tile and hard floors as standard. Heavy paint on carpet may need a specialist referral." },
      { q: "How long does a post-construction clean take?", a: "Typically five to eight hours for a standard renovated property, depending on the scope and amount of residual debris." },
      { q: "Can this be scheduled right after builders finish?", a: "Yes, we recommend booking as soon as the trades have left and before any furniture moves back in." }
    ],
    reviews: [
      { name: "Marco Ferretti", role: "General contractor", avatar: "assets/images/testimonials/customer-02.webp", quote: "Use this crew on every handover now &mdash; clients stop noticing dust complaints entirely." },
      { name: "Wendy Zhao", role: "Homeowner, kitchen renovation", avatar: "assets/images/testimonials/customer-03.webp", quote: "Dust had gotten into places I didn't think a vacuum could reach and it all came out." },
      { name: "Aaron Fitzgerald", role: "Property developer", avatar: "assets/images/testimonials/customer-01.webp", quote: "Consistent handover-ready standard across multiple units on the same project." }
    ],
    related: ["deep-cleaning", "window-cleaning", "carpet-cleaning", "disinfection"],
    sidebarBullets: ["HEPA dust extraction", "2&ndash;3 person crew", "Handover-ready standard"]
  },

  /* ================= 14. DISINFECTION SERVICE ================= */
  "disinfection": {
    label: "Disinfection Service",
    heroTagline: "Hospital-grade sanitisation for high-touch surfaces and shared spaces.",
    price: 139,
    priceNote: "Fixed price for standard homes and small offices. Larger commercial spaces quoted per square footage.",
    heroImage: "assets/images/services/gallery-04.webp",
    heroAlt: "Technician in protective equipment disinfecting a door handle with a sprayer",
    metaTitle: "Disinfection Service | SparklePro",
    metaDescription: "Hospital-grade disinfection for homes, offices and shared spaces, targeting high-touch surfaces with EPA-listed solutions.",
    crew: "1&ndash;2 person crew, 1&ndash;3 hours depending on area",
    overview: [
      "This service is built for situations where sanitisation matters more than appearance &mdash; after illness in the household, before a vulnerable person moves in, or as routine protection for shared commercial spaces. Technicians wear full protective equipment and use hospital-grade, EPA-listed disinfectants.",
      "Every high-touch surface is treated individually with correct dwell time, rather than a fast spray-and-wipe, so the disinfectant actually has time to work."
    ],
    benefits: [
      { icon: "bi-shield-check", title: "Hospital-grade solutions", text: "EPA-listed disinfectants used at the correct dilution and dwell time for real effectiveness." },
      { icon: "bi-people", title: "High-touch focus", text: "Door handles, light switches, remotes and shared surfaces are treated individually." },
      { icon: "bi-house-heart", title: "Illness recovery support", text: "A common booking after flu, colds or other illness has passed through a household." },
      { icon: "bi-building-check", title: "Commercial-ready", text: "Suited to offices, clinics and shared spaces needing routine sanitisation protocols." }
    ],
    checklist: [
      "All door handles, switches and railings disinfected",
      "Kitchen and bathroom high-touch surfaces treated",
      "Remote controls, shared electronics wiped with safe solution",
      "Correct disinfectant dwell time observed on every surface",
      "Shared office equipment and desks treated where applicable",
      "Waste bins emptied and sanitised",
      "Air-safe ventilation maintained throughout treatment",
      "Completion certificate provided on request"
    ],
    gallery: {
      beforeImg: "assets/images/services/gallery-04.webp",
      beforeAlt: "Technician in PPE spraying disinfectant on a door handle",
      afterImg: "assets/images/services/office-cleaning.webp",
      afterAlt: "Sanitised, ready-to-use shared space after disinfection"
    },
    faq: [
      { q: "What products do you use?", a: "EPA-listed, hospital-grade disinfectants applied at manufacturer-recommended dilution and dwell time for genuine effectiveness." },
      { q: "Is it safe to be home during the visit?", a: "We recommend ventilating the space during and shortly after treatment. Technicians can advise on re-entry timing based on the products used." },
      { q: "Do you provide documentation for offices?", a: "Yes, a completion certificate with date, areas treated and products used is available on request for compliance records." },
      { q: "Can this be booked as a recurring service?", a: "Yes, many offices and clinics book weekly or monthly disinfection alongside their regular cleaning contract." }
    ],
    reviews: [
      { name: "Dr. Lena Fischer", role: "Clinic manager", avatar: "assets/images/testimonials/customer-01.webp", quote: "Documentation for compliance is thorough and the team understands proper dwell times, not just spraying and wiping." },
      { name: "Tomas Vidal", role: "Homeowner, post-illness", avatar: "assets/images/testimonials/customer-02.webp", quote: "Booked this after the whole family had the flu and it gave real peace of mind before the kids went back to school." },
      { name: "Fatima Zahra", role: "Co-working space manager", avatar: "assets/images/testimonials/customer-03.webp", quote: "Members notice and appreciate the visible sanitisation routine, especially during flu season." }
    ],
    related: ["office-cleaning", "move-in-cleaning", "bathroom-cleaning", "eco-friendly-cleaning"],
    sidebarBullets: ["EPA-listed disinfectants", "High-touch surface focus", "Completion certificate available"]
  },

  /* ================= 15. ECO FRIENDLY CLEANING ================= */
  "eco-friendly-cleaning": {
    label: "Eco Friendly Cleaning",
    heroTagline: "Plant-based products and low-waste methods, with zero compromise on results.",
    price: 99,
    priceNote: "Fixed price for a standard home clean using our full eco-certified product range.",
    heroImage: "assets/images/services/eco-cleaning.webp",
    heroAlt: "Cleaner using plant-based, eco-friendly cleaning products in a bright kitchen",
    metaTitle: "Eco Friendly Cleaning Service | SparklePro",
    metaDescription: "Home cleaning using certified plant-based products, microfibre systems and low-waste methods, safe for families, pets and the planet.",
    crew: "1&ndash;2 person crew, 1.5&ndash;3 hours",
    overview: [
      "Our eco-friendly plan uses the same trained technicians and checklist-driven process as a standard residential clean, but every product is plant-based and biodegradable, and our microfibre system is designed to cut water and chemical use without cutting corners.",
      "It's a popular choice for households with young children, pets, allergy sensitivities, or anyone who simply wants a lower environmental footprint without paying a premium for it."
    ],
    benefits: [
      { icon: "bi-leaf", title: "Certified plant-based products", text: "Biodegradable, fragrance-light formulas that are gentle on skin and the environment." },
      { icon: "bi-recycle", title: "Low-waste methods", text: "Reusable colour-coded microfibre reduces disposable wipes and paper towel use." },
      { icon: "bi-droplet-half", title: "Reduced water use", text: "Microfibre and concentrated formulas cut water consumption compared to standard mopping." },
      { icon: "bi-emoji-smile", title: "No compromise on results", text: "Same checklist-driven standard as our residential clean, just with a lighter footprint." }
    ],
    checklist: [
      "All surfaces cleaned with certified plant-based products",
      "Reusable, colour-coded microfibre used throughout",
      "Floors mopped with a low-water, concentrated solution",
      "Kitchen and bathroom sanitised with eco-certified disinfectant",
      "Bins emptied with recycling sorted where applicable",
      "Fragrance-light formulas used for allergy sensitivity",
      "Equipment sanitised between properties to avoid cross-contamination",
      "Final walkthrough photographed for your account"
    ],
    gallery: {
      beforeImg: "assets/images/services/living-room-cleaning.webp",
      beforeAlt: "Home before an eco-friendly cleaning visit",
      afterImg: "assets/images/services/eco-cleaning.webp",
      afterAlt: "Same home cleaned using plant-based, eco-certified products"
    },
    faq: [
      { q: "Are the products really as effective as standard chemicals?", a: "Yes, our plant-based range is tested to the same performance standard as conventional products, just without harsh chemical residue." },
      { q: "Is this safe for babies and pets?", a: "Our eco range is fragrance-light and free from harsh chemical residue, making it a popular choice for households with young children and pets." },
      { q: "Does eco-friendly cost more?", a: "No, it's priced the same as our standard residential clean &mdash; there's no premium for choosing the lower-impact option." },
      { q: "Can I request eco products on other services?", a: "Yes, most services can be requested with our eco-certified product range at no extra charge &mdash; just note it at booking." }
    ],
    reviews: [
      { name: "Isabella Moreau", role: "Parent, Brookfield", avatar: "assets/images/testimonials/customer-03.webp", quote: "Wanted something gentler with a newborn in the house and the results were just as good as our old cleaner." },
      { name: "Samuel Otieno", role: "Pet owner, Elmwood", avatar: "assets/images/testimonials/customer-01.webp", quote: "No strong chemical smell afterward and our dog isn't bothered by residue on the floors anymore." },
      { name: "Clara Jensen", role: "Homeowner, sustainability-focused", avatar: "assets/images/testimonials/customer-02.webp", quote: "Glad to find an option that doesn't ask me to trade cleanliness for lower environmental impact." }
    ],
    related: ["residential-cleaning", "kitchen-cleaning", "office-cleaning", "mattress-cleaning"],
    sidebarBullets: ["Certified plant-based products", "Fragrance-light formulas", "Same price, lower footprint"]
  }

};
