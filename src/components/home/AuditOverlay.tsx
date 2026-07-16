// Hero product panel: the WriteUp audit result, reproduced as a real
// UI fragment, floating on a textured petrol band (see `.audit-band` in
// globals.css). Content mirrors a live "Found N issues" audit view.
export function AuditOverlay() {
  return (
    <div className="audit-band flex items-center justify-center p-5 sm:p-7 lg:p-9">
      <div className="relative z-[2] w-full max-w-[560px] rounded-xl bg-white p-6 shadow-[0_44px_84px_-26px_rgba(4,20,23,0.62),0_2px_10px_rgba(0,0,0,0.10)] sm:p-7">
        {/* Header — count + severity tabs */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <div className="text-[15px] font-medium text-slate-700">
            Found <b className="font-extrabold text-slate-900">25</b> issues
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-slate-800 px-3 py-1.5 text-[13.5px] font-semibold text-white">
              All
            </span>
            <span className="inline-flex items-center gap-1.5 text-[13.5px]">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="font-semibold text-red-500">Critical</span>
              <span className="font-bold text-slate-900">8</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[13.5px]">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="font-semibold text-amber-500">Warnings</span>
              <span className="font-bold text-slate-900">9</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[13.5px]">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="font-semibold text-blue-500">Suggestions</span>
              <span className="font-bold text-slate-900">8</span>
            </span>
          </div>
        </div>

        <div className="-mx-6 my-5 h-px bg-slate-200 sm:-mx-7" />

        <h3 className="mb-5 text-[22px] font-extrabold tracking-[-0.01em] text-slate-900 sm:text-[26px]">
          4 Brunswick Place, London
        </h3>

        {/* Finding */}
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-5">
          <div className="flex items-start gap-3">
            <div className="flex flex-wrap items-center gap-2 text-[13px]">
              <span className="h-[9px] w-[9px] rounded-full bg-red-500" />
              <span className="font-semibold text-red-500">Critical</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">Consistency</span>
              <span className="text-slate-400">•</span>
              <span className="text-[12px] uppercase tracking-[0.06em] text-slate-500">
                S.14.0 Market Rent
              </span>
            </div>
            <span className="ml-auto shrink-0 text-slate-300" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="9" />
                <path d="M8.5 12.2l2.3 2.3 4.7-4.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <div className="mb-2 text-[13px] text-slate-400">Current</div>
              <div className="text-[15px] text-slate-400 line-through">£124,800 per annum.</div>
            </div>
            <div>
              <div className="mb-2 text-[13px] font-medium text-green-600">Suggested</div>
              <div className="flex items-center justify-between gap-2 rounded-lg border border-green-200 bg-green-50 px-3.5 py-2.5">
                <span className="text-[15px] font-medium text-slate-900">£118,200 per annum.</span>
                <span className="shrink-0 text-slate-400" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M5 15V5a2 2 0 0 1 2-2h10" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <p className="mt-5 text-[13.5px] italic leading-relaxed text-slate-500">
            The Market Rent figure differs across the report. Section 14.1 states
            £124,800 per annum, but the Executive Summary and Section 18.1 state
            £118,200 per annum. All instances of the same basis must reconcile.
          </p>
        </div>
      </div>
    </div>
  );
}
