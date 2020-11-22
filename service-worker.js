importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);


workbox.precaching.precacheAndRoute([
  { url: '/', revision: '1'},
  { url: '/pages/home.html', revision: '1'},
  { url: '/pages/jadwal.html', revision: '1'},
  { url: '/pages/klasemen.html', revision: '1'},
  { url: '/pages/favorit.html', revision: '1'},
  { url: '/index.html', revision: '1'},
  { url: '/nav.html', revision: '1'},
  { url: '/aset/img/icon.png', revision: '1'},
  { url: '/aset/img/stadium.jpg', revision: '1'},
  { url: '/aset/img/notification.png', revision: '1'},
  { url: '/css/fontawesome/fontawesome.min.css', revision: '1'},
  { url: '/css/fontawesome/all.min.css', revision: '1'},
  { url: '/css/materialize.min.css', revision: '1'},
  { url: '/css/main.css', revision: '1'},
  { url: '/js/materialize.min.js', revision: '1'},
  { url: '/js/jquery.min.js', revision: '1'},
  { url: '/js/nav.js', revision: '1'},
  { url: '/js/latestMatch.js', revision: '1'},
  { url: '/js/upcomingMatch.js', revision: '1'},
  { url: '/js/klasemenMatch.js', revision: '1'},
  { url: '/js/date.js', revision: '1'},
  { url: '/js/api.js', revision: '1'},
  { url: '/js/idb.js', revision: '1'},
  { url: '/js/dbfootball.js', revision: '1'},
  { url: '/js/dbfunction.js', revision: '1'},
  { url: '/js/detail-team.js', revision: '1'},
  { url: '/js/jadwalMatch.js', revision: '1'},
  { url: '/detail-team.html', revision: '2'},
  { url: '/manifest.json', revision: '1'},
  { url: '/logo.png', revision: '1'},
  { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1'},
  { url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1'},
  { url: 'https://fonts.googleapis.com/css?family=Muli:400,400i|Roboto+Condensed:400,600,700', revision: '1'},
  { url: 'https://fonts.gstatic.com/s/muli/v22/7Aulp_0qiz-aVz7u3PJLcUMYOFnOkEk30eg.woff2', revision: '1'}
]);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'football-data',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);




// self.addEventListener("fetch", function (event) {
//   var base_url = "https://api.football-data.org/v2/";
//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function(cache) {
//         return fetch(event.request).then(function(response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//         caches.match(event.request, { ignoreSearch: true }).then(function(response) {
//             return response || fetch (event.request);
//         })
//     )
//   }
// });

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'aset/img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});