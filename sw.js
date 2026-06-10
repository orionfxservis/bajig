// Baji G - Service Worker for offline support
const CACHE_NAME = 'baji-g-v3';
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
  './images/dress8.jpg',
  './images/working_lady.png',
  './images/logo/icon-512.png',
  './images/logo/icon-72.png',
  './images/logo/logo.png',
  './images/bg/bg-03.png'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Force the new service worker to become active immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // Claim clients immediately to update cache
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
