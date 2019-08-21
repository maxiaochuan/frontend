import { request } from '@/utils';
import { IRouteComponentProps } from '@mxcins/types';
import React, { SFC, useEffect, useState } from 'react';
import Link from 'umi/link';

const Home: SFC<IRouteComponentProps> = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    request('/users.json').then(data => setUsers(data));
  }, []);

  return (
    <div>
      <Link to="/chat">Chat</Link>
      {JSON.stringify(users)}
    </div>
  );
};

export default Home;
