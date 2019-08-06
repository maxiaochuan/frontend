import { IRouteComponentProps } from '@mxcins/types';
import React, { SFC } from 'react';

const Layout: SFC<IRouteComponentProps> = props => {
  return <div>{props.children}</div>;
};

export default Layout;
