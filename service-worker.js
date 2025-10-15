const CACHE_NAME = "shid-cache-v1";
const FILES_TO_CACHE = [
  "index.html",
  "style.css",
  "main.js",
  "manifest.json",
  "glowing.jpg",
  "tra.webp",
  "ah.png",
  "icon.png.jpg",
  "arm.html",
  "disarm.html",
  "eeprom.html",
  "NEWSLETTER.html",
  "ABOUT.html",
  "HELP.html",
  "shop.html",
  "install.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
