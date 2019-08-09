import { request } from '@/utils';
import { IRouteComponentProps } from '@mxcins/types';
import React, { SFC, useEffect, useState } from 'react';

const Home: SFC<IRouteComponentProps> = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    request('/users.json').then(data => setUsers(data));
  }, []);

  return <div>{JSON.stringify(users)}</div>;
};

export default Home;
