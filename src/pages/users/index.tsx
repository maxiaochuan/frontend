import { IRouteComponentProps } from '@mxcins/types';
import { Spin } from 'antd';
import React, { SFC } from 'react';
import { QueryResult } from 'react-apollo';

import { Table } from '@/components';
import { attach } from '@/decorators';
import { GQLUser } from '@/graphql/generated';

import * as services from './services.gql';

const Users: SFC<IRouteComponentProps & QueryResult<{ users: GQLUser[] }>> = props => {
  return (
    <Spin spinning={props.loading}>
      <Table
        data={(props.data && props.data.users) || []}
        controllers={{ update: '/users/:id.json' }}
      />
    </Spin>
  );
};

export default attach(services.Users)(Users);
