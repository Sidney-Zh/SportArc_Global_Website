const CANONICAL_ORIGIN = "https://sportarc.ai";
const ENGLISH_ALIASES = new Set(["/en", "/en/", "/en/index.html"]);

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
