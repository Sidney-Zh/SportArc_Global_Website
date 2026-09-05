const CANONICAL_ORIGIN = "https://sportarc.ai";
// Keep this finite list in sync with canonical pages in sitemap.xml.
const CANONICAL_PATHS = [
  "/",
  "/zh-CN/",
  "/zh-TW/",
  "/de/",
  "/fr/",
  "/ja/",
  "/ko/",
  "/support/",
  "/zh-CN/support/",
  "/zh-TW/support/",
  "/de/support/",
  "/fr/support/",
  "/ja/support/",
  "/ko/support/",
  "/terms/",
  "/privacy/",
  "/membership_service_agreement/",
  "/auto_renewal_subscription_agreement/",
  "/features/",
  "/features/tennis-video-editor/",
  "/features/badminton-video-editor/",
  "/features/table-tennis-video-editor/",
  "/features/table-tennis-ai-coach/",
  "/features/table-tennis-match-analysis/",
  "/support/recording-guide/"
];
const PAGE_ALIASES = new Map([["/index", "/"], ["/index.html", "/"], ["/en", "/"], ["/en/", "/"], ["/en/index.html", "/"]]);
for (const pathname of CANONICAL_PATHS) {
  PAGE_ALIASES.set(pathname.toLowerCase(), pathname);
  if (pathname === "/") continue;
  const stem = pathname.slice(0, -1);
  for (const alias of [stem, `${stem}/index.html`, `${stem}/index`, `${stem}.html`]) {
    PAGE_ALIASES.set(alias.toLowerCase(), pathname);
  }
}

function canonicalPathFor(pathname) {
  // Unknown paths and static assets keep their normal Assets behavior.
  return PAGE_ALIASES.get(pathname.toLowerCase()) || pathname;
}
const PRIVACY_REGION_PATH = "/__sportarc/privacy-region";
const EXPLICIT_CONSENT_COUNTRIES = new Set(["CH", "GB", "IS", "LI", "NO"]);

function permanentRedirect(url, pathname) {
  const target = new URL(pathname, CANONICAL_ORIGIN);
  target.search = url.search;

  return new Response(null, {
    status: 301,
    headers: {
      Location: target.toString(),
      "Cache-Control": "public, max-age=3600",
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === PRIVACY_REGION_PATH) {
      const country = String(request.cf?.country || "XX").toUpperCase();
      const isEuCountry = request.cf?.isEUCountry === "1";
      return Response.json(
        {
          explicitConsentRequired:
            country === "XX" || isEuCountry || EXPLICIT_CONSENT_COUNTRIES.has(country),
        },
        {
          headers: {
            "Cache-Control": "private, no-store",
            "X-Robots-Tag": "noindex, nofollow",
          },
        },
      );
    }

    const normalizedPath = canonicalPathFor(url.pathname);
    if (url.protocol !== "https:" || url.hostname !== "sportarc.ai" || normalizedPath !== url.pathname) {
      return permanentRedirect(url, normalizedPath);
    }

    return env.ASSETS.fetch(request);
  },
};
