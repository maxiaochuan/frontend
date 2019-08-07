import { Form as Base } from 'antd';
import React, { Children, cloneElement, isValidElement, ReactElement, SFC } from 'react';
import { FormattedMessage } from 'umi/locale';

import { Button } from '@/components';
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from './const';
import { IInnerFormProps } from './interface';
import Item, { IFormItemProps } from './Item';

const InnerForm: SFC<IInnerFormProps> = props => {
  const { children, form, locale, ...others } = props;

  return (
    <Base layout="horizontal" {...FORM_ITEM_LAYOUT} {...others}>
      {Children.map(children, child => {
        if (isValidElement(child)) {
          return cloneElement(child as ReactElement<IFormItemProps>, { form, locale });
        }
        return null;
      })}
      <Item name="submit" {...TAIL_FORM_ITEM_LAYOUT}>
        <Button type="primary" htmlType="submit">
          <FormattedMessage id="form.submit" />
        </Button>
      </Item>
    </Base>
  );
};

const Enhanced = Base.create<IInnerFormProps>()(InnerForm);

export default Enhanced;
