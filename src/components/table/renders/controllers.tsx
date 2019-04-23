import { Col, Popconfirm, Row } from 'antd';
import React, { Fragment } from 'react';

import { Anchor } from '@/components';

import { IObjectType, Render } from '../interface';

const controllerRenderGenerator = <T extends IObjectType>(
  handlers: {
    onEdit: (id: string | number) => void;
    onEditSubmit: (id: string | number) => void;
    onCancel: (id: undefined) => void;
    onDestory: (id: string | number) => void;
  },
  rowKey: string,
  editKey?: string | number,
): Render<T> => (_, item) => {
  const onEdit = () => handlers.onEdit(item[rowKey]);
  const onEditSubmit = () => handlers.onEditSubmit(item[rowKey]);
  const onDestory = () => handlers.onDestory(item[rowKey]);
  const onCancel = () => handlers.onCancel(undefined);

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
            <Anchor href="#" onClick={onCancel}>
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
