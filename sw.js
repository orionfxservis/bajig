// Baji G - Service Worker for offline support
const CACHE_NAME = 'baji-g-v1';
const urlsToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/main.js',
  './manifest.json',
  './images/dress1.jpg',
  './images/dress2.jpg',
  './images/dress3.jpg',
  './images/dress4.jpg',
  './images/dress5.jpg',
  './images/dress6.jpg',
  './images/dress7.jpg',
  './images/dress8.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
