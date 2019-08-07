import { Form as Base } from 'antd';
import React, { Children, cloneElement, isValidElement, ReactElement, SFC } from 'react';

import { IInnerFormProps } from './interface';
import { IFormItemProps } from './Item';

const InnerForm: SFC<IInnerFormProps> = props => {
  const { children, form, locale, ...others } = props;

  return (
    <Base {...others}>
      {Children.map(children, child => {
        if (isValidElement(child)) {
          return cloneElement(child as ReactElement<IFormItemProps>, { form, locale });
        }
        return null;
      })}
    </Base>
  );
};

const Enhanced = Base.create<IInnerFormProps>()(InnerForm);

export default Enhanced;
