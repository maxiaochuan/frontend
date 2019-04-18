import { attach } from '@/decorators';
import { IRouteComponentProps } from '@mxcins/types';
import { Spin, Table } from 'antd';
import React, { SFC } from 'react';
import { QueryResult } from 'react-apollo';

import * as services from './index.gql';

const columns = [{ key: 'id', dataIndex: 'id' }, { key: 'name', dataIndex: 'name' }];

const Users: SFC<IRouteComponentProps & QueryResult> = props => {
  return (
    <Spin spinning={props.loading}>
      <Table columns={columns} dataSource={props.data.users} />
    </Spin>
  );
};

export default attach(services.Users)(Users);
