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
      query={services.Users}
      klass="user"
      columnExtends={columnExtends}
      defaultColumns={['id', 'name']}
      controllers={true}
    />
  );
};

export default Users;
