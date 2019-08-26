import { Input as Base } from 'antd';
import { InputProps } from 'antd/lib/input';
import React, { forwardRef, SFC } from 'react';

const Input: SFC<InputProps> = (props, ref) => <Base {...props} ref={ref} />;

export default forwardRef(Input);
