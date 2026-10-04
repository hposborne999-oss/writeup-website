"use client";

import { useEffect, useState } from "react";

// PREVIEW-ONLY font switcher for the hero headline (branch hero-font-trial).
// Never merge this to main. Fonts load from Google Fonts / Fontshare at
// runtime purely for comparison; the chosen one gets self-hosted properly.
// Sizes are tuned per font so each sets as four lines at 1440px.

type Option = {
  key: string;
  label: string;
  note: string;
  family: string;
  css?: string;
  size: string;
  weight: number;
  track: string;
  em: "italic" | "normal";
};

const FS = (f: string) => `https://api.fontshare.com/v2/css?f[]=${f}&display=swap`;
const GF = (f: string) => `https://fonts.googleapis.com/css2?family=${f}&display=swap`;

const OPTIONS: Option[] = [
  { key: "current", label: "Current", note: "Instrument Serif (live today)", family: "var(--font-serif)", size: "66px", weight: 400, track: "-0.025em", em: "italic" },
  { key: "gambetta", label: "Gambetta", note: "Crisp, contemporary, editorial", family: "'Gambetta', Georgia, serif", css: FS("gambetta@500,501"), size: "54px", weight: 500, track: "-0.025em", em: "italic" },
  { key: "zodiak", label: "Zodiak", note: "Sharp, distinctive, most 'designed'", family: "'Zodiak', Georgia, serif", css: FS("zodiak@400,401"), size: "47px", weight: 400, track: "-0.025em", em: "italic" },
  { key: "sentient", label: "Sentient", note: "Calm, bookish", family: "'Sentient', Georgia, serif", css: FS("sentient@400,401"), size: "49px", weight: 400, track: "-0.025em", em: "italic" },
  { key: "brygada", label: "Brygada 1918", note: "Sturdy, historic, rarely seen", family: "'Brygada 1918', Georgia, serif", css: GF("Brygada+1918:ital,wght@0,500;1,500"), size: "50px", weight: 500, track: "-0.025em", em: "italic" },
  { key: "plexserif", label: "IBM Plex Serif", note: "Institutional, engineered", family: "'IBM Plex Serif', Georgia, serif", css: GF("IBM+Plex+Serif:ital,wght@0,500;1,500"), size: "50px", weight: 500, track: "-0.03em", em: "italic" },
  { key: "youngserif", label: "Young Serif", note: "Warm, characterful", family: "'Young Serif', Georgia, serif", css: GF("Young+Serif"), size: "46px", weight: 400, track: "-0.025em", em: "normal" },
  { key: "switzer", label: "Switzer", note: "Refined Swiss sans", family: "'Switzer', system-ui, sans-serif", css: FS("switzer@500,501"), size: "54px", weight: 500, track: "-0.035em", em: "normal" },
  { key: "schibsted", label: "Schibsted Grotesk", note: "Newspaper-brand sans", family: "'Schibsted Grotesk', system-ui, sans-serif", css: GF("Schibsted+Grotesk:wght@600"), size: "50px", weight: 600, track: "-0.035em", em: "normal" },
  { key: "inter", label: "Inter", note: "Last preview", family: "var(--font-inter), system-ui, sans-serif", size: "50px", weight: 600, track: "-0.035em", em: "normal" },
];

function apply(o: Option) {
  if (o.css && !document.querySelector(`link[data-trial="${o.key}"]`)) {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = o.css;
    l.dataset.trial = o.key;
    document.head.appendChild(l);
  }
  const s = document.documentElement.style;
  s.setProperty("--hero-font", o.family);
  s.setProperty("--hero-size", o.size);
  s.setProperty("--hero-weight", String(o.weight));
  s.setProperty("--hero-track", o.track);
  s.setProperty("--hero-em", o.em);
}

export function HeroFontTrial() {
  const [active, setActive] = useState("current");

  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get("font");
    const o = OPTIONS.find((x) => x.key === k) ?? OPTIONS[0];
    apply(o);
    setActive(o.key);
  }, []);

  const pick = (o: Option) => {
    apply(o);
    setActive(o.key);
    const u = new URL(window.location.href);
    u.searchParams.set("font", o.key);
    window.history.replaceState(null, "", u);
  };

  const current = OPTIONS.find((o) => o.key === active) ?? OPTIONS[0];
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-rule bg-white/95 backdrop-blur shadow-[0_-12px_40px_-24px_rgba(10,34,38,0.35)]">
      <div className="max-w-[1280px] mx-auto px-4 py-2.5 flex items-center gap-3">
        <div className="shrink-0 w-[170px] hidden md:block">
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate-500 m-0">Headline font · preview</p>
          <p className="text-[11.5px] text-slate-700 m-0 truncate">{current.note}</p>
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          {OPTIONS.map((o) => (
            <button
              key={o.key}
              type="button"
              onClick={() => pick(o)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[12.5px] font-medium cursor-pointer transition-colors border ${
                active === o.key ? "bg-petrol text-white border-petrol" : "bg-white text-ink border-rule hover:border-ink"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
