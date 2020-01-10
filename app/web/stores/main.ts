import { observable } from 'mobx';
import io from 'socket.io-client';
// import Cookie from 'js-cookie';

export default class MainStore {
  @observable
  public current?: { id: string; name: string; phone: string };

  @observable
  public authenticated? = false;

  public io = io('/chat', { autoConnect: false });

  public whoami(user: { id: string; name: string; phone: string }) {
    this.current = user;
  }
}
