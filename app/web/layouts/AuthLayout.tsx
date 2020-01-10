import React, { Fragment, SFC, useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import router from 'umi/router';
import { MainStore } from '@/stores';
import { FormattedMessage } from '@/common';

const NoAuth: SFC<{ prefix: string }> = props => {
  const { prefix } = props;
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
          <FormattedMessage id={`${prefix}.title`} />
        </h2>
        <div style={{ marginBottom: 24 }}>
          <FormattedMessage id={`${prefix}.content`} />
        </div>
        <div style={{ marginBottom: 24, textAlign: 'center', fontSize: 18 }}>
          <FormattedMessage id={`${prefix}.countdown`} values={{ time }} />
        </div>
        <Row type="flex" gutter={24} style={{ justifyContent: 'flex-end' }}>
          <Col>
            <Link to="/">
              <FormattedMessage id={`${prefix}.home`} />
            </Link>
          </Col>
          <Col>
            <Link to="/accounts/login">
              <FormattedMessage id={`${prefix}.login`} />
            </Link>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  );
};

const AuthLayout: SFC<{ main: MainStore }> = props => {
  const { main } = props;

  if (!main.current) {
    return <NoAuth prefix="no.authorization" />;
  }

  if (!main.authenticated) {
    return <NoAuth prefix="authentication.failed" />;
  }

  return <Fragment>{props.children}</Fragment>;
};

export default inject('main')(observer(AuthLayout));
