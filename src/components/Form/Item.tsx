import { Form as Base } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { SFC } from 'react';

export interface IFormItemProps {
  form?: WrappedFormUtils;
}

const Item: SFC<IFormItemProps> = props => {
  return <Base.Item {...props} />;
};

export default Item;
