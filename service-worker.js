const CACHE='anhs-097a-3-shell';
const FILES=['./','./index.html','./style.css','./app.js','./school-config.js','./manifest.webmanifest','./anhs-crest.png','./icon.svg','./jb-productions-logo-large.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const u=new URL(event.request.url);
 // Only public application assets are cached. Never cache API responses or learner records.
 if(event.request.method!=='GET'||u.origin!==self.location.origin)return;
 if(!FILES.some(p=>new URL(p,self.registration.scope).pathname===u.pathname))return;
 event.respondWith(fetch(event.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));}return r;}).catch(()=>caches.match(event.request)));
});
