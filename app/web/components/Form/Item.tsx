import React, { SFC, cloneElement, Children, ReactElement } from 'react';
import { Form as AntForm } from 'antd';
import { FormItemProps } from 'antd/es/form/FormItem';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/es/form/Form';

export interface IFormItemProps extends FormItemProps {
  name?: string;
  form?: WrappedFormUtils;
  decorators?: GetFieldDecoratorOptions;
  isSubmitting?: boolean;
}

const Item: SFC<IFormItemProps> = props => {
  const { form, decorators, children, name, isSubmitting, ...others } = props;
  if (!form || !name) {
    return <AntForm.Item {...others}>{children}</AntForm.Item>;
  }

  const c = Children.only(children) as ReactElement;

  return (
    <AntForm.Item {...others}>
      {form.getFieldDecorator(
        name,
        decorators,
      )(cloneElement(c, { loading: c.props.loading || isSubmitting }))}
    </AntForm.Item>
  );
};

export default Item;
