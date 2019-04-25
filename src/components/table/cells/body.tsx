import { Form, Input } from 'antd';
import React, { SFC } from 'react';

import { Context } from '../context';

export interface ICellProps {
  one?: any;
}

const Cell: SFC<any> = props => {
  const { record, children, dataIndex, editing, searchWords, rowKey, ...others } = props;

  const canEdit =
    record && (typeof record[dataIndex] === 'number' || typeof record[dataIndex] === 'string');

  return (
    <Context.Consumer>
      {({ form }) => {
        if (!form) {
          return children;
        }
        const { getFieldDecorator } = form;
        return (
          <td {...others}>
            {editing && dataIndex !== rowKey && canEdit ? (
              <Form.Item style={{ margin: 0 }}>
                {getFieldDecorator(dataIndex as string, {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: `Please Input ${dataIndex}!`,
                  //   },
                  // ],
                  initialValue: record[dataIndex],
                })(<Input />)}
              </Form.Item>
            ) : (
              children
            )}
          </td>
        );
      }}
    </Context.Consumer>
  );
};

export default Cell;
