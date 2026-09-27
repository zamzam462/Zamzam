/* Service Worker — زمزم لتكنولوجيا المياه والطاقة
   نسخة معدّلة: متوافقة مع بنية index.html الواحد (كل الأكواد جواه) */

const CACHE_NAME = "zamzam-app-v20";

// الملفات الأساسية لازم تكون موجودة، غير كده الـ install هيفشل
const CORE_ASSETS = [
  "./index.html",
  "./manifest.json",
];

// صور/أيقونات اختيارية — لو ملف منها ناقص أو الاسم مش مطابق،
// مش هيوقف تسجيل الـ Service Worker
const OPTIONAL_ASSETS = [
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/logo-header.jpg",
  "./assets/logo-splash-transparent.png",
  "./assets/banner-home.jpg",
  "./assets/banner-staff.jpg",
  "./assets/banner-donor.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(CORE_ASSETS);
      await Promise.all(
        OPTIONAL_ASSETS.map((url) =>
          cache.add(url).catch(() => {
            console.warn("[SW] تخطّي ملف غير موجود:", url);
          })
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
