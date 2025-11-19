/**
 * NOVUS Solutions - Service Worker v3.2
 * Provides offline support and caching for better performance
 */

const CACHE_NAME = 'novus-solutions-v3.2';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  'https://i.postimg.cc/C5t2k2Rh/IMG-0038.png',
  'https://i.postimg.cc/8cJS2MWh/FD219596-1656-4911-9FD9-CC643EDA56A9.png',
  'https://i.postimg.cc/0rRLh399/16925846-99BD-43BD-A1D4-1E93B161A443.jpg'
];

// Install Service Worker
self.addEventListener('install', event => {
  console.log('[Service Worker v3.2] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker v3.2] Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  console.log('[Service Worker v3.2] Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker v3.2] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Strategy: Network First, fallback to Cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response
        const responseClone = response.clone();
        
        // Cache the fetched response
        if (event.request.method === 'GET' && response.status === 200) {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request).then(response => {
          if (response) {
            console.log('[Service Worker v3.2] Serving from cache:', event.request.url);
            return response;
          }
          
          // If not in cache, return offline page or error
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// Handle messages from the client
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Push notification support (optional)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update from NOVUS Solutions',
    icon: 'https://i.postimg.cc/8cJS2MWh/FD219596-1656-4911-9FD9-CC643EDA56A9.png',
    badge: 'https://i.postimg.cc/8cJS2MWh/FD219596-1656-4911-9FD9-CC643EDA56A9.png',
    vibrate: [200, 100, 200],
    tag: 'novus-notification',
    requireInteraction: false
  };

  event.waitUntil(
    self.registration.showNotification('NOVUS Solutions', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

console.log('[Service Worker v3.2] Loaded successfully - NOVUS Solutions');
