import { DocumentNode } from 'graphql';
import React, { SFC } from 'react';

import { IUseQueryOpts, useQuery } from '@/hooks';
import { ITableCommonProps } from '../interface';
import Table from '../Table';

export interface ITableQueryProps {
  query: {
    service: DocumentNode;
    opts?: IUseQueryOpts;
  }
}

const formatter = (data: any) => {
  const keys = Object.keys(data);
  if (keys[0]) {
    return data[keys[0]];
  }
  return [];
}

const Query: SFC<ITableCommonProps & ITableQueryProps> = props => {
  const { query, ...others } = props;
  const queryResult = useQuery(query.service, {
    formatter,
    ...query.opts,
  });

  return (
    <Table {...others} data={queryResult.data} loading={!queryResult.done || queryResult.loading} refetch={queryResult.refetch} />
  );
};

export default Query;
