import React from 'react';
import UserStore from '../stores/user';
import NotificationsStore from '../stores/notifications';

export default React.createContext({
  userStore: new UserStore(),
  notificationsStore: new NotificationsStore(),
});
