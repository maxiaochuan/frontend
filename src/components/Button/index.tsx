import { Button as Base } from 'antd';
import { ButtonProps } from 'antd/es/button';
import React, { SFC } from 'react';

const Button: SFC<ButtonProps> = props => {
  return <Base {...props} />;
};

export default Button;
