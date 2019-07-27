import { IObjectType, IRouteComponentProps } from '@mxcins/types';
import React, { SFC } from 'react';

import { Table } from '@/components';
import { GQLUser } from '@/graphql/generated';
import * as services from './services.gql';

export interface IUsers extends IRouteComponentProps<IObjectType> {}

const USERS_COLUMN_EXTENDS = {
  name: { editing: true },
};

const USERS_DEFAULT_COLUMNS: Array<keyof GQLUser> = ['id', 'name'];

const USERS_QUERY = {
  service: services.Users,
}

const Side: SFC<IUsers> = () => {
  return (
    <Table.Query
      klass="user"
      query={USERS_QUERY}
      defaultColumns={USERS_DEFAULT_COLUMNS}
      columnExtends={USERS_COLUMN_EXTENDS}
    />
  )
};

export default Side;
