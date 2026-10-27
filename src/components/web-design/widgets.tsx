"use client";
import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./landing.module.css";
import { ACC, EZ, INK, MONO, TERM, THEMES } from "./data";

export function Intro({ onDone }: { onDone: (delay: number) => void }) {
    const [n, setN] = useState(0);
    const [out, setOut] = useState(false);
    const [gone, setGone] = useState(false);

    useEffect(() => {
        let skip = false;
        try {
            skip = sessionStorage.getItem("vh-lp-intro") === "1" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            sessionStorage.setItem("vh-lp-intro", "1");
        } catch { }
        if (skip) {
            setGone(true);
            onDone(0);
            return;
        }
        const t0 = performance.now();
        let raf = 0;
        const timers: ReturnType<typeof setTimeout>[] = [];
        const tick = (t: number) => {
            const k = Math.min(1, (t - t0) / 1100);
            setN(Math.round((1 - Math.pow(1 - k, 2.2)) * 100));
            if (k < 1) raf = requestAnimationFrame(tick);
            else {
                timers.push(setTimeout(() => { setOut(true); onDone(320); }, 120));
                timers.push(setTimeout(() => setGone(true), 1200));
            }
        };
        raf = requestAnimationFrame(tick);
        return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (gone) return null;
    return (
        <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 100, background: ACC, color: INK, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(20px,4vw,48px)", transform: out ? "translateY(-100%)" : "none", transition: "transform 1s cubic-bezier(.76,0,.24,1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase" }}>
                <span>VecraHost Studio</span>
                <span>Loading something good</span>
            </div>
            <div style={{ fontSize: "clamp(110px,24vw,360px)", fontWeight: 800, letterSpacing: "-0.07em", lineHeight: 0.8, fontVariantNumeric: "tabular-nums" }}>
                {n}<span style={{ fontSize: ".35em", letterSpacing: 0 }}>%</span>
            </div>
        </div>
    );
}

export function Cursor() {
    const dot = useRef<HTMLDivElement>(null);
    const ring = useRef<HTMLDivElement>(null);
    const lab = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!window.matchMedia("(pointer: fine)").matches) return;
        let x = -200, y = -200, rx = -200, ry = -200, s = 1, ts = 1, raf = 0;
        const mv = (e: PointerEvent) => {
            x = e.clientX; y = e.clientY;
            const target = e.target instanceof Element ? e.target : null;
            const t = target?.closest("a,button,[data-cursor],input,textarea,label");
            const label = target?.closest("[data-cursor]")?.getAttribute("data-cursor") ?? "";
            ts = label ? 3 : t ? 1.7 : 1;
            if (lab.current) { lab.current.textContent = label; lab.current.style.opacity = label ? "1" : "0"; }
            if (ring.current) {
                ring.current.style.background = label ? ACC : "transparent";
                ring.current.style.mixBlendMode = label ? "normal" : "difference";
                ring.current.style.borderColor = label ? ACC : "white";
            }
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

export function Rotator({ words }: { words: string[] }) {
    const [i, setI] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setI((x) => (x + 1) % words.length), 2300);
        return () => clearInterval(t);
    }, [words.length]);
    const prev = (i - 1 + words.length) % words.length;
    return (
        <span style={{ display: "inline-grid", verticalAlign: "bottom", overflow: "hidden", paddingBottom: ".08em" }}>
            {words.map((w, k) => (
                <span key={k} style={{ gridArea: "1 / 1", transition: "transform .9s cubic-bezier(.16,1,.3,1), opacity .6s", transform: k === i ? "none" : k === prev ? "translateY(-105%) rotate(-5deg)" : "translateY(105%) rotate(5deg)", opacity: k === i ? 1 : 0, transformOrigin: "0 100%" }}>{w}</span>
            ))}
        </span>
    );
}

export function BigMarquee({ items, outline, dur, reverse, color }: { items: string[]; outline?: boolean; dur: number; reverse?: boolean; color: string }) {
    const row = (k: number) => (
        <div key={k} aria-hidden={k ? true : undefined} style={{ display: "flex", alignItems: "center", flex: "none" }}>
            {items.map((t, i) => (
                <Fragment key={i}>
                    <span style={{ padding: "0 .35em", whiteSpace: "nowrap", color: outline && i % 2 ? "transparent" : color, WebkitTextStroke: outline && i % 2 ? `1.5px ${color}` : undefined }}>{t}</span>
                    <span style={{ fontSize: ".45em", color }}>✦</span>
                </Fragment>
            ))}
        </div>
    );
    return (
        <div style={{ overflow: "hidden" }}>
            <div className={`${styles.marquee} ${reverse ? styles.marqueeReverse : ""}`} style={{ "--dur": `${dur}s`, display: "flex", width: "max-content", fontSize: "clamp(34px,5.6vw,80px)", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1.1 } as CSSProperties}>
                {row(0)}{row(1)}
            </div>
        </div>
    );
}

export function SiteBuilder() {
    const [s, set] = useState({ step: 0, th: 0 });
    useEffect(() => {
        const d = s.step < 9
            ? setTimeout(() => set({ step: s.step + 1, th: s.th }), s.step === 0 ? 600 : 380)
            : setTimeout(() => set({ step: 0, th: (s.th + 1) % THEMES.length }), 2600);
        return () => clearTimeout(d);
    }, [s]);

    const T = THEMES[s.th], ink = "oklch(0.25 0.02 255)", grey = "oklch(0.9 0.006 240)";
    const show = (n: number, st: CSSProperties): CSSProperties => ({
        opacity: s.step >= n ? 1 : 0,
        transform: s.step >= n ? "none" : "translateY(14px) scale(.95)",
        transition: `opacity .5s ${EZ}, transform .6s cubic-bezier(.34,1.56,.64,1), outline-color .4s`,
        outline: "2px solid", outlineColor: s.step === n ? T.a : "transparent", outlineOffset: 3,
        ...st,
    });
    const bar = (w: number | string, hh: number, c: string, n: number, x?: CSSProperties) => <div style={show(n, { width: w, height: hh, borderRadius: 6, background: c, ...x })} />;

    return (
        <div aria-hidden="true" style={{ position: "relative", background: "white", color: ink, borderRadius: 18, boxShadow: "0 40px 80px -30px oklch(0 0 0 / 0.75)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 12px", background: "oklch(0.96 0.005 240)", borderBottom: "1px solid oklch(0.92 0.006 240)" }}>
                {["oklch(0.7 0.17 25)", "oklch(0.82 0.15 85)", "oklch(0.72 0.15 150)"].map((c) => <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
                <div style={{ marginLeft: 8, flex: 1, minWidth: 0, background: "white", borderRadius: 8, padding: "4px 10px", fontSize: 12, fontFamily: MONO, color: "oklch(0.4 0.02 255)", border: "1px solid oklch(0.92 0.006 240)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <span style={{ color: "oklch(0.6 0.02 255)" }}>https://</span>{T.d}
                </div>
            </div>
            <div style={{ padding: "clamp(12px,2.4vw,20px)", display: "grid", gap: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={show(1, { display: "flex", alignItems: "center", gap: 8 })}>
                        <div style={{ width: 20, height: 20, borderRadius: 6, background: T.a, transition: "background .6s" }} />
                        <div style={{ width: 50, height: 7, borderRadius: 4, background: ink }} />
                    </div>
                    <div style={show(1, { display: "flex", gap: 8 })}>
                        {[0, 1, 2].map((i) => <div key={i} style={{ width: 26, height: 5, borderRadius: 3, background: grey }} />)}
                    </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 14, alignItems: "center" }}>
                    <div style={{ display: "grid", gap: 8 }}>
                        {bar("94%", 12, ink, 2)}
                        {bar("66%", 12, ink, 3)}
                        {bar("88%", 5, grey, 3, { marginTop: 5 })}
                        {bar("72%", 5, grey, 3)}
                        {bar(80, 26, T.a, 4, { marginTop: 6, borderRadius: 8 })}
                    </div>
                    <div style={show(5, { aspectRatio: "1 / 0.85", borderRadius: 12, background: `linear-gradient(135deg, ${T.t}, ${T.a})` })} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 8 }}>
                    {[6, 7, 8].map((n) => (
                        <div key={n} style={show(n, { background: T.t, borderRadius: 10, padding: 10, display: "grid", gap: 6 })}>
                            <div style={{ width: 16, height: 16, borderRadius: 5, background: T.a }} />
                            <div style={{ width: "80%", height: 5, borderRadius: 3, background: ink, opacity: 0.8 }} />
                            <div style={{ width: "60%", height: 4, borderRadius: 3, background: "oklch(0.8 0.01 240)" }} />
                        </div>
                    ))}
                </div>
            </div>
            <div style={show(9, { position: "absolute", right: 12, bottom: 12, display: "flex", alignItems: "center", gap: 8, background: ink, color: "white", padding: "9px 13px", borderRadius: 12, fontSize: 13, fontWeight: 600, boxShadow: "0 12px 30px oklch(0 0 0 / 0.35)", outlineColor: "transparent" })}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(0.78 0.17 150)" }} />
                Live on {T.d}
            </div>
        </div>
    );
}

export function Terminal() {
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
                {["oklch(0.7 0.17 25)", "oklch(0.82 0.15 85)", "oklch(0.72 0.15 150)"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                <span style={{ marginLeft: 10, fontFamily: MONO, fontSize: 12, color: "oklch(0.7 0.02 260)" }}>vecrahost — mumbai-1</span>
            </div>
            <div style={{ padding: "clamp(16px,3vw,24px)", fontFamily: MONO, fontSize: "clamp(12px,1.3vw,14px)", lineHeight: 2, minHeight: 210, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
                {TERM.slice(0, st.line + 1).map((l, i) => (
                    <div key={i} style={{ color: l[0] === "$" ? "oklch(0.95 0.01 260)" : l[0] === "✓" ? ACC : "oklch(0.72 0.03 260)" }}>
                        {i === st.line ? l.slice(0, st.ch) : l}
                        {i === st.line && <span className={styles.caret} style={{ display: "inline-block", width: 8, height: 16, marginLeft: 3, verticalAlign: "-3px", background: ACC }} />}
                    </div>
                ))}
            </div>
        </div>
    );
}
