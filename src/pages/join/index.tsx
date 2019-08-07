import { IRouteComponentProps } from '@mxcins/types';
import React, { SFC, useRef } from 'react';

import { Form, Input } from '@/components';

const Join: SFC<IRouteComponentProps> = () => {
  const divRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={divRef}>
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
