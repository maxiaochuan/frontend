import { Checkbox as Base } from 'antd';
import { CheckboxProps } from 'antd/es/checkbox';
import React, { SFC } from 'react';

const Checkbox: SFC<CheckboxProps> = props => {
  return <Base {...props} />;
};

export default Checkbox;
