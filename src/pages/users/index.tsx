import { IObjectType, IRouteComponentProps } from '@mxcins/types';
import React, { SFC } from 'react';

import { Table } from '@/components';
import { ITableCommonProps } from '@/components/table';
import { withQuery } from '@/decorators';
import { GQLUser } from '@/graphql/generated';
import * as services from './services.gql';

export interface IUsers extends IRouteComponentProps<IObjectType> {}

const columnExtends = {
  name: { editing: true },
};

const USERS_DEFAULT_COLUMNS: Array<keyof GQLUser> = ['id', 'name'];

const Users = withQuery<ITableCommonProps>(services.Users, {
  klass: 'user',
  columnExtends,
  defaultColumns: USERS_DEFAULT_COLUMNS,
  controllers: true,
})(Table.Query);

const Side: SFC<IUsers> = () => {
  return <Users />;
};

export default Side;
