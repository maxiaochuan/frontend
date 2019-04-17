import { IRCP } from '@mxcins/types';
import React, { SFC } from 'react';

const Layout: SFC<IRCP> = props => {
  return <div>{props.children}</div>;
};

export default Layout;
