import { Form, Input } from '@/components';
import { ResponseError } from '@/utils';
import { IRouteComponentProps } from '@mxcins/types';
import React, { SFC } from 'react';
import { FormattedMessage } from 'umi/locale';
import router from 'umi/router';
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

const Login: SFC<IRouteComponentProps> = () => {
  return (
    <div className={styles.login}>
      <div>
        <FormattedMessage id="route.login.title">
          {(txt: string) => <h1>{txt}</h1>}
        </FormattedMessage>
      </div>
      <div className={styles.form}>
        <Form
          klass="user"
          mode="create"
          uri="/login.json"
          onSuccess={onSuccess}
          onError={handleError}
        >
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
