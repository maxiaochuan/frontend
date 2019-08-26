import { IRouteComponentProps } from '@mxcins/types';
import React, { SFC } from 'react';
import Link from 'umi/link';

const Home: SFC<IRouteComponentProps> = () => (
  <div>
    <Link to="/chat">Chat</Link>
  </div>
);

export default Home;
