import { Form, Input } from '@/components';
import { request } from '@/utils';
import { IRouteComponentProps } from '@mxcins/types';
import React, { SFC, useCallback, useState } from 'react';
import { Redirect } from 'react-router';
import { FormattedMessage } from 'umi/locale';
import styles from './style.less';

const NAME_RULES = [{ type: 'string', required: true, max: 50 }];

const EMAIL_RULES = [{ type: 'email', required: true, max: 255 }];

const PASSWORD_RULES = [{ type: 'string', required: true, max: 20 }];

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
        <Form klass="user" mode="create" onSuccess={onSuccess}>
          <Form.Item name="name" rules={NAME_RULES}>
            <Input autoComplete="on" />
          </Form.Item>
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

export default Join;
