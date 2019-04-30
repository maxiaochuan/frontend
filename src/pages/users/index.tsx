import { IObjectType, IRouteComponentProps } from '@mxcins/types';
import React, { SFC } from 'react';

import { Table } from '@/components';

import * as services from './services.gql';

export interface IUsers extends IRouteComponentProps<IObjectType> {}

const columnExtends = {
  name: { editing: true },
};

const WITH_QUERY = {
  query: services.Users
}

const Users: SFC<IUsers> = () => {
  return (
    <Table.Query
      withQuery={WITH_QUERY}
      klass="user"
      columnExtends={columnExtends}
      defaultColumns={['id', 'name']}
      controllers={true}
    />
  );
};

export default Users;
