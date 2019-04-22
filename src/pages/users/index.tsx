import { IRouteComponentProps } from '@mxcins/types';
import { Spin } from 'antd';
import React, { SFC } from 'react';
import { QueryResult } from 'react-apollo';

import { Table } from '@/components';
import { attachQuery } from '@/decorators';
import { GQLUser } from '@/graphql/generated';

import * as services from './services.gql';

export interface IUsers extends IRouteComponentProps, QueryResult<{ users: GQLUser[] }> {}

const Users: SFC<IUsers> = props => {
  return (
    <Spin spinning={props.loading}>
      <Table
        data={(props.data && props.data.users) || []}
        controllers={{ update: '/users/:id.json' }}
      />
    </Spin>
  );
};

export default attachQuery(services.Users)(Users);
