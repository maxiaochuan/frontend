import React, { SFC } from 'react';

import { Table } from '@/components';
import { withQuery } from '@/decorators';

import * as services from './services.gql';

const Microposts = withQuery(services.UserMicroposts, {
  klass: 'micropost',
})(Table.Query);

const TableTest: SFC = () => {
  return (
    <div>
      <Microposts />
    </div>
  );
};

export default TableTest;
