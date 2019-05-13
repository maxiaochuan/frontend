import { Form as BasicForm } from 'antd';
import { FormComponentProps, FormItemProps } from 'antd/lib/form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import React, { Children, ComponentClass, isValidElement, ReactNode, SFC } from 'react';
import { formatMessage, FormattedMessage } from '..';

export interface IFormItemProps extends FormItemProps, Partial<FormComponentProps> {
  name: string;
  klass?: string;
  decorators?: GetFieldDecoratorOptions;
  component?: ComponentClass;
  locale?: string;
  label?: ReactNode;
}

const Item: SFC<IFormItemProps> = props => {
  const {
    klass,
    form,
    name,
    children,
    decorators = {},
    component: Comp,
    label,
    locale,
    ...others
  } = props;

  const child = Comp ? <Comp /> : Children.only(children);

  if (!isValidElement(child)) {
    throw new Error('Form Item: children or component must be exit one!');
  }

  const itemLabel = label || <FormattedMessage prefix={klass} id={locale || name} />;

  return (
    <BasicForm.Item label={itemLabel} {...others}>
      {form
        ? form.getFieldDecorator(name, {
            ...decorators,
            rules: (decorators.rules || []).map(rule => ({
              ...rule,
              message: formatMessage({ id: `${klass}.${name}.validate` }, rule),
            })),
          })(child)
        : children}
    </BasicForm.Item>
  );
};

Item.defaultProps = {
  wrapperCol: {
    span: 14,
  },
  labelCol: {
    span: 4,
  },
};

export default Item;
