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
  const { form, name, locale, label, children, ...others } = props;
  const labelRef = useRef(locale ? formatMessage({ id: `${locale}.${name}` }) : label);

  if (!form) {
    return (
      <Base.Item label={labelRef.current} {...others}>
        {props.children}
      </Base.Item>
    );
  }

  return (
    <Base.Item label={labelRef.current} {...others}>
      {form.getFieldDecorator(props.name)(props.children)}
    </Base.Item>
  );
};

export default Item;
