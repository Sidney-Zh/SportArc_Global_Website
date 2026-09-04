const CANONICAL_ORIGIN = "https://sportarc.ai";
const ENGLISH_ALIASES = new Set(["/en", "/en/", "/en/index.html"]);
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

    if (ENGLISH_ALIASES.has(url.pathname)) {
      return permanentRedirect(url, "/");
    }

    const normalizedPath = url.pathname === "/index.html" ? "/" : url.pathname;
    if (url.protocol !== "https:" || url.hostname !== "sportarc.ai" || normalizedPath !== url.pathname) {
      return permanentRedirect(url, normalizedPath);
    }

    return env.ASSETS.fetch(request);
  },
};
