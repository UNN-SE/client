import { makeAutoObservable } from 'mobx';

export default class UserStore {
  user = null

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user) {
    this.user = user;
  }

  resetUser() {
    this.user = null;
  }

  get isSignedIn() {
    return this.user != null;
  }
}
