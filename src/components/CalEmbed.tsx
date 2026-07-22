"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const CAL_LINK = "harry-osborne-writeup/writeup-demo";
const NAMESPACE = "writeup-demo";

export function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: { "cal-brand": "#2c7a7b" },
          dark: { "cal-brand": "#2c7a7b" },
        },
      });
    })();
  }, []);

  return (
    <Cal
      namespace={NAMESPACE}
      calLink={CAL_LINK}
      style={{ width: "100%", height: "100%", minHeight: "640px", overflow: "scroll" }}
      config={{ layout: "month_view", theme: "light" }}
    />
  );
}
