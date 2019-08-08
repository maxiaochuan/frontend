import { Form as Base } from 'antd';
import React, { Children, SFC } from 'react';

import { IFormItemProps } from './interface';

const FormItem: SFC<IFormItemProps> & { __FORM_ITEM: boolean } = props => {
  const { form, name, children, ...others } = props;

  const only = Children.only(children);
  const child = form ? form.getFieldDecorator(name, others)(only) : only;

  return <Base.Item {...others}>{child}</Base.Item>;
};

FormItem.__FORM_ITEM = true;

export default FormItem;
