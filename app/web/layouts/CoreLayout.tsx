import React from 'react';
import { Provider } from 'mobx-react';
import { MainStore } from '@/stores';
import { ISSRSFC } from '@/types';

const main = new MainStore();

const CoreLayout: ISSRSFC = props => <Provider main={main}>{props.children}</Provider>;

CoreLayout.getInitialProps = async props => {
  const { isServer, req } = props;
  if (isServer && req.authorization) {
    main.whoami(req.authorization);
  }

  return {};
};

export default CoreLayout;
