import React, { SFC } from 'react';
import { Loading } from '@/components';

const PageLoading: SFC = () => (
  <Loading loading>
    <div style={{ minHeight: '100vh' }} />
  </Loading>
);

export default PageLoading;
