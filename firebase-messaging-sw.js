importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDL5zhsuBWc4p0f_cb9qs1YJVc7k5MrFoo",
  authDomain: "my-paisa-9d72c.firebaseapp.com",
  projectId: "my-paisa-9d72c",
  storageBucket: "my-paisa-9d72c.firebasestorage.app",
  messagingSenderId: "262856682445",
  appId: "1:262856682445:web:7142006af531d56e523284",
  measurementId: "G-1TNMQH3WEJ"
});

const messaging = firebase.messaging();

function buildNotificationOptions(payloadData) {
  const data = payloadData || {};
  return {
    body: data.body || "You have a new notification.",
    icon: data.icon || "/my-paisa/icons/icon-192.png",
    badge: data.badge || "/my-paisa/icons/icon-192.png",
    tag: data.tag || "my-paisa-alert",
    renotify: true,
    data: {
      url: data.url || "/my-paisa/index.html"
    }
  };
}

messaging.onBackgroundMessage(payload => {
  const title =
    payload.notification?.title ||
    payload.data?.title ||
    "My Paisa";

  const options = buildNotificationOptions({
    body: payload.notification?.body || payload.data?.body || "You have a new notification.",
    icon: payload.notification?.icon || payload.data?.icon || "/my-paisa/icons/icon-192.png",
    badge: "/my-paisa/icons/icon-192.png",
    tag: payload.data?.tag || "my-paisa-push",
    url: payload.data?.url || "/my-paisa/index.html"
  });

  return self.registration.showNotification(title, options);
});

self.addEventListener("message", event => {
  const msg = event.data;
  if (!msg || msg.type !== "SHOW_OFFLINE_NOTIFICATION") return;

  const title = msg.title || "My Paisa (Offline)";
  const options = buildNotificationOptions({
    body: msg.body || "Offline activity recorded.",
    icon: msg.icon || "/my-paisa/icons/icon-192.png",
    badge: "/my-paisa/icons/icon-192.png",
    tag: msg.tag || "my-paisa-offline",
    url: msg.url || "/my-paisa/index.html"
  });

  if (event.waitUntil) {
    event.waitUntil(self.registration.showNotification(title, options));
  } else {
    self.registration.showNotification(title, options);
  }
});

importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDL5zhsuBWc4p0f_cb9qs1YJVc7k5MrFoo",
  authDomain: "my-paisa-9d72c.firebaseapp.com",
  projectId: "my-paisa-9d72c",
  storageBucket: "my-paisa-9d72c.firebasestorage.app",
  messagingSenderId: "262856682445",
  appId: "1:262856682445:web:7142006af531d56e523284",
  measurementId: "G-1TNMQH3WEJ"
});

const messaging = firebase.messaging();

function buildNotificationOptions(payloadData) {
  const data = payloadData || {};
  return {
    body: data.body || "You have a new notification.",
    icon: data.icon || "/my-paisa/icons/icon-192.png",
    badge: data.badge || "/my-paisa/icons/icon-192.png",
    tag: data.tag || "my-paisa-alert",
    renotify: true,
    data: {
      url: data.url || "/my-paisa/index.html"
    }
  };
}

messaging.onBackgroundMessage(payload => {
  const title =
    payload?.notification?.title ||
    payload?.data?.title ||
    "My Paisa";

  const options = buildNotificationOptions({
    body: payload?.notification?.body || payload?.data?.body || "You have a new notification.",
    icon: payload?.notification?.icon || payload?.data?.icon || "/my-paisa/icons/icon-192.png",
    badge: payload?.data?.badge || "/my-paisa/icons/icon-192.png",
    tag: payload?.data?.tag || "my-paisa-push",
    url: payload?.data?.url || "/my-paisa/index.html"
  });

  return self.registration.showNotification(title, options);
});

self.addEventListener("message", event => {
  const msg = event.data;
  if (!msg || msg.type !== "SHOW_OFFLINE_NOTIFICATION") return;

  const title = msg.title || "My Paisa (Offline)";
  const options = buildNotificationOptions({
    body: msg.body || "Offline activity recorded.",
    icon: msg.icon || "/my-paisa/icons/icon-192.png",
    badge: msg.badge || "/my-paisa/icons/icon-192.png",
    tag: msg.tag || "my-paisa-offline",
    url: msg.url || "/my-paisa/index.html"
  });

  const promise = self.registration.showNotification(title, options);
  if (event.waitUntil) {
    event.waitUntil(promise);
  }
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/my-paisa/index.html";
  const fullTargetUrl = new URL(targetUrl, self.location.origin).href;

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(async clientList => {
      for (const client of clientList) {
        if (client.url === fullTargetUrl && "focus" in client) {
          return client.focus();
        }
      }
      for (const client of clientList) {
        if (client.url.startsWith(self.location.origin + "/my-paisa") && "focus" in client) {
          if ("navigate" in client) {
            await client.navigate(fullTargetUrl).catch(() => {});
          }
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(fullTargetUrl);
      }
    })
  );
});

const CACHE_NAME = "my-paisa-v4";

const APP_FILES = [
  "/my-paisa/",
  "/my-paisa/index.html",
  "/my-paisa/admin.html",
  "/my-paisa/manifest.json",
  "/my-paisa/firebase-messaging-sw.js",
  "/my-paisa/icons/icon-192.png",
  "/my-paisa/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (const file of APP_FILES) {
        try {
          await cache.add(file);
        } catch (err) {
          console.warn("Cache skip:", file);
        }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, copy))
            .catch(() => {});
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request).then(cached => cached || caches.match("/my-paisa/index.html"))
      )
  );
});