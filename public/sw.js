self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('push', (event) => {
  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch {
    data = { title: 'New Appointment!', body: event.data.text() };
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'New Appointment!', {
      body: data.body || 'A new appointment has been booked.',
      icon: '/urmimainfront.png',
      badge: '/urmimainfront.png',
      tag: 'new-booking',
      renotify: true,
      requireInteraction: false,
      data: { url: '/admin' },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.includes('/admin') && 'focus' in c) return c.focus();
      }
      return clients.openWindow('/admin');
    })
  );
});
