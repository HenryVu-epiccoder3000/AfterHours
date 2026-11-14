
const CACHE_NAME = 'afterhours-v3';

const CORE = [
    './',
    './index.html',
    './manifest.webmanifest',
    './lame.min.js'
];

// Cache the latest files during installation
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(CORE))
    );

    self.skipWaiting();
});

// Remove outdated caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(names =>
            Promise.all(
                names
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            )
        ).then(() => self.clients.claim())
    );
});

// Prefer the latest online version, fall back to cache offline
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);

    if (url.origin !== self.location.origin) return;

    event.respondWith(
        fetch(event.request).then(response => {
            if (response.ok) {
                const copy = response.clone();

                event.waitUntil(
                    caches.open(CACHE_NAME).then(cache =>
                        cache.put(event.request, copy)
                    )
                );
            }

            return response;
        }).catch(() => caches.match(event.request))
    );
});
