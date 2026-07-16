// Hero product panel: the WriteUp audit result reproduced as a real UI
// fragment — a sheet of "paper" sliding in from the bottom-right of a
// textured petrol band. All styling lives in globals.css (.audit-band /
// .audit-card) since the layered gradients and corner treatment don't
// express as Tailwind utilities.
export function AuditOverlay() {
  return (
    <div className="audit-band">
      <div className="audit-card">
        <div className="top">
          <div className="found">
            Found <b>25</b> issues
          </div>
          <div className="tabs">
            <span className="tab all">All</span>
            <span className="tab crit">
              <span className="dot" />
              <span className="lab">Critical</span>
              <span className="n">8</span>
            </span>
            <span className="tab warn">
              <span className="dot" />
              <span className="lab">Warning</span>
              <span className="n">9</span>
            </span>
            <span className="tab sugg">
              <span className="dot" />
              <span className="lab">Suggestion</span>
              <span className="n">8</span>
            </span>
          </div>
        </div>

        <div className="divider" />
        <h3 className="addr">4 Brunswick Place, London</h3>

        <div className="finding">
          <div className="fhead">
            <div className="meta">
              <span className="rdot" />
              <span className="crit">Critical</span>
              <span className="sep">•</span>
              <span className="cat">Consistency</span>
              <span className="sep">•</span>
              <span className="sec">S.14.0 Market Rent</span>
            </div>
            <span className="check" aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="9" />
                <path d="M8.5 12.2l2.3 2.3 4.7-4.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <div className="cols">
            <div>
              <div className="lab cur">Current</div>
              <div className="cur-val">£124,800 per annum.</div>
            </div>
            <div>
              <div className="lab sug">Suggested</div>
              <div className="sug-box">
                <span className="v">£118,200 per annum.</span>
                <span className="copy" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M5 15V5a2 2 0 0 1 2-2h10" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="detail">
            <div className="lab">The detail</div>
            <p>
              The Market Rent figure differs across the report. Section 14.1
              states £124,800 per annum, but the Executive Summary and Section
              18.1 state £118,200 per annum. All instances of the same basis
              must reconcile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
