const CACHE='qaraen-v43';
const LOCAL=['./','./index.html','./styles.css?v=40','./app.js?v=42','./i18n.js?v=2','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png','./icons/images/Mishari.jpg','./icons/images/Abdul%20Basit.jpg','./icons/images/Al-Sudais.jpg','./icons/images/Al-Muaiqly.jpg','./icons/images/Al-Shuraim.jpg','./icons/images/alhasriu.jpg','./icons/images/Ayoub.jpg','./icons/images/Al-Hudhaifi.jpg','./icons/images/Al-Minshawi.jpg','./icons/images/Hani%20Al-Rifai.jpg','./icons/images/Ahmed-Al-Ajmy.png','./icons/images/Idrees-Abkar.png','./icons/images/Yasser-Al-Dosari.png','./icons/images/Nasser-Al-Qatami.png','./icons/images/Abu-Bakr-Al-Shatri.png','./icons/images/Saad-Al-Ghamdi.png','./icons/images/Salah-Al-Budair.png','./icons/images/Bandar-Balilah.jpg','./icons/images/Abdullah-Al-Juhany.png','./icons/images/Abdulmohsen-Al-Qasim.png','./icons/images/Ali-Jaber.png','./icons/images/Ibrahim-Al-Akdar.png','./icons/images/Ahmed-Amer.png','./icons/images/Mahmoud-Ali-Al-Banna.png','./icons/images/Mustafa-Ismail.png','./icons/images/Mohammad-Al-Tablawi.png','./icons/images/Ahmad-Nuaina.png','./icons/images/Abdul-Aziz-Al-Ahmad.png','./icons/images/Abdullah-Al-Matrood.png','./icons/images/Abdullah-Basfar.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(LOCAL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.hostname==='api.aladhan.com'){
    event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request)));
    return;
  }
  if(url.hostname==='api.alquran.cloud'||url.origin===location.origin){
    event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response})));
  }
});
