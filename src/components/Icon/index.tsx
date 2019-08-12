import { Icon as Base } from 'antd';
import { IconProps } from 'antd/lib/icon';
import React, { SFC } from 'react';

const Icon: SFC<IconProps> = props => {
  return <Base {...props} />;
};

export default Icon;
