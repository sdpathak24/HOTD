const CACHE_NAME = "hotd-cache-v1";
const urlsToCache = [
  "/HOTD/",
  "/HOTD/index.html",
  "/HOTD/css/style.css",
  "/HOTD/js/app.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
