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
 * checklist panel opens and closes. Removed: rename, mark-as-fixed, copy,
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

export interface ExampleAuditData {
  title: string;
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

// ── The results view ────────────────────────────────────────────────────────
export const ExampleAudit: React.FC<{ data: ExampleAuditData; complianceOpen?: boolean }> = ({ data, complianceOpen = false }) => {
  const [filter, setFilter] = useState<"all" | Severity>("all");
  const [selected, setSelected] = useState<string | null>(null);
  const issues = filter === "all" ? data.issues : data.issues.filter((i) => i.severity === filter);

  return (
    <div className="flex flex-col bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
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
      <div className="p-6">
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
