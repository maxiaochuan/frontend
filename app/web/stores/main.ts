import { observable } from 'mobx';
import io from 'socket.io-client';
// import Cookie from 'js-cookie';

interface ICurrent {
  id: string;
  name: string;
  phone: string;
}

export default class MainStore {
  constructor(init?: { user: any; exp: any }) {
    if (init) {
      this.whoami(init);
    }
  }

  @observable
  public current?: ICurrent;

  @observable
  public authenticated? = false;

  public io = io('/chat', { autoConnect: false });

  public whoami({ user, exp }: { user: ICurrent; exp: number }) {
    this.current = user;
    this.authenticated = exp > new Date().getTime() / 1000;
  }
}
