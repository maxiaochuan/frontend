import { IRouteComponentProps } from '@mxcins/types';
import { Input } from 'antd';
import React, { SFC } from 'react';

import { Form } from '@/components';

export interface ISignUpProps extends IRouteComponentProps {
  one?: any;
}

const SignUp: SFC<ISignUpProps> = () => {
  return (
    <div>
      <Form>
        <Form.Item name="name" component={Input} />
        <Form.Item name="email" component={Input} />
        <Form.Item name="password" component={Input} />
        <Form.Item name="password_confirmation" component={Input} />
      </Form>
    </div>
  );
};

export default SignUp;
