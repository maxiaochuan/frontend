import React, { SFC } from 'react';

import Enhanced from './Enhanced';
import { IFormChildren } from './interface';
import Item from './Item';

interface IFormProps {
  children?: IFormChildren;
}

const Form: SFC<IFormProps> & { Item: typeof Item } = props => {
  const { children } = props;
  return <Enhanced>{children}</Enhanced>;
};

Form.Item = Item;

export default Form;
