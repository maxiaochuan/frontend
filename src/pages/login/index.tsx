import { IRouteComponentProps } from '@mxcins/types';
import React, { Fragment, SFC } from 'react';
import Link from 'umi/link';
import { FormattedMessage } from 'umi/locale';
import router from 'umi/router';
import { ResponseError } from '@/utils';
import { Button, Checkbox, Form, Icon, Input } from '@/components';
import styles from './style.less';

const EMAIL_RULES = [{ type: 'email', required: true, max: 255 }];

const PASSWORD_RULES = [{ type: 'string', required: true, min: 6, max: 20 }];

const onSuccess = () => router.push('/');

const handleError = (error: Error) => {
  if (error.name === 'ResponseError') {
    const err = error as ResponseError;
    if (err.response.status === 401) {
      return err.data;
    }
  }

  throw error;
};

const Control: SFC = props => (
  <Form.Item>
    <Button type="primary" htmlType="submit" {...props} style={{ width: '100%' }}>
      Login
    </Button>
    Or <Link to="/join">register now!</Link>
  </Form.Item>
);

const Remember: SFC = props => (
  <Fragment>
    <Checkbox {...props}>
      <FormattedMessage id="route.login.form.remember" />
    </Checkbox>
    <a style={{ float: 'right' }} href="">
      Forgot password
    </a>
  </Fragment>
);

const Login: SFC<IRouteComponentProps> = () => (
  <div className={styles.login}>
    <div>
      <FormattedMessage id="route.login.title">{(txt: string) => <h1>{txt}</h1>}</FormattedMessage>
    </div>
    <div className={styles.form}>
      <Form
        klass="user"
        mode="create"
        uri="/login.json"
        label={false}
        onSuccess={onSuccess}
        onError={handleError}
        control={<Control />}
      >
        <Form.Item name="email" rules={EMAIL_RULES}>
          <Input
            autoComplete="on"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item name="password" rules={PASSWORD_RULES}>
          <Input
            autoComplete="on"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Password"
            type="password"
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" initialValue>
          <Remember />
        </Form.Item>
      </Form>
    </div>
  </div>
);

export default Login;
