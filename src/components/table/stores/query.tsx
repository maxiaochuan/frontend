import React from 'react';

import { IWithQueryResultProps, withQuery } from '@/decorators';
import { ITableCommonProps } from '../interface';
import Table from '../table';

const DEFAULT_DATA: any[] = [];

export default withQuery<ITableCommonProps & IWithQueryResultProps>(props => {
  const { queryResult, ...others } = props;
  let data = DEFAULT_DATA;
  if (queryResult.data) {
    const keys = Object.keys(props.queryResult.data);
    if (keys[0]) {
      data = props.queryResult.data[keys[0]];
    }
  }

  return (
    <Table {...others} data={data} loading={queryResult.loading} refetch={queryResult.refetch} />
  );
});
