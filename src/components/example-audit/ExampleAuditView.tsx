"use client";

import { ExampleAudit, type ExampleAuditData } from "./ExampleAudit";
import data from "./example-audit.json";

// ExampleAudit.tsx and example-audit.json are copied byte-for-byte from the
// WriteUp-example-audit-pack handover folder — don't edit them here; drop in
// a new copy instead. `.app-render` (globals.css) makes the site draw the
// component's classes the way the app does.
export function ExampleAuditView() {
  return (
    <div className="app-render">
      <ExampleAudit data={data as ExampleAuditData} complianceOpen />
    </div>
  );
}
