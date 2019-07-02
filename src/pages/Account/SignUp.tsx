import { IRouteComponentProps } from '@mxcins/types';
import { Col, Input, Row } from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import React, { SFC } from 'react';

import { Form, FormattedMessage } from '@/components';

export interface ISignUpProps extends IRouteComponentProps {
  one?: any;
}

const FORM_ITEM_LAYOUT = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const SIGNUP_FORM_NAME_DECORATORS: GetFieldDecoratorOptions = {
  rules: [{ required: true, type: 'string', max: 50 }],
};

const SIGNUP_FORM_EMAL_DECORATORS: GetFieldDecoratorOptions = {
  rules: [
    {
      required: true,
      type: 'email',
    },
  ],
};

const SignUp: SFC<ISignUpProps> = () => {
  return (
    <Row type="flex" style={{ justifyContent: 'center', paddingTop: 24 }}>
      <Col style={{ flex: '0 0 400px' }}>
        <h1 style={{ textAlign: 'center' }}>
          <FormattedMessage id="page.account.signup.title" />
        </h1>
        <Form.Rest klass="user" mode="create">
          <Form.Item
            name="name"
            component={Input}
            {...FORM_ITEM_LAYOUT}
            decorators={SIGNUP_FORM_NAME_DECORATORS}
          >
            <Input type="text" autoComplete="username" />
          </Form.Item>
          <Form.Item name="email" {...FORM_ITEM_LAYOUT} decorators={SIGNUP_FORM_EMAL_DECORATORS}>
            <Input type="email" autoComplete="email" />
          </Form.Item>
          <Form.Item name="password" {...FORM_ITEM_LAYOUT}>
            <Input type="password" autoComplete="new-password" />
          </Form.Item>
          <Form.Item name="password_confirmation" {...FORM_ITEM_LAYOUT}>
            <Input type="password" autoComplete="new-password" />
          </Form.Item>
        </Form.Rest>
      </Col>
    </Row>
  );
};

export default SignUp;
