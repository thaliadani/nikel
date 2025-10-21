const CACHE_NAME = "meu-pwa-v1";
const arquivos = ["/", "/public/index.html","/public/assets/pages/home.html","/public/assets/pages/transactions.html", "/public/assets/css/style.css", "/public/assets/js/index.js","/public/assets/js/home.js","/public/assets/js/transactions.js", "/public/assets/imgs/icon/icon.svg"];

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(arquivos)));
});

self.addEventListener("fetch", (event) => {
    event.respondWith(caches.match(event.request).then(r => r || fetch(event.request)));
});


/*
self.addEventListener("install", () => {
  console.log("Service Worker instalado");
});

self.addEventListener("activate", () => {
  console.log("Service Worker ativado");
});

self.addEventListener("fetch", (event) => {
  console.log("Interceptando:", event.request.url);
});
*/