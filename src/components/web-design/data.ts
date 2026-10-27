export const EZ = "cubic-bezier(.2,.8,.2,1)";
export const MONO = "var(--font-wd-mono), 'JetBrains Mono', monospace";

export const BG = "oklch(0.14 0.012 265)";
export const FG = "oklch(0.97 0.006 95)";
export const ACC = "oklch(0.9 0.19 128)";
export const INK = "oklch(0.17 0.02 265)";
export const LINE = "oklch(0.3 0.02 265)";
export const CARD = "oklch(0.17 0.014 265)";

// International format without "+" (e.g. "919876543210"). Empty opens WhatsApp's contact picker.
export const WA_NUMBER = "";
export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi VecraHost, I would like a quote for a website.")}`;

export const NAV = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Pricing", href: "#pricing" },
    { label: "Hosting", href: "#hosting" },
    { label: "FAQ", href: "#faq" },
];

export const ROTATOR_WORDS = ["sell.", "convert.", "rank.", "grow."];
export const BAND_A = ["Business websites", "Online stores", "Landing pages", "Redesigns", "SEO", "Branding"];
export const BAND_B = ["Designed in India", "Hosted in India", "Fixed prices", "Mobile-first", "Razorpay-ready"];

export const SERVICES = [
    { title: "Business websites", d: "Fast, mobile-first sites that explain what you do and turn visitors into enquiries.", tags: ["5–15 pages", "CMS", "SEO"], c: ["oklch(0.55 0.2 262)", "oklch(0.4 0.18 280)"] },
    { title: "Online stores", d: "Product catalogues, carts and Razorpay checkout, ready to take orders from day one.", tags: ["Razorpay", "Inventory", "Shipping"], c: ["oklch(0.62 0.18 35)", "oklch(0.48 0.19 15)"] },
    { title: "Landing pages", d: "Single pages built around one goal: more sign-ups, calls or bookings from your ads.", tags: ["Ads-ready", "Fast", "Forms"], c: ["oklch(0.6 0.14 160)", "oklch(0.42 0.1 175)"] },
    { title: "Redesigns", d: "Keep your content, lose the dated look. We rebuild your site with redirects so your search rankings carry over.", tags: ["Migration", "Redirects", "Speed"], c: ["oklch(0.6 0.2 320)", "oklch(0.45 0.2 300)"] },
    { title: "Branding & SEO", d: "Logos, brand kits and on-page SEO so customers find you and remember you.", tags: ["Logo", "Brand kit", "Google"], c: ["oklch(0.75 0.16 85)", "oklch(0.58 0.16 60)"] },
];

// Portfolio entries. Add `image` (a path under /public) once project screenshots are ready.
export const WORKS: { title: string; meta: string; image?: string }[] = [
    { title: "Project name", meta: "Industry · Website type" },
    { title: "Project name", meta: "Industry · Website type" },
    { title: "Project name", meta: "Industry · Website type" },
    { title: "Project name", meta: "Industry · Website type" },
];

export const STEPS = [
    { n: "01 · FREE", t: "Discovery call", d: "A free 30-minute call to understand your business, your customers and what the website needs to do." },
    { n: "02", t: "Design", d: "We design your homepage first. You give feedback before a single page is built." },
    { n: "03", t: "Build", d: "We develop every page, connect forms, payments and WhatsApp, and set up SEO basics." },
    { n: "04", t: "Launch & host", d: "Your site goes live on VecraHost servers in India with SSL and backups, and we show you how to update it." },
];

export const PACKAGES = [
    { id: "Starter", price: "9,999", time: "Live in about 7 days", type: "Business website", budget: "Under ₹10,000", popular: false, features: ["Up to 5 pages", "Mobile-first design", "Contact form + WhatsApp button", "Basic SEO setup", "1 year hosting + .in domain"] },
    { id: "Business", price: "24,999", time: "Live in about 14 days", type: "Business website", budget: "₹10,000 – ₹25,000", popular: true, features: ["Up to 15 pages", "Easy-to-edit CMS", "On-page SEO + Google Business Profile", "Blog and enquiry forms", "2 rounds of revisions", "1 year hosting + domain"] },
    { id: "E-commerce", price: "49,999", time: "Live in 21 to 30 days", type: "Online store", budget: "₹25,000 – ₹50,000", popular: false, features: ["Up to 100 products", "Razorpay payments", "Inventory and shipping setup", "Order notifications", "Staff training session", "1 year hosting + domain"] },
];

export const HOST_PLANS = [
    { id: "Starter", price: 99, feats: ["1 website", "10 GB NVMe", "Free SSL", "Weekly backups"] },
    { id: "Business", price: 199, feats: ["10 websites", "50 GB NVMe", "10 email accounts", "Daily backups"] },
];

export const Q_TYPES = ["Business website", "Online store", "Landing page", "Website redesign", "Web app / portal", "Not sure yet"];
export const Q_BUDGETS = ["Under ₹10,000", "₹10,000 – ₹25,000", "₹25,000 – ₹50,000", "₹50,000+"];
export const Q_TIMES = ["As soon as possible", "Within a month", "1 to 3 months", "Just exploring"];
export const Q_NAMES = ["Project", "Budget", "Timeline", "Your details"];

export const FAQS = [
    { q: "How long does a website take?", a: "A Starter website takes about 7 days, a Business website about 14 days, and an online store 21 to 30 days. The clock starts once we have your content." },
    { q: "Do I need to provide the content?", a: "You can send your own text and photos, or we can write the content for you as an add-on. Tell us in your enquiry." },
    { q: "Can I edit the website myself?", a: "Yes. Business and E-commerce packages include an easy-to-edit CMS, and we walk you through it at launch." },
    { q: "What happens after the first year of hosting?", a: "Hosting renews from ₹99/mo, billed yearly. Your website belongs to you, so you can also move it anywhere." },
    { q: "How do payments work?", a: "Pay 50% to start and the balance at launch, via UPI, cards or net banking. Prices exclude GST." },
];

export const TERM = ["$ vecra deploy yourbusiness.in", "→ Uploading site to Mumbai · NVMe", "→ Issuing free SSL certificate", "→ Daily backups enabled", "✓ Live at https://yourbusiness.in"];

export const THEMES = [
    { a: "oklch(0.55 0.2 262)", t: "oklch(0.95 0.03 262)", d: "yourbusiness.in" },
    { a: "oklch(0.58 0.14 155)", t: "oklch(0.95 0.04 155)", d: "greenleafcafe.in" },
    { a: "oklch(0.62 0.18 35)", t: "oklch(0.95 0.035 40)", d: "studiokala.in" },
];
