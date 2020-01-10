import React, { SFC } from 'react';
import { Layout } from 'antd';

const AccountLayout: SFC = props => (
  <Layout style={{ minHeight: '100vh' }}>
    <Layout.Content>{props.children}</Layout.Content>
  </Layout>
);

export default AccountLayout;
