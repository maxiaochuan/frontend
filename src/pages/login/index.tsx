import { IRouteComponentProps } from '@mxcins/types';
import React, { SFC } from 'react';
import { FormattedMessage } from 'umi/locale';

import { Form, Input } from '@/components';
import styles from './style.less';

const EMAIL_RULES = [{ type: 'email', required: true, max: 255 }];

const PASSWORD_RULES = [{ type: 'string', required: true, min: 6, max: 20 }];

const Login: SFC<IRouteComponentProps> = () => {
  return (
    <div className={styles.login}>
      <div>
        <FormattedMessage id="route.login.title">
          {(txt: string) => <h1>{txt}</h1>}
        </FormattedMessage>
      </div>
      <div className={styles.form}>
        <Form klass="user" mode="create" uri="/login.json">
          <Form.Item name="email" rules={EMAIL_RULES}>
            <Input autoComplete="on" />
          </Form.Item>
          <Form.Item name="password" rules={PASSWORD_RULES}>
            <Input type="password" autoComplete="on" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
