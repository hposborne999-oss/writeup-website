"use client";

import { ExampleAudit, type ExampleAuditData } from "./ExampleAudit";
import data from "./example-audit.json";

// ExampleAudit.tsx is byte-for-byte from the WriteUp-example-audit-pack
// handover folder — don't edit it here; drop in a new copy instead.
// example-audit.json started from the pack and has since been curated here
// (Harry, 30 Sep): two spelling findings out, the psf → per sq ft house-style
// illustration in (same as the app's demoAudit.ts), panel renamed.
// `.app-render` (globals.css) makes the site draw the component's classes the
// way the app does. The VPS 6 panel starts closed.
export function ExampleAuditView() {
  return (
    <div className="app-render">
      <ExampleAudit data={data as ExampleAuditData} />
    </div>
  );
}
