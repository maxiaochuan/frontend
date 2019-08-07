import React, { SFC, useRef } from 'react';

import Enhanced from './Enhanced';
import { IFormProps } from './interface';
import Item from './Item';

const Form: SFC<IFormProps> & { Item: typeof Item } = props => {
  const { children } = props;
  const locale = useRef(props.locale || props.klass);

  return <Enhanced locale={locale.current}>{children}</Enhanced>;
};

Form.Item = Item;

export default Form;
