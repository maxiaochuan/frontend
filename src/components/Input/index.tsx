import { Input as Base } from 'antd';
import { InputProps } from 'antd/lib/input';
import React, { forwardRef, SFC } from 'react';

const Input: SFC<InputProps> = (props, ref) => {
  return <Base {...props} ref={ref} />;
};

export default forwardRef(Input);
