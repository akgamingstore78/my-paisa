importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey:"AIzaSyDL5zhsuBWc4p0f_cb9qs1YJVc7k5MrFoo",
  authDomain:"my-paisa-9d72c.firebaseapp.com",
  projectId:"my-paisa-9d72c",
  storageBucket:"my-paisa-9d72c.firebasestorage.app",
  messagingSenderId:"262856682445",
  appId:"1:262856682445:web:7142006af531d56e523284",
  measurementId:"G-1TNMQH3WEJ"
});

const messaging=
  firebase.messaging();

messaging.onBackgroundMessage(
  payload=>{

    const title=
      payload.notification?.title ||
      "My Paisa";

    const options={
  body:
    payload.notification?.body ||
    "You have a new notification.",
  icon:"/my-paisa/icons/icon-192.png",
  badge:"/my-paisa/icons/icon-192.png"
};

    self.registration.showNotification(
      title,
      options
    );

  }
);
const CACHE_NAME="my-paisa-v2";

const APP_FILES=[
  "/my-paisa/",
  "/my-paisa/index.html",
  "/my-paisa/admin.html",
  "/my-paisa/manifest.json",
  "/my-paisa/icons/icon-192.png",
  "/my-paisa/icons/icon-512.png"
];

self.addEventListener("install",event=>{
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache=>cache.addAll(APP_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys().then(keys=>
      Promise.all(
        keys
          .filter(key=>key!==CACHE_NAME)
          .map(key=>caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;

  event.respondWith(
    fetch(event.request)
      .then(response=>{
        const copy=response.clone();

        caches.open(CACHE_NAME)
          .then(cache=>cache.put(event.request,copy));

        return response;
      })
      .catch(()=>caches.match(event.request))
  );
});