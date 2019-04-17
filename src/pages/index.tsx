import { IRCP } from '@mxcins/types';
import React, { SFC } from 'react';

export interface IHomeProps extends IRCP {}

const Home: SFC<IHomeProps> = props => {
  return (<div>{JSON.stringify(props)}</div>);
}

export default Home;