self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('push', (event) => {
  let title = 'New Appointment!';
  let body = 'A new appointment has been booked.';

  if (event.data) {
    try {
      const d = event.data.json();
      if (d.title) title = d.title;
      if (d.body) body = d.body;
    } catch {}
  }

  event.waitUntil(
    self.registration.showNotification(title, { body, icon: '/urmimainfront.png' })
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
