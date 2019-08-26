import { IRouteComponentProps } from '@mxcins/types';
import React, { SFC, useCallback, useState } from 'react';
import Redirect from 'umi/redirect';
import Link from 'umi/link';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { request } from '@/utils';
import { Button, Form, Icon, Input } from '@/components';
import styles from './style.less';

const NAME_RULES = [{ type: 'string', required: true, max: 50 }];

const EMAIL_RULES = [{ type: 'email', required: true, max: 255 }];

const PASSWORD_RULES = [{ type: 'string', required: true, min: 6, max: 20 }];

const Control: SFC = props => (
  <Form.Item>
    <Button type="primary" htmlType="submit" {...props} style={{ width: '100%' }}>
      Sign up
    </Button>
    Or <Link to="/login">Sign in!</Link>
  </Form.Item>
);

const Join: SFC<IRouteComponentProps> = () => {
  const [redirect, setRedirect] = useState(false);

  const onSuccess = useCallback(async (values: any) => {
    try {
      await request('/login.json', { method: 'POST', data: { user: values } });
      setRedirect(true);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error.message);
    }
  }, []);

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.join}>
      <div>
        <FormattedMessage id="route.join.title">{(txt: string) => <h1>{txt}</h1>}</FormattedMessage>
      </div>
      <div className={styles.form}>
        <Form klass="user" mode="create" label={false} onSuccess={onSuccess} control={<Control />}>
          <Form.Item name="name" rules={NAME_RULES}>
            <Input
              autoComplete="on"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={formatMessage({ id: 'user.name' })}
            />
          </Form.Item>
          <Form.Item name="email" rules={EMAIL_RULES}>
            <Input
              autoComplete="on"
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={formatMessage({ id: 'user.email' })}
            />
          </Form.Item>
          <Form.Item name="password" rules={PASSWORD_RULES}>
            <Input
              autoComplete="on"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={formatMessage({ id: 'user.password' })}
              type="password"
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Join;
