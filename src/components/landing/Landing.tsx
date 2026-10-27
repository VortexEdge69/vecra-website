"use client";
import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./landing.css";

const sans = Bricolage_Grotesque({ subsets: ["latin"], variable: "--vh-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--vh-mono", display: "swap" });

const EZ = "cubic-bezier(.2,.8,.2,1)";
const MONO = "var(--vh-mono),monospace";
const ACC = "oklch(0.9 0.19 128)", INK = "oklch(0.17 0.02 265)", LINE = "oklch(0.3 0.02 265)";
const FG = "oklch(0.97 0.006 95)", MUTED = "oklch(0.78 0.015 265)";
// ponytail: set to a number like "919876543210" to show the WhatsApp buttons
const WA_NUMBER = "";
const WA_LINK = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hi VecraHost, I would like a quote for a website.");

const h2Style: CSSProperties = { fontSize: "clamp(44px,7vw,104px)", lineHeight: 0.92, letterSpacing: "-0.055em", margin: 0, fontWeight: 700 };
const pStyle: CSSProperties = { margin: 0, color: MUTED, fontSize: 18, lineHeight: 1.5 };
const sectionWrap: CSSProperties = { maxWidth: 1320, margin: "0 auto", padding: "clamp(48px,8vw,72px) 20px clamp(72px,10vw,120px)" };
const headRow: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: 48 };
const pill = (on: boolean): CSSProperties => ({ border: on ? "2px solid " + ACC : "1px solid " + LINE, background: on ? "oklch(0.9 0.19 128 / 0.12)" : "transparent" });

const NAV: [string, string][] = [["Services", "#services"], ["Work", "#work"], ["Pricing", "#pricing"], ["Hosting", "#hosting"], ["FAQ", "#faq"]];
const SERVICES = [
  { title: "Business websites", d: "Fast, mobile-first sites that explain what you do and turn visitors into enquiries.", tags: ["5–15 pages", "CMS", "SEO"], c: ["oklch(0.55 0.2 262)", "oklch(0.4 0.18 280)"] },
  { title: "Online stores", d: "Product catalogues, carts and Razorpay checkout, ready to take orders from day one.", tags: ["Razorpay", "Inventory", "Shipping"], c: ["oklch(0.62 0.18 35)", "oklch(0.48 0.19 15)"] },
  { title: "Landing pages", d: "Single pages built around one goal: more sign-ups, calls or bookings from your ads.", tags: ["Ads-ready", "Fast", "Forms"], c: ["oklch(0.6 0.14 160)", "oklch(0.42 0.1 175)"] },
  { title: "Redesigns", d: "Keep your content, lose the dated look. We rebuild your site with redirects so your search rankings carry over.", tags: ["Migration", "Redirects", "Speed"], c: ["oklch(0.6 0.2 320)", "oklch(0.45 0.2 300)"] },
  { title: "Branding & SEO", d: "Logos, brand kits and on-page SEO so customers find you and remember you.", tags: ["Logo", "Brand kit", "Google"], c: ["oklch(0.75 0.16 85)", "oklch(0.58 0.16 60)"] },
];
// ponytail: placeholder cards, replace with real projects (add an `img` field + <img> when you have screenshots)
const WORKS = [
  { name: "Kreedo Sports", url: "https://kreedosports.com", bg: SERVICES[0].c },
  { name: "Mana Urban Bowl", url: "https://manaurbanbowl.com", bg: SERVICES[1].c },
  { name: "Creative BRND", url: "https://creativebrnd.com", bg: SERVICES[2].c },
  { name: "Consilli Drusti", url: "https://consillidrusti.com", bg: SERVICES[3].c },
];
// ponytail: live screenshots via WordPress mShots (free, may be slow on first load); swap for static /public images if it matters
const shot = (u: string) => `https://s.wordpress.com/mshots/v1/${encodeURIComponent(u)}?w=1000&h=625`;
const STEPS = [
  { n: "01 · FREE", t: "Discovery call", d: "A free 30-minute call to understand your business, your customers and what the website needs to do." },
  { n: "02", t: "Design", d: "We design your homepage first. You give feedback before a single page is built." },
  { n: "03", t: "Build", d: "We develop every page, connect forms, payments and WhatsApp, and set up SEO basics." },
  { n: "04", t: "Launch & host", d: "Your site goes live on VecraHost servers in India with SSL and backups, and we show you how to update it." },
];
const PKGS = [
  { id: "Starter", price: "9,999", time: "Live in about 7 days", type: "Business website", budget: "Under ₹10,000", features: ["Up to 5 pages", "Mobile-first design", "Contact form + WhatsApp button", "Basic SEO setup", "1 year hosting + .in domain"] },
  { id: "Business", price: "24,999", time: "Live in about 14 days", popular: true, type: "Business website", budget: "₹10,000 – ₹25,000", features: ["Up to 15 pages", "Easy-to-edit CMS", "On-page SEO + Google Business Profile", "Blog and enquiry forms", "2 rounds of revisions", "1 year hosting + domain"] },
  { id: "E-commerce", price: "49,999", time: "Live in 21 to 30 days", type: "Online store", budget: "₹25,000 – ₹50,000", features: ["Up to 100 products", "Razorpay payments", "Inventory and shipping setup", "Order notifications", "Staff training session", "1 year hosting + domain"] },
];
const HOST = [
  { id: "Starter", price: 99, feats: ["1 website", "10 GB NVMe", "Free SSL", "Weekly backups"] },
  { id: "Business", price: 199, feats: ["10 websites", "50 GB NVMe", "10 email accounts", "Daily backups"] },
];
const QTYPES = ["Business website", "Online store", "Landing page", "Website redesign", "Web app / portal", "Not sure yet"];
const QBUDGET = ["Under ₹10,000", "₹10,000 – ₹25,000", "₹25,000 – ₹50,000", "₹50,000+"];
const QTIME = ["As soon as possible", "Within a month", "1 to 3 months", "Just exploring"];
const QNAMES = ["Project", "Budget", "Timeline", "Your details"];
const FAQS = [
  { q: "How long does a website take?", a: "A Starter website takes about 7 days, a Business website about 14 days, and an online store 21 to 30 days. The clock starts once we have your content." },
  { q: "Do I need to provide the content?", a: "You can send your own text and photos, or we can write the content for you as an add-on. Tell us in your enquiry." },
  { q: "Can I edit the website myself?", a: "Yes. Business and E-commerce packages include an easy-to-edit CMS, and we walk you through it at launch." },
  { q: "What happens after the first year of hosting?", a: "Hosting renews from ₹99/mo, billed yearly. Your website belongs to you, so you can also move it anywhere." },
  { q: "How do payments work?", a: "Pay 50% to start and the balance at launch, via UPI, cards or net banking. Prices exclude GST." },
];

function Intro({ onDone }: { onDone: (delay: number) => void }) {
  const [n, setN] = useState(0), [out, setOut] = useState(false), [gone, setGone] = useState(false);
  useEffect(() => {
    let skip = false;
    try {
      skip = sessionStorage.getItem("vh-lp-intro") === "1" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      sessionStorage.setItem("vh-lp-intro", "1");
    } catch { /* storage blocked: just play it */ }
    if (skip) { setGone(true); onDone(0); return; }
    const t0 = performance.now();
    let raf = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 1100);
      setN(Math.round((1 - Math.pow(1 - k, 2.2)) * 100));
      if (k < 1) raf = requestAnimationFrame(tick);
      else { timers.push(setTimeout(() => { setOut(true); onDone(320); }, 120), setTimeout(() => setGone(true), 1200)); }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (gone) return null;
  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 100, background: ACC, color: INK, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(20px,4vw,48px)", transform: out ? "translateY(-100%)" : "none", transition: "transform 1s cubic-bezier(.76,0,.24,1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase" }}><span>VecraHost Studio</span><span>Loading something good</span></div>
      <div style={{ fontSize: "clamp(110px,24vw,360px)", fontWeight: 800, letterSpacing: "-0.07em", lineHeight: 0.8, fontVariantNumeric: "tabular-nums" }}>{n}<span style={{ fontSize: ".35em", letterSpacing: 0 }}>%</span></div>
    </div>
  );
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null), ring = useRef<HTMLDivElement>(null), lab = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let x = -200, y = -200, rx = -200, ry = -200, s = 1, ts = 1, raf = 0;
    const mv = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const el = e.target instanceof Element ? e.target : null;
      const t = el?.closest("a,button,[data-cursor],input,textarea,label");
      const label = el?.closest("[data-cursor]")?.getAttribute("data-cursor") ?? "";
      ts = label ? 3 : t ? 1.7 : 1;
      if (lab.current) { lab.current.textContent = label; lab.current.style.opacity = label ? "1" : "0"; }
      if (ring.current) { ring.current.style.background = label ? ACC : "transparent"; ring.current.style.mixBlendMode = label ? "normal" : "difference"; ring.current.style.borderColor = label ? ACC : "white"; }
    };
    const loop = () => {
      rx += (x - rx) * 0.17; ry += (y - ry) * 0.17; s += (ts - s) * 0.16;
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%) scale(${s})`;
      if (lab.current) lab.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", mv, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("pointermove", mv); cancelAnimationFrame(raf); };
  }, []);
  const base: CSSProperties = { position: "fixed", left: 0, top: 0, pointerEvents: "none", transform: "translate(-200px,-200px)" };
  return (
    <>
      <div ref={ring} style={{ ...base, zIndex: 89, width: 34, height: 34, borderRadius: "50%", border: "1.5px solid white", mixBlendMode: "difference", transition: "background .25s, border-color .25s" }} />
      <div ref={dot} style={{ ...base, zIndex: 90, width: 6, height: 6, borderRadius: "50%", background: "white", mixBlendMode: "difference" }} />
      <div ref={lab} style={{ ...base, zIndex: 91, fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", color: INK, opacity: 0, transition: "opacity .2s", whiteSpace: "nowrap" }} />
    </>
  );
}

function Rotator({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % words.length), 2300); return () => clearInterval(t); }, [words.length]);
  const prev = (i - 1 + words.length) % words.length;
  return (
    <span style={{ display: "inline-grid", verticalAlign: "bottom", overflow: "hidden", paddingBottom: ".08em" }}>
      {words.map((w, k) => (
        <span key={k} style={{ gridArea: "1 / 1", transition: "transform .9s cubic-bezier(.16,1,.3,1), opacity .6s", transform: k === i ? "none" : k === prev ? "translateY(-105%) rotate(-5deg)" : "translateY(105%) rotate(5deg)", opacity: k === i ? 1 : 0, transformOrigin: "0 100%" }}>{w}</span>
      ))}
    </span>
  );
}

function BigMarquee({ items, outline, dur, reverse, color }: { items: string[]; outline?: boolean; dur: number; reverse?: boolean; color: string }) {
  const row = (k: number) => (
    <div key={k} aria-hidden={k ? true : undefined} style={{ display: "flex", alignItems: "center", flex: "none" }}>
      {items.map((t, i) => (
        <React.Fragment key={i}>
          <span style={{ padding: "0 .35em", whiteSpace: "nowrap", color: outline && i % 2 ? "transparent" : color, WebkitTextStroke: outline && i % 2 ? "1.5px " + color : undefined }}>{t}</span>
          <span style={{ fontSize: ".45em", color }}>✦</span>
        </React.Fragment>
      ))}
    </div>
  );
  return (
    <div style={{ overflow: "hidden" }}>
      <div style={{ display: "flex", width: "max-content", fontSize: "clamp(34px,5.6vw,80px)", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1.1, animation: `vh-marquee ${dur}s linear infinite${reverse ? " reverse" : ""}` }}>{row(0)}{row(1)}</div>
    </div>
  );
}

const THEMES = [
  { a: "oklch(0.55 0.2 262)", t: "oklch(0.95 0.03 262)", d: "yourbusiness.in" },
  { a: "oklch(0.58 0.14 155)", t: "oklch(0.95 0.04 155)", d: "greenleafcafe.in" },
  { a: "oklch(0.62 0.18 35)", t: "oklch(0.95 0.035 40)", d: "studiokala.in" },
];
function SiteBuilder() {
  const [s, set] = useState({ step: 0, th: 0 });
  useEffect(() => {
    const d = s.step < 9 ? setTimeout(() => set({ step: s.step + 1, th: s.th }), s.step === 0 ? 600 : 380) : setTimeout(() => set({ step: 0, th: (s.th + 1) % THEMES.length }), 2600);
    return () => clearTimeout(d);
  }, [s]);
  const T = THEMES[s.th], ink = "oklch(0.25 0.02 255)", grey = "oklch(0.9 0.006 240)";
  const show = (n: number, st?: CSSProperties): CSSProperties => ({ opacity: s.step >= n ? 1 : 0, transform: s.step >= n ? "none" : "translateY(14px) scale(.95)", transition: `opacity .5s ${EZ}, transform .6s cubic-bezier(.34,1.56,.64,1), outline-color .4s`, outline: "2px solid", outlineColor: s.step === n ? T.a : "transparent", outlineOffset: 3, ...st });
  const bar = (w: string | number, hh: number, c: string, n: number, x?: CSSProperties) => <div style={show(n, { width: w, height: hh, borderRadius: 6, background: c, ...x })} />;
  return (
    <div aria-hidden style={{ position: "relative", background: "white", color: ink, borderRadius: 18, boxShadow: "0 40px 80px -30px oklch(0 0 0 / 0.75)", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 12px", background: "oklch(0.96 0.005 240)", borderBottom: "1px solid oklch(0.92 0.006 240)" }}>
        {["oklch(0.7 0.17 25)", "oklch(0.82 0.15 85)", "oklch(0.72 0.15 150)"].map((c, i) => <span key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
        <div style={{ marginLeft: 8, flex: 1, minWidth: 0, background: "white", borderRadius: 8, padding: "4px 10px", fontSize: 12, fontFamily: MONO, color: "oklch(0.4 0.02 255)", border: "1px solid oklch(0.92 0.006 240)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}><span style={{ color: "oklch(0.6 0.02 255)" }}>https://</span>{T.d}</div>
      </div>
      <div style={{ padding: "clamp(12px,2.4vw,20px)", display: "grid", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={show(1, { display: "flex", alignItems: "center", gap: 8 })}><div style={{ width: 20, height: 20, borderRadius: 6, background: T.a, transition: "background .6s" }} /><div style={{ width: 50, height: 7, borderRadius: 4, background: ink }} /></div>
          <div style={show(1, { display: "flex", gap: 8 })}>{[0, 1, 2].map((i) => <div key={i} style={{ width: 26, height: 5, borderRadius: 3, background: grey }} />)}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 14, alignItems: "center" }}>
          <div style={{ display: "grid", gap: 8 }}>{bar("94%", 12, ink, 2)}{bar("66%", 12, ink, 3)}{bar("88%", 5, grey, 3, { marginTop: 5 })}{bar("72%", 5, grey, 3)}{bar(80, 26, T.a, 4, { marginTop: 6, borderRadius: 8 })}</div>
          <div style={show(5, { aspectRatio: "1 / 0.85", borderRadius: 12, background: `linear-gradient(135deg, ${T.t}, ${T.a})` })} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 8 }}>
          {[6, 7, 8].map((n) => (
            <div key={n} style={show(n, { background: T.t, borderRadius: 10, padding: 10, display: "grid", gap: 6 })}>
              <div style={{ width: 16, height: 16, borderRadius: 5, background: T.a }} /><div style={{ width: "80%", height: 5, borderRadius: 3, background: ink, opacity: 0.8 }} /><div style={{ width: "60%", height: 4, borderRadius: 3, background: "oklch(0.8 0.01 240)" }} />
            </div>
          ))}
        </div>
      </div>
      <div style={show(9, { position: "absolute", right: 12, bottom: 12, display: "flex", alignItems: "center", gap: 8, background: ink, color: "white", padding: "9px 13px", borderRadius: 12, fontSize: 13, fontWeight: 600, boxShadow: "0 12px 30px oklch(0 0 0 / 0.35)", outlineColor: "transparent" })}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(0.78 0.17 150)" }} />Live on {T.d}
      </div>
    </div>
  );
}

const TERM = ["$ vecra deploy yourbusiness.in", "→ Uploading site to Mumbai · NVMe", "→ Issuing free SSL certificate", "→ Daily backups enabled", "✓ Live at https://yourbusiness.in"];
function Terminal() {
  const [st, set] = useState({ line: 0, ch: 0 });
  useEffect(() => {
    const L = TERM[st.line];
    let d: ReturnType<typeof setTimeout>;
    if (st.ch < L.length) d = setTimeout(() => set({ line: st.line, ch: st.line === 0 ? st.ch + 1 : L.length }), st.line === 0 ? 55 : 520);
    else if (st.line < TERM.length - 1) d = setTimeout(() => set({ line: st.line + 1, ch: 0 }), 180);
    else d = setTimeout(() => set({ line: 0, ch: 0 }), 3600);
    return () => clearTimeout(d);
  }, [st]);
  return (
    <div role="img" aria-label="Website being deployed to VecraHost hosting" style={{ background: "oklch(0.12 0.015 265)", border: "1px solid oklch(0.32 0.04 262)", borderRadius: 22, overflow: "hidden", boxShadow: "0 40px 80px -30px oklch(0 0 0 / 0.7)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "12px 16px", borderBottom: "1px solid oklch(0.26 0.03 262)" }}>
        {["oklch(0.7 0.17 25)", "oklch(0.82 0.15 85)", "oklch(0.72 0.15 150)"].map((c, i) => <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        <span style={{ marginLeft: 10, fontFamily: MONO, fontSize: 12, color: "oklch(0.7 0.02 260)" }}>vecrahost — mumbai-1</span>
      </div>
      <div style={{ padding: "clamp(16px,3vw,24px)", fontFamily: MONO, fontSize: "clamp(12px,1.3vw,14px)", lineHeight: 2, minHeight: 210, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
        {TERM.slice(0, st.line + 1).map((l, i) => (
          <div key={i} style={{ color: l[0] === "$" ? "oklch(0.95 0.01 260)" : l[0] === "✓" ? ACC : "oklch(0.72 0.03 260)" }}>
            {i === st.line ? l.slice(0, st.ch) : l}
            {i === st.line && <span style={{ display: "inline-block", width: 8, height: 16, marginLeft: 3, verticalAlign: "-3px", background: ACC, animation: "vh-blink 1s steps(1) infinite" }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

const hostBtn: CSSProperties = { fontSize: 16, fontWeight: 600, padding: "15px 22px", borderRadius: 999 };
const label: CSSProperties = { display: "grid", gap: 8, fontSize: 14, fontWeight: 500, color: "oklch(0.82 0.015 265)" };
const field: CSSProperties = { padding: "15px 16px", borderRadius: 14, border: "1px solid oklch(0.32 0.02 265)", background: "oklch(0.14 0.012 265)", color: FG, fontSize: 16 };
const qH3: CSSProperties = { margin: "0 0 20px", fontSize: "clamp(26px,3vw,34px)", letterSpacing: "-0.03em", fontWeight: 600 };
const choiceGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,140px),1fr))", gap: 10 };
const choiceBtn = (on: boolean): CSSProperties => ({ minHeight: 64, padding: 16, borderRadius: 18, textAlign: "left", fontSize: 17, fontWeight: 500, cursor: "pointer", transition: "border-color .25s,background .25s,transform .15s", color: FG, ...pill(on) });
const footHead: CSSProperties = { margin: "0 0 14px", fontSize: 13, fontFamily: MONO, fontWeight: 500, letterSpacing: ".08em", color: "oklch(0.65 0.015 265)" };
const footLink: CSSProperties = { color: "oklch(0.88 0.01 265)" };

export default function Landing() {
  const [mobile, setMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [svc, setSvc] = useState(0), [svcIn, setSvcIn] = useState(false);
  const [faq, setFaq] = useState(0);
  const [hostPlan, setHostPlan] = useState("Business"), [addHosting, setAddHosting] = useState(false);
  const [qStep, setQStep] = useState(0);
  const [qType, setQType] = useState<string | null>(null), [qBudget, setQBudget] = useState<string | null>(null), [qTime, setQTime] = useState<string | null>(null);
  const [qSent, setQSent] = useState<{ name: string } | null>(null);
  const [qBusy, setQBusy] = useState(false), [qErr, setQErr] = useState("");
  const [mcta, setMcta] = useState(false);

  const headerRef = useRef<HTMLElement>(null), progRef = useRef<HTMLDivElement>(null), heroRef = useRef<HTMLDivElement>(null), bandsRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null), workRef = useRef<HTMLElement>(null), trackRef = useRef<HTMLDivElement>(null);
  const procRef = useRef<HTMLDivElement>(null), procLineRef = useRef<HTMLDivElement>(null), quoteRef = useRef<HTMLElement>(null);
  const heroAnims = useRef<Animation[]>([]), introFired = useRef(false);
  const mobileRef = useRef(false), mctaRef = useRef(false);
  const reduce = useRef(false);

  const playHero = (delay: number) => { introFired.current = true; setTimeout(() => heroAnims.current.forEach((a) => a.play()), delay); };

  // one-time setup: breakpoint, entrance/reveal animations, scroll + pointer effects
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mq = window.matchMedia("(max-width: 860px)");
    const onMq = () => { mobileRef.current = mq.matches; setMobile(mq.matches); setMenuOpen(false); if (trackRef.current) trackRef.current.style.transform = ""; onScroll(); };
    const all = (sel: string) => Array.from(document.querySelectorAll<HTMLElement>(sel));
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { anims.get(en.target)?.play(); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
    const anims = new WeakMap<Element, Animation>();

    if (!reduce.current) {
      all("[data-line]").forEach((el, i) => { const a = el.animate([{ transform: "translateY(115%) rotate(7deg)" }, { transform: "none" }], { duration: 1200, delay: i * 120, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" }); a.pause(); heroAnims.current.push(a); });
      all("[data-hero]").forEach((el, i) => { const a = el.animate([{ opacity: 0, transform: "translateY(30px)", filter: "blur(8px)" }, { opacity: 1, transform: "none", filter: "blur(0)" }], { duration: 1000, delay: 380 + i * 90, easing: EZ, fill: "both" }); a.pause(); a.onfinish = () => a.cancel(); heroAnims.current.push(a); });
      if (introFired.current) playHero(0);
      all("[data-orb]").forEach((el) => el.animate([{ transform: "translate(0,0) scale(1)" }, { transform: "translate(6%,8%) scale(1.18)" }], { duration: 9000 + Math.random() * 4000, direction: "alternate", iterations: Infinity, easing: "ease-in-out" }));
      all("[data-float]").forEach((el) => el.animate([{ transform: "translateY(0) rotate(-2deg)" }, { transform: "translateY(-12px) rotate(2deg)" }], { duration: 2400 + Math.random() * 1200, direction: "alternate", iterations: Infinity, easing: "ease-in-out" }));
      all("[data-spin]").forEach((el) => el.animate([{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }], { duration: 4200, iterations: Infinity }));
      all("[data-pulse]").forEach((el) => el.animate([{ boxShadow: "0 0 0 0 oklch(0.9 0.19 128 / 0.7)" }, { boxShadow: "0 0 0 10px oklch(0.9 0.19 128 / 0)" }], { duration: 1600, iterations: Infinity }));
      all("[data-reveal], [data-stagger] > *").forEach((el) => {
        const par = el.parentElement, i = par?.hasAttribute("data-stagger") ? Array.prototype.indexOf.call(par.children, el) : 0;
        const big = el.tagName === "H2";
        const kf = big ? [{ opacity: 0, transform: "translateY(60px) skewY(4deg)", clipPath: "inset(0 0 100% 0)" }, { opacity: 1, transform: "none", clipPath: "inset(-20% -5% -25% -5%)" }]
          : [{ opacity: 0, transform: "translateY(40px) scale(.98)", filter: "blur(8px)" }, { opacity: 1, transform: "none", filter: "blur(0)" }];
        const a = el.animate(kf, { duration: big ? 1100 : 900, delay: Math.min(i, 8) * 100, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" });
        a.pause(); a.onfinish = () => a.cancel();
        anims.set(el, a); io.observe(el);
      });
    }

    let lastY = 0, hdOn: boolean | null = null, sk: ReturnType<typeof setTimeout>;
    function onScroll() {
      const y = window.scrollY, vh = window.innerHeight, d = document.documentElement, mob = mobileRef.current;
      if (progRef.current) progRef.current.style.transform = `scaleX(${Math.min(1, y / Math.max(1, d.scrollHeight - vh))})`;
      const hd = headerRef.current;
      if (hd) { const on = y > 40; if (on !== hdOn) { hdOn = on; hd.style.background = on ? "oklch(0.14 0.012 265 / 0.72)" : "transparent"; hd.style.backdropFilter = on ? "blur(16px)" : "none"; hd.style.borderBottomColor = on ? LINE : "transparent"; } }
      if (mob) {
        const qr = quoteRef.current?.getBoundingClientRect();
        const show = y > vh * 0.7 && !(qr && qr.top < vh && qr.bottom > 0);
        if (show !== mctaRef.current) { mctaRef.current = show; setMcta(show); }
        if (!reduce.current && y < vh * 1.2) all("[data-depth]").forEach((el) => { el.style.translate = `0 ${-y * +(el.dataset.depth ?? 0) * 0.012}px`; });
      }
      if (reduce.current) return;
      const hr = heroRef.current; if (hr && y < vh * 1.3) { hr.style.translate = `0 ${y * 0.3}px`; hr.style.opacity = String(Math.max(0, 1 - y / (vh * 0.95))); }
      const b = bandsRef.current;
      if (b) { const v = Math.max(-10, Math.min(10, (y - (lastY || y)) * 0.25)); b.style.transform = `skewY(${v}deg)`; clearTimeout(sk); sk = setTimeout(() => { b.style.transform = "skewY(0deg)"; }, 140); }
      lastY = y;
      if (!mob) { const w = workRef.current, t = trackRef.current; if (w && t) { const r = w.getBoundingClientRect(); const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh))); t.style.transform = `translateX(${-p * Math.max(0, t.scrollWidth - t.clientWidth)}px)`; } }
      const pl = procLineRef.current, ps = procRef.current; if (pl && ps) { const r = ps.getBoundingClientRect(); pl.style.transform = `scaleY(${Math.min(1, Math.max(0, (vh * 0.65 - r.top) / r.height))})`; }
    }
    const onMove = (e: PointerEvent) => {
      if (reduce.current || mobileRef.current || e.pointerType === "touch") return;
      const cx = e.clientX / window.innerWidth - 0.5, cy = e.clientY / window.innerHeight - 0.5;
      all("[data-depth]").forEach((el) => { const dd = +(el.dataset.depth ?? 0); el.style.translate = `${cx * dd}px ${cy * dd}px`; });
      const spot = e.target instanceof Element ? e.target.closest<HTMLElement>("[data-spot]") : null;
      if (spot) { const r = spot.getBoundingClientRect(); spot.style.setProperty("--mx", e.clientX - r.left + "px"); spot.style.setProperty("--my", e.clientY - r.top + "px"); }
      all("[data-magnet]").forEach((m) => { const r = m.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2); const near = Math.abs(dx) < r.width / 2 + 60 && Math.abs(dy) < r.height / 2 + 60; m.style.translate = near ? `${dx * 0.18}px ${dy * 0.28}px` : "0 0"; });
      if (previewRef.current) previewRef.current.style.translate = `${e.clientX + 28}px ${e.clientY - 95}px`;
    };

    mq.addEventListener("change", onMq);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mobileRef.current = mq.matches; setMobile(mq.matches);
    onScroll();
    return () => {
      document.body.style.overflow = "";
      mq.removeEventListener("change", onMq);
      window.removeEventListener("pointermove", onMove); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll);
      io.disconnect(); clearTimeout(sk);
    };
  }, []);

  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; }, [menuOpen]);
  useEffect(() => {
    if (!menuOpen || reduce.current) return;
    document.querySelectorAll("[data-menu] > *").forEach((el, i) => el.animate([{ opacity: 0, transform: "translateY(40px)" }, { opacity: 1, transform: "none" }], { duration: 600, delay: i * 55, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" }));
  }, [menuOpen]);
  const prevStep = useRef(0);
  useEffect(() => {
    if (!reduce.current && prevStep.current !== qStep) {
      const dir = qStep > prevStep.current ? 1 : -1;
      document.querySelector("[data-qstep]")?.animate([{ opacity: 0, transform: `translateX(${40 * dir}px)`, filter: "blur(6px)" }, { opacity: 1, transform: "none", filter: "blur(0)" }], { duration: 520, easing: EZ });
    }
    prevStep.current = qStep;
  }, [qStep]);
  useEffect(() => {
    if (qSent && !reduce.current) document.querySelector("[data-success]")?.animate([{ opacity: 0, transform: "scale(.9)" }, { opacity: 1, transform: "none" }], { duration: 700, easing: "cubic-bezier(.34,1.56,.64,1)" });
  }, [qSent]);

  const hp = HOST.find((x) => x.id === hostPlan) ?? HOST[1];
  const canNext = qStep === 0 ? !!qType : qStep === 1 ? !!qBudget : qStep === 2 ? !!qTime : false;
  const sv = SERVICES[svc];
  const hostLine = `${hp.id} plan · ₹${hp.price}/mo billed yearly`;
  const closeMenu = () => setMenuOpen(false);

  const submitQuote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const g = (k: string) => String(fd.get(k) || "").trim();
    setQBusy(true); setQErr("");
    try {
      const res = await fetch("/api/support-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: g("email"),
          category: "Web design quote",
          description: [`Name: ${g("name")}`, `Phone: ${g("phone")}`, `Business/site: ${g("business") || "-"}`, `Project: ${qType}`, `Budget: ${qBudget}`, `Timeline: ${qTime}`, `Hosting: ${addHosting ? hostLine : "Not added"}`, `Message: ${g("message") || "-"}`].join("\n"),
        }),
      });
      if (!res.ok) throw new Error();
      setQSent({ name: g("name").split(" ")[0] || "there" });
    } catch {
      setQErr("Something went wrong. Please try again or email support@vecrahost.in.");
    } finally {
      setQBusy(false);
    }
  };
  const resetQuote = () => { setQSent(null); setQStep(0); setQType(null); setQBudget(null); setQTime(null); };
  const choices = (list: string[], cur: string | null, set: (v: string) => void) => list.map((l) => (
    <button key={l} type="button" onClick={() => set(l)} aria-pressed={cur === l} className="vh-press" style={choiceBtn(cur === l)}>{l}</button>
  ));
  const waShow = !!WA_NUMBER;

  return (
    <div className={`vh-root ${sans.variable} ${mono.variable}`}>
      <Intro onDone={playHero} />
      {!mobile && <Cursor />}

      {/* HEADER */}
      <header ref={headerRef} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, borderBottom: "1px solid transparent", transition: "background .4s,border-color .4s" }}>
        <div ref={progRef} style={{ position: "absolute", left: 0, bottom: -1, height: 2, width: "100%", background: ACC, transformOrigin: "0 50%", transform: "scaleX(0)", pointerEvents: "none" }} />
        <nav aria-label="Main" style={{ maxWidth: 1320, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", gap: 24 }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, color: FG, fontWeight: 700, fontSize: 20, letterSpacing: "-0.03em" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vecraSymbol.png" alt="VecraHost logo" width={34} height={28} style={{ display: "block", objectFit: "contain" }} />VecraHost
            <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: ".08em", color: INK, background: ACC, padding: "3px 7px", borderRadius: 6 }}>STUDIO</span>
          </a>
          {!mobile ? (
            <>
              <div style={{ display: "flex", gap: 4, marginLeft: "auto" }}>
                {NAV.map(([l, href]) => <a key={l} href={href} className="vh-navlink" style={{ padding: "8px 14px", fontSize: 15, fontWeight: 500, color: "oklch(0.8 0.015 265)", borderRadius: 999 }}>{l}</a>)}
              </div>
              <a data-magnet="" href="#quote" className="vh-lime" style={{ transition: `translate .35s ${EZ},background .2s`, fontSize: 15, fontWeight: 600, color: INK, background: ACC, padding: "11px 18px", borderRadius: 999 }}>Get a quote</a>
            </>
          ) : (
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen} style={{ marginLeft: "auto", width: 46, height: 46, borderRadius: "50%", border: "1px solid oklch(0.3 0.02 265)", background: "oklch(0.18 0.014 265)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, padding: 0 }}>
              <span style={{ display: "block", width: 18, height: 2, borderRadius: 2, background: FG, transition: `transform .35s ${EZ}`, transform: menuOpen ? "translateY(3.5px) rotate(45deg)" : "none" }} />
              <span style={{ display: "block", width: 18, height: 2, borderRadius: 2, background: FG, transition: `transform .35s ${EZ}`, transform: menuOpen ? "translateY(-3.5px) rotate(-45deg)" : "none" }} />
            </button>
          )}
        </nav>
      </header>

      {menuOpen && (
        <div data-menu="" style={{ position: "fixed", inset: 0, zIndex: 48, background: "oklch(0.14 0.012 265)", padding: "110px 24px 32px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
          {NAV.map(([l, href], i) => (
            <a key={l} href={href} onClick={closeMenu} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 44, fontWeight: 700, letterSpacing: "-0.045em", padding: "10px 0", color: FG, borderBottom: "1px solid oklch(0.28 0.02 265)" }}>{l}<span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 400, color: "oklch(0.7 0.015 265)" }}>0{i + 1}</span></a>
          ))}
          <a href="#quote" onClick={closeMenu} style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 58, borderRadius: 999, fontSize: 18, fontWeight: 600, color: INK, background: ACC }}>Get a free quote →</a>
        </div>
      )}

      <main>
        {/* HERO */}
        <section id="top" style={{ position: "relative", minHeight: "100svh", padding: "clamp(100px,14vw,130px) 20px clamp(40px,6vw,72px)", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden" }}>
          <div data-orb="" aria-hidden style={{ position: "absolute", width: "70vw", height: "70vw", maxWidth: 980, maxHeight: 980, left: "-18%", top: "-30%", borderRadius: "50%", background: "radial-gradient(circle,oklch(0.6 0.2 262 / 0.5),transparent 62%)", filter: "blur(30px)", pointerEvents: "none" }} />
          <div data-orb="" aria-hidden style={{ position: "absolute", width: "44vw", height: "44vw", maxWidth: 640, maxHeight: 640, right: "-10%", bottom: "-18%", borderRadius: "50%", background: "radial-gradient(circle,oklch(0.85 0.19 128 / 0.22),transparent 62%)", filter: "blur(30px)", pointerEvents: "none" }} />
          <div ref={heroRef} style={{ position: "relative", maxWidth: 1320, width: "100%", margin: "0 auto" }}>
            <div data-hero="" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: MONO, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: "oklch(0.8 0.015 265)", border: "1px solid oklch(0.32 0.02 265)", padding: "8px 14px", borderRadius: 999, background: "oklch(0.16 0.012 265 / 0.6)" }}><span data-pulse="" style={{ width: 8, height: 8, borderRadius: "50%", background: ACC }} />Web design studio · India</div>
            <h1 aria-label="We build websites that sell." style={{ margin: "28px 0 0", fontSize: "clamp(36px,10.5vw,176px)", lineHeight: 0.9, letterSpacing: "-0.06em", fontWeight: 700 }}>
              <span aria-hidden style={{ display: "block", overflow: "hidden", paddingBottom: ".04em" }}><span data-line="" style={{ display: "inline-block" }}>We build</span></span>
              <span aria-hidden style={{ display: "block", overflow: "hidden", paddingBottom: ".04em" }}><span data-line="" style={{ display: "inline-block" }}>websites that</span></span>
              <span aria-hidden style={{ display: "block", overflow: "hidden", paddingBottom: ".1em" }}><span data-line="" style={{ display: "inline-block", color: ACC }}><Rotator words={["sell.", "convert.", "rank.", "grow."]} /></span></span>
            </h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: 48, alignItems: "end", marginTop: 40 }}>
              <div>
                <p data-hero="" style={{ fontSize: "clamp(18px,1.6vw,22px)", lineHeight: 1.5, color: "oklch(0.8 0.015 265)", maxWidth: 520, margin: "0 0 32px", textWrap: "pretty" }}>We design, build and host fast, mobile-first websites for Indian businesses. Fixed prices in rupees, SEO built in, and a year of hosting included.</p>
                <div data-hero="" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                  <a data-magnet="" data-cursor="Let's go" href="#quote" className="vh-lime vh-press" style={{ flex: mobile ? "1 1 100%" : "0 0 auto", justifyContent: "space-between", transition: `translate .35s ${EZ},background .2s,transform .15s`, display: "inline-flex", alignItems: "center", gap: 14, fontSize: 18, fontWeight: 600, color: INK, background: ACC, padding: "10px 10px 10px 26px", borderRadius: 999 }}>Get a free quote<span style={{ width: 44, height: 44, borderRadius: "50%", background: INK, color: ACC, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>→</span></a>
                  <a href="#pricing" className="vh-ghost" style={{ flex: mobile ? "1 1 100%" : "0 0 auto", textAlign: "center", fontSize: 17, fontWeight: 600, color: FG, border: "1px solid oklch(0.34 0.02 265)", padding: "17px 26px", borderRadius: 999 }}>See packages</a>
                </div>
                <div data-hero="" style={{ display: "flex", gap: "8px 22px", flexWrap: "wrap", marginTop: 28, fontFamily: MONO, fontSize: 13, color: "oklch(0.72 0.015 265)" }}><span>✓ Fixed prices in ₹</span><span>✓ Live in 7–30 days</span><span>✓ Hosted in India</span></div>
              </div>
              <div data-hero="" style={{ position: "relative", height: "clamp(290px,32vw,430px)", marginTop: mobile ? 8 : 0 }}>
                <div data-depth="-16" style={{ position: "absolute", right: "10%", top: 0, width: "58%", transform: "rotate(-8deg)", transition: "translate .3s ease-out" }}>
                  <div style={{ aspectRatio: "4 / 3", borderRadius: 16, background: "linear-gradient(160deg,oklch(0.66 0.17 35),oklch(0.52 0.2 15))", boxShadow: "0 30px 60px -20px oklch(0 0 0 / 0.6)", padding: 18, display: "grid", gap: 10, alignContent: "start" }}>
                    <div style={{ width: "40%", height: 10, borderRadius: 5, background: "oklch(1 0 0 / 0.85)" }} />
                    <div style={{ width: "75%", height: 18, borderRadius: 6, background: "oklch(1 0 0 / 0.95)", marginTop: 18 }} />
                    <div style={{ width: "55%", height: 18, borderRadius: 6, background: "oklch(1 0 0 / 0.95)" }} />
                    <div style={{ width: "30%", height: 26, borderRadius: 13, background: "oklch(0.2 0.03 30)", marginTop: 10 }} />
                  </div>
                </div>
                <div data-depth="12" style={{ position: "absolute", left: 0, top: "14%", width: "54%", transform: "rotate(6deg)", transition: "translate .3s ease-out" }}>
                  <div style={{ aspectRatio: "4 / 3", borderRadius: 16, background: "linear-gradient(160deg,oklch(0.62 0.14 160),oklch(0.42 0.1 170))", boxShadow: "0 30px 60px -20px oklch(0 0 0 / 0.6)", padding: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, alignContent: "start" }}>
                    <div style={{ gridColumn: "1 / -1", width: "45%", height: 10, borderRadius: 5, background: "oklch(1 0 0 / 0.85)" }} />
                    <div style={{ aspectRatio: "1", borderRadius: 10, background: "oklch(1 0 0 / 0.2)" }} />
                    <div style={{ aspectRatio: "1", borderRadius: 10, background: "oklch(1 0 0 / 0.2)" }} />
                  </div>
                </div>
                <div data-depth="26" style={{ position: "absolute", right: 0, bottom: 0, width: mobile ? "86%" : "74%", transition: "translate .3s ease-out" }}><SiteBuilder /></div>
                <div data-depth="40" style={{ position: "absolute", left: "2%", bottom: "10%", transition: "translate .3s ease-out" }}><span data-float="" style={{ display: "inline-block", background: ACC, color: INK, fontWeight: 600, padding: "10px 16px", borderRadius: 999, fontSize: 15, boxShadow: "0 14px 30px -8px oklch(0 0 0 / 0.5)" }}>✓ Mobile-first</span></div>
                <div data-depth="-34" style={{ position: "absolute", right: 0, top: "-6%", transition: "translate .3s ease-out" }}><span data-float="" style={{ display: "inline-block", background: "oklch(0.2 0.015 265)", border: "1px solid oklch(0.34 0.02 265)", color: FG, fontWeight: 600, padding: "10px 16px", borderRadius: 999, fontSize: 15, boxShadow: "0 14px 30px -8px oklch(0 0 0 / 0.5)" }}>SEO-ready ↗</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* BANDS */}
        <section aria-label="What we build" style={{ padding: "clamp(24px,5vw,48px) 0 clamp(56px,9vw,96px)" }}>
          <div ref={bandsRef} style={{ transition: "transform .35s ease-out" }}>
            <div style={{ transform: "rotate(-3deg)", background: ACC, padding: "16px 0", margin: "0 -4%", position: "relative", zIndex: 1 }}><BigMarquee items={["Business websites", "Online stores", "Landing pages", "Redesigns", "SEO", "Branding"]} dur={30} color={INK} /></div>
            <div style={{ transform: "rotate(2.2deg)", background: "oklch(0.19 0.015 265)", borderTop: "1px solid oklch(0.3 0.02 265)", borderBottom: "1px solid oklch(0.3 0.02 265)", padding: "16px 0", margin: "-34px -4% 0" }}><BigMarquee items={["Designed in India", "Hosted in India", "Fixed prices", "Mobile-first", "Razorpay-ready"]} dur={38} reverse outline color={FG} /></div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" style={sectionWrap}>
          <div style={headRow}>
            <h2 data-reveal="" style={h2Style}>What we build</h2>
            <p data-reveal="" style={{ ...pStyle, maxWidth: 380 }}>Everything your business needs to look professional online, from one team.</p>
          </div>
          <div data-stagger="" onMouseLeave={() => setSvcIn(false)} style={{ borderTop: "1px solid " + LINE }}>
            {SERVICES.map((s, i) => {
              const on = svc === i;
              const arrow = mobile ? 40 : 52;
              return (
                <div key={s.title} onMouseEnter={() => { setSvc(i); setSvcIn(true); }} onClick={() => { setSvc(i); setSvcIn(true); }} data-cursor="Open" style={{ borderBottom: "1px solid " + LINE, padding: "26px 0", cursor: "pointer" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "clamp(36px,5vw,64px) minmax(0,1fr) auto", gap: 16, alignItems: "center" }}>
                    <span style={{ fontFamily: MONO, fontSize: 14, color: "oklch(0.7 0.015 265)" }}>0{i + 1}</span>
                    <h3 style={{ margin: 0, fontSize: "clamp(30px,4.6vw,64px)", letterSpacing: "-0.045em", fontWeight: 600, lineHeight: 1, transition: `transform .55s ${EZ},color .3s`, transform: on && !mobile ? "translateX(18px)" : "none", color: on ? ACC : FG }}>{s.title}</h3>
                    <span style={{ width: arrow, height: arrow, flex: "none", borderRadius: "50%", border: "1px solid oklch(0.34 0.02 265)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, transition: `transform .45s ${EZ},background .3s,color .3s`, transform: on ? "rotate(-45deg)" : "none", background: on ? ACC : "transparent", color: on ? INK : FG }}>→</span>
                  </div>
                  <div style={{ display: "grid", transition: `grid-template-rows .55s ${EZ}`, gridTemplateRows: on ? "1fr" : "0fr" }}>
                    <div style={{ overflow: "hidden" }}>
                      <div style={{ padding: `18px 0 4px ${mobile ? 0 : "clamp(52px,calc(5vw + 16px),80px)"}`, display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", alignItems: "flex-end" }}>
                        <p style={{ margin: 0, maxWidth: 560, fontSize: 18, lineHeight: 1.55, color: "oklch(0.8 0.015 265)" }}>{s.d}</p>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{s.tags.map((t) => <span key={t} style={{ fontFamily: MONO, fontSize: 12, padding: "7px 12px", borderRadius: 999, border: "1px solid oklch(0.34 0.02 265)", color: "oklch(0.85 0.015 265)" }}>{t}</span>)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <div ref={previewRef} aria-hidden style={{ position: "fixed", left: 0, top: 0, width: 260, height: 190, pointerEvents: "none", zIndex: 40, borderRadius: 18, overflow: "hidden", transition: `opacity .35s,transform .45s ${EZ},translate .6s ${EZ},background .4s`, boxShadow: "0 30px 60px -20px oklch(0 0 0 / 0.7)", opacity: svcIn && !mobile ? 1 : 0, transform: svcIn && !mobile ? "scale(1) rotate(-4deg)" : "scale(.6) rotate(0deg)", background: `linear-gradient(140deg, ${sv.c[0]}, ${sv.c[1]})` }}>
          <div style={{ padding: 18, display: "grid", gap: 10 }}>
            <div style={{ display: "flex", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(1 0 0 / 0.6)" }} /><span style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(1 0 0 / 0.4)" }} /><span style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(1 0 0 / 0.3)" }} /></div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em", color: "white", marginTop: 28, lineHeight: 1 }}>{sv.title}</div>
            <div style={{ width: "70%", height: 7, borderRadius: 4, background: "oklch(1 0 0 / 0.5)" }} />
            <div style={{ width: "46%", height: 7, borderRadius: 4, background: "oklch(1 0 0 / 0.35)" }} />
          </div>
        </div>

        {/* WORK */}
        <section id="work" ref={workRef} style={{ position: "relative", height: mobile ? "auto" : "340vh", padding: mobile ? "72px 0" : 0 }}>
          <div style={{ position: "sticky", top: 0, height: mobile ? "auto" : "100vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
            <div ref={trackRef} style={{ display: "flex", gap: mobile ? 14 : 24, padding: "0 20px 8px", scrollPadding: "0 20px", width: "100%", willChange: "transform", scrollSnapType: "x mandatory", scrollbarWidth: "none", overflowX: mobile ? "auto" : "visible" }}>
              <div style={{ flex: "none", width: "min(80vw,440px)", display: "flex", flexDirection: "column", justifyContent: "center", scrollSnapAlign: "start" }}>
                <h2 style={{ ...h2Style, margin: "0 0 20px" }}>Selected work</h2>
                <p style={{ ...pStyle, margin: "0 0 24px", maxWidth: 360 }}>Recent websites we&apos;ve designed, built and hosted for our clients.</p>
                <span style={{ fontFamily: MONO, fontSize: 13, color: ACC }}>{mobile ? "Swipe →" : "Keep scrolling →"}</span>
              </div>
              {WORKS.map((w, i) => (
                <figure key={i} data-cursor="View" style={{ flex: "none", width: "min(84vw,640px)", margin: 0, scrollSnapAlign: "start" }}>
                  <a href={w.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", aspectRatio: "16 / 10", borderRadius: 22, overflow: "hidden", background: `linear-gradient(140deg, ${w.bg[0]}, ${w.bg[1]})`, border: "1px solid " + LINE }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={shot(w.url)} alt={`${w.name} website screenshot`} loading="lazy" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
                  </a>
                  <figcaption style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
                    <div><div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>{w.name}</div><div style={{ fontSize: 15, color: "oklch(0.72 0.015 265)", marginTop: 4 }}>{w.url.replace("https://", "")}</div></div>
                    <span style={{ fontFamily: MONO, fontSize: 13, color: "oklch(0.7 0.015 265)" }}>0{i + 1}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(72px,10vw,120px) 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: 56 }}>
          <div>
            <div style={{ position: "sticky", top: 120 }}>
              <h2 data-reveal="" style={{ ...h2Style, fontSize: "clamp(44px,6.4vw,96px)", margin: "0 0 20px" }}>From first call to launch.</h2>
              <p data-reveal="" style={{ ...pStyle, lineHeight: 1.55, maxWidth: 420 }}>You always know what happens next. No jargon, no surprises.</p>
            </div>
          </div>
          <div ref={procRef} style={{ position: "relative", paddingLeft: 44 }}>
            <div style={{ position: "absolute", left: 11, top: 10, bottom: 10, width: 2, background: "oklch(0.28 0.02 265)" }} />
            <div ref={procLineRef} style={{ position: "absolute", left: 11, top: 10, bottom: 10, width: 2, background: ACC, transformOrigin: "50% 0", transform: "scaleY(0)", boxShadow: "0 0 16px oklch(0.9 0.19 128 / 0.6)" }} />
            {STEPS.map((st) => (
              <div key={st.t} data-reveal="" style={{ position: "relative", paddingBottom: 64 }}>
                <span style={{ position: "absolute", left: -44, top: 6, width: 24, height: 24, borderRadius: "50%", background: "oklch(0.14 0.012 265)", border: "2px solid " + ACC }} />
                <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".06em", color: ACC }}>{st.n}</div>
                <h3 style={{ margin: "10px 0", fontSize: "clamp(28px,3vw,42px)", letterSpacing: "-0.035em", fontWeight: 600, lineHeight: 1.05 }}>{st.t}</h3>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: MUTED, maxWidth: 480 }}>{st.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" style={sectionWrap}>
          <div style={headRow}>
            <h2 data-reveal="" style={{ ...h2Style, maxWidth: 820 }}>Fixed prices. No surprises.</h2>
            <p data-reveal="" style={{ ...pStyle, maxWidth: 360 }}>Pay 50% to start and the rest at launch. Prices exclude GST.</p>
          </div>
          <div data-stagger="" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: 20 }}>
            {PKGS.map((p) => (
              <div key={p.id} style={{ position: "relative", borderRadius: 28, padding: "1.5px", overflow: "hidden", display: "flex", background: LINE }}>
                {p.popular && <div data-spin="" style={{ position: "absolute", inset: "-60%", background: "conic-gradient(from 0deg,transparent 0 55%,oklch(0.9 0.19 128) 72%,oklch(0.64 0.19 262) 88%,transparent 100%)" }} />}
                <article data-spot="" data-cursor="Quote" style={{ position: "relative", flex: 1, borderRadius: 27, padding: "clamp(24px,3vw,34px)", display: "flex", flexDirection: "column", background: "radial-gradient(520px circle at var(--mx,50%) var(--my,-300px),oklch(0.9 0.19 128 / 0.09),transparent 45%),oklch(0.17 0.014 265)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <h3 style={{ margin: 0, fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" }}>{p.id}</h3>
                    {p.popular && <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".08em", color: INK, background: ACC, padding: "5px 10px", borderRadius: 999 }}>MOST POPULAR</span>}
                  </div>
                  <div style={{ margin: "26px 0 6px", display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}><span style={{ fontSize: "clamp(48px,5vw,64px)", fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1 }}>₹{p.price}</span><span style={{ color: "oklch(0.72 0.015 265)", fontSize: 15 }}>one-time</span></div>
                  <div style={{ fontFamily: MONO, fontSize: 13, color: ACC }}>{p.time}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: "26px 0 30px", display: "grid", gap: 13, fontSize: 16 }}>
                    {p.features.map((f) => <li key={f} style={{ display: "flex", gap: 12, alignItems: "baseline", color: "oklch(0.88 0.01 265)" }}><span style={{ color: ACC }}>✦</span>{f}</li>)}
                  </ul>
                  <a href="#quote" onClick={() => { setQType(p.type); setQBudget(p.budget); setQStep(2); setQSent(null); }} className={p.popular ? "vh-lime" : undefined} style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 17, fontWeight: 600, padding: "16px 22px", borderRadius: 999, transition: "background .25s,color .25s", background: p.popular ? ACC : "transparent", color: p.popular ? INK : ACC, border: "1px solid " + ACC }}>Get a quote<span>→</span></a>
                </article>
              </div>
            ))}
          </div>
          <p data-reveal="" style={{ margin: "28px 0 0", fontSize: 16, color: "oklch(0.75 0.015 265)" }}>Need something custom, like a portal or booking system? <a href="#quote" onClick={() => { setQType("Web app / portal"); setQStep(1); setQSent(null); }} style={{ fontWeight: 600 }}>Tell us about it →</a></p>
        </section>

        {/* HOSTING UPSELL */}
        <section id="hosting" style={{ padding: "0 clamp(10px,3vw,24px) clamp(72px,10vw,120px)" }}>
          <div data-reveal="" style={{ maxWidth: 1320, margin: "0 auto", borderRadius: 36, background: "linear-gradient(150deg,oklch(0.25 0.07 262),oklch(0.16 0.02 265) 62%)", border: "1px solid oklch(0.36 0.07 262)", padding: "clamp(24px,5vw,64px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: 48, alignItems: "center", position: "relative", overflow: "hidden" }}>
            <div>
              <div style={{ display: "inline-flex", fontFamily: MONO, fontSize: 12, letterSpacing: ".1em", color: "oklch(0.86 0.08 255)", border: "1px solid oklch(0.45 0.08 262)", padding: "7px 12px", borderRadius: 999 }}>ADD-ON · WEB HOSTING</div>
              <h2 style={{ fontSize: "clamp(40px,5.4vw,76px)", lineHeight: 0.95, letterSpacing: "-0.05em", margin: "20px 0 16px", fontWeight: 700 }}>Your site, hosted in India.</h2>
              <p style={{ margin: "0 0 28px", fontSize: 18, lineHeight: 1.55, color: "oklch(0.84 0.02 260)", maxWidth: 520 }}>Every package includes a year of hosting on our NVMe servers in Mumbai and Bangalore. Already have a site? Move it to us from ₹99/mo.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
                {HOST.map((x) => {
                  const on = x.id === hostPlan;
                  return (
                    <button key={x.id} onClick={() => setHostPlan(x.id)} aria-pressed={on} style={{ textAlign: "left", padding: 20, borderRadius: 20, cursor: "pointer", color: FG, transition: "border-color .25s,background .25s", border: on ? "2px solid " + ACC : "1px solid oklch(0.42 0.06 262)", background: on ? "oklch(0.9 0.19 128 / 0.08)" : "oklch(0.14 0.012 265 / 0.4)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 18, fontWeight: 600 }}>{x.id}</span><span style={{ width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, transition: "background .25s", background: on ? ACC : "transparent", color: INK, border: on ? "0" : "1.5px solid oklch(0.5 0.04 262)" }}>{on ? "✓" : ""}</span></div>
                      <div style={{ margin: "12px 0 2px", display: "flex", alignItems: "baseline", gap: 4 }}><span style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.04em" }}>₹{x.price}</span><span style={{ fontSize: 15, color: "oklch(0.8 0.02 260)" }}>/mo</span></div>
                      <div style={{ fontSize: 13, color: "oklch(0.78 0.02 260)" }}>Billed yearly</div>
                      <div style={{ marginTop: 14, display: "grid", gap: 6, fontSize: 14, color: "oklch(0.88 0.015 260)" }}>{x.feats.map((f) => <span key={f}>✓ {f}</span>)}</div>
                    </button>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                <a href="#quote" onClick={() => setAddHosting(true)} className="vh-lime" style={{ ...hostBtn, color: INK, background: ACC }}>{addHosting ? "✓ Added to your quote" : `Add ${hp.id} hosting to my quote`}</a>
                <a href="https://portal.vecrahost.in?source=vecrahost_main&intent=buy" className="vh-host-ghost" style={{ ...hostBtn, color: FG, border: "1px solid oklch(0.5 0.06 262)" }}>Buy hosting now</a>
              </div>
            </div>
            <div><Terminal /></div>
          </div>
        </section>

        {/* QUOTE */}
        <section id="quote" ref={quoteRef} style={{ ...sectionWrap, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: 56, alignItems: "start" }}>
          <div>
            <h2 data-reveal="" style={{ ...h2Style, fontSize: "clamp(44px,8vw,120px)", letterSpacing: "-0.06em", margin: "0 0 24px" }}>Let&apos;s get you a <span style={{ color: ACC }}>quote.</span></h2>
            <p data-reveal="" style={{ margin: "0 0 32px", fontSize: 19, lineHeight: 1.55, color: "oklch(0.8 0.015 265)", maxWidth: 460 }}>Answer three quick questions and share your details. We&apos;ll reply with a fixed price and timeline.</p>
            {waShow && (
              <a data-reveal="" href={WA_LINK} target="_blank" rel="noopener" className="vh-wa" style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "16px 20px", borderRadius: 20, border: "1px solid " + LINE, background: "oklch(0.17 0.014 265)", color: FG }}>
                <span style={{ width: 44, height: 44, borderRadius: "50%", background: "oklch(0.62 0.15 150)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "white" }}>WA</span>
                <span><span style={{ display: "block", fontWeight: 600, fontSize: 17 }}>Prefer WhatsApp?</span><span style={{ display: "block", fontSize: 14, color: "oklch(0.72 0.015 265)" }}>Message us about your project</span></span>
              </a>
            )}
          </div>
          <div data-reveal="" style={{ background: "oklch(0.17 0.014 265)", border: "1px solid " + LINE, borderRadius: 30, padding: "clamp(22px,4vw,40px)" }}>
            {!qSent ? (
              <form onSubmit={submitQuote}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 12, fontFamily: MONO, fontSize: 13, color: "oklch(0.72 0.015 265)" }}><span>Step {qStep + 1} of 4</span><span>{QNAMES[qStep]}</span></div>
                <div style={{ height: 4, borderRadius: 2, background: "oklch(0.26 0.02 265)", overflow: "hidden", marginBottom: 32 }}><div style={{ height: "100%", background: ACC, borderRadius: 2, transition: `width .6s ${EZ}`, width: ((qStep + 1) / 4) * 100 + "%" }} /></div>
                <div data-qstep="">
                  {qStep === 0 && <><h3 style={qH3}>What do you need?</h3><div style={choiceGrid}>{choices(QTYPES, qType, setQType)}</div></>}
                  {qStep === 1 && <><h3 style={qH3}>What&apos;s your budget?</h3><div style={choiceGrid}>{choices(QBUDGET, qBudget, setQBudget)}</div></>}
                  {qStep === 2 && (
                    <>
                      <h3 style={qH3}>When do you need it?</h3>
                      <div style={choiceGrid}>{choices(QTIME, qTime, setQTime)}</div>
                      <button type="button" onClick={() => setAddHosting(!addHosting)} aria-pressed={addHosting} style={{ marginTop: 16, width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "16px 18px", borderRadius: 18, cursor: "pointer", textAlign: "left", color: FG, border: "1px dashed oklch(0.45 0.08 262)", background: "oklch(0.22 0.04 262 / 0.5)" }}>
                        <span><span style={{ display: "block", fontWeight: 600, fontSize: 16 }}>Add web hosting</span><span style={{ display: "block", fontSize: 14, color: "oklch(0.78 0.02 260)", marginTop: 2 }}>{hostLine}</span></span>
                        <span style={{ flex: "none", width: 48, height: 28, borderRadius: 999, padding: 3, transition: "background .3s", background: addHosting ? ACC : "oklch(0.34 0.02 265)" }}><span style={{ display: "block", width: 22, height: 22, borderRadius: "50%", background: "white", transition: `transform .3s ${EZ}`, transform: addHosting ? "translateX(20px)" : "none" }} /></span>
                      </button>
                    </>
                  )}
                  {qStep === 3 && (
                    <>
                      <h3 style={qH3}>Where should we send it?</h3>
                      <div style={{ display: "grid", gap: 14 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14 }}>
                          <label style={label}>Your name<input name="name" required autoComplete="name" style={field} /></label>
                          <label style={label}>Phone / WhatsApp<input name="phone" type="tel" required autoComplete="tel" placeholder="+91" style={field} /></label>
                        </div>
                        <label style={label}>Email<input name="email" type="email" required autoComplete="email" style={field} /></label>
                        <label style={label}>Business name or current website (optional)<input name="business" style={field} /></label>
                        <label style={label}>Anything else? (optional)<textarea name="message" rows={3} placeholder="What does your business do?" style={{ ...field, resize: "vertical" }} /></label>
                      </div>
                    </>
                  )}
                </div>
                {qErr && <p role="alert" style={{ margin: "16px 0 0", fontSize: 15, color: "oklch(0.75 0.15 25)" }}>{qErr}</p>}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 28 }}>
                  {qStep > 0 && <button type="button" onClick={() => setQStep(Math.max(0, qStep - 1))} style={{ padding: "15px 20px", borderRadius: 999, fontSize: 16, fontWeight: 600, cursor: "pointer", border: "1px solid oklch(0.34 0.02 265)", background: "transparent", color: FG }}>← Back</button>}
                  {qStep < 3 ? (
                    <button type="button" onClick={() => canNext && setQStep(qStep + 1)} disabled={!canNext} style={{ marginLeft: "auto", padding: "16px 26px", borderRadius: 999, fontSize: 17, fontWeight: 600, border: 0, transition: "opacity .25s", cursor: canNext ? "pointer" : "not-allowed", opacity: canNext ? 1 : 0.35, background: ACC, color: INK }}>Continue →</button>
                  ) : (
                    <button type="submit" disabled={qBusy} style={{ marginLeft: "auto", padding: "16px 26px", borderRadius: 999, fontSize: 17, fontWeight: 600, border: 0, cursor: "pointer", opacity: qBusy ? 0.6 : 1, background: ACC, color: INK }}>{qBusy ? "Sending…" : "Get my quote →"}</button>
                  )}
                </div>
              </form>
            ) : (
              <div data-success="" style={{ padding: "16px 0", textAlign: "center" }}>
                <div style={{ width: 88, height: 88, borderRadius: "50%", background: ACC, color: INK, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42, fontWeight: 700, margin: "0 auto 24px" }}>✓</div>
                <h3 style={{ margin: "0 0 10px", fontSize: "clamp(28px,3.4vw,40px)", letterSpacing: "-0.035em", fontWeight: 700 }}>Thanks, {qSent.name}. We&apos;re on it.</h3>
                <p style={{ margin: "0 auto 24px", maxWidth: 400, fontSize: 17, lineHeight: 1.55, color: "oklch(0.8 0.015 265)" }}>We&apos;ll contact you on WhatsApp or email with your quote.</p>
                <div style={{ display: "grid", gap: 8, textAlign: "left", padding: "18px 20px", borderRadius: 18, background: "oklch(0.14 0.012 265)", border: "1px solid " + LINE, marginBottom: 24 }}>
                  {[["Project", qType], ["Budget", qBudget], ["Timeline", qTime], ["Hosting", addHosting ? `${hp.id} · ₹${hp.price}/mo` : "Not added"]].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16, fontSize: 15 }}><span style={{ color: "oklch(0.72 0.015 265)" }}>{k}</span><span style={{ fontWeight: 600, textAlign: "right" }}>{v || "—"}</span></div>
                  ))}
                </div>
                <button onClick={resetQuote} style={{ padding: "14px 22px", borderRadius: 999, fontSize: 16, fontWeight: 600, cursor: "pointer", border: "1px solid oklch(0.34 0.02 265)", background: "transparent", color: FG }}>Start another enquiry</button>
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ ...sectionWrap, display: "flex", flexWrap: "wrap", gap: "40px 64px" }}>
          <div style={{ flex: "1 1 300px" }}><h2 data-reveal="" style={{ ...h2Style, fontSize: "clamp(44px,6vw,88px)" }}>Questions, answered.</h2></div>
          <div data-stagger="" style={{ flex: "2 1 520px", minWidth: 0, borderTop: "1px solid " + LINE }}>
            {FAQS.map((f, i) => {
              const on = faq === i;
              return (
                <div key={f.q} style={{ borderBottom: "1px solid " + LINE }}>
                  <h3 style={{ margin: 0 }}>
                    <button onClick={() => setFaq(on ? -1 : i)} aria-expanded={on} style={{ width: "100%", border: 0, background: "none", cursor: "pointer", padding: "26px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, textAlign: "left", fontSize: "clamp(19px,1.8vw,24px)", fontWeight: 600, letterSpacing: "-0.02em", color: FG }}>
                      {f.q}
                      <span style={{ flex: "none", width: 40, height: 40, borderRadius: "50%", border: "1px solid oklch(0.34 0.02 265)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 400, transition: `transform .45s ${EZ},background .3s,color .3s`, transform: on ? "rotate(45deg)" : "none", background: on ? ACC : "transparent", color: on ? INK : FG }}>+</span>
                    </button>
                  </h3>
                  <div style={{ display: "grid", transition: `grid-template-rows .5s ${EZ}`, gridTemplateRows: on ? "1fr" : "0fr" }}>
                    <div style={{ overflow: "hidden" }}><p style={{ margin: "0 0 26px", fontSize: 17, lineHeight: 1.65, color: "oklch(0.8 0.015 265)", maxWidth: 680 }}>{f.a}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ position: "relative", padding: "clamp(64px,10vw,100px) 20px clamp(80px,11vw,120px)", textAlign: "center", overflow: "hidden" }}>
          <div data-orb="" aria-hidden style={{ position: "absolute", left: "50%", top: "50%", width: "70vw", height: "40vw", margin: "-20vw 0 0 -35vw", borderRadius: "50%", background: "radial-gradient(ellipse,oklch(0.6 0.2 262 / 0.4),transparent 65%)", filter: "blur(30px)", pointerEvents: "none" }} />
          <p data-reveal="" style={{ position: "relative", margin: "0 0 20px", fontFamily: MONO, fontSize: 13, letterSpacing: ".12em", textTransform: "uppercase", color: "oklch(0.75 0.015 265)" }}>Ready when you are</p>
          <a data-magnet="" data-reveal="" data-cursor="Let's go" href="#quote" className="vh-big" style={{ position: "relative", display: "inline-block", fontSize: "clamp(56px,12.5vw,210px)", fontWeight: 700, letterSpacing: "-0.065em", lineHeight: 0.88, color: FG, transition: `translate .5s ${EZ},color .3s`, textWrap: "balance" }}>Let&apos;s build yours.</a>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid oklch(0.28 0.02 265)", paddingBottom: mobile ? 84 : 0 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "56px 24px 24px", display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "space-between" }}>
          <div style={{ flex: "1 1 280px", maxWidth: 380 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 20, letterSpacing: "-0.03em" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/vecraSymbol.png" alt="" width={34} height={28} style={{ objectFit: "contain" }} />VecraHost
            </div>
            <p style={{ margin: "14px 0 0", fontSize: 15, lineHeight: 1.6, color: "oklch(0.72 0.015 265)" }}>Web design, development and hosting for Indian businesses.</p>
          </div>
          <div style={{ flex: "1 1 140px" }}><h3 style={footHead}>STUDIO</h3><div style={{ display: "grid", gap: 10, fontSize: 15 }}><a href="#services" style={footLink}>Services</a><a href="#work" style={footLink}>Work</a><a href="#pricing" style={footLink}>Pricing</a><a href="#quote" style={footLink}>Get a quote</a></div></div>
          <div style={{ flex: "1 1 140px" }}><h3 style={footHead}>HOSTING</h3><div style={{ display: "grid", gap: 10, fontSize: 15 }}><a href="/vps" style={footLink}>VPS Hosting</a><a href="/web-hosting" style={footLink}>Web Hosting</a><a href="/domains" style={footLink}>Domains</a><a href="/contactus" style={footLink}>Support</a><a href="https://portal.vecrahost.in" style={footLink}>Client portal</a></div></div>
          <div style={{ flex: "1 1 140px" }}><h3 style={footHead}>LEGAL</h3><div style={{ display: "grid", gap: 10, fontSize: 15 }}><a href="/terms-of-service" style={footLink}>Terms of Service</a><a href="/privacy-policy" style={footLink}>Privacy Policy</a><a href="/refund-and-cancellation-policy" style={footLink}>Refund Policy</a></div></div>
        </div>
        <div aria-hidden style={{ textAlign: "center", fontSize: "clamp(64px,19vw,300px)", fontWeight: 800, letterSpacing: "-0.07em", lineHeight: 0.8, color: "transparent", WebkitTextStroke: "1px oklch(0.34 0.02 265)", padding: "24px 0 0", userSelect: "none", whiteSpace: "nowrap" }}>VecraHost</div>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "20px 24px 28px", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", fontSize: 14, color: "oklch(0.65 0.015 265)" }}><span>© 2026 VecraHost. All rights reserved.</span><span>Made in India</span></div>
      </footer>

      {mobile && !menuOpen && (
        <div style={{ position: "fixed", left: 12, right: 12, bottom: "calc(12px + env(safe-area-inset-bottom))", zIndex: 45, display: "flex", gap: 8, transition: `transform .5s ${EZ},opacity .4s`, transform: mcta ? "none" : "translateY(140%)", opacity: mcta ? 1 : 0, pointerEvents: mcta ? "auto" : "none" }}>
          <a href="#quote" className="vh-press" style={{ transition: "transform .15s", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 56, borderRadius: 999, fontSize: 17, fontWeight: 600, color: INK, background: ACC, boxShadow: "0 14px 30px -8px oklch(0 0 0 / 0.6)" }}>Get a free quote →</a>
          {waShow && <a href={WA_LINK} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" style={{ flex: "none", width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "white", background: "oklch(0.62 0.15 150)", boxShadow: "0 14px 30px -8px oklch(0 0 0 / 0.6)" }}>WA</a>}
        </div>
      )}
    </div>
  );
}
