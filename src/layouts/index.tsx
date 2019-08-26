import { IRouteComponentProps } from '@mxcins/types';
import React, { SFC } from 'react';

const Layout: SFC<IRouteComponentProps> = props => <div>{props.children}</div>;

export default Layout;
