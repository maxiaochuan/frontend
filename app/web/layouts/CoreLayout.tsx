import React, { SFC, Fragment } from 'react';
import { Provider } from 'mobx-react';
import Cookie from 'js-cookie';
import JWT from 'jsonwebtoken';
import { MainStore } from '@/stores';
import { ISSRSFC } from '@/types';

const main = new MainStore();

const Auth: SFC<{ main: MainStore }> = props => {
  console.log(props);
  return <Fragment>{props.children}</Fragment>;
};

const CoreLayout: ISSRSFC<{ user: any }> = props => {
  console.log('props', props.user);
  return (
    <Provider main={main}>
      <Auth main={main}>{props.children}</Auth>
    </Provider>
  );
};

CoreLayout.getInitialProps = async props => {
  const { isServer, req } = props;
  const auth: string = isServer ? req.authorization : Cookie.get('Authorization');
  if (auth) {
    const token = auth.replace(/^Bearer\+/, '');
    const decode = JWT.decode(token) as Record<string, any>;
    const user = decode && decode.user;
    if (user) {
      main.whoami(user);
    }
    return { user: (decode && decode.user) || undefined };
  }
  return {};
};

export default CoreLayout;
