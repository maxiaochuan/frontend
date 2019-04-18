import { attach } from '@/decorators';
import { IRouteComponentProps } from '@mxcins/types';
import { Spin, Table } from 'antd';
import React, { SFC } from 'react';
import { QueryResult } from 'react-apollo';

import { GQLUser } from '@/graphql/generated';

import * as services from './index.gql';

const columns = [{ key: 'id', dataIndex: 'id' }, { key: 'name', dataIndex: 'name' }];

const Users: SFC<IRouteComponentProps & QueryResult<{ users: GQLUser[] }>> = props => {
  return (
    <Spin spinning={props.loading}>
      <Table rowKey="id" columns={columns} dataSource={props.data && props.data.users} />
    </Spin>
  );
};

export default attach(services.Users)(Users);
