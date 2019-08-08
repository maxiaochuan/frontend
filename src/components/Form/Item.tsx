import { Form as Base } from 'antd';
import React, { SFC, useRef } from 'react';
import { formatMessage } from 'umi/locale';

import { IFormItemProps } from './interface';

const Item: SFC<IFormItemProps> = props => {
  const { form, name, locale, label, noLabel, children, ...others } = props;
  const labelRef = useRef(
    noLabel ? '' : locale ? formatMessage({ id: `${locale}.${name}` }) : label,
  );

  if (!form) {
    return (
      <Base.Item label={labelRef.current} {...others}>
        {props.children}
      </Base.Item>
    );
  }

  return (
    <Base.Item label={labelRef.current} {...others}>
      {form.getFieldDecorator(props.name, others)(props.children)}
    </Base.Item>
  );
};

export default Item;
