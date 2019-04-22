import { Form as BasicForm } from 'antd';
import { FormComponentProps, FormItemProps, ValidationRule } from 'antd/lib/form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import React, { Children, ComponentClass, isValidElement, SFC } from 'react';

export type RuleType = 'required' | 'rString' | 'rNumber' | 'number';

// typeValidationRule
type IRulesMap = { [k in RuleType]: ValidationRule & { locale: string } };
const rulesMap: IRulesMap = {
  required: { required: true, type: 'string', locale: 'validate.required' },
  rString: { required: true, type: 'string', locale: 'validate.string.required' },
  rNumber: { required: true, type: 'number', locale: 'validate.number.required' },
  number: { type: 'number', locale: 'validate.number' },
};

export function getRules(types: RuleType[]) {
  return types.map(type => rulesMap[type]);
}

export interface IFormItemProps extends FormItemProps, Partial<FormComponentProps> {
  name: string;
  decorators?: GetFieldDecoratorOptions;
  validates?: RuleType[];
  component?: ComponentClass;
}

const Item: SFC<IFormItemProps> = props => {
  const { form, name, children, decorators, validates = [], component: Comp, ...others } = props;

  const initDecorators: GetFieldDecoratorOptions = {
    ...decorators,
    rules: getRules(validates),
  };

  const child = Comp ? <Comp /> : Children.only(children);

  if (!isValidElement(child)) {
    throw new Error('Form Item: children or component must be exit one!');
  }

  return (
    <BasicForm.Item label={name.toUpperCase()} {...others}>
      {form ? form.getFieldDecorator(name, initDecorators)(child) : children}
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
  validates: [],
};

export default Item;
