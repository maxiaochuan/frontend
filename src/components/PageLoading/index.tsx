import React, { SFC, useRef } from 'react';
import { Spin, Icon } from 'antd';

const PageLoading: SFC = () => {
  const icon = useRef(<Icon type="loading" />);
  return (
    <div style={{ paddingTop: 100, textAlign: 'center' }}>
      <Spin indicator={icon.current} tip="Loading..." size="large" />
    </div>
  )
}

export default PageLoading;