import React from 'react';
import { Toast } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import useStores from '@/hooks/useStores';

const Notifications = observer(() => {
  const { notificationsStore } = useStores();

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
      }}
    >
      {
        notificationsStore.items.map((notification) => (
          <Toast
            key={notification.id}
            onClose={() => notificationsStore.remove(notification.id)}
            delay={4000}
            autohide
          >
            <Toast.Header>
              <strong className="mr-auto">{ notification.title }</strong>
            </Toast.Header>
            <Toast.Body>{ notification.content }</Toast.Body>
          </Toast>
        ))
      }
    </div>
  );
});

export default Notifications;
