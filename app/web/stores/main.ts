import { observable } from 'mobx';
// import Cookie from 'js-cookie';

export default class MainStore {
  @observable
  public current: any = {};

  public whoami(user: { id: string; name: string; phone: string }) {
    this.current = user;
  }
}
