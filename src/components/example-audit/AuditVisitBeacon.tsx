"use client";

import { useEffect } from "react";

// One fire-and-forget request per page load to /api/audit-visit, after the
// page has rendered. Sends the ?r= link code and the referrer; the server adds
// the user agent. No cookies (credentials omitted), nothing awaited, and any
// failure is swallowed — the page is identical whether or not it saves.
// Link scanners that don't run JavaScript never trigger it at all.

let sent = false;

export function AuditVisitBeacon() {
  useEffect(() => {
    if (sent) return;
    sent = true;
    try {
      fetch("/api/audit-visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          r: new URLSearchParams(window.location.search).get("r"),
          referrer: document.referrer || null,
          webdriver: navigator.webdriver === true,
        }),
        credentials: "omit",
        keepalive: true,
      }).catch(() => {});
    } catch {
      // never affect the page
    }
  }, []);
  return null;
}
