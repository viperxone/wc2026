// WC2026 Dashboard — service worker
// Two jobs only:
//  1. Cache the app shell (this file's own HTML/manifest) so the dashboard
//     opens instantly and still opens with no signal at all.
//  2. For live data (ESPN, API-Football via the Cloudflare proxy), always
//     try the network first — freshness matters for scores — but fall back
//     to the last successful response if the network fails, rather than
//     leaving the UI blank.
// Bump these version strings whenever this file changes, so old caches get
// cleared out on the next visit instead of serving stale app code forever.

const SHELL_CACHE = "wc2026-shell-v1";
const RUNTIME_CACHE = "wc2026-runtime-v1";
const SHELL_FILES = ["./", "./index.html", "./manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) =>
      Promise.all(SHELL_FILES.map((f) => cache.add(f).catch(() => {})))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== SHELL_CACHE && k !== RUNTIME_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return; // never intercept POST etc.

  const url = new URL(req.url);
  const isLiveData =
    url.hostname.includes("espn.com") || url.hostname.includes("workers.dev");

  if (isLiveData) {
    // Network-first: live scores must stay fresh. Only fall back to the
    // last cached response if the network call fails outright.
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // App shell: serve from cache instantly if we have it, refresh in the
  // background so the next load picks up any changes.
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
