import React, { useState } from "react";

/**
 * WriteUp — example audit, as it appears in the app.
 *
 * Self-contained: this file plus `example-audit.json` reproduce the results
 * view of the WriteUp app (filter bar, title, Red Book checklist panel, and
 * the findings list) with the same markup and Tailwind classes the app uses.
 * No app imports. Styling assumes Tailwind (CDN or build) with the config in
 * README.md, and the Inter font.
 *
 * Interactivity kept from the app: severity filter buttons, click a finding to
 * reveal its explanation, click a checklist row to reveal its evidence, the
 * checklist panel opens and closes. The schedule reconciliation panel (when
 * the data has one) opens and closes, each unit opens to show its checks and
 * the figures read for it, and the totals checks fold. Unlike the app, it
 * starts open with one unit expanded, so a visitor sees the detail at once. Removed: rename, mark-as-fixed, copy,
 * PDF, "Report order" (these need a live report behind them).
 */

export type Severity = "critical" | "warning" | "suggestion";

export interface ExampleIssue {
  id: string;
  severity: Severity;
  category: string;
  section: string;
  page: string;
  original: string;
  corrected: string;
  explanation: string;
}

export interface ExampleCheckRow {
  id: string;
  label: string;
  ref?: string;
  heading?: string;
  severity: "required" | "advisory";
  status: "present" | "partial" | "missing" | "not_stated" | "na" | "unverified";
  quote?: string;
  location?: string;
  evidence?: { quote: string; location?: string; found?: boolean; note?: string }[];
  naReason?: string;
  verificationNote?: string;
  statusLabel?: string;
  meaning?: string;
  standardSays?: string;
}

export interface ExampleCell { text: string; verified: boolean; status?: "ok" | "bad" }
export interface ExampleScheduleCheck { ok: boolean; severity: Severity | null; text: string; title?: string; recomputed?: string | null }

/** The schedule reconciliation panel, worked out by the app's own code
 *  (scripts/exportLenderExample.ts in the app repo); this file only draws it. */
export interface ExampleSchedule {
  title: string;
  header: string;
  flagged: number;
  intro: string;
  subject: { address?: string; valuationDate?: string; reportDate?: string };
  unitColumn: string;
  widths: { first: string; flags: string };
  columns: { key: string; label: string; width: string }[];
  openUnit?: string;
  units: {
    key: string;
    label: string;
    tenant?: string;
    tenantBad?: boolean;
    cells: Record<string, ExampleCell | null>;
    flags: number;
    checks: ExampleScheduleCheck[];
    sources: { label: string; text: string }[];
    detail: { label: string; cell: ExampleCell | null }[];
  }[];
  headline: { label: string; total: number; flagged: number; checks: ExampleScheduleCheck[] };
}

export interface ExampleAuditData {
  /** A line shown above everything else, e.g. that the audit is
   *  hypothetical. Always shown when present. */
  notice?: string;
  title: string;
  schedule?: ExampleSchedule;
  summary: { total: number; critical: number; warning: number; suggestion: number };
  issues: ExampleIssue[];
  compliance: {
    label: string;
    caveat: string;
    counts: { missing: number; present: number; partial?: number; advisory: number; unverified: number; na: number };
    rows: ExampleCheckRow[];
  };
}

// ── Exactly the app's severity styling ──────────────────────────────────────
const severityConfig: Record<Severity, { color: string; dot: string; label: string }> = {
  critical: { color: "text-red-600", dot: "bg-red-500", label: "Critical" },
  warning: { color: "text-amber-600", dot: "bg-amber-500", label: "Warning" },
  suggestion: { color: "text-blue-600", dot: "bg-blue-500", label: "Suggestion" },
};

const formatSection = (section: string): string => (!section ? "" : /\d/.test(section) ? `S.${section}` : section);

const isNoChange = (i: ExampleIssue) =>
  (i.original || "").replace(/\s+/g, " ").trim() === (i.corrected || "").replace(/\s+/g, " ").trim();

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

// ── Red Book checklist panel (the app's CompliancePanel, self-contained) ─────
const STATUS_UI: Record<ExampleCheckRow["status"], { label: string; cell: string; icon: string; meaning: string }> = {
  present: { label: "Present", cell: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: "✓", meaning: "Found in the report, and the quoted wording was located in your text." },
  partial: { label: "Partial", cell: "bg-amber-50 text-amber-700 border-amber-200", icon: "◐", meaning: "Some of this is in the report; the rest was not found." },
  missing: { label: "Missing", cell: "bg-rose-50 text-rose-700 border-rose-200", icon: "✕", meaning: "Not found in the report." },
  not_stated: { label: "Not stated", cell: "bg-amber-50 text-amber-700 border-amber-200", icon: "–", meaning: "The report is silent on this." },
  na: { label: "Not applicable", cell: "bg-slate-50 text-slate-500 border-slate-200", icon: "–", meaning: "Does not apply to this report." },
  unverified: { label: "Unverified", cell: "bg-violet-50 text-violet-700 border-violet-200", icon: "?", meaning: "The check reported this as present, but the supporting wording could not be found in your report. Check it yourself before relying on it." },
};

function meaningFor(row: ExampleCheckRow): string {
  if (row.meaning) return row.meaning;
  const tail = row.severity === "required" ? " This is a required item." : " This one is advisory, so it may be a deliberate omission.";
  if (row.status === "missing") return "Not found in the report." + tail;
  if (row.status === "not_stated") return "The report is silent on this." + tail;
  return STATUS_UI[row.status].meaning;
}

const CheckRowView: React.FC<{ row: ExampleCheckRow }> = ({ row }) => {
  const [open, setOpen] = useState(false);
  const ui = STATUS_UI[row.status];
  const evidence = row.evidence?.length ? row.evidence : row.quote ? [{ quote: row.quote, location: row.location, found: true }] : [];
  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-slate-50 transition-colors">
        <Chevron open={open} />
        <span className="flex-1 min-w-0">
          <span className="text-sm text-slate-800">{row.label}</span>
          {row.ref && <span className="ml-2 text-[11px] text-slate-400">{row.ref}</span>}
        </span>
        {row.location && <span className="hidden sm:inline text-[11px] text-slate-400 truncate max-w-[10rem]">{row.location}</span>}
        <span className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-medium ${ui.cell}`}>
          <span aria-hidden>{ui.icon}</span>{row.statusLabel || ui.label}
        </span>
      </button>
      <Collapsible open={open}>
        <div className="px-5 pb-4 pl-12 space-y-3">
          <p className="text-xs text-slate-500">{meaningFor(row)}</p>
          {evidence.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1">From your report</p>
              <div className="space-y-2">
                {evidence.map((e, i) => (
                  <div key={i}>
                    <blockquote className={`text-sm border-l-2 pl-3 italic ${e.found === false ? "text-violet-700 border-violet-200" : "text-slate-700 border-slate-200"}`}>{e.quote}</blockquote>
                    {(e.location || e.found === false) && (
                      <p className={`text-[11px] mt-1 ${e.found === false ? "text-violet-600" : "text-slate-400"}`}>{e.found === false ? e.note || "Could not be found in the report." : e.location}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {row.verificationNote && <p className="text-xs text-violet-700 bg-violet-50 border border-violet-100 rounded-md px-3 py-2">{row.verificationNote}</p>}
          {row.naReason && <p className="text-xs text-slate-500">{row.naReason}</p>}
          {row.standardSays && (
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1">What the standard says</p>
              <p className="text-xs text-slate-500">{row.standardSays}</p>
            </div>
          )}
        </div>
      </Collapsible>
    </div>
  );
};

const CompliancePanel: React.FC<{ data: ExampleAuditData["compliance"]; defaultOpen?: boolean }> = ({ data, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const { missing, advisory, unverified } = data.counts;
  const partial = data.counts.partial ?? 0;
  const groups: [string, ExampleCheckRow[]][] = [];
  for (const row of data.rows) {
    const key = row.heading || "";
    const g = groups.find(([h]) => h === key);
    if (g) g[1].push(row); else groups.push([key, [row]]);
  }
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-4">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-slate-50 transition-colors">
        <Chevron open={open} />
        <span className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-slate-800">{data.label}</span>
          <span className="block text-[11px] text-slate-400 mt-0.5">
            {data.rows.length} checks{partial > 0 && ` · ${partial} partial`}{unverified > 0 && ` · ${unverified} unverified`}{advisory > 0 && ` · ${advisory} advisory`}
          </span>
        </span>
        {missing > 0 ? (
          <span className="shrink-0 inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded-full bg-red-500 text-white text-xs font-semibold tabular-nums" title={`${missing} required item${missing === 1 ? "" : "s"} not found`}>{missing}</span>
        ) : partial > 0 ? (
          <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-amber-200 bg-amber-50 text-amber-700 text-[11px] font-medium">◐ {partial} partial</span>
        ) : (
          <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-700 text-[11px] font-medium">✓ All present</span>
        )}
      </button>
      <Collapsible open={open}>
        <div>
          <p className="mx-5 mb-3 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">{data.caveat}</p>
          <div className="border-t border-slate-100">
            {groups.map(([heading, rows]) => (
              <div key={heading || "ungrouped"}>
                {heading && <p className="px-5 pt-3 pb-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide bg-slate-50/60 border-b border-slate-100">{heading}</p>}
                {rows.map((row) => <CheckRowView key={row.id} row={row} />)}
              </div>
            ))}
          </div>
        </div>
      </Collapsible>
    </div>
  );
};

// ── Schedule reconciliation panel (the app's SchedulePanel, self-contained) ──
const CellView: React.FC<{ cell: ExampleCell | null | undefined }> = ({ cell }) => {
  if (!cell) return <span className="text-slate-300">—</span>;
  const colour = !cell.verified ? "text-amber-700" : cell.status === "bad" ? "text-rose-700" : cell.status === "ok" ? "text-emerald-700" : "text-slate-700";
  return (
    <span className={`break-words ${colour}`}>
      {cell.text}
      {!cell.verified && <span aria-hidden> ?</span>}
      {cell.verified && cell.status === "ok" && <span aria-hidden className="text-emerald-600"> ✓</span>}
      {cell.verified && cell.status === "bad" && <span aria-hidden className="text-rose-600"> ✗</span>}
    </span>
  );
};

const CheckLine: React.FC<{ c: ExampleScheduleCheck }> = ({ c }) => {
  const cls = c.ok
    ? "text-emerald-700 bg-emerald-50 border-emerald-100"
    : c.severity === "critical"
      ? "text-rose-700 bg-rose-50 border-rose-100"
      : c.severity
        ? "text-amber-800 bg-amber-50 border-amber-100"
        : "text-slate-600 bg-slate-50 border-slate-100";
  return <p className={`text-xs border rounded-md px-3 py-2 whitespace-pre-line ${cls}`}><span aria-hidden>{c.ok ? "✓ " : c.severity ? "✗ " : ""}</span>{c.text}</p>;
};

const ScheduleRow: React.FC<{ u: ExampleSchedule["units"][number]; columns: ExampleSchedule["columns"]; open: boolean; onToggle: () => void }> = ({ u, columns, open, onToggle }) => (
  <>
    <tr onClick={onToggle} className={`border-t border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${open ? "bg-slate-50" : ""}`}>
      <td className="px-3 py-2.5 align-top">
        <span className="flex items-start gap-2">
          <Chevron open={open} />
          <span className="min-w-0">
            <span className="block text-sm text-slate-800 break-words">{u.label}</span>
            {u.tenant && <span className={`block text-[11px] mt-0.5 break-words ${u.tenantBad ? "text-rose-600" : "text-slate-400"}`}>{u.tenant}</span>}
          </span>
        </span>
      </td>
      {columns.map((c) => <td key={c.key} className="px-2 py-2.5 align-top text-sm"><CellView cell={u.cells[c.key]} /></td>)}
      <td className="px-2 py-2.5 align-top text-right">
        {u.flags > 0 && <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full bg-red-500 text-white text-[11px] font-semibold tabular-nums">{u.flags}</span>}
      </td>
    </tr>
    {open && (
      <tr className="bg-slate-50">
        <td colSpan={columns.length + 2} className="pb-4 pt-0.5">
          {/* Pinned to the visible width on a phone, where the table
              scrolls sideways, so the text wraps where it can be read. */}
          <div className="space-y-2 pl-9 pr-4 sticky left-0 max-w-[calc(100vw-6.5rem)] sm:max-w-none">
            {u.checks.map((c, i) => <CheckLine key={i} c={c} />)}
            {(u.sources.length > 0 || u.detail.length > 0) && (
              <div className="pt-1">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1">From your report</p>
                <dl className="text-xs text-slate-700 space-y-1">
                  {u.sources.map((s) => (
                    <div key={s.label} className="flex gap-2">
                      <dt className="w-32 shrink-0 text-slate-400">{s.label}</dt>
                      <dd className="min-w-0 whitespace-pre-line">{s.text}</dd>
                    </div>
                  ))}
                  {u.detail.map((d) => (
                    <div key={d.label} className="flex gap-2">
                      <dt className="w-32 shrink-0 text-slate-400">{d.label}</dt>
                      <dd className="min-w-0"><CellView cell={d.cell} /></dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </td>
      </tr>
    )}
  </>
);

const SchedulePanel: React.FC<{ data: ExampleSchedule; defaultOpen?: boolean }> = ({ data, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [openRow, setOpenRow] = useState<string | null>(data.openUnit ?? null);
  const [showChecks, setShowChecks] = useState(false);
  const s = data.subject;
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-4">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-slate-50">
        <Chevron open={open} />
        <span className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-slate-800">{data.title}</span>
          <span className="block text-[11px] text-slate-400 mt-0.5">{data.header}</span>
        </span>
        {data.flagged > 0 ? (
          <span className="shrink-0 inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded-full bg-red-500 text-white text-xs font-semibold tabular-nums">{data.flagged}</span>
        ) : (
          <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-700 text-[11px] font-medium">✓ No issues</span>
        )}
      </button>
      <Collapsible open={open}>
        <div className="pb-4">
          <p className="mx-5 mt-3 text-xs text-slate-600">{data.intro}</p>
          {(s.address || s.valuationDate) && (
            <div className="px-5 py-4 border-b border-slate-100 space-y-0.5 text-sm text-slate-700">
              {s.address && <p><span className="font-semibold text-slate-800">Property:</span> {s.address}</p>}
              {s.valuationDate && <p><span className="font-semibold text-slate-800">Valuation date:</span> {s.valuationDate}</p>}
              {s.reportDate && <p><span className="font-semibold text-slate-800">Report date:</span> {s.reportDate}</p>}
            </div>
          )}
          {/* On a phone the table scrolls sideways inside its own box rather
              than squeezing five columns into 300 px. */}
          <div className="mx-3 sm:mx-5 mt-3 border border-slate-200 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[600px] table-fixed">
              <colgroup>
                <col style={{ width: data.widths.first }} />
                {data.columns.map((c) => <col key={c.key} style={{ width: c.width }} />)}
                <col style={{ width: data.widths.flags }} />
              </colgroup>
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-slate-400">
                  <th className="text-left font-medium px-3 py-2">{data.unitColumn}</th>
                  {data.columns.map((c) => <th key={c.key} className="text-left font-medium px-2 py-2 break-words">{c.label}</th>)}
                  <th className="text-right font-medium px-2 py-2">Flags</th>
                </tr>
              </thead>
              <tbody>
                {data.units.map((u) => (
                  <ScheduleRow key={u.key} u={u} columns={data.columns} open={openRow === u.key} onToggle={() => setOpenRow((r) => (r === u.key ? null : u.key))} />
                ))}
              </tbody>
            </table>
          </div>
          {data.headline.total > 0 && (
            <div className="mx-5 mt-3 space-y-3">
              <button type="button" onClick={() => setShowChecks((v) => !v)} className="w-full flex items-center gap-2 text-left rounded-md -mx-1 px-1 py-0.5 hover:bg-slate-50">
                <Chevron open={showChecks} />
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">{data.headline.label}</span>
                <span className="text-[11px] text-slate-400">· {data.headline.total} {data.headline.total === 1 ? "check" : "checks"}{data.headline.flagged ? `, ${data.headline.flagged} flagged` : ", all agree"}</span>
              </button>
              {showChecks && (
                <ul className="space-y-1.5">
                  {data.headline.checks.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <span aria-hidden className={`shrink-0 w-4 ${c.ok ? "text-emerald-600" : c.severity === "critical" ? "text-rose-600" : c.severity ? "text-amber-600" : "text-slate-400"}`}>{c.ok ? "✓" : c.severity ? "✗" : "·"}</span>
                      <span className="min-w-0">
                        <span className="font-semibold text-slate-700">{c.title}</span>
                        {c.recomputed && <span className="text-slate-500"> · {c.recomputed}</span>}
                        <span className={`block ${c.ok ? "text-slate-500" : "text-slate-700"}`}>{c.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </Collapsible>
    </div>
  );
};

// ── The results view ────────────────────────────────────────────────────────
export const ExampleAudit: React.FC<{ data: ExampleAuditData; complianceOpen?: boolean; scheduleOpen?: boolean }> = ({ data, complianceOpen = false, scheduleOpen = true }) => {
  const [filter, setFilter] = useState<"all" | Severity>("all");
  const [selected, setSelected] = useState<string | null>(null);
  const issues = filter === "all" ? data.issues : data.issues.filter((i) => i.severity === filter);

  return (
    <div className="flex flex-col bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
      {data.notice && (
        <div className="px-4 py-2.5 bg-amber-50 border-b border-amber-200 text-sm text-amber-900">
          {/* The first sentence in bold: "Hypothetical example audit." */}
          <span className="font-semibold">{data.notice.split(". ")[0]}.</span>{data.notice.includes(". ") ? ` ${data.notice.slice(data.notice.indexOf(". ") + 2)}` : ""}
        </div>
      )}
      {/* Filter bar */}
      <div className="p-4 border-b border-slate-200 bg-white flex items-center flex-wrap gap-3 shrink-0">
        <span className="text-sm text-slate-600 mr-2 inline-flex items-center"><span className="rounded-md px-1.5 py-0.5">Found <span className="font-bold text-slate-900 tabular-nums">{data.summary.total}</span> issues</span></span>
        <button onClick={() => setFilter("all")} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === "all" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}>All</button>
        <button onClick={() => setFilter("critical")} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${filter === "critical" ? "bg-red-500 text-white" : "text-red-600 hover:bg-red-50"}`}><span className="w-2 h-2 rounded-full bg-current" />Critical {data.summary.critical}</button>
        <button onClick={() => setFilter("warning")} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${filter === "warning" ? "bg-amber-500 text-white" : "text-amber-600 hover:bg-amber-50"}`}><span className="w-2 h-2 rounded-full bg-current" />Warnings {data.summary.warning}</button>
        <button onClick={() => setFilter("suggestion")} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${filter === "suggestion" ? "bg-blue-500 text-white" : "text-blue-600 hover:bg-blue-50"}`}><span className="w-2 h-2 rounded-full bg-current" />Suggestions {data.summary.suggestion}</button>
      </div>

      {/* Title bar */}
      <div className="px-6 py-3 bg-white border-b border-slate-100 shrink-0">
        <h2 className="text-lg font-semibold text-slate-800">{data.title}</h2>
      </div>

      {/* Panels + findings */}
      <div className="p-3 sm:p-6">
        {data.schedule && <SchedulePanel data={data.schedule} defaultOpen={scheduleOpen} />}
        <CompliancePanel data={data.compliance} defaultOpen={complianceOpen} />
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {issues.map((issue) => {
              const config = severityConfig[issue.severity];
              const isSelected = selected === issue.id;
              return (
                <div key={issue.id} className={`relative p-6 cursor-pointer transition-all ${isSelected ? "bg-slate-100" : "hover:bg-slate-50"}`} onClick={() => setSelected(isSelected ? null : issue.id)}>
                  <div className="flex items-start gap-4">
                    <div className={`w-3 h-3 rounded-full ${config.dot} mt-1.5 shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm font-semibold ${config.color}`}>{config.label}</span>
                          <span className="text-sm text-slate-400">•</span>
                          <span className="text-sm text-slate-500">{issue.category}</span>
                          {(issue.page || issue.section) && (<>
                            <span className="text-sm text-slate-400">•</span>
                            <span className="text-sm text-slate-400">{issue.page && `Page ${issue.page}`}{issue.page && issue.section && ", "}{issue.section && formatSection(issue.section)}</span>
                          </>)}
                        </div>
                        <span className="text-slate-300"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg></span>
                      </div>
                      {isNoChange(issue) ? (
                        <>
                          <div className="flex gap-3 mb-3 items-start">
                            <div className="flex-1"><p className="text-xs text-slate-400 font-medium mb-1">Current</p><div className="text-sm text-slate-700 py-2">{issue.original}</div></div>
                            <div className="flex-1"><p className="text-xs text-green-600 font-medium mb-1">Suggested</p><div className="text-sm text-slate-500 italic bg-green-50/60 border border-green-200 border-dashed rounded-lg px-3 py-2">No wording change</div></div>
                          </div>
                          {isSelected && <div className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"><span className="font-medium">No wording change suggested. </span>{issue.explanation}</div>}
                        </>
                      ) : (
                        <>
                          <div className="flex gap-3 mb-3 items-start">
                            <div className="flex-1"><p className="text-xs text-slate-400 font-medium mb-1">Current</p><div className="text-sm text-slate-400 line-through py-2">{issue.original}</div></div>
                            <div className="flex-1"><p className="text-xs text-green-600 font-medium mb-1">Suggested</p><div className="text-sm text-slate-900 font-medium bg-green-50 border border-green-200 rounded-lg px-3 py-2">{issue.corrected}</div></div>
                          </div>
                          {isSelected && <div className="text-xs text-slate-500 italic pt-2 border-t border-slate-100">{issue.explanation}</div>}
                        </>
                      )}
                    </div>
                  </div>
                  {!isSelected && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                      <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleAudit;
