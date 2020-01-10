import React, { useRef } from 'react';
import { Provider } from 'mobx-react';
import Cookie from 'js-cookie';
import JWT from 'jsonwebtoken';
import { MainStore } from '@/stores';
import { ISSRSFC } from '@/types';

const CoreLayout: ISSRSFC<{ init?: any }> = props => {
  const mainRef = useRef(new MainStore(props.init));
  return <Provider main={mainRef.current}>{props.children}</Provider>;
};

CoreLayout.getInitialProps = async props => {
  const { isServer, req } = props;
  const auth: string = isServer ? req.authorization : Cookie.get('Authorization');
  if (auth) {
    const token = auth.replace(/^Bearer\+/, '');
    const decode = JWT.decode(token) as Record<string, any>;
    return { init: decode };
  }

  return {};
};

export default CoreLayout;
