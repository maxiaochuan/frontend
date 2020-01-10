import React, { Fragment, SFC, useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import router from 'umi/router';
import { MainStore } from '@/stores';
import { FormattedMessage } from '@/common';

const AuthenticationFailed: SFC = () => {
  const [time, setTime] = useState(5);

  useEffect(() => {
    const f = window.setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        window.clearInterval(f);
        router.push('/');
      }
    }, 1000);

    return () => window.clearInterval(f);
  }, [time]);

  return (
    <Fragment>
      <Modal visible footer={false} closable={false}>
        <h2>
          <FormattedMessage id="authentication.failed.title" />
        </h2>
        <div style={{ marginBottom: 24 }}>
          <FormattedMessage id="authentication.failed.content" />
        </div>
        <div style={{ marginBottom: 24, textAlign: 'center', fontSize: 18 }}>
          <FormattedMessage id="authentication.failed.countdown" values={{ time }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/accounts/login">
            <FormattedMessage id="authentication.failed.login" />
          </Link>
        </div>
      </Modal>
    </Fragment>
  );
};

const AuthLayout: SFC<{ main: MainStore }> = props => {
  const { main } = props;

  if (!main.current) {
    return <AuthenticationFailed />;
  }

  return <Fragment>{props.children}</Fragment>;
};

export default inject('main')(observer(AuthLayout));
