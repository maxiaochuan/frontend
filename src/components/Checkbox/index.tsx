import { Checkbox as Base } from 'antd';
import { CheckboxProps } from 'antd/es/checkbox';
import React, { SFC } from 'react';

const Checkbox: SFC<CheckboxProps> = props => <Base {...props} />;

export default Checkbox;
