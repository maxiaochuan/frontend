import { IObjectType, IRouteComponentProps } from '@mxcins/types';
import React, { SFC } from 'react';

import { Table } from '@/components';

import * as services from './services.gql';

export interface IUsers extends IRouteComponentProps<IObjectType> {}

const columnExtends = {
  name: { editing: true },
};

const Users: SFC<IUsers> = () => {
  return (
    <Table.Query
      withQuery={{
        query: services.Users,
      }}
      klass="user"
      tree={{}}
      columnExtends={columnExtends}
      defaultColumns={['id', 'name']}
      controllers={true}
    />
  );
};

export default Users;
