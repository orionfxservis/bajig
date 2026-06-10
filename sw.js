// Baji G - Service Worker for offline support
const CACHE_NAME = 'baji-g-v2';
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
  './images/working_lady.png'
];

self.addEventListener('install', event => {
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
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
