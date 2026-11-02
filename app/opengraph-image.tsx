import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0B0F17",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top bar with emerald accent mark */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
            }}
          />
          <span
            style={{
              fontSize: "24px",
              fontFamily: "monospace",
              color: "#94a3b8",
              fontWeight: 600,
            }}
          >
            swantin.mathew()
          </span>
        </div>

        {/* Center: Name & Role */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#f8fafc",
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            {siteConfig.name}
          </h1>
          <p
            style={{
              fontSize: "30px",
              fontWeight: 500,
              color: "#10b981",
              margin: 0,
            }}
          >
            {siteConfig.role}
          </p>
          <p
            style={{
              fontSize: "22px",
              color: "#94a3b8",
              margin: 0,
              maxWidth: "800px",
            }}
          >
            {siteConfig.institution} · Kochi, Kerala
          </p>
        </div>

        {/* Bottom meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid #1e293b",
            paddingTop: "32px",
            fontSize: "18px",
            fontFamily: "monospace",
            color: "#64748b",
          }}
        >
          <span>Open to SDE internships &amp; full-time roles · 2027</span>
          <span style={{ color: "#10b981" }}>swantin.dev</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
