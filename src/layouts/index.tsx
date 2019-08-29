import React, { SFC, useReducer } from 'react';
import { IRouteComponentProps } from '@mxcins/types';
import { MainProvider, reducer, MAIN_CONTEXT_STATE_INIT } from '@/contexts/main';

const Layout: SFC<IRouteComponentProps> = props => {
  const [state, dispatch] = useReducer(reducer, MAIN_CONTEXT_STATE_INIT);

  return (
    <MainProvider value={{ state, dispatch }}>
      <div>{props.children}</div>
    </MainProvider>
  );
};

export default Layout;
