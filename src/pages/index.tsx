import { IRouteComponentProps } from '@mxcins/types';
import React, { SFC, useEffect } from 'react';

import { request } from '@/utils';

const Home: SFC<IRouteComponentProps> = props => {
  useEffect(() => {
    request('/api/users.json');
  }, []);

  return <div>{JSON.stringify(props)}</div>;
};

export default Home;
