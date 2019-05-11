import { IObjectType } from '@mxcins/types';
import { Form, Input, InputNumber } from 'antd';
import React, { SFC, useContext } from 'react';

import { Context } from '../context';

export interface IBodyCellProps<T extends IObjectType = IObjectType> {
  editing?: boolean;
  dataIndex: string;
  rowIndex: number;
  item: T;
}

const inputGenerator = (v: any) => {
  const type = typeof v;

  switch (type) {
    case 'number':
      return <InputNumber />;

    default:
      return <Input />;
  }
};

const BodyCell: SFC<IBodyCellProps> = props => {
  const {
    form,
    state: { rowKey, editKey },
  } = useContext(Context);
  const { children, dataIndex, rowIndex, editing, item, ...others } = props;
  if (!editing || !form || !editKey || !item || editKey !== item[rowKey]) {
    return <td {...others}>{children}</td>;
  }

  const { getFieldDecorator } = form;

  return (
    <td {...others}>
      <Form.Item style={{ margin: 0 }}>
        {getFieldDecorator(dataIndex as string, {
          // rules: [
          //   {
          //     required: true,
          //     message: `Please Input ${dataIndex}!`,
          //   },
          // ],
          initialValue: item[dataIndex],
        })(inputGenerator(item[dataIndex]))}
      </Form.Item>
    </td>
  );
};

export default BodyCell;
