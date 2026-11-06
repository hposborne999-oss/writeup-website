import React, { useState } from "react";

/**
 * WriteUp — the comparables panel ("Comparable Transaction Check"), as it
 * appears in the app.
 *
 * Copied from the app's components/comparables/ComparablesPanel.tsx (app
 * main, 6 Nov 2026) with its helpers inlined (formatMiles, formatYMD,
 * monthsBetween, formatMoney, formatRate, compareSale, ageOverLimitText and
 * the caveat), so the website draws the panel with the app's own markup,
 * classes and colour rules: price and date green when the Land Registry
 * confirms them, red with the register's figure when it records something
 * else, distance always black.
 *
 * Website differences, all deliberate:
 *  - No Land Registry links. The example's postcodes are invented, so a live
 *    search would find nothing; the buttons are left out rather than lead
 *    nowhere.
 *  - The app's panel starts closed with both evidence tables closed. Here the
 *    panel starts closed (as in the app) but opens straight onto the sales
 *    table, so one click shows the checks.
 *  - An expanded row's text is pinned to the visible width on a phone, the
 *    same as the schedule panel in ExampleAudit.tsx, so it wraps on screen
 *    while the table scrolls sideways.
 *  - No print layout.
 *
 * The data (example-comparables.json) is invented for the Kestrel House
 * example: every address, figure and register record is made up, apart from
 * 14 Derngate, which is the comparable the example's own findings already
 * cite. It is in the shape the app's comparables code produces.
 */

// ── Types (the app's services/comparables/types.ts, the parts drawn here) ──
type GeoPrecision = "postcode" | "outcode";
interface CompField { value: number; raw: string; verified: boolean }
interface DateField { raw: string; y: number; m: number; d?: number; verified: boolean }
interface CompFlag { id: string; level: "flag" | "note"; text: string; parts?: { text: string; tone: "ok" | "bad" | "neutral" }[] }
interface RegisterSale { date: string; price: number }

export interface Comparable {
  id: string;
  kind: "sale" | "letting";
  use?: "residential" | "commercial" | "mixed";
  address: string;
  postcode?: string;
  quote: string;
  location?: string;
  verified: boolean;
  date?: DateField;
  price?: CompField;
  rent?: CompField & { period: "pcm" | "pa" | "pw" };
  area?: CompField & { unit: "sqft" | "sqm" };
  rate?: CompField & { unit: "sqft" | "sqm" };
  yieldPct?: CompField;
  status: "sold" | "let" | "asking" | "under_offer" | "unknown";
  unsold?: string;
  register?: { status: "match" | "differs" | "not_found" | "not_matched" | "no_postcode"; text: string; sale?: RegisterSale; commercialNotFound?: boolean };
  distanceMiles?: number;
  distancePrecision?: GeoPrecision;
  flags: CompFlag[];
}

export interface ComparablesBlock {
  subject: {
    address?: string;
    postcode?: string;
    verified: boolean;
    valuationDate?: DateField;
    register?: { status: "found" | "none" | "unavailable" | "no_postcode"; text: string };
  };
  comparables: Comparable[];
  counts: { flags: number; notes: number; unverified: number };
  notes: string[];
}

// ── Helpers (the app's geo, dates, numbers, register and checks, inlined) ──
const COMPARABLES_CAVEAT =
  "Prices and dates are checked against the Land Registry's price paid data for England and Wales, matched on postcode and house number or name. Distances are straight lines between postcode centres. Ages run from the transaction date to the valuation date. Only figures found word for word in the report are checked.";

function formatMiles(miles: number, precision?: GeoPrecision): string {
  const approx = precision === "outcode" ? "about " : "";
  if (miles < 0.05) return "under 0.1 miles";
  const n = miles < 10 ? miles.toFixed(1) : Math.round(miles).toString();
  return `${approx}${n} mile${n === "1.0" || n === "1" ? "" : "s"}`;
}

type YMD = { y: number; m: number; d?: number };
function monthsBetween(from: YMD, to: YMD): number {
  let months = (to.y - from.y) * 12 + (to.m - from.m);
  if (from.d !== undefined && to.d !== undefined && to.d < from.d) months -= 1;
  return months;
}
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function formatYMD(p: YMD): string {
  const month = MONTH_NAMES[p.m - 1] || "";
  return p.d !== undefined ? `${p.d} ${month} ${p.y}` : `${month} ${p.y}`;
}

function formatMoney(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}
function formatRate(n: number, likeRaw?: string): string {
  const pence = likeRaw ? /\.\d/.test(likeRaw) : !Number.isInteger(n);
  return pence ? "£" + n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : formatMoney(n);
}

const daysBetween = (a: string, b: string) => Math.abs(Date.parse(a) - Date.parse(b)) / 86_400_000;
function compareSale(c: Comparable, sale: RegisterSale): { priceOk: boolean; dateOk: boolean } {
  const date = c.date?.verified ? `${c.date.y}-${String(c.date.m).padStart(2, "0")}-${String(c.date.d || 1).padStart(2, "0")}` : null;
  const price = c.price?.verified ? c.price.value : null;
  return {
    priceOk: price == null || Math.abs(sale.price - price) <= Math.max(500, price * 0.005),
    dateOk: date == null || daysBetween(sale.date, date) <= (c.date?.d ? 45 : 75),
  };
}

function ageOverLimitText(months: number): string {
  return `${months} months prior to valuation. Explanation required.`;
}

// ── Collapsible and Chevron (the app's compliance/Collapsible.tsx) ──
const Chevron: React.FC<{ open: boolean }> = ({ open }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
    className={`w-4 h-4 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Collapsible: React.FC<{ open: boolean; children: React.ReactNode }> = ({ open, children }) => (
  <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }} aria-hidden={!open}>
    <div className="overflow-hidden">{children}</div>
  </div>
);

// ── The panel (the app's ComparablesPanel.tsx) ──────────────────────────────
const unitLabel = (u: "sqm" | "sqft") => (u === "sqm" ? "sq m" : "sq ft");

/** A figure as printed, with a marker when it could not be found in the report. */
const Fig: React.FC<{ raw?: string; verified?: boolean; children: React.ReactNode }> = ({ raw, verified, children }) => {
  if (!raw) return null;
  return (
    <span className={verified ? "" : "text-amber-700"} title={verified ? raw : `"${raw}" could not be found in the report`}>
      {children}
      {!verified && <span aria-hidden> ?</span>}
    </span>
  );
};

function ageText(c: Comparable, block: ComparablesBlock): string | null {
  const vd = block.subject.valuationDate;
  if (!c.date?.verified || !vd?.verified) return null;
  const months = monthsBetween(c.date, vd);
  if (months < 0) return "after the valuation date";
  if (months === 0) return "under a month before valuation";
  return `${months} month${months === 1 ? "" : "s"} before valuation`;
}

const isConfirmed = (f: CompFlag) => f.id === "register" && !!f.parts && f.parts.every((p) => p.tone === "ok");
const noSaleConfirmed = (block: ComparablesBlock) => {
  const sales = block.comparables.filter((c) => c.kind === "sale");
  return sales.length > 0 && !sales.some((c) => c.register?.status === "match" || c.flags.some(isConfirmed));
};

const FlagLine: React.FC<{ f: CompFlag }> = ({ f }) => {
  if (f.parts && f.parts.length) {
    return (
      <>
        {f.parts.map((p, i) => (
          <p
            key={i}
            className={`text-xs border rounded-md px-3 py-2 ${p.tone === "ok" ? "text-emerald-700 bg-emerald-50 border-emerald-100" : p.tone === "bad" ? "text-rose-700 bg-rose-50 border-rose-100" : "text-slate-700 bg-slate-50 border-slate-100"}`}
          >
            {p.tone === "ok" && <span aria-hidden>✓ </span>}{p.text}
          </p>
        ))}
      </>
    );
  }
  const cls = f.level === "flag" ? "text-rose-700 bg-rose-50 border-rose-100" : "text-amber-800 bg-amber-50 border-amber-100";
  return <p className={`text-xs border rounded-md px-3 py-2 ${cls}`}>{f.text}</p>;
};

const GROUP_BLURB: Record<string, string> = {
  "Sales evidence": "Price and transaction date are checked against the Land Registry. Distance is measured from the subject property.",
  "Letting evidence": "Distance from the subject property and the age of the letting at the valuation date. Lettings are not recorded on the Land Registry.",
};

const fmtRegDate = (iso: string) => { const [y, m, d] = iso.split("-").map(Number); return formatYMD({ y, m, d }); };

/** A table cell: the figure, then one line underneath saying how it checked out. */
const Cell: React.FC<{ tone?: "ok" | "bad" | "warn" | "plain"; sub?: React.ReactNode; children: React.ReactNode }> = ({ tone = "plain", sub, children }) => {
  const figure = tone === "ok" ? "text-emerald-700" : tone === "bad" ? "text-rose-700" : "text-slate-800";
  const label = tone === "ok" ? "text-emerald-600" : tone === "bad" ? "text-rose-600" : tone === "warn" ? "text-amber-700" : "text-slate-400";
  return (
    <td className="px-3 py-3 align-top">
      <span className={`block text-sm ${figure}`}>{children}</span>
      {sub && <span className={`block text-[11px] mt-0.5 ${label}`}>{sub}</span>}
    </td>
  );
};

const Group: React.FC<{ title: string; rows: Comparable[]; block: ComparablesBlock; open: boolean; onToggle: () => void }> = ({ title, rows, block, open, onToggle }) => {
  const [openRow, setOpenRow] = useState<string | null>(null);
  const sales = rows[0]?.kind === "sale";
  const flags = rows.reduce((n, c) => n + (c.verified ? c.flags.filter((f) => f.level === "flag").length : 0), 0);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors">
        <Chevron open={open} />
        <span className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-slate-800">{title}</span>
          <span className="block text-[11px] text-slate-500 mt-0.5">{GROUP_BLURB[title] || `${rows.length} comparable${rows.length === 1 ? "" : "s"}`}</span>
        </span>
        {flags > 0 ? (
          <span className="shrink-0 inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded-full bg-red-500 text-white text-xs font-semibold tabular-nums" title={`${flags} issue${flags === 1 ? "" : "s"}`}>{flags}</span>
        ) : (
          <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-700 text-[11px] font-medium">✓ No issues</span>
        )}
      </button>
      <Collapsible open={open}>
        <div className="border-t border-slate-100 overflow-x-auto">
          <table className="w-full min-w-[520px]">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-slate-400">
                <th className="text-left font-medium px-5 py-2">Comparable</th>
                <th className="text-left font-medium px-3 py-2">Distance</th>
                <th className="text-left font-medium px-3 py-2">Date</th>
                <th className="text-left font-medium px-3 py-2">{sales ? "Price" : "Rent"}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => <Row key={c.id} c={c} block={block} open={openRow === c.id} onToggle={() => setOpenRow((r) => (r === c.id ? null : c.id))} />)}
            </tbody>
          </table>
        </div>
      </Collapsible>
    </div>
  );
};

const Row: React.FC<{ c: Comparable; block: ComparablesBlock; open: boolean; onToggle: () => void }> = ({ c, block, open, onToggle }) => {
  const sale = c.register?.sale;
  const cmp = sale ? compareSale(c, sale) : null;
  const age = ageText(c, block);
  const overLimit = c.flags.some((f) => f.id === "age");
  const vdOk = !!block.subject.valuationDate?.verified;
  const unsold = c.unsold || (c.status === "asking" ? "Asking price" : c.status === "under_offer" ? "Under offer" : undefined);
  const details = c.flags.filter((f) => f.id !== "register");

  let dateTone: "ok" | "bad" | "warn" | "plain" = "plain";
  let dateSub: React.ReactNode = age;
  if (cmp && sale) {
    if (cmp.dateOk && c.date?.verified) { dateTone = "ok"; dateSub = "Confirmed"; }
    else if (c.date?.verified) { dateTone = "bad"; dateSub = `Register: ${fmtRegDate(sale.date)}`; }
  } else if (overLimit && vdOk && c.date?.verified) { dateTone = "warn"; dateSub = ageOverLimitText(monthsBetween(c.date, block.subject.valuationDate!)); }

  let priceTone: "ok" | "bad" | "plain" = "plain";
  let priceSub: React.ReactNode = null;
  if (c.kind === "sale") {
    if (cmp && sale && c.price?.verified) {
      if (cmp.priceOk) { priceTone = "ok"; priceSub = "Confirmed"; }
      else { priceTone = "bad"; priceSub = `Register: ${formatMoney(sale.price)}`; }
    } else if (unsold) priceSub = unsold;
    else if (c.register?.status === "not_found" && !c.register.commercialNotFound) priceSub = "Not on the register";
    else if (c.register?.status === "not_matched") priceSub = "Not matched";
    else if (c.register?.status === "no_postcode") priceSub = "No postcode to check";
  }

  return (
    <>
      <tr onClick={onToggle} className={`border-t border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${open ? "bg-slate-50/60" : ""}`}>
        <td className="px-5 py-3 align-top">
          <span className="flex items-start gap-2">
            <Chevron open={open} />
            <span className="min-w-0">
              <span className={`block text-sm ${c.verified ? "text-slate-800" : "text-slate-500"}`}>
                {c.address}
                {unsold && <span className="ml-2 inline-block align-middle text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">{unsold}</span>}
              </span>
              <span className="block text-[11px] text-slate-400 mt-0.5">
                {c.location}
                {!c.verified && <span className="text-amber-700"> · unverified</span>}
              </span>
            </span>
          </span>
        </td>
        <Cell sub={c.distancePrecision === "outcode" ? "to the district centre" : undefined}>
          {c.distanceMiles !== undefined ? formatMiles(c.distanceMiles, c.distancePrecision) : <span className="text-slate-400">—</span>}
        </Cell>
        <Cell tone={dateTone} sub={dateSub}>
          {c.date ? <Fig raw={c.date.raw} verified={c.date.verified}>{formatYMD(c.date)}</Fig> : <span className="text-slate-400">—</span>}
        </Cell>
        {c.kind === "sale" ? (
          <Cell tone={priceTone} sub={priceSub}>
            {c.price ? <Fig raw={c.price.raw} verified={c.price.verified}>{formatMoney(c.price.value)}</Fig> : <span className="text-slate-400">—</span>}
          </Cell>
        ) : (
          <Cell sub={unsold ? (unsold === "Asking price" ? "Asking rent" : unsold) : undefined}>
            {c.rent ? <Fig raw={c.rent.raw} verified={c.rent.verified}>{formatMoney(c.rent.value)} {c.rent.period === "pcm" ? "pcm" : c.rent.period === "pa" ? "pa" : "pw"}</Fig> : <span className="text-slate-400">—</span>}
          </Cell>
        )}
      </tr>
      {open && (
        <tr className="bg-slate-50/60">
          <td colSpan={4} className="px-5 pb-4 pl-12">
            {/* Website: pinned to the visible width on a phone, where the
                table scrolls sideways, so the text wraps where it can be read. */}
            <div className="space-y-2 sticky left-0 max-w-[calc(100vw-9rem)] sm:max-w-none">
              {details.map((f, i) => <FlagLine key={`${f.id}-${i}`} f={f} />)}
              {(c.area || c.rate || c.yieldPct) && (
                <p className="text-xs text-slate-500">
                  {[c.area && `${c.area.value.toLocaleString("en-GB")} ${unitLabel(c.area.unit)}`, c.rate && `${formatRate(c.rate.value, c.rate.raw)} per ${unitLabel(c.rate.unit)}`, c.yieldPct && `${c.yieldPct.value}% yield`].filter(Boolean).join(" · ")}
                </p>
              )}
              {c.quote && (
                <div className="pt-1">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1">From your report</p>
                  <blockquote className="text-sm text-slate-700 border-l-2 border-slate-200 pl-3 italic">{c.quote}</blockquote>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

function groupByKind(comps: Comparable[]): [string, Comparable[]][] {
  const sales = comps.filter((c) => c.kind === "sale");
  const lettings = comps.filter((c) => c.kind === "letting");
  const out: [string, Comparable[]][] = [];
  if (sales.length) out.push(["Sales evidence", sales]);
  if (lettings.length) out.push(["Letting evidence", lettings]);
  return out;
}

function SubjectBlock({ block }: { block: ComparablesBlock }) {
  const s = block.subject;
  if (!s.address && !s.valuationDate) return null;
  return (
    <div className="px-5 py-4 border-b border-slate-100 space-y-0.5 text-sm text-slate-700">
      {s.address && (
        <p>
          <span className="font-semibold text-slate-800">Subject property:</span>{" "}
          {s.address}
          {s.postcode && !s.address.toUpperCase().includes(s.postcode) && ` (${s.postcode})`}
        </p>
      )}
      {s.valuationDate && (
        <p>
          <span className="font-semibold text-slate-800">Valuation date:</span>{" "}
          <Fig raw={s.valuationDate.raw} verified={s.valuationDate.verified}>{formatYMD(s.valuationDate)}</Fig>
        </p>
      )}
      {s.register && (
        <p>
          <span className="font-semibold text-slate-800">Land Registry:</span> {s.register.text}
        </p>
      )}
    </div>
  );
}

export function ExampleComparables({ block, defaultOpen = false, defaultGroup = "Sales evidence" }: { block: ComparablesBlock; defaultOpen?: boolean; defaultGroup?: string | null }) {
  const [open, setOpen] = useState(defaultOpen);
  // One evidence group open at a time.
  const [openGroup, setOpenGroup] = useState<string | null>(defaultGroup);
  const { flags, unverified } = block.counts;
  const notes = block.comparables.reduce((n, c) => n + c.flags.filter((f) => f.level === "note" && f.id !== "unverified" && !isConfirmed(f)).length, 0);
  const n = block.comparables.length;
  const registerUnconfirmed = flags === 0 && noSaleConfirmed(block);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-4">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-slate-50 transition-colors">
        <Chevron open={open} />
        <span className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-slate-800">Comparable Transaction Check</span>
          <span className="block text-[11px] text-slate-400 mt-0.5">
            {n === 0 ? "No comparables found" : `${n} comparable${n === 1 ? "" : "s"}`}
            {unverified > 0 && ` · ${unverified} unverified`}
            {notes > 0 && ` · ${notes} note${notes === 1 ? "" : "s"}`}
          </span>
          {registerUnconfirmed && <span className="block text-[11px] italic text-slate-400 mt-0.5">Land Registry transactions not confirmed</span>}
        </span>
        {flags > 0 ? (
          <span className="shrink-0 inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded-full bg-red-500 text-white text-xs font-semibold tabular-nums" title={`${flags} issue${flags === 1 ? "" : "s"} with the comparables`}>{flags}</span>
        ) : n > 0 ? (
          <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-700 text-[11px] font-medium">✓ No issues</span>
        ) : null}
      </button>
      <Collapsible open={open}>
        <div>
          <SubjectBlock block={block} />
          {block.notes.length > 0 && (
            <div className="mx-5 mt-3 space-y-2">
              {block.notes.map((note, i) => <p key={i} className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">{note}</p>)}
            </div>
          )}
          {n > 0 && (
            <div className="mx-5 mt-3 space-y-2">
              {groupByKind(block.comparables).map(([heading, rows]) => (
                <Group key={heading} title={heading} rows={rows} block={block} open={openGroup === heading} onToggle={() => setOpenGroup((g) => (g === heading ? null : heading))} />
              ))}
            </div>
          )}
          <p className="mx-5 my-3 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">{COMPARABLES_CAVEAT}</p>
        </div>
      </Collapsible>
    </div>
  );
}
