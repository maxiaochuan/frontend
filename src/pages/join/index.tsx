import { IRouteComponentProps } from '@mxcins/types';
import React, { SFC, useRef } from 'react';

import { Form, Input } from '@/components';

const Join: SFC<IRouteComponentProps> = () => {
  const divRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={divRef}>
      <Form klass="user">
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input autoComplete="on" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input type="password" autoComplete="on" />
        </Form.Item>
        <Form.Item name="password_confirmation" rules={[{ required: true }]}>
          <Input type="password" autoComplete="on" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Join;
