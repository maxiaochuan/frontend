import { Col, Popconfirm, Row } from 'antd';
import React, { Fragment } from 'react';

import Anchor from '../anchor';
import { Render } from './render';
import { IControllers } from './table';

export interface IControllersProps {
  controllers: IControllers;
}

const controllerRenderGenerator = <T extends { [x: string]: any }>(
  handlers: {
    onEdit: (item: T) => void;
    onEditSubmit: (id: string | number) => void;
    onCancel: () => void;
    onDestory: (id: string | number) => void;
  },
  rowKey: string,
  editKey?: string | number,
): Render<T> => (_, item) => {
  // TODO: 类型检测
  const onEdit = () => handlers.onEdit(item);
  const onEditSubmit = () => handlers.onEditSubmit(item[rowKey]);
  const onDestory = () => handlers.onDestory(item[rowKey]);

  const isEditCurrent = editKey === item[rowKey];

  return (
    <Row type="flex" gutter={12} style={{ justifyContent: 'space-around' }}>
      {isEditCurrent ? (
        <Fragment>
          <Col>
            <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={onEditSubmit}>
              <Anchor href="#">Save</Anchor>
            </Popconfirm>
          </Col>
          <Col>
            <Anchor href="#" onClick={handlers.onCancel}>
              Cancel
            </Anchor>
          </Col>
        </Fragment>
      ) : (
        <Fragment>
          <Col>
            <Anchor href="#" disabled={!!editKey} onClick={onEdit}>
              Edit
            </Anchor>
          </Col>

          <Col>
            <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={onDestory}>
              <Anchor href="#" disabled={!!editKey}>
                Delete
              </Anchor>
            </Popconfirm>
          </Col>
        </Fragment>
      )}
    </Row>
  );
};

export default controllerRenderGenerator;
