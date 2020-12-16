import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid';

export default class NotificationsStore {
  items = [];

  constructor() {
    makeAutoObservable(this);
  }

  add({ title, content }) {
    this.items.splice(0, 0, {
      id: nanoid(),
      title,
      content,
    });
  }

  remove(id) {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
