import { IRCP } from '@mxcins/types';
import React, { SFC } from 'react';

const Home: SFC<IRCP> = props => {
  return <div>{JSON.stringify(props)}</div>;
};

export default Home;
