import { IRouteComponentProps } from '@mxcins/types';
import React, { SFC } from 'react';

const Home: SFC<IRouteComponentProps> = props => {
  return <div>{JSON.stringify(props)}</div>;
};

export default Home;
