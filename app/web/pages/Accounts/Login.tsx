import React, { SFC, Fragment } from 'react';
import { Input, Icon, Checkbox } from 'antd';
import router from 'umi/router';
import { formatMessage, FormattedMessage } from 'umi-plugin-locale/lib/locale';
import { Form } from '@/components';

import styles from './style.less';

const EMAIL_RULES = [{ type: 'email', required: true, max: 255 }];

const PASSWORD_RULES = [{ type: 'string', required: true, min: 6, max: 20 }];

const Remember: SFC = props => (
  <Fragment>
    <Checkbox {...props}>
      <FormattedMessage id="login.form.remember" />
    </Checkbox>
    <a style={{ float: 'right' }} href="">
      <FormattedMessage id="login.form.forgot" />
    </a>
  </Fragment>
);

const onSuccess = () => {
  router.push('/');
};

const Login: SFC = () => (
  <div className={styles.Login}>
    <div>
      <h1>
        <FormattedMessage id="route.login.title" />
      </h1>
    </div>
    <Form className={styles.Form} action="/login.json" klass="user" onSuccess={onSuccess}>
      <Form.Item name="email" decorators={{ rules: EMAIL_RULES }}>
        <Input
          autoComplete="on"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder={formatMessage({ id: 'login.form.email.placeholder' })}
        />
      </Form.Item>
      <Form.Item name="password" decorators={{ rules: PASSWORD_RULES }}>
        <Input.Password
          autoComplete="on"
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder={formatMessage({ id: 'login.form.password.placeholder' })}
          visibilityToggle={false}
        />
      </Form.Item>
      <Form.Item name="remember" decorators={{ valuePropName: 'checked', initialValue: true }}>
        <Remember />
      </Form.Item>
    </Form>
  </div>
);

export default Login;
