import { Form as Base } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { Children, cloneElement, isValidElement, ReactElement, SFC } from 'react';

import { IFormChildren } from './interface';

interface IInnerForm extends FormComponentProps {
  one?: any;
  children?: IFormChildren;
}

const Inner: SFC<IInnerForm> = props => {
  const { children, form, ...others } = props;

  return (
    <Base {...others}>
      {Children.map(children, child => {
        if (isValidElement(child)) {
          return cloneElement(child as ReactElement<any>, { form });
        }
        return null;
      })}
    </Base>
  );
};

const Enhanced = Base.create<IInnerForm>()(Inner);

export default Enhanced;
