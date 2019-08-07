import { IRouteComponentProps } from '@mxcins/types';
import React, { SFC } from 'react';

import { Form, Input } from '@/components';

const Join: SFC<IRouteComponentProps> = () => {
  return (
    <div>
      <Form>
        <Form.Item>
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Join;
