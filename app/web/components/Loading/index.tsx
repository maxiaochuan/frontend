import React, { SFC, ReactNode } from 'react';
import { Icon, Spin } from 'antd';

export interface ILoadingProps {
  icon?: ReactNode;
  tip?: string;
  loading?: boolean;
}

const icon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const Loading: SFC<ILoadingProps> = props => (
  <Spin indicator={icon || props.icon} tip={props.tip} spinning={props.loading}>
    {<div style={{ minHeight: 300 }}>{props.children}</div> || (
      <div style={{ minHeight: 500, background: 'transparent' }} />
    )}
  </Spin>
);

Loading.defaultProps = {
  loading: true,
  tip: 'Loading...',
};

export default Loading;
