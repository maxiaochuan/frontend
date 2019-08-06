import React, { SFC } from 'react';

import Item from './Item';

const Form: SFC & { Item: typeof Item } = () => {
  return <div> form </div>;
};

Form.Item = Item;

export default Form;
