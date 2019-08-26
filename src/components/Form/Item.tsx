import { Form as Base } from 'antd';
import React, { Children, SFC } from 'react';

import { IFormItemProps } from './interface';

const FormItem: SFC<IFormItemProps> = props => {
  const { form, name, children, ...others } = props;

  if (form && name) {
    return (
      <Base.Item {...others}>
        {form.getFieldDecorator(name, others)(Children.only(children))}
      </Base.Item>
    );
  }

  return <Base.Item {...others}>{children}</Base.Item>;
};

export default FormItem;
