import { IRouteComponentProps } from '@mxcins/types';
import React, { SFC } from 'react';

import { Form, Input } from '@/components';

const Join: SFC<IRouteComponentProps> = () => {
  return (
    <div>
      <Form klass="user">
        <Form.Item name="name">
          <Input />
        </Form.Item>
        <Form.Item name="password">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Join;
