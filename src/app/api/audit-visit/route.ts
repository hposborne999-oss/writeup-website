// Records one visit to the hidden /example-audit page in Supabase
// (example_audit_visits — see the app repo's 2026-09-30 migration).
//
// Called once per page load by <AuditVisitBeacon />. Stores the link code
// (?r=), the user agent and the referrer. No IP address, no cookies. Bots and
// link scanners are stored with is_bot = true rather than dropped.
//
// Uses the public anon key, which the table's RLS allows to INSERT only. Always
// answers 204: the visitor's page never waits on, or sees, a failure here.

const BOT_UA =
  /bot|crawler|preview|microsoft|proofpoint|mimecast|barracuda|headless/i;

const clip = (v: unknown, max: number) =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;

export async function POST(req: Request) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (url && key) {
    try {
      const body = await req.json().catch(() => ({}));
      const userAgent = clip(req.headers.get("user-agent"), 512);
      const row = {
        r: clip(body?.r, 64),
        user_agent: userAgent,
        referrer: clip(body?.referrer, 1024),
        // No user agent at all, or an automated browser, is a scanner too.
        is_bot: !userAgent || BOT_UA.test(userAgent) || body?.webdriver === true,
      };
      const res = await fetch(`${url}/rest/v1/example_audit_visits`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(row),
        cache: "no-store",
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) {
        console.error("[audit-visit] save failed:", res.status, await res.text());
      }
    } catch (err) {
      console.error("[audit-visit] save failed:", err);
    }
  }

  return new Response(null, { status: 204 });
}
