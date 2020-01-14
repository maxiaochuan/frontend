import { observable } from 'mobx';
import io from 'socket.io-client';
import JWT from 'jsonwebtoken';
import Cookie from 'js-cookie';

interface ICurrent {
  id: string;
  name: string;
  phone: string;
}

export default class MainStore {
  constructor(init?: string) {
    console.log('constructor', init);
    this.whoami(init);
  }

  @observable
  public current?: ICurrent;

  @observable
  public authenticated? = false;

  public socket = io('/chat', { autoConnect: false });

  // public whoami({ user, exp }: { user: ICurrent; exp: number }) {
  public whoami(authorization?: string) {
    const au = authorization || Cookie.get('Authorization') || '';
    console.log('whoami', au);
    if (au) {
      const token = au.replace(/^Bearer\+/, '');
      const decoded = JWT.decode(token);
      if (decoded) {
        const d = decoded as { user: ICurrent; exp: number };
        this.current = d.user;
        this.authenticated = d.exp > new Date().getTime() / 1000;
      }
    }
  }
}
