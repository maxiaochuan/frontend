import { Table as Base } from 'antd';
import React from 'react';

import { IColumnExtend, Render } from './interface';
import { ControllerRenderer, DefaultRenderer } from './renderers';

export const renderCurrent = (key: string, columnExtend: IColumnExtend) => {
  const render: Render = (t, r, i) => <DefaultRenderer index={i} text={t} item={r} active={key} />;
  return <Base.Column key={key} {...columnExtend} render={render} />;
};

export const renderController = () => {
  const key = 'controllers';
  const render: Render = (t, r, i) => (
    <ControllerRenderer index={i} text={t} item={r} active={key} />
  );
  return <Base.Column key={key} dataIndex={key} width={100} title={key} render={render} />;
};
