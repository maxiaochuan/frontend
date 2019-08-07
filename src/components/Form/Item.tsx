import { Form as Base } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import React, { SFC, useRef } from 'react';
import { formatMessage } from 'umi/locale';

export interface IFormItemProps extends FormItemProps, GetFieldDecoratorOptions {
  name: string;
  form?: WrappedFormUtils;
  locale?: string;
}

const Item: SFC<IFormItemProps> = props => {
  const label = useRef(
    props.locale ? formatMessage({ id: `${props.locale}.${props.name}` }) : props.label,
  );
  const { form } = props;

  if (!form) {
    return null;
  }

  return (
    <Base.Item label={label.current}>
      {form.getFieldDecorator(props.name)(props.children)}
    </Base.Item>
  );
};

export default Item;
